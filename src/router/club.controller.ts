import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const clubServiceRouter: Router = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);
const showClubInfoHandler: BusinessLogic = errorHandler(clubService.showClubInfo);
const followClubHandler: BusinessLogic = errorHandler(clubService.followClubHandler);

clubServiceRouter.get(
  "/list", 
  showClubListHandler
);

clubServiceRouter.get(
  "/:club_id/info", 
  validationNumberParameter("club_id"), 
  showClubInfoHandler
);

clubServiceRouter.post(
  "/:club_id/follow", 
  verifyTokenMiddleware, 
  validationNumberParameter("club_id"), 
  followClubHandler
);

export { clubServiceRouter }