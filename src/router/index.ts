import { Router } from "express";
import { userServiceRouter } from "./user.controller";

const router: Router = Router();

router.use("/user", userServiceRouter);