import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middleware/verifyToken";
import { UserController } from "../controller/user.controller";
import { validationRequest } from "../middleware/validatoinRequest";
import { ModifyUserInfoSchema } from "../shared/DataTransferObject";

const router: Router = Router();
export const userServiceRouter = (app :Router) => {
  const userController: UserController = new UserController();

  app.use("/users", router);

  router.get(
    "/token", 
    errorHandler(userController.provideToken)
  );

  router.post(
    "/token/code",
    errorHandler(userController.proviceTokenWithCode)
  );
  
  router.get(
    "/refresh", 
    verifyRefreshTokenMiddleware, 
    errorHandler(userController.refreshToken)
  );
  
  router.get(
    "/:user_gcn", 
    verifyTokenMiddleware, 
    errorHandler(userController.showUserInfo)
  );
  
  router.put(
    "/profile", 
    verifyTokenMiddleware, 
    validationRequest(ModifyUserInfoSchema),
    errorHandler(userController.modifyUserInfo)
  );
  
  router.post(
    "/device_token", 
    verifyTokenMiddleware, 
    errorHandler(userController.deviceToken)
  );
}
