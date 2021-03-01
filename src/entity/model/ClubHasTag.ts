import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { Tag } from "./Tag";

@Entity("club_has_tag")
export class ClubHasTag extends EntityWithIdColumn {
  @ManyToOne(() => Club, club => club.clubHasTags)
  @JoinColumn({ name: "club_id" })
  club: Club;

  @ManyToOne(() => Tag, tag => tag.clubHasTags)
  @JoinColumn({ name: "tag_id" })
  tag: Tag;
}