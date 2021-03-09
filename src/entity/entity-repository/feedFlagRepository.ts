import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { FeedFlag } from "../model";

@EntityRepository(FeedFlag) 
export class FeedFlagRepository extends Repository<FeedFlag> {
  static getQueryRepository() {
    return getCustomRepository(FeedFlagRepository);
  }

  public async checkIsFlaged(feed_id: number, user_id: number): Promise<boolean> {
    const flags: FeedFlag = await this.createQueryBuilder("flag")
    .where("flag.feed_id = :feed_id", { feed_id })
    .andWhere("flag.user_id = :user_id", { user_id })
    .getOne();
    return !!flags;
  }
}