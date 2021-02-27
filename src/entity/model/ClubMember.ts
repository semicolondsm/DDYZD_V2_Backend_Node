import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Club } from './Club';
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity("club_member")
export class ClubMember extends EntityWithIdColumn {
  @ManyToOne(() => User, user => user.members)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Club, club => club.members)
  @JoinColumn({ name: "club_id" })
  club: Club;
}