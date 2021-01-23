import { ViewColumn, ViewEntity } from "typeorm";
import { CustomViewEntityOption } from "./generation-view/ViewEntityOption";

const options: CustomViewEntityOption = new CustomViewEntityOption("club_tag_view", "asClubTagView.sql");

@ViewEntity(options)
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
  tag_name: string;
}
