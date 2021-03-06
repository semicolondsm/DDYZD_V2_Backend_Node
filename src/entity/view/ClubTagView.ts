import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Club } from "../model";

@ViewEntity({
  name: "club_tag_view",
  expression: (connection: Connection) => connection.createQueryBuilder(Club, "club")
  .select("club.id", "id")
  .addSelect("club.name", "name")
  .addSelect("club.description", "description")
  .addSelect("club.profile_image", "club_image")
  .addSelect("tag.title", "tag_name")
  .addSelect("club.banner_image", "club_banner")
  .leftJoin("club.clubHasTags", "clubHasTag")
  .leftJoin("clubHasTag.tag", "tag")
})
export class ClubTagView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  club_image: string;

  @ViewColumn()
  club_banner: string;

  @ViewColumn()
  tag_name: string;
}
