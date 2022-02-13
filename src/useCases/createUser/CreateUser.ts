import { hash } from 'bcryptjs'
import { prisma } from '../../infra/database/prisma'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'
import { GenerateToken } from '../../provider/GenerateToken'

interface IUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
}

class CreateUser {
  async execute({ firstName, lastName, email, password, admin = false }: IUserRequest) {
    const userAlredyExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userAlredyExists) {
      throw new Error("User alredy exists")
    }

    if (password.length < 6) {
      throw new Error("A senha precisa possuir pelo menos 6 caracteres");
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: passwordHash,
        admin,
      }
    })

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(user.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return { user, token, refreshToken };
  }
}

export { CreateUser }
