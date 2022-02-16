import { prisma } from "../../infra/database/prisma"

class ShowProducts {
  async execute(userId: string) {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        created_at: true,
        status: true,
      }
    })

    if (products.length < 1) {
      throw new Error("No products found")
    }

    return products;
  }
}

export { ShowProducts }
