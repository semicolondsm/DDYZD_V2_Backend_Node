import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Notice } from "../model/Notice";
import { Writer } from "../../shared/checkAdmin";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
    
    static getCustomRepository() {
        return getCustomRepository(NoticeRepository);
    }

    public async getAllNotice(size: number, page: number): Promise<Notice[]> {
          return this.createQueryBuilder()
            .select("notice.writer", "writer")
            .addSelect("notice.title", "title")
            .addSelect("notice.created_at", "created_at")
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
            .addSelect("notice.created_at", "created_at")
            .where("notice.id = :id", { id: notice_id })
            .getRawOne();
    }

    public async createNotice(writer: Writer, title: string, content: string): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .into(Notice)
            .values([
                { writer: writer, title: title, content: content }
            ])
            .execute()
    }

    public async updateNotice(notice_id: number, writer: Writer, title: string, content: string): Promise<void> {
        await this.createQueryBuilder()
            .update(Notice)
            .set({ writer: writer, title: title, content: content })
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

