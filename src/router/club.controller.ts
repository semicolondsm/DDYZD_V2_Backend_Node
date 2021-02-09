import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import * as clubService from "../service/club.service";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const clubServiceRouter: Router = Router();

clubServiceRouter.get(
  "/list", 
  errorHandler(clubService.showClubList)
);

clubServiceRouter.get(
  "/:club_id/info", 
  validationNumberParameter("club_id"), 
  errorHandler(clubService.showClubInfo)
);

clubServiceRouter.post(
  "/:club_id/follow", 
  verifyTokenMiddleware, 
  validationNumberParameter("club_id"), 
  errorHandler(clubService.followClubHandler)
);

export { clubServiceRouter }