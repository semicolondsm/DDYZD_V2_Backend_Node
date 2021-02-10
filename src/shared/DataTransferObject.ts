import Joi from "joi";
import { User } from "../entity/model";
import { ClubUserView } from "../entity/view/ClubUserView";

export class ClubListResObj {
  clubid: number;
  clubname: string;
  clubdescription: string;
  clubimage: string;
  clubtag: string | string[];
}

export class ClubInfoResObj {
  clubid: number;
  clubname: string;
  clubtag?: string[];
  clubimage: string;
  backimage: string;
  description: string;
}

export class UserTokenResOhj {
  access_token: string;
  refresh_token?: string;
}

export class UserInfoResObj extends User {
  clubs: ClubUserView[];
}

export class ModifyUserInfoDto {
  git?: string;
  email?: string;
}

export const ModifyUserInfoSchema: Joi.ObjectSchema<ModifyUserInfoDto> = Joi.object().keys({
  git: Joi.string().optional(),
  email: Joi.string().optional(),
});