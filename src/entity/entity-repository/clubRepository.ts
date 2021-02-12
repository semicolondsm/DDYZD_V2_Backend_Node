import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubInfoResObj } from "../../shared/DataTransferObject";
import { Club } from "../model";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  static getQueryRepository() {
    return getCustomRepository(ClubRepository);
  }

  public findInfoById(club_id: number): Promise<ClubInfoResObj> {
    return this.createQueryBuilder("club")
    .select("club.club_id", "clubid")
    .addSelect("club.club_name", "clubname")
    .addSelect("club.profile_image", "clubimage")
    .addSelect("club.banner_image", "backimage")
    .addSelect("club.description", "description")
    .where("club.club_id = :id", { id: club_id })
    .getRawOne();
  }

  public findClubRecruitments(club_id: number): Promise<Club> {
    return this.createQueryBuilder("club")
    .select("club.close_at")
    .addSelect("major.majorname")
    .leftJoin("club.majors", "major")
    .where("club.club_id = :club_id", { club_id })
    .getOne();
  }

  public findClubStatus(club_id: number): Promise<Club> {
    return this.createQueryBuilder("club")
    .select("club.total_budget")
    .addSelect("club.current_budget")
    .where("club.club_id = :club_id", { club_id  })
    .getOne();
  }
}