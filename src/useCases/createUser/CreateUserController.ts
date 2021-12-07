import { Request, Response } from "express"
import { CreateUser } from "./CreateUser";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body

    const createUser = new CreateUser();

    try {
      const user = await createUser.execute({
        name,
        email,
        password,
      })
  
      return res.json(user);
    } catch (err) {
      return res.status(400).json({
        error: true,
        message: err.message
      })
    }
  }
}

export { CreateUserController }
