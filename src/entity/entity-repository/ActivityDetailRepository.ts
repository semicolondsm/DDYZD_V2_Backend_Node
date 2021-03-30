import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { UserActivitiesResObj } from "../../shared/DataTransferObject";
import { ActivityDetails } from "../model";

@EntityRepository(ActivityDetails) 
export class ActivityDetailRepository extends Repository<ActivityDetails> {
  static getQueryRepository() {
    return getCustomRepository(ActivityDetailRepository);
  }

  public getUserActivities(user_id: number): Promise<UserActivitiesResObj[]> {
    return this.createQueryBuilder("ac")
    .select("activity.activity", "activity")
    .addSelect("club.name", "club_name")
    .addSelect("club.profile_image", "club_image")
    .addSelect("club.id", "club_id")
    .leftJoin("ac.club", "club")
    .leftJoin("ac.user", "user")
    .leftJoin("ac.activity", "activity")
    .where("user.id = :id", { id: user_id })
    .getRawMany();
  }
}