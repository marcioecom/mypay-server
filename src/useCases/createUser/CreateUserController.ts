import { Request, Response } from "express"
import { CreateUser } from "./CreateUser";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { firstName, lastName, email, password, admin } = req.body

    const createUser = new CreateUser();

    try {
      const user = await createUser.execute({
        firstName,
        lastName,
        email,
        password,
        admin,
      })

      return res.json(user);
    } catch (err) {
      return res.json({
        error: true,
        message: err.message
      })
    }
  }
}

export { CreateUserController }
