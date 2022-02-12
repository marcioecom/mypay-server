import { Router } from "express";
import { CreateUserController } from "../useCases/createUser/CreateUserController";
import { ShowProfileInfoController } from "../useCases/showProfileInfo/ShowProfileInfoController";

const router = Router();

const createUserController = new CreateUserController();
const showProfileInfoController = new ShowProfileInfoController();

router.post("/", createUserController.handle)
router.get("/profile", showProfileInfoController.handle)

export { router as usersRoutes };
