import { Router } from "express";
import { clubServiceRotue } from "./club.controller";
import { userServiceRouter } from "./user.controller";

const router: Router = Router();

router.use("/users", userServiceRouter);
router.use("/club", clubServiceRotue);

export default router;