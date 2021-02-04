import { ViewColumn, ViewEntity } from "typeorm";
import { CustomViewEntityOption } from "./generation-view/ViewEntityOption";

const options: CustomViewEntityOption = new CustomViewEntityOption("club_user_view", "asClubUserView.sql");

@ViewEntity(options)
export class ClubUserView {
  @ViewColumn()
  club_id: number;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  club_name: string;

  @ViewColumn()
  user_name: string;

  @ViewColumn()
  gcn: string;

  @ViewColumn()
  result: number;
}