import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Feed } from "./Feed";

@Entity("feed_medium")
export class FeedMedium extends EntityWithIdColumn {
  @Column()
  medium_path: string;

  @ManyToOne(() => Feed, feed => feed.feed_media)
  @JoinColumn({ name: "feed_id" })
  feed: Feed;
}