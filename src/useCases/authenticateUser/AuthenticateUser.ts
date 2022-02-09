import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { prisma } from "../../infra/database/prisma"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";

interface IAuthUser {
  email: string;
  password: string;
}

class AuthenticateUser {
  async execute({ email, password }: IAuthUser) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(user.id);

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(user.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUser }

