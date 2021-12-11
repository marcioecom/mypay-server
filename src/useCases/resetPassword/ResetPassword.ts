import dayjs from "dayjs"
import { verify } from "jsonwebtoken"
import { compare, hash } from "bcryptjs"
import { prisma } from "../../infra/database/prisma"

interface IResetPassword {
  userId: string;
  token: string;
  password: string;
  password2: string;
}

interface ITokenDecoded {
  email: string;
  id: string;
  exp: number;
}

class ResetPassword {
  async execute({ userId, token, password, password2 }: IResetPassword) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Error("User id is invalid");
    }

    const { email, id, exp } = verify(token, process.env.SECRET) as ITokenDecoded

    const tokenExpired = dayjs().isAfter(dayjs.unix(exp))
    if (tokenExpired) {
      throw new Error("Token expired");
    }

    if (user.id !== id || user.email !== email) {
      throw new Error("User id/email of token is not the same of user request");
    }

    if (password !== password2) {
      throw new Error("Passwords not match");
    }

    const passwordMatch = await compare(password, user.password)
    if (passwordMatch) {
      throw new Error("New password is the same as the old");
    }

    const passwordHash = await hash(password, 8)

    const newPassword = await prisma.user.update({
      where: {
        email
      },
      data: {
        password: passwordHash
      }
    })

    return newPassword;
  }
}

export { ResetPassword }
