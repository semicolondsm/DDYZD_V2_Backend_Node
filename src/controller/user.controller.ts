import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { UserService } from "../service/user.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { UserInfoResObj, UserTokenResOhj } from "../shared/DataTransferObject";

export class UserController {
  private userService: UserService = new UserService(
    ClubUserViewRepository.getQueryRepository(),
    UserRepository.getQueryRepository()
  );

  public provideToken: BusinessLogic = async (req, res, next) => {
    const token: string = req.headers["access-token"] as string;
    const response: UserTokenResOhj = await this.userService.provideToken(token);
    res.status(200).json(response);
  }

  public proviceTokenWithCode: BusinessLogic = async (req, res, next) => {
    const response: UserTokenResOhj = await this.userService.proviceTokenWithCode(req.body.code);
    res.status(200).json(response);
  }

  public refreshToken: BusinessLogic = async (req, res, next) => {
    const refreshToken: string = req.headers["refresh-token"] as string;
    const response: UserTokenResOhj = await this.userService.refreshToken(+req.decoded.sub, refreshToken.slice(7));
    res.status(200).json(response);
  }

  public showUserGcn: BusinessLogic = async (req, res, next) => {
    const gcn: string = await this.userService.showUserGcn(+req.decoded.sub);
    res.status(200).json({ gcn });
  }

  public showUserInfo: BusinessLogic = async (req, res, next) => {
    const response: UserInfoResObj = await this.userService.showUserInfo(req.params.user_gcn);
    res.status(200).json(response);
  }

  public modifyUserGithubId: BusinessLogic = async (req, res, next) => {
    await this.userService.modifyUserGithubId(req.body, +req.decoded.sub);
    res.status(200).json({ msg: "Profile modify success" });
  }

  public deviceToken: BusinessLogic = async (req, res, next) => {
    const token: string = req.get("device-token");
    await this.userService.deviceToken(token, +req.decoded.sub);
    res.status(200).json({ message: "Device token inserted" });
  }
}