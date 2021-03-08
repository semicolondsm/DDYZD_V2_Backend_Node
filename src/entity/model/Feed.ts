import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn  } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { FeedFlag } from "./FeedFlag";
import { FeedMedium } from "./FeedMedium";

@Entity("feed")
export class Feed extends EntityWithIdColumn {
    @Column({ type: "varchar", length: 4001, name: "contents" })
    content: string;

    @Column({ type: "tinyint" })
    pin: boolean;

    @CreateDateColumn({ name: "upload_at" })
    upload_at: Date;

    @ManyToOne(() => Club, club => club.feeds)
    @JoinColumn({ name: "club_id" })
    club: Club;

    @OneToMany(() => FeedMedium, feed_medium => feed_medium.feed) 
    feed_media: FeedMedium[];

    @OneToMany(() => FeedFlag, flag => flag.feed)
    flags: FeedFlag[];
}
