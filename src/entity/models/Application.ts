import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Club } from './Club';

@Entity("application")
export class Application {
  @PrimaryGeneratedColumn()
  application_id: number;

  @Column({ type: "tinyint", nullable: true })
  result?: number;

  @ManyToOne(() => User, user => user.applications)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Club, club => club.applications)
  @JoinColumn({ name: "club_id" })
  club: Club;
}