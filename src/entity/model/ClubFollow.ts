import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from "./User";

@Entity("club_follow")
export class ClubFollow extends EntityWithIdColumn{
  @ManyToOne(() => User, user => user.followings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Club, club => club.followers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "club_id" })
  club: Club;
}