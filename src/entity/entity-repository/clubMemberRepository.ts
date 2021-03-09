import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubMember } from "../model";

@EntityRepository(ClubMember)
export class ClubMemberRepository extends Repository<ClubMember> {
  static getQueryRepository() {
    return getCustomRepository(ClubMemberRepository);
  }

  public async checkIsClubMember(club_id: number, user_id: number): Promise<boolean> {
    const member: ClubMember = await this.createQueryBuilder("member")
    .where("member.club_id = :club_id", { club_id })
    .andWhere("member.user_id = :user_id", { user_id })
    .getOne();
    return !!member;
  }
}