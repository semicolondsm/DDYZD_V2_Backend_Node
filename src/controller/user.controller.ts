import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { UserService } from "../service/user.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { UserTokenResOhj } from "../shared/DataTransferObject";

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

  public refreshToken: BusinessLogic = async (req, res, next) => {
    const response: UserTokenResOhj = await this.userService.refreshToken(+req.decoded.sub);
    res.status(200).json(response);
  }

  public showUserInfo: BusinessLogic = async (req, res, next) => {
    const response = await this.userService.showUserInfo(req.params.user_gcn);
    res.status(200).json(response);
  }

  public modifyUserInfo: BusinessLogic = async (req, res, next) => {
    const response = await this.userService.modifyUserInfo(req.body, +req.decoded.sub);
    res.status(200).json(response);
  }

  public deviceToken: BusinessLogic = async (req, res, next) => {
    const token: string = req.get("device-token");
    const response = await this.userService.deviceToken(token, +req.decoded.sub);
    res.status(200).json(response);
  }
}