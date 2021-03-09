import { Router } from "express";
import { FeedController } from "../controller/feed.controller";
import { errorHandler } from "../middleware/errorHandler";

const router: Router = Router();
export const feedServiceRouter = (app: Router) => {
  const feedController: FeedController = new FeedController();

  app.use("/feed", router);

  router.get(
    "/list", 
    errorHandler(feedController.getFeedList)
  );
}