import { Router } from "express";
import ensureAuthenticated from "../middleware/ensureAuthenticated";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ShowProfileInfoController } from "../useCases/showProfileInfo/ShowProfileInfoController";

const router = Router();

const createUserController = new CreateUserController();
const showProfileInfoController = new ShowProfileInfoController();

router.post("/", createUserController.handle)
router.get("/profile", ensureAuthenticated, showProfileInfoController.handle)

export { router as usersRoutes };
