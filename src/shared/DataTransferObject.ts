import Joi from "joi";

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

export class ModifyUserInfoDto {
  git?: string;
  email?: string;
}

export const ModifyUserInfoSchema: Joi.ObjectSchema<ModifyUserInfoDto> = Joi.object().keys({
  git: Joi.string().optional(),
  email: Joi.string().optional(),
});