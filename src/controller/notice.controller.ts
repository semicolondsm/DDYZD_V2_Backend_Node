import { NoticeRepository } from "../entity/entity-repository/noticeRepository";
import { NoticeService } from "../service/notice.service";
import { Notice } from "../entity/model/Notice";
import { BusinessLogic } from "../shared/BusinessLogicInterface";

export class FeedController {
    private noticeService: NoticeService = new NoticeService(
        NoticeRepository.getQueryRepository()
    );

    public getAllNotice: BusinessLogic = async (req, res, next) => {
        const notices: Notice[] = await this.noticeService.getAllNotice(+req.query.size, +req.query.page);
        res.status(200).json(notices);
    }
    
    public getSpecificNotice: BusinessLogic = async (req, res, next) => {
        const notice: Notice = await this.noticeService.getSpecificNotice(+req.params.notice_id);
        res.status(200).json(notice);
    } 

    public createNotice: BusinessLogic = async (req, res, next) => {
        await this.noticeService.createNotice(req.writer, req.title, req.content);
        res.status(200).json("success");
    }

    public updateNotice: BusinessLogic = async (req, res, next) => {
        await this.noticeService.updateNotice(+req.params.notice_id, req.writer, req.title, req.content);
        res.status(200).json("success");
    }

    public deleteNotice: BusinessLogic = async (req, res, next) => {
        await this.noticeService.deleteNotice(+req.params.notice_id);
        res.status(200).json("success");
    }
}