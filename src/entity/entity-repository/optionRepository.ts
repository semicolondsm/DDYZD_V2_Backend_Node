import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Option, Supply } from "../model";

@EntityRepository(Option) 
export class OptionsRepository extends Repository<Option> {
  static getQueryRepository() {
    return getCustomRepository(OptionsRepository)
  }

  public async createNewOption(script: string, supply: Supply) {
    const newOption: Option = this.create({ script, supply });
    this.manager.save(newOption);
    await this.manager.save(newOption);
  }
}