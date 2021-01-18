import { PrimaryGeneratedColumn } from "typeorm";

export abstract class EntityWithIdColumn {
  @PrimaryGeneratedColumn()
  id: number;
}