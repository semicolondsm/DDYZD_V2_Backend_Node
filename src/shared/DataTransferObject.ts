import Joi from "joi";

export class ClubListResObj {
  clubid: number;
  clubname: string;
  clubdescription: string;
  clubimage: string;
  clubtag: string | string[];
}

export class ModifyUserInfoDto {
  git?: string;
  email?: string;
}

export const ModifyUserInfoSchema: Joi.ObjectSchema<ModifyUserInfoDto> = Joi.object().keys({
  git: Joi.string().optional(),
  email: Joi.string().optional(),
});