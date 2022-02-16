import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { productsRoutes } from "./products.routes";
import { AuthenticateUserController } from "../useCases/authenticateUser/AuthenticateUserController";
import { RequestResetPasswordController } from "../useCases/requestResetPassword/RequestResetPasswordController";
import { ResetPasswordController } from "../useCases/resetPassword/ResetPasswordController";
import { RefreshTokenController } from "../useCases/refreshToken/RefreshTokenController";

const routes = Router();

const authenticateUserController = new AuthenticateUserController();
const requestResetPasswordController = new RequestResetPasswordController();
const resetPasswordController = new ResetPasswordController();
const refreshTokenController = new RefreshTokenController();

routes.post("/login", authenticateUserController.handle)
routes.post("/request-reset-password", requestResetPasswordController.handle)
routes.post("/reset-password", resetPasswordController.handle)
routes.post("/refresh-token", refreshTokenController.handle)

routes.use("/users", usersRoutes)
routes.use("/products", productsRoutes)

export { routes };

