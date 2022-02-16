import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { CreateProductController } from "../useCases/createProduct/CreateProductController";
import { ShowProductsController } from "../useCases/showProducts/ShowProductsController";

const router = Router();

const createProductController = new CreateProductController();
const showProductsController = new ShowProductsController();

router.post("/", ensureAuthenticated, createProductController.handle)
router.get("/", ensureAuthenticated, showProductsController.handle)

export { router as productsRoutes }
