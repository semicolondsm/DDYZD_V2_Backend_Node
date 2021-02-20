import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Room } from "./Room";

@Entity("chat")
export class Chat extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 512 })
  msg: string;

  @CreateDateColumn({ type: "datetime" })
  created_at: Date;

  @Column({ type: "enum", nullable: true, enum: ["U", "C", "H"]})
  user_type: "U" | "C" | "H";

  @ManyToOne(() => Room, room => room.chats)
  @JoinColumn({ name: "room_id" })
  room: Room;
}
