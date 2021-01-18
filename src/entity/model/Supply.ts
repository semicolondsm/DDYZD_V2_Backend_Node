import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from './User';
import { Option } from './Option';

@Entity("supply")
export class Supply extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column()
  price: number;

  @Column()
  status: number;

  @Column({ type: "varchar", length: 45, nullable: true })
  message: string;

  @Column()
  count: number;

  @Column()
  link: string;

  @Column({ type: "varchar", length: 45, nullable: true })
  invoice: string;

  @OneToMany(() => Option, option => option.supply)
  options: Option[];

  @ManyToOne(() => Club, club => club.supplies)
  @JoinColumn({ name: "club_id" })
  club: Club;

  @ManyToOne(() => User, user => user.supplies)
  @JoinColumn({ name: "user_id" })
  user: User;
}