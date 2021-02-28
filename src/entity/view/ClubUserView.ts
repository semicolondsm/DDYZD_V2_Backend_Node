import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Club } from "../model";

@ViewEntity({
  name: "club_user_view",
  expression: (connection: Connection) => connection.createQueryBuilder(Club, "club")
  .select("club.id", "club_id")
  .addSelect("club.name", "club_name")
  .addSelect("club.profile_image", "club_image")
  .addSelect("user.id", "user_id")
  .addSelect("user.name", "user_name")
  .addSelect("user.image_path", "profile_image")
  .addSelect("user.gcn", "gcn")
  .addSelect("user.github_url", "git")
  .leftJoin("club.members", "members")
  .leftJoin("members.user", "user")
})
export class ClubUserView {
  @ViewColumn()
  club_id: number;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  club_name: string;

  @ViewColumn()
  club_image: string;

  @ViewColumn()
  user_name: string;

  @ViewColumn()
  profile_image: string;

  @ViewColumn()
  git: string;

  @ViewColumn()
  gcn: string;
}