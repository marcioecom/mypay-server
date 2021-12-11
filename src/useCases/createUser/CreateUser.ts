import { hash } from 'bcryptjs'
import { prisma } from '../../infra/database/prisma'

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUser {
  async execute({ name, email, password }: IUserRequest) {
    const userAlredyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userAlredyExists) {
      throw new Error("User alredy exists")
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })

    return user
  }
}

export { CreateUser }
