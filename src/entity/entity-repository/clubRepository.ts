import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Club } from "../model";

@EntityRepository(Club)
export class ClubRepository extends Repository<Club> {
  static getQueryRepository() {
    return getCustomRepository(ClubRepository);
  }
}