import { Router } from "express";
import { clubServiceRouter } from "./club.router";
import { userServiceRouter } from "./user.router";
import { feedServiceRouter } from "./feed.router";
import { noticeServiceRouter } from "./notice.router";

export const ddyzdRouter = () => {
  const app = Router();

  clubServiceRouter(app);
  userServiceRouter(app);
  feedServiceRouter(app);
  noticeServiceRouter(app);

  return app;
}
