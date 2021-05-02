import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import { validationNumberParameter } from "../middleware/validationParameter";
import { verifyTokenMiddleware } from "../middleware/verifyToken";
import { NoticeController } from "../controller/notice.controller";
import { validationRequest } from "../middleware/validatoinRequest";
import { CreateNoticeSchema, UpdateNoticeSchema } from "../shared/DataTransferObject";

const router: Router = Router();
export const noticeServiceRouter = (app: Router) => {
    const noticeController: NoticeController = new NoticeController();

    app.use("/notice", router);

    router.get(
        "/check",
        verifyTokenMiddleware,
        errorHandler(noticeController.checkIsAdmin)
    );

    router.post(
        "/",
        verifyTokenMiddleware,
        validationRequest(CreateNoticeSchema),
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
        validationRequest(UpdateNoticeSchema),
        errorHandler(noticeController.updateNotice)
    );

    router.delete(
        "/:notice_id",
        verifyTokenMiddleware,
        validationNumberParameter("notice_id"),
        errorHandler(noticeController.deleteNotice)
    );
}
