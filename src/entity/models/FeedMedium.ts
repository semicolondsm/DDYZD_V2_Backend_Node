import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Feed } from './Feed';

@Entity("feed_medium")
export class FeedMedium extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  medium_path: string;

  @ManyToOne(() => Feed, feed => feed.media)
  @JoinColumn({ name: "feed_id" })
  feed: Feed;
}