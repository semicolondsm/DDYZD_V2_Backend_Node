import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { FeedFlag } from "./FeedFlag";
import { FeedMedium } from './FeedMedium';

@Entity("feed")
export class Feed extends EntityWithIdColumn {
  @Column("text")
  contents: string;

  @Column({ type: "tinyint", nullable: true })
  pin?: number;

  @Column({ nullable: true, default: 0 })
  flag?: number;

  @Column({ type: "datetime", nullable: true, default: null })
  upload_at: Date;

  @OneToMany(() => FeedFlag, feedFlag => feedFlag.feed)
  flags: FeedFlag[];

  @OneToMany(() => FeedMedium, feed_medium => feed_medium.feed)
  media: FeedMedium[];

  @ManyToOne(() => Club, club => club.feeds) 
  @JoinColumn({ name: "club_id" })
  club: Club;
}