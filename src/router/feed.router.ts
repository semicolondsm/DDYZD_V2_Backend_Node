import { Router } from "express";
import { FeedController } from "../controller/feed.controller";
import { errorHandler } from "../middleware/errorHandler";
import { verifyTokenOrDone } from "../middleware/verifyTokenOrDone";

const router: Router = Router();
export const feedServiceRouter = (app: Router) => {
  const feedController: FeedController = new FeedController();

  app.use("/feed", router);

  router.get(
    "/list", 
    verifyTokenOrDone,
    errorHandler(feedController.getFeedList)
  );
}