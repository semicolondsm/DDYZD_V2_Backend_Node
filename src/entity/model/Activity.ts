import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("activity")
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity: string;
}