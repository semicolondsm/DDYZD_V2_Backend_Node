import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import * as clubService from "../service/club.service";

const clubServiceRotue: Router = Router();

const showClubListHandler: BusinessLogic = errorHandler(clubService.showClubList);

clubServiceRotue.get("/list", showClubListHandler);

export { clubServiceRotue }