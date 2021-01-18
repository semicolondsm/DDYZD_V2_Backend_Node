import { Column, Entity, OneToMany } from "typeorm";
import { ClubHasTag } from "./ClubHasTag";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity("tag") 
export class Tag extends EntityWithIdColumn {
  @Column({ type: "varchar", length: 45 })
  title: string;
  
  @OneToMany(() => ClubHasTag, clubHasTag => clubHasTag.tag)
  clubHasTags: ClubHasTag[];
}