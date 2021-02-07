import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";
import { validationNumberParameter } from "../middleware/validationParameter";

const clubServiceRotue: Router = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);
const showClubInfoHandler: BusinessLogic = errorHandler(clubService.showClubInfo);

clubServiceRotue.get("/list", showClubListHandler);
clubServiceRotue.get("/:club_id/info", validationNumberParameter("club_id"), showClubInfoHandler);

export { clubServiceRotue }