import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubMemberResObj } from "../../shared/DataTransferObject";
import { ClubUserView } from "../view";

@EntityRepository(ClubUserView)
export class ClubUserViewRepository extends Repository<ClubUserView> {
  static getQueryRepository() {
    return getCustomRepository(ClubUserViewRepository);
  }

  public findUsersClub(gcn: string): Promise<ClubUserView[]> {
    return this.createQueryBuilder("view")
    .select("view.club_name")
    .addSelect("view.club_id")
    .where("view.gcn = :gcn", { gcn })
    .andWhere("view.result = 1")
    .getMany();
  }

  public findClubsMember(club_id: number): Promise<ClubMemberResObj[]> {
    return this.createQueryBuilder("view")
    .select("view.user_name")
    .addSelect("view.profile_image")
    .addSelect("view.git")
    .addSelect("view.gcn")
    .where("view.club_id = :club_id", { club_id })
    .andWhere("view.result = 1")
    .getMany();
  }
}