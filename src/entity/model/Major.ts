import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity("major")
export class Major extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  major_name: string;

  @ManyToOne(() => Club, club => club.majors) 
  @JoinColumn({ name: "club_id" })
  club: Club;
}