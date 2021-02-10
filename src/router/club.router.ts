import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { ClubController } from "../controller/club.controller";

const router: Router = Router();
export const clubServiceRouter = (app: Router) => {
  const clubController: ClubController = new ClubController();

  app.use("/club", router);

  router.get(
    "/list", 
    errorHandler(clubController.showClubList)
  );

  router.get(
    "/:club_id/info", 
    validationNumberParameter("club_id"), 
    errorHandler(clubController.showClubInfo)
  );

  router.post(
    "/:club_id/follow", 
    verifyTokenMiddleware, 
    validationNumberParameter("club_id"), 
    errorHandler(clubController.followClubHandler)
  );

  router.delete(
    "/:club_id/follow",
    verifyTokenMiddleware,
    validationNumberParameter("club_id"),
    errorHandler(clubController.unfollowClub)
  )
}
