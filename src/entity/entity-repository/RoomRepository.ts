import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Room } from "../model/Room";

@EntityRepository(Room) 
export class RoomRepository extends Repository<Room> {
  static getQueryRepository() {
    return getCustomRepository(RoomRepository);
  }
  
  public async changeRoomStatus(room: Room) {
    await this.queryRunner.startTransaction();
    try {
      await this.queryRunner.manager.save(room);
      await this.queryRunner.commitTransaction();
    } catch(err) {
      await this.queryRunner.rollbackTransaction();
    } finally {
      await this.queryRunner.release();
    }
  }
}