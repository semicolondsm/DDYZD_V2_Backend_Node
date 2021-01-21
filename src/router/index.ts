import { Router } from "express";
import { userServiceRouter } from "./user.controller";

const router: Router = Router();

router.use("/users", userServiceRouter);

export default router;