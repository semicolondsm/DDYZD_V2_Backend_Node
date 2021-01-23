import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubListResObj } from "../../shared/DataTransferObject";
import { ClubTagView } from "../view";

@EntityRepository(ClubTagView)
export class ClubTagViewRepository extends Repository<ClubTagView> {
  static getQueryRepository() {
    return getCustomRepository(ClubTagViewRepository);
  }

  public findAllClub(): Promise<ClubListResObj[]> {
    return this.createQueryBuilder("view")
    .select("view.id", "clubid")
    .addSelect("view.name", "clubname")
    .addSelect("view.description", "clubdescription")
    .addSelect("view.club_image", "clubimage")
    .addSelect("GROUP_CONCAT(view.tag_name)", "clubtag")
    .groupBy("view.id")
    .getRawMany();
  }
}