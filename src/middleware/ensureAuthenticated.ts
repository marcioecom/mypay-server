import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPaylod {
  sub: string;
}

function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      error: true,
      message: "Token is missing"
    });
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, process.env.SECRET) as IPaylod

    req.userId = sub;

    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: err.message
    })
  }
}

export default ensureAuthenticated;
