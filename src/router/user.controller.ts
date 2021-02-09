import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import * as userService from "../service/user.service";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middleware/verifyToken";

const userServiceRouter: Router = Router();

userServiceRouter.get(
  "/token", 
  errorHandler(userService.provideToken)
);

userServiceRouter.get(
  "/refresh", 
  verifyRefreshTokenMiddleware, 
  errorHandler(userService.refreshToken)
);

userServiceRouter.get(
  "/:user_gcn", 
  verifyTokenMiddleware, 
  errorHandler(userService.showUserInfo)
);

userServiceRouter.put(
  "/profile", 
  verifyTokenMiddleware, 
  errorHandler(userService.modifyUserInfo)
);

userServiceRouter.post(
  "/device_token", 
  verifyTokenMiddleware, 
  errorHandler(userService.deviceToken)
);

export { userServiceRouter }