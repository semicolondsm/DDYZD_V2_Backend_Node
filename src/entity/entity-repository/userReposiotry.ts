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
    return this.createQueryBuilder()
    .where("user.gcn = :gcn")
    .setParameter("gcn", gcn)
    .getOne();
  }

  public async findOrCreateUser(user: Partial<User>): Promise<User> {
    const existUser: User = await this.createQueryBuilder("user")
    .where("user.name = :name", { name: user.name })
    .andWhere("user.gcn = :gcn", { gcn: user.gcn })
    .andWhere("user.email = email", { email: user.email })
    .getOne();
    if(existUser) {
      return existUser;
    } else {
      return this.createDefaultUser(user);
    }
   }
}