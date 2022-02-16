import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { CreateProductController } from "../useCases/createProduct/CreateProductController";

const router = Router();

const createProductController = new CreateProductController();

router.post("/", ensureAuthenticated, createProductController.handle)

export { router as productsRoutes }
