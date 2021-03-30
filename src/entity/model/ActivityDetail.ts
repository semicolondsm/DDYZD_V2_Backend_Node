import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Activity } from "./Activity";
import { Club } from "./Club";
import { User } from "./User";

@Entity("activity_details")
export class ActivityDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "date" })
  date: Date;

  @ManyToOne(type => Club)
  @JoinColumn({ name: "club_id" })
  club: Club;

  @ManyToOne(type => User) 
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(type => Activity)
  @JoinColumn({ name: "activity_id" })
  activity: Activity;
}