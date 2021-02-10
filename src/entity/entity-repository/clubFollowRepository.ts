import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Club, ClubFollow, User } from "../model";

@EntityRepository(ClubFollow)
export class ClubFollowRepository extends Repository<ClubFollow> {
  static getQueryRepository() {
    return getCustomRepository(ClubFollowRepository);
  }

  public createClubFollow(user: User, club: Club): Promise<ClubFollow> {
    const clubFollow = this.create({ user, club });
    return this.save(clubFollow);
  }

  public async deleteClubFollow(user: User, club: Club): Promise<void> {
    await this.delete({ user, club });
  }
}