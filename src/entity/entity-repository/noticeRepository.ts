import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Notice } from "../model/Notice";
import { Writer } from "../../shared/Enum";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {

    static getQueryRepository() {
        return getCustomRepository(NoticeRepository);
    }

    public async getAllNotice(size: number, page: number): Promise<Notice[]> {
          return this.createQueryBuilder()
            .select("notice.writer", "writer")
            .addSelect("notice.title", "title")
            .addSelect("notice.createdAt", "createdAt")
            .orderBy("id", "DESC")
            .limit(size)
            .offset(size * page)
            .getRawMany();
    }

    public async getSpecificNotice(notice_id: number): Promise<Notice> {
        return this.createQueryBuilder()
            .select("notice.writer", "writer")
            .addSelect("notice.title", "title")
            .addSelect("notice.content", "content")
            .addSelect("notice.createdAt", "createdAt")
            .where("notice.id = :id", { id: notice_id })
            .getRawOne();
    }

    public async createNotice(notice: Notice): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .into(Notice)
            .values([
                { writer: notice.writer, title: notice.title, content: notice.content }
            ])
            .execute()
    }

    public async updateNotice(notice_id: number, notice: Notice): Promise<void> {
        await this.createQueryBuilder()
            .update(Notice)
            .set({ writer: notice.writer, title: notice.title, content: notice.content })
            .where("notice.id = :id", { id: notice_id })
            .execute()
    }

    public async deleteNotice(notice_id: number): Promise<void> {
        await this.createQueryBuilder()
            .delete()
            .from(Notice)
            .where("notice.id = :id", { id: notice_id })
            .execute()
    }
}
