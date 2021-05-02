import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Notice } from "../model/Notice";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {

    static getQueryRepository() {
        return getCustomRepository(NoticeRepository);
    }

    public async getAllNotice(size: number, page: number): Promise<Notice[]> {
          return this.createQueryBuilder("notice")
            .select("notice.writer")
            .addSelect("notice.title")
            .addSelect("notice.createdAt")
            .orderBy("notice.id", "DESC")
            .limit(size)
            .offset(size * page)
            .getMany();
    }

    public async getSpecificNotice(notice_id: number): Promise<Notice> {
        return this.createQueryBuilder("notice")
            .select("notice.writer")
            .addSelect("notice.title")
            .addSelect("notice.content")
            .addSelect("notice.createdAt")
            .where("notice.id = :id", { id: notice_id })
            .getOne();
    }

    public async createNotice(notice: Notice): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .values([
                { writer: notice.writer, title: notice.title, content: notice.content }
            ])
            .execute()
    }

    public async updateNotice(notice_id: number, notice: Notice): Promise<void> {
        await this.createQueryBuilder("notice")
            .update({ writer: notice.writer, title: notice.title, content: notice.content })
            .where("notice.id = :id", { id: notice_id })
            .execute()
    }

    public async deleteNotice(notice_id: number): Promise<void> {
        await this.createQueryBuilder("notice")
            .delete()
            .where("notice.id = :id", { id: notice_id })
            .execute()
    }
}
