import { Column, Entity, OneToOne, OneToMany } from "typeorm";
import { Alarm } from "./Alarm";
import { ClubHasTag } from "./ClubHasTag";
import { Major } from "./Major";
import { ClubFollow } from './ClubFollow';
import { ClubMember } from "./ClubMember";
import { ClubHead } from "./ClubHead";
import { Supply } from "./Supply";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Feed } from "./Feed";

@Entity("club")
export class Club extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ default: 0 })
  total_budget: number;

  @Column({ default: 0 })
  current_budget: number;

  @Column({ type: "datetime", nullable: true })
  start_at?: Date;

  @Column({ type: "datetime", nullable: true })
  close_at?: Date;

  @Column({ nullable: true  })
  description: string;

  @Column()
  banner_image: string;

  @Column()
  profile_image: string;

  @Column({ nullable: true })
  hongbo_image: string;

  @OneToMany(() => Major, major => major.club)
  majors: Major[];

  @OneToMany(() => Alarm, alarm => alarm.club)
  alarms: Alarm[];
  
  @OneToMany(() => ClubHasTag, clubHasTag => clubHasTag.club)
  clubHasTags: ClubHasTag[];

  @OneToMany(() => ClubFollow, clubFollow => clubFollow.club)
  followers: ClubFollow[];

  @OneToMany(() => ClubMember, application => application.club)
  members: ClubMember[];

  @OneToOne(() => ClubHead, clubHead => clubHead.club)
  head: ClubHead;

  @OneToMany(() => Supply, supply => supply.club)
  supplies: Supply[];

  @OneToMany(() => Feed, feed => feed.club) 
  feeds: Feed[];
}