import { prisma } from "../../infra/database/prisma"


class ShowProfileInfo {
  async execute(userId: string) {
    const userInfo = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      }
    })

    return userInfo;
  }
}

export { ShowProfileInfo }
