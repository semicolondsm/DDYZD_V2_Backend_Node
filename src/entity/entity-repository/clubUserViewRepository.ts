import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubUserView } from "../view/ClubUserView";

@EntityRepository(ClubUserView)
export class ClubUserViewRepository extends Repository<ClubUserView> {
  static getQueryRepository() {
    return getCustomRepository(ClubUserViewRepository);
  }

  public findUsersClub(gcn: string) {
    return this.createQueryBuilder("view")
    .select("view.club_name")
    .addSelect("view.club_id")
    .where("view.gcn = :gcn", { gcn })
    .andWhere("view.result = 1")
    .getMany();
  }
}