import { Router } from "express";
import { userServiceRouter } from "./user.controller";
import { clubServiceRouter } from "./club.controller";

const router: Router = Router();

router.use("/users", userServiceRouter);
router.use("/club", clubServiceRouter);

export default router;