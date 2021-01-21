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
  const authenticatedUser: User = await UserRepository.getQueryRepository()
  .findOrCreateUser(userInfo);
  const accessToken: string = await issuanceToken(authenticatedUser.user_id, "access");
  const refreshToken: string = await issuanceToken(authenticatedUser.user_id, "refresh");
  return res.status(200).json({
    "access-token": accessToken,
    "refresh-token": refreshToken,
  });
}

export { 
  provideToken,
}