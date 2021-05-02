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

  public async checkIsNotAdmin(club_id: number, user_id: number): Promise<void> {
    if(await this.checkAuthority(club_id, user_id)) {
      throw new ForbiddenError();
    }
  }

  private async checkAuthority(club_id: number, user_id: number): Promise<boolean> {
      const admin: boolean = await this.clubRepository.checkIsClubMember(club_id, user_id);
      return !admin;
  }

  public async getAllNotice(size: number, page: number): Promise<Notice[]> {
    const notices: Notice[] = await this.noticeRepository.getAllNotice(size, page);
    return notices;
  }

  public async getSpecificNotice(notice_id: number): Promise<Notice> {
    const notice: Notice = await this.noticeRepository.getSpecificNotice(notice_id);
    return notice;
  }

  public async createNotice(notice: Notice, club_id: number, user_id: number): Promise<void> {
    if(await this.checkAuthority(club_id, user_id)) {
      throw new ForbiddenError();
    }
    await this.noticeRepository.createNotice(notice);
  }

  public async updateNotice(notice_id: number, club_id: number, user_id: number, notice: Notice): Promise<void> {
    const updateNotice = await this.noticeRepository.findOne({
      where: { id: notice_id },
    });
    if (!updateNotice) {
      throw new BadRequestError("해당 공지사항이 없습니다.");
    }
    if(await this.checkAuthority(club_id, user_id)) {
      throw new ForbiddenError();
    }
    await this.noticeRepository.updateNotice(notice_id, notice);
  }

  public async deleteNotice(notice_id: number, club_id: number, user_id: number): Promise<void> {
    const deleteNotice = await this.noticeRepository.findOne({
      where: { id: notice_id },
    });
    if (!deleteNotice) {
      throw new BadRequestError("해당 공지사항이 없습니다.");
    }
    if(await this.checkAuthority(club_id, user_id)) {
      throw new ForbiddenError();
    }
    await this.noticeRepository.deleteNotice(notice_id);
  }
}
