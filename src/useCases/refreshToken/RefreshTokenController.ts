import { Request, Response } from "express";
import { RefreshToken } from "./RefreshToken";

class RefreshTokenController {
  async handle(req: Request, res: Response) {
    const { refresh_token } = req.body;

    const refreshToken = new RefreshToken();

    try {
      const token = await refreshToken.execute(refresh_token);

      return res.json(token)
    } catch (error) {
      return res.json({
        error: true,
        message: error.message
      })
    }
  }
}

export { RefreshTokenController }
