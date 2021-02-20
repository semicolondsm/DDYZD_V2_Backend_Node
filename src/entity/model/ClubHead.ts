import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Club } from './Club';
import { User } from "./User";

@Entity("club_head")
export class ClubHead extends EntityWithIdColumn {
  @OneToOne(() => Club, club => club.head)
  @JoinColumn({ name: "club_id" })
  club: Club;

  @ManyToOne(() => User, user => user.heads)
  @JoinColumn({ name: "user_id" })
  user: User;
}