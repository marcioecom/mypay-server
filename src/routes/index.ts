import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { AuthenticateUserController } from "../useCases/authenticateUser/AuthenticateUserController";

const routes = Router();

const authenticateUserController = new AuthenticateUserController();

routes.post("/login", authenticateUserController.handle)
routes.use("/users", usersRoutes)

export { routes };

