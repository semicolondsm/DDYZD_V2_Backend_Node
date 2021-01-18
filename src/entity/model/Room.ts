import { Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from './User';
import { ClubHead } from './ClubHead';
import { Chat } from './Chat';

@Entity("room")
export class Room extends EntityWithIdColumn {
  @ManyToOne(() => User, user => user.rooms)
  @JoinColumn({ name: "user" })
  user: User;

  @ManyToOne(() => ClubHead, clubHead => clubHead.rooms)
  @JoinColumn({ name: "club_head_id" })
  clubHead: ClubHead;

  @OneToMany(() => Chat, chat => chat.room)
  chats: Chat[];
}