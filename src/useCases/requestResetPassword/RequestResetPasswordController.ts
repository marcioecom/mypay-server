import { Request, Response } from "express"
import { RequestResetPassword } from "./RequestResetPassword"

class RequestResetPasswordController {
  async handle(req: Request, res: Response) {
    const { email } = req.body

    const requestResetPassword = new RequestResetPassword();

    try {
      const user = await requestResetPassword.execute(email)

      return res.json(user)
    } catch (err) {
      return res.status(404).json({
        error: true,
        message: err.message
      })
    }
  }
}

export { RequestResetPasswordController }
