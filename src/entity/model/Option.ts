import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Supply } from './Supply';

@Entity("option")
export class Option extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  script: string;

  @ManyToOne(() => Supply, supply => supply.options)
  @JoinColumn({ name: "supply_id" })
  supply: Supply;
}