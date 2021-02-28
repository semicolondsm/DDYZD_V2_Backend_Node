import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubMemberResObj } from "../../shared/DataTransferObject";
import { ClubHead } from "../model";

@EntityRepository(ClubHead) 
export class ClubHeadRepository extends Repository<ClubHead> {
  static getQueryRepository() {
    return getCustomRepository(ClubHeadRepository);
  }

  public findClubHead(club_id: number): Promise<ClubMemberResObj> {
    return this.createQueryBuilder("head")
    .select("user.id", "user_id")
    .addSelect("user.name", "user_name")
    .addSelect("user.image_path", "profile_image")
    .addSelect("user.gcn", "gcn")
    .addSelect("user.github_url", "git")
    .leftJoin("head.user", "user")
    .leftJoin("head.club", "club")
    .where("club.id = :club_id", { club_id })
    .getRawOne();
  }
}