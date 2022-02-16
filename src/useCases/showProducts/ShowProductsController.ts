import { Request, Response } from "express";
import { ShowProducts } from "./ShowProducts";

class ShowProductsController {
  async handle(req: Request, res: Response) {
    const { userId } = req;

    const showProducts = new ShowProducts();
    try {
      const products = await showProducts.execute(userId);

      return res.json(products);
    } catch (error) {
      return res.status(404).json({
        message: error.message
      });
    }
  }
}

export { ShowProductsController }
