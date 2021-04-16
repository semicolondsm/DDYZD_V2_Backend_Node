import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Club } from "../model";
import { Room } from "../model/Room";

@EntityRepository(Room) 
export class RoomRepository extends Repository<Room> {
  static getQueryRepository() {
    return getCustomRepository(RoomRepository);
  }
}