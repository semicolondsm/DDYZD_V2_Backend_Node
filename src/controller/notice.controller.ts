import { NoticeRepository } from "../entity/entity-repository/noticeRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { NoticeService } from "../service/notice.service";
import { Notice } from "../entity/model/Notice";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { BadRequestError } from "../shared/exception";

export class NoticeController {
    private noticeService: NoticeService = new NoticeService(
        NoticeRepository.getQueryRepository(),
        ClubMemberRepository.getQueryRepository()
    );

    private clubId: number = 32;

    public checkIsAdmin: BusinessLogic = async (req, res, next) => {
        await this.noticeService.checkIsNotAdmin(this.clubId, +req.decoded.sub);
        res.status(200).json({
            message: "pass!!"
        })
    }

    public getAllNotice: BusinessLogic = async (req, res, next) => {
        const notices: Notice[] = await this.noticeService.getAllNotice(+req.query.size, +req.query.page);
        res.status(200).json(notices);
    }

    public getSpecificNotice: BusinessLogic = async (req, res, next) => {
        const notice: Notice = await this.noticeService.getSpecificNotice(+req.params.notice_id);
        if(!notice) {
            throw new BadRequestError("공지사항이 없습니다.");
        }
        res.status(200).json(notice);
    }

    public createNotice: BusinessLogic = async (req, res, next) => {
        await this.noticeService.createNotice(req.body, this.clubId, +req.decoded.sub);
        res.status(200).json({
            message: "notice created"
        });
    }

    public updateNotice: BusinessLogic = async (req, res, next) => {
        await this.noticeService.updateNotice(+req.params.notice_id, this.clubId, +req.decoded.sub, req.body);
        res.status(200).json({
            message: "notice patched"
        });
    }

    public deleteNotice: BusinessLogic = async (req, res, next) => {
        await this.noticeService.deleteNotice(+req.params.notice_id, this.clubId, +req.decoded.sub);
        res.status(200).json({
            message: "notice deleted"
        });
    }
}
