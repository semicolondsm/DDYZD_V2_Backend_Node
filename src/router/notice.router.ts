import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { NoticeController } from "../controller/notice.controller";

const router: Router = Router();
export const noticeServiceRouter = (app: Router) => {
    const noticeController: NoticeController = new NoticeController();

    app.use("/notice", router);

    router.get(
        "/check",
        errorHandler(noticeController.checkIsAdmin)
    );

    router.post(
        "/",
        verifyTokenMiddleware,
        errorHandler(noticeController.createNotice)
    );

    router.get(
        "/",
        errorHandler(noticeController.getAllNotice)
    );

    router.get(
        "/:notice_id",
        validationNumberParameter("notice_id"),
        errorHandler(noticeController.getSpecificNotice)
    );

    router.patch(
        "/:notice_id",
        verifyTokenMiddleware,
        validationNumberParameter("notice_id"),
        errorHandler(noticeController.updateNotice)
    );

    router.delete(
        "/:notice_id",
        verifyTokenMiddleware,
        validationNumberParameter("notice_id"),
        errorHandler(noticeController.deleteNotice)
    );
}