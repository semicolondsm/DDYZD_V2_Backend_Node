import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { SupplyClubItemDto } from "../../shared/DataTransferObject";
import { Club, Supply, User } from "../model";

@EntityRepository(Supply)
export class SupplyRepository extends Repository<Supply> {
  static getQueryRepository() {
    return getCustomRepository(SupplyRepository);
  }

  public async createNewSupply(club: Club, user: User, { price, name, count, url: link }: SupplyClubItemDto): Promise<Supply> {
    const newSupply: Supply = this.create({ club, user, price, name, count, link, status: 2 });
    return await this.manager.save(newSupply);
  }
}