import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { User } from "../entity/model";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { BadRequestError } from "../shared/exception";
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
    "access-token": await issuanceToken(authenticatedUser.user_id, "access"),
    "refresh-token": await issuanceToken(authenticatedUser.user_id, "refresh"),
  });
}

const refreshToken: BusinessLogic = async (req, res, next) => {
  const accessToken: string = await issuanceToken(req.decoded.subject, "access");
  res.status(200).json({
    "access-token": accessToken,
  });
}

const showUserInfo: BusinessLogic = async (req, res, next) => {
  const user: User = await UserRepository.getQueryRepository().findUserByClassIdentity(req.params.user_gcn);
  delete user.device_token;
  res.status(200).json(user);
}

export { 
  provideToken,
  refreshToken,
  showUserInfo
}