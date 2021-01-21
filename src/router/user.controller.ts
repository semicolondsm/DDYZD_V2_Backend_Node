import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as UserService from "../service/user.service";

const userServiceRouter: Router = Router();

const provideUserTokenHandler: BusinessLogic = errorHandler(UserService.provideToken);

userServiceRouter.get("/token", provideUserTokenHandler);

export { userServiceRouter }