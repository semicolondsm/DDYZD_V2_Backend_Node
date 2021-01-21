import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../model";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  static getQueryRepository() {
    return getCustomRepository(UserRepository);
  }

  public async createDefaultUser(user: Partial<User>): Promise<User> {
    const newUser: User = new User();
    newUser.gcn = user.gcn;
    newUser.email = user.email;
    newUser.name = user.name;
    return this.manager.save(newUser);
  }

  public findUserByClassIdentity(gcn: string): Promise<User> {
    return this.createQueryBuilder("user")
    .where("user.gcn = :gcn")
    .setParameter("gcn", gcn)
    .getOne();
  }

  public findUserByUniqueEmail(email: string): Promise<User> {
    return this.createQueryBuilder("user")
    .where("user.email = :email")
    .setParameter("email", email)
    .getOne();
  }
}