import { Request, Response } from "express";
import { AuthenticateUser } from "./AuthenticateUser";

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUser();

    try {
      const token = await authenticateUser.execute({
        email,
        password
      })

      return res.json(token)
    } catch (err) {
      return res.json({
        error: true,
        message: err.message
      })
    }
  }
}

export { AuthenticateUserController }

