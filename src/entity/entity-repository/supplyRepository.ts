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

  public findOneSupplyWithClubWithUser(supply_id: number): Promise<Supply> {
    return this.createQueryBuilder("supply")
    .select("supply.id")
    .addSelect("supply.price")
    .addSelect("supply.count")
    .addSelect("club.club_id")
    .addSelect("club.current_budget")
    .addSelect("user.user_id")
    .leftJoin("supply.club", "club")
    .leftJoin("supply.user", "user")
    .where("supply.id = :id", { id: supply_id })
    .getOne();
  }
}