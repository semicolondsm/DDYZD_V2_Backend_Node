import { NoticeRepository } from "../entity/entity-repository/noticeRepository";
import { Notice } from "../entity/model/Notice";
import { Writer } from "../shared/Enum";
import { BadRequestError } from "../shared/exception";

export class NoticeService {
  constructor(private noticeRepository: NoticeRepository) {}

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
