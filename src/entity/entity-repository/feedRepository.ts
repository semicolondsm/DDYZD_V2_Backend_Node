import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Feed } from "../model";

@EntityRepository(Feed)
export class FeedRepotisoty extends Repository<Feed> {
  static getQueryRepository() {
    return getCustomRepository(FeedRepotisoty);
  }

  public getFeedList(page: number): Promise<Feed[]> {
    return this.createQueryBuilder("feed")
    .leftJoinAndSelect("feed.club", "club")
    .orderBy("feed.upload_at", "DESC")
    .offset(page*3)
    .limit(3)
    .getMany();
  }

  public async getFeedMedia(feed_id: number): Promise<string[]> {
    const feed: Feed = await this.createQueryBuilder("feed")
    .select("feed.id")
    .addSelect("media.medium_path")
    .leftJoin("feed.feed_media", "media")
    .where("feed.id = :id", { id: feed_id })
    .getOne();
    return feed.feed_media.map(media => media.medium_path);
  }

  public async getFeedFlags(feed_id: number): Promise<number> {
    const feed: Feed = await this.createQueryBuilder("feed")
    .leftJoinAndSelect("feed.flags", "flags")
    .where("feed.id = :id", { id: feed_id })
    .getOne();
    return feed.flags.length;
  }
}