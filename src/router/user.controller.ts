import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as UserService from "../service/user.service";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middleware/verifyToken";

const userServiceRouter: Router = Router();

const provideUserTokenHandler: BusinessLogic = errorHandler(UserService.provideToken);
const refreshTokenHandler: BusinessLogic = errorHandler(UserService.refreshToken);
const showUserInfoHandler: BusinessLogic = errorHandler(UserService.showUserInfo);

userServiceRouter.get("/token", provideUserTokenHandler);
userServiceRouter.get("/refresh", verifyRefreshTokenMiddleware, refreshTokenHandler);
userServiceRouter.get("/:user_gcn", verifyTokenMiddleware, showUserInfoHandler);

export { userServiceRouter }