import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const clubServiceRouter = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);
const followClubHandler: BusinessLogic = errorHandler(clubService.followClub);
const unfollowClubHandler: BusinessLogic = errorHandler(clubService.unfollowClub);

clubServiceRouter.get("/list", showClubListHandler);

clubServiceRouter.post("/:club_id/follow", verifyTokenMiddleware, followClubHandler);
clubServiceRouter.delete("/:club_id/follow", verifyTokenMiddleware, unfollowClubHandler);

export { clubServiceRouter }
