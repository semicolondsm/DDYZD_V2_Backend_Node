import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { verifyRefreshTokenMiddleware, verifyTokenMiddleware } from "../middleware/verifyToken";
import { UserController } from "../controller/user.controller";

const router: Router = Router();
export const userServiceRouter = (app :Router) => {
  const userController: UserController = new UserController();

  app.use("/users", router);

  router.get(
    "/token", 
    errorHandler(userController.provideToken)
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
    errorHandler(userController.modifyUserInfo)
  );
  
  router.post(
    "/device_token", 
    verifyTokenMiddleware, 
    errorHandler(userController.deviceToken)
  );
}