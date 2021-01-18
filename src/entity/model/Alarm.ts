import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity("alarm")
export class Alarm extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  title: string;

  @Column("datetime")
  alarmtime: Date;

  @Column({ nullable: true })
  content?: string;

  @ManyToOne(() => Club, club => club.alarms)
  @JoinColumn({ name: "club_id" })
  club: Club;
}