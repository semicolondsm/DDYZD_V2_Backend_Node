import Joi from "joi";
import { User } from "../entity/model";
import { ClubUserView } from "../entity/view";

export class ClubListResObj {
  clubid: number;
  clubname: string;
  clubdescription: string;
  clubimage: string;
  clubbanner: string;
  clubtag: string | string[];
  clubrecruitment: boolean;
}

export class ClubDefaultInfoObj {
  clubid: number;
  clubname: string;
  clubtag?: string[];
  clubimage: string;
  backimage: string;
  description: string;
  recruitment: boolean;
  recruitment_close?: Date;
}

export class ClubInfoResObj extends ClubDefaultInfoObj {
  owner: boolean;
  follow: boolean;
}

export class ClubRecruitmentInfoResObj {
  major: string[];
  closeat: Date;
  startat: Date;
}

export class ClubMemberResObj {
  user_id?: number;
  user_name: string;
  profile_image: string;
  gcn: string;
  git: string;
}

export class UserTokenResOhj {
  access_token: string;
  refresh_token: string;
}

export class UserInfoResObj extends User {
  clubs: ClubUserView[];
}

export class UserActivitiesResObj {
  activity: string;
  date: Date;
  club_name: string;
  club_image: string;
  club_id: number;
}

export class ClubImagesResObj {
  name: string;
  image: string;
  profile: string;
}

export class FeedListResObj {
  feedId: number;
	clubName: string;
	profileImage: string;
	uploadAt: Date;
	content: string;
  media: string[]
	flags: number;
	owner: boolean;
	flag: boolean;
	follow: boolean;
}

export class SupplyClubItemDto {
  price: number;
  name: string;
  count: number
  option?: string;
  url: string;
}

export class ModifyClubSuppliesDto {
  count?: number;
  price?: number;
}

export class ProvideUserTokenDto {
  code: string;
}

export class ModifyUserGitHubIdDto {
  git: string;
}

export class ModifyUserBiodDto {
  bio: string;
}

export const SupplyClubItemSchema: Joi.ObjectSchema<SupplyClubItemDto> = Joi.object().keys({
  price: Joi.number().required(),
  name: Joi.string().required(),
  count: Joi.number().required().default(1),
  option: Joi.string().optional(),
  url: Joi.string().required(),
});

export const ModifyClubSuppliesSchema: Joi.ObjectSchema<ModifyClubSuppliesDto> = Joi.object().keys({
  count: Joi.number().optional(),
  price: Joi.number().optional(),
});

export const ProvideUserTokenSchema: Joi.ObjectSchema<ProvideUserTokenDto> = Joi.object().keys({
  code: Joi.string().required(),
});

export const ModifyUserGitHubIdSchema: Joi.ObjectSchema<ModifyUserGitHubIdDto> = Joi.object().keys({
  git: Joi.string().required(),
});

export const ModifyUserBioSchema: Joi.ObjectSchema<ModifyUserBiodDto> = Joi.object().keys({
  bio: Joi.string().required(),
});