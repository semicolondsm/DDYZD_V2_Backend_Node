import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubMember } from "../model";

@EntityRepository(ClubMember)
export class ClubMemberRepository extends Repository<ClubMember> {
  static getQueryRepository() {
    return getCustomRepository(ClubMemberRepository);
  }
}