import { NextFunction, Request, Response } from "express";
import { CreateProduct } from "./CreateProduct";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { userId } = req;
    const { paymentMethod, name, price } = req.body;

    const createProduct = new CreateProduct();

    try {
      const product = await createProduct.execute({
        userId,
        paymentMethod,
        name,
        price
      })

      return res.json(product);
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: error.message
      })
    }
  }
}

export { CreateProductController }
