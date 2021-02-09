import { Router } from "express";
import { clubServiceRouter } from "./club.router";
import { userServiceRouter } from "./user.router";

export const ddyzdRouter = () => {
  const app = Router();

  clubServiceRouter(app);
  userServiceRouter(app);

  return app;
}