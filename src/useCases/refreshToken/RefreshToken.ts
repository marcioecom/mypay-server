import dayjs from "dayjs"
import { prisma } from "../../infra/database/prisma"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"
import { GenerateToken } from "../../provider/GenerateToken"

class RefreshToken {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if (!refreshToken) {
      throw new Error('Refresh token invalid!')
    }

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));

    const generateToken = new GenerateToken();
    const token = await generateToken.execute(refreshToken.userId)

    if (refreshTokenExpired) {
      const generateRefreshToken = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshToken.execute(refreshToken.userId);

      return { token, newRefreshToken }
    }
    return { token }
  }
}

export { RefreshToken }
