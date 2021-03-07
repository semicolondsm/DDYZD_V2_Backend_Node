import { NextFunction, Request, Response, Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { ClubController } from "../controller/club.controller";
import { validationRequest } from "../middleware/validatoinRequest";
import { ModifyClubSuppliesSchema, SupplyClubItemSchema } from "../shared/DataTransferObject";

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
    (req: Request, res: Response, next: NextFunction) => {
      if(req.headers["authorization"]) {
        verifyTokenMiddleware(req, res, next);
      } else {
        next();
      }
    },
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
  );

  router.get(
    "/:club_id/member",
    validationNumberParameter("club_id"),
    errorHandler(clubController.showClubsMember)
  );

  router.get(
    "/:club_id/recruitment",
    validationNumberParameter("club_id"),
    errorHandler(clubController.showClubRecruitments)
  );

  router.get(
    "/:club_id/status",
    verifyTokenMiddleware,
    validationNumberParameter("club_id"),
    errorHandler(clubController.showClubStatus)
  );

  router.get(
    "/:club_id/supply/list",
    verifyTokenMiddleware,
    validationNumberParameter("club_id"),
    errorHandler(clubController.showClubSupplies)
  );

  router.post(
    "/:club_id/supply",
    verifyTokenMiddleware,
    validationNumberParameter("club_id"),
    validationRequest(SupplyClubItemSchema),
    errorHandler(clubController.requestClubSupplies)
  );

  router.put(
    "/:club_id/supply/:supply_id", 
    verifyTokenMiddleware,
    validationNumberParameter("club_id"),
    validationNumberParameter("supply_id"),
    validationRequest(ModifyClubSuppliesSchema),
    errorHandler(clubController.modifyClubSupplies)
  );

  router.delete(
    "/:club_id/supply/:supply_id",
    verifyTokenMiddleware,
    validationNumberParameter("club_id"),
    validationNumberParameter("supply_id"),
    errorHandler(clubController.removeClubSupplies)
  );

  router.get(
    "/banner",
    errorHandler(clubController.findClubBanners)
  );

  router.get(
    "/promotional",
    errorHandler(clubController.showPromotionalMaterial)
  );
}
