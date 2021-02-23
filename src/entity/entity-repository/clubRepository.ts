import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubInfoResObj } from "../../shared/DataTransferObject";
import { Club, Supply } from "../model";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  static getQueryRepository() {
    return getCustomRepository(ClubRepository);
  }

  public findClubRecruitments(club_id: number): Promise<Club> {
    return this.createQueryBuilder("club")
    .select("club.close_at")
    .addSelect("club.start_at")
    .addSelect("major.major_name")
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

  public async findClubSupplies(club_id: number): Promise<Supply[]> {
    const club: Club = await this.createQueryBuilder("club")
    .select("club.club_id")
    .leftJoinAndSelect("club.supplies", "supplies")
    .where("club.club_id = :club_id", { club_id })
    .getOne();
    return club.supplies;
  }
}