import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../model";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  static getQueryRepository() {
    return getCustomRepository(UserRepository);
  }

  public findUserByClassIdentity(gcn: string): Promise<User> {
    return this.createQueryBuilder()
    .where("user.gcn = :gcn")
    .setParameter("gcn", gcn)
    .getOne();
  }
}