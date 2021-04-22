import { NoticeRepository } from "../entity/entity-repository/noticeRepository";
import { ClubMemberRepository } from "../entity/entity-repository/clubMemberRepository";
import { Notice } from "../entity/model/Notice";
import { Writer } from "../shared/Enum";
import { ForbiddenError } from "../shared/exception";
import { BadRequestError } from "../shared/exception";

export class NoticeService {
  constructor(
      private noticeRepository: NoticeRepository,
      private clubRepository: ClubMemberRepository,
    ) {}

  public async checkIsAdmin(club_id: number, user_id: number): Promise<void> {
      const admin: boolean = await this.clubRepository.checkIsClubMember(club_id, user_id);
      if(admin === false) {
        throw new ForbiddenError();
      }
  }
  public async getAllNotice(size: number, page: number): Promise<Notice[]> {
    const notices: Notice[] = await this.noticeRepository.getAllNotice(size, page);
    if (!notices) {
      throw new BadRequestError();
    }
    return notices;
  }

  public async getSpecificNotice(notice_id: number): Promise<Notice> {
    const notice: Notice = await this.noticeRepository.getSpecificNotice(notice_id);
    if (!notice) {
      throw new BadRequestError();
    }
    return notice;
  }

  public async createNotice(writer: Writer, title: string, content: string): Promise<void> {
    await this.noticeRepository.createNotice(writer, title, content);
  }

  public async updateNotice(notice_id: number, writer: Writer, title: string, content: string): Promise<void> {
    const notice = await this.noticeRepository.findOne({
      where: { id: notice_id },
    });
    if (!notice) {
      throw new BadRequestError();
    }
    await this.noticeRepository.updateNotice(notice_id, writer, title, content);
  }

  public async deleteNotice(notice_id: number): Promise<void> {
    const notice = await this.noticeRepository.findOne({
      where: { id: notice_id },
    });
    if (!notice) {
      throw new BadRequestError();
    }
    await this.noticeRepository.deleteNotice(notice_id);
  }
}
