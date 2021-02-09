import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import * as UserService from "../service/user.service";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middleware/verifyToken";

const userServiceRouter: Router = Router();

userServiceRouter.get(
  "/token", 
  errorHandler(UserService.provideToken)
);

userServiceRouter.get(
  "/refresh", 
  verifyRefreshTokenMiddleware, 
  errorHandler(UserService.refreshToken)
);

userServiceRouter.get(
  "/:user_gcn", 
  verifyTokenMiddleware, 
  errorHandler(UserService.showUserInfo)
);

userServiceRouter.put(
  "/profile", 
  verifyTokenMiddleware, 
  errorHandler(UserService.modifyUserInfo)
);

userServiceRouter.post(
  "/device_token", 
  verifyTokenMiddleware, 
  errorHandler(UserService.deviceToken)
);

export { userServiceRouter }