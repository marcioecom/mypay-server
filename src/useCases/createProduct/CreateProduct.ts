import { prisma } from "../../infra/database/prisma"

interface ICreateProduct {
  userId: string;
  paymentMethod: string;
  name: string;
  price: number,
}

class CreateProduct {
  async execute({ userId, paymentMethod, name, price }: ICreateProduct) {
    const productNameAlredyExists = await prisma.product.findFirst({
      where: {
        name
      }
    })

    if (productNameAlredyExists) {
      throw new Error("Já existe um produto com esse nome");
    }

    const product = await prisma.product.create({
      data: {
        userId,
        payment_method: paymentMethod,
        name,
        price
      }
    })

    return product;
  }
}

export { CreateProduct }
