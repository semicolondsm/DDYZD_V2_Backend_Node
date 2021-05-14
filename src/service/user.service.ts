import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { ActivityDetailRepository } from "../entity/entity-repository/ActivityDetailRepository";
import { User } from "../entity/model";
import { ClubUserView } from "../entity/view";
import { ModifyUserBiodDto, ModifyUserGitHubIdDto, UserActivitiesResObj, UserInfoResObj, UserTokenResOhj } from "../shared/DataTransferObject";
import { BadRequestError, UnAuthorizedTokenError, HttpError } from "../shared/exception";
import { config } from "../config";
import { Octokit } from "@octokit/core";
import axios, { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

export class UserService {
  constructor(
    private clubUserViewRepository: ClubUserViewRepository,
    private userRepository: UserRepository,
    private activityDetailRepository: ActivityDetailRepository
  ) {}

  public async provideToken(token: string): Promise<UserTokenResOhj> {
    if(!token) {
      throw new BadRequestError();
    }
    const userInfo = await this.getUserInfoWithDsmAuth(token);
    const checkExistUser: User = await this.userRepository.findUserByUniqueEmail(userInfo.email);
    const authenticatedUser: User = checkExistUser ? 
    checkExistUser : await this.userRepository.createDefaultUser(userInfo);
    return {
      "access_token": await this.issuanceToken(authenticatedUser.id, "access"),
      "refresh_token": await this.issuanceToken(authenticatedUser.id, "refresh"),
    };
  }

  public async refreshToken(user_id: number, refreshToken: string): Promise<UserTokenResOhj> {
    const accessToken: string = await this.issuanceToken(user_id, "access");
    return {
      "access_token": accessToken,
      "refresh_token": refreshToken,
    };
  }

  public async proviceTokenWithCode(code: string) {
    const token: string = await this.getUserToken(code);
    const userInfo = await this.getUserInfoWithDsmAuth(`Bearer ${token}`);
    const checkExistUser: User = await this.userRepository.findUserByUniqueEmail(userInfo.email);
    const authenticatedUser: User = checkExistUser ? 
    checkExistUser : await this.userRepository.createDefaultUser(userInfo);
    return {
      "access_token": await this.issuanceToken(authenticatedUser.id, "access"),
      "refresh_token": await this.issuanceToken(authenticatedUser.id, "refresh"),
    };
  }

  public async showUserGcn(user_id: number): Promise<string> {
    const user: User = await this.userRepository.findOneOnlyGcn(user_id);
    if(!user) {
      throw new BadRequestError();
    }
    return user.gcn;
  }
  
  public async showUserInfo(gcn: string): Promise<UserInfoResObj> {
    const user: User = await this.userRepository.findUserByClassIdentity(gcn);
    const clubs: ClubUserView[] = await this.clubUserViewRepository.findUsersClub(gcn);
    if(!user) {
      throw new BadRequestError();
    }
    delete user.device_token;
    return { ... user, clubs, };
  }

  public async modifyUserGithubId(data: ModifyUserGitHubIdDto, user_id: number) {
    try {
      const profile: string = await this.getGitHubProfile(data.git);
      await this.userRepository.putUserGitHubId(data.git, user_id);
      await this.userRepository.putUserProfile(profile, user_id);
    } catch(err) {
      throw new BadRequestError(err.message);
    }
  }

  public async modifyUserBio(data: ModifyUserBiodDto, user_id: number) {
    try {
      await this.userRepository.putUserBio(data.bio, user_id);
    } catch(err) {
      throw new BadRequestError(err.message);
    }
  }
  
  public async deviceToken(token: string, user_id: number) {
    if(!token || typeof token !== "string") {
      throw new BadRequestError();
    }
    const splitToken = token.split(" ");
    if(splitToken[0] !== "Bearer") {
      throw new UnAuthorizedTokenError();
    }
    await this.userRepository.deviceToken(user_id, splitToken[1]);
  }

  public showUserActivities(user_id: number): Promise<UserActivitiesResObj[]> {
    return this.activityDetailRepository.getUserActivities(user_id);
  }

  private async issuanceToken(user_id: number, type: string): Promise<string> {
    return jwt.sign({
      sub: `${user_id}`,
      type: type,
    }, config.jwtSecret, {
      algorithm: "HS256",
      expiresIn: type === "access" ? "2h" : "14d",
    });
  }

  private async getUserToken(code: string): Promise<string> {
    try {
      const response = await axios.post(`${config.dsmAuthUrl}/dsmauth/token`, {
        client_id: config.dsmAuthClientId,
        client_secret: config.dsmAuthClientSecret,
        code,
      });
      return response.data["access_token"];
    } catch(err) {
      throw new HttpError(err.response.status, err.response.data.message);
    }
  }

  private async getUserInfoWithDsmAuth(token: string): Promise<Partial<User>> {
    try {
      const response: AxiosResponse<Partial<User>> = await axios.get(`${config.dsmOpenApiUrl}/v1/info/basic`, {
        headers: {
          Authorization: token,
        }
      });
      return response.data;
    } catch(err) {
      throw new HttpError(err.response.status, err.response.data.message);
    }
  }

  private async getGitHubProfile(github_id: string): Promise<string> {
    const response = await this.octokit.request(`GET /users/${github_id}`);
    return response.data.avatar_url;   
  }

  private octokit = new Octokit({ auth: config.githubAccessToken });
}