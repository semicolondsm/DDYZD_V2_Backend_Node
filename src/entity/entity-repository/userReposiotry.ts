import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ModifyUserInfoDto } from "../../shared/DataTransferObject";
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

  public async putUserData(user_id: number, body: ModifyUserInfoDto): Promise<User> {
    const user: User = await this.findOne({ where: { user_id } });
    if(!user) {
      return null;
    } else {
      user.github_url = body.git ? body.git : user.github_url;
      user.email = body.email ? body.email : user.email;
      return this.manager.save(user);
    }
  }
}