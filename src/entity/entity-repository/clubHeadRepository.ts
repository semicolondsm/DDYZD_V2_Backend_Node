import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ClubHead } from "../model";

@EntityRepository(ClubHead) 
export class ClubHeadRepository extends Repository<ClubHead> {
  static getQueryRepository() {
    return getCustomRepository(ClubHeadRepository);
  }
}