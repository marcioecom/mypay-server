import { Request, Response } from "express";
import { ResetPassword } from "./ResetPassword"

interface ReqQuery {
  id: string;
  tk: string;
}

class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { id, tk } = req.query as unknown as ReqQuery
    const { password, password2 } = req.body

    const resetPassword = new ResetPassword()

    try {
      const newPassword = await resetPassword.execute({
        userId: id,
        token: tk,
        password,
        password2,
      })

      return res.json(newPassword)
    } catch (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      })
    }
  }
}

export { ResetPasswordController }
