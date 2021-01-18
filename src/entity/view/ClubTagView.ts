import { ViewColumn, ViewEntity } from "typeorm";
import { CustomViewEntityOption } from "./generation-view/ViewEntityOption";

const options: CustomViewEntityOption = new CustomViewEntityOption("club_tag_view", "asClubTagView.sql");

@ViewEntity(options)
export class ClubTagView {
  @ViewColumn()
  club_id: number;

  @ViewColumn()
  club_name: string;

  @ViewColumn()
  tag_name: string;
}
