import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Club } from "./Club";
import { User } from "./User";

@Entity("club_follow")
export class ClubFollow {
  @PrimaryGeneratedColumn()
  follow_id: number;

  @ManyToOne(() => User, user => user.followings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Club, club => club.followers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "club_id" })
  club: Club;
}