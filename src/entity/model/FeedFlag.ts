import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Feed } from "./Feed";
import { User } from "./User";

@Entity("feed_flag")
export class FeedFlag extends EntityWithIdColumn {
  @ManyToOne(() => Feed, feed => feed.flags)
  @JoinColumn({ name: "feed_id" })
  feed: Feed;

  @ManyToOne(() => User, user => user.flags) 
  @JoinColumn({ name: "user_id" })
  user: User;
}