import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const clubServiceRotue: Router = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);
const followClubHandler: BusinessLogic = errorHandler(clubService.followClubHandler);

clubServiceRotue.get("/list", showClubListHandler);
clubServiceRotue.post("/:club_id/follow", verifyTokenMiddleware, followClubHandler);

export { clubServiceRotue }