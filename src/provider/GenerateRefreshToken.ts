import dayjs from "dayjs"
import { prisma } from "../infra/database/prisma";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(30, 'day').unix();

    const generateRefreshToken = await prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        expiresIn,
      }
    })

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken }
