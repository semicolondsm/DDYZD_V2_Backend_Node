import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { User } from "../entity/model";
import { ClubUserView } from "../entity/view/ClubUserView";
import { ModifyUserInfoSchema, UserTokenResOhj } from "../shared/DataTransferObject";
import { BadRequestError, UnAuthorizedTokenError } from "../shared/exception";
import { getUserInfoWithDsmAuth, issuanceToken } from "./function/userAuthentication";
import { ModifyUserInfoDto } from './../shared/DataTransferObject';

export class UserService {
  constructor(
    private clubUserViewRepository: ClubUserViewRepository,
    private userRepository: UserRepository,
  ) {}

  public async provideToken(token: string): Promise<UserTokenResOhj> {
    if(!token) {
      throw new BadRequestError();
    }
    const userInfo = await getUserInfoWithDsmAuth(token);
    const checkExistUser: User = await this.userRepository.findUserByUniqueEmail(userInfo.email);
    const authenticatedUser: User = checkExistUser ? 
    checkExistUser : await this.userRepository.createDefaultUser(userInfo);
    return {
      "access_token": await issuanceToken(authenticatedUser.user_id, "access"),
      "refresh_token": await issuanceToken(authenticatedUser.user_id, "refresh"),
    };
  }

  public async refreshToken(user_id: number): Promise<UserTokenResOhj> {
    const accessToken: string = await issuanceToken(user_id, "access");
    return {
      "access_token": accessToken,
    };
  }
  
  public async showUserInfo(gcn: string) {
    const user: User = await this.userRepository.findUserByClassIdentity(gcn);
    const clubs: ClubUserView[] = await this.clubUserViewRepository.findUsersClub(gcn);
    if(!user) {
      throw new BadRequestError();
    }
    delete user.device_token;
    return { ... user, clubs, };
  }
  
  public async modifyUserInfo(data: ModifyUserInfoDto, user_id: number) {
    const { error, value } = ModifyUserInfoSchema.validate(data);
    if(error) {
      throw new BadRequestError();
    }
    const modifiedUser: User = await this.userRepository.putUserData(user_id, value);
    if(!modifiedUser) {
      throw new UnAuthorizedTokenError();
    }
    return { msg: "Profile modify success" };
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
    return { message: "Device token inserted" };
  }
}