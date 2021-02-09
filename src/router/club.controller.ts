import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const clubServiceRouter = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);
const followClubHandler: BusinessLogic = errorHandler(clubService.followClubHandler);

clubServiceRouter.get("/list", showClubListHandler);
clubServiceRouter.post("/:club_id/follow", verifyTokenMiddleware, followClubHandler);

export { clubServiceRouter }
