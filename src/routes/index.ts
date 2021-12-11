import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { AuthenticateUserController } from "../useCases/authenticateUser/AuthenticateUserController";
import { RequestResetPasswordController } from "../useCases/requestResetPassword/RequestResetPasswordController";

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const requestResetPasswordController = new RequestResetPasswordController();

routes.post("/login", authenticateUserController.handle)
routes.post("/request-reset-password", requestResetPasswordController.handle)

routes.use("/users", usersRoutes)

export { routes };

