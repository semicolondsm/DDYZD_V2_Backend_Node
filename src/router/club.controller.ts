import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";

const clubServiceRotue: Router = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);
const showClubInfoHandler: BusinessLogic = errorHandler(clubService.showClubInfo);
const followClubHandler: BusinessLogic = errorHandler(clubService.followClubHandler);

clubServiceRotue.get("/list", showClubListHandler);
clubServiceRotue.get("/:club_id/info", validationNumberParameter("club_id"), showClubInfoHandler);
clubServiceRotue.post("/:club_id/follow", verifyTokenMiddleware, validationNumberParameter("club_id"), followClubHandler);

export { clubServiceRotue }