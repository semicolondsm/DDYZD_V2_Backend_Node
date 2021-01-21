import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as UserService from "../service/user.service";
import { verifyRefreshTokenMiddleware } from "../middleware/verifyToken";

const userServiceRouter: Router = Router();

const provideUserTokenHandler: BusinessLogic = errorHandler(UserService.provideToken);
const refreshTokenHandler: BusinessLogic = errorHandler(UserService.refreshToken);

userServiceRouter.get("/token", provideUserTokenHandler);
userServiceRouter.get("/refresh", verifyRefreshTokenMiddleware, refreshTokenHandler);

export { userServiceRouter }