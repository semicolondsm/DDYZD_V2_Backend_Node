import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Feed } from "./Feed";
import { User } from "./User";

@Entity("feed_flag")
export class FeedFlag {
  @PrimaryGeneratedColumn()
  flag_id: number;

  @ManyToOne(() => Feed, feed => feed.flags)
  @JoinColumn({ name: "feed_id" })
  feed: Feed;

  @ManyToOne(() => User, user => user.flags)
  @JoinColumn({ name: "user_id" })
  user: User;
}