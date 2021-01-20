import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClubFollow } from './ClubFollow';
import { Application } from './Application';
import { ClubHead } from "./ClubHead";
import { Room } from "./Room";
import { FeedFlag } from './FeedFlag';
import { Supply } from "./Supply";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 5 })
  gcn: string;

  @Column({ type: "varchar", nullable: true })
  image_path?: string;

  @Column({ type: "varchar", nullable: true })
  github_url?: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 4096, nullable: true })
  device_token: string;

  @OneToMany(() => ClubFollow, clubFollow => clubFollow.user)
  followings: ClubFollow[];

  @OneToMany(() => Application, application => application.user)
  applications: Application[];

  @OneToMany(() => ClubHead, clubHead => clubHead.user)
  heads: ClubHead[];

  @OneToMany(() => Room, room => room.user)
  rooms: Room[];

  @OneToMany(() => FeedFlag, feedFlag => feedFlag.user)
  flags: FeedFlag[];

  @OneToMany(() => Supply, supply => supply.user)
  supplies: Supply[];
}