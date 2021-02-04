import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { User } from "../entity/model";
import { ClubUserView } from "../entity/view/ClubUserView";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { BadRequestError, UnAuthorizedTokenError } from "../shared/exception";
import { getUserInfoWithDsmAuth, issuanceToken } from "./function/userAuthentication";

const provideToken: BusinessLogic = async (req, res, next) => {
  const token: string = req.headers["access-token"] as string;
  if(!token) {
    return next(new BadRequestError());
  }
  const userInfo = await getUserInfoWithDsmAuth(token);
  const checkExistUser: User = await UserRepository.getQueryRepository().findUserByUniqueEmail(userInfo.email);
  const authenticatedUser: User = checkExistUser ? 
  checkExistUser : await UserRepository.getQueryRepository().createDefaultUser(userInfo);
  return res.status(200).json({
    "access_token": await issuanceToken(authenticatedUser.user_id, "access"),
    "refresh_token": await issuanceToken(authenticatedUser.user_id, "refresh"),
  });
}

const refreshToken: BusinessLogic = async (req, res, next) => {
  const accessToken: string = await issuanceToken(+req.decoded.sub, "access");
  res.status(200).json({
    "access_token": accessToken,
  });
}

const showUserInfo: BusinessLogic = async (req, res, next) => {
  const user: User = await UserRepository.getQueryRepository().findUserByClassIdentity(req.params.user_gcn);
  const clubs: ClubUserView[] = await ClubUserViewRepository.getQueryRepository().findUsersClub(req.params.user_gcn);
  if(!user) {
    return next(new BadRequestError());
  }
  delete user.device_token;
  res.status(200).json({ ... user, clubs, });
}

const deviceToken: BusinessLogic = async (req, res, next) => {
  const token: string = req.get("device-token");
  if(!token || typeof token !== "string") {
    return next(new BadRequestError());
  }
  const splitToken = token.split(" ");
  if(splitToken[0] !== "Bearer") {
    return next(new UnAuthorizedTokenError());
  }
  await UserRepository.getQueryRepository().deviceToken(+req.decoded.sub, splitToken[1]);
  res.status(200).json({ message: "Device token inserted" });
}

export { 
  provideToken,
  refreshToken,
  showUserInfo,
  modifyUserInfo,
  deviceToken,
}