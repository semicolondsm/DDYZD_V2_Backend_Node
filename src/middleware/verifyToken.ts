import jwt from "jsonwebtoken";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { errorHandler } from './errorHandler';
import { TokenPayload } from './../shared/TokenPayloadInterface';
import { config } from "../config";
import { BadRequestError, ExpiredTokenError, UnAuthorizedTokenError } from "../shared/exception";

const verifyTokenLogic: BusinessLogic = (req, res, next) => {
  try {
    const token: string = req.headers["authorization"];
    if(!token) {
      next(new BadRequestError());
    }
    const payload: TokenPayload = jwt.verify(token, config.jwtSecret) as TokenPayload;
    if(payload.type !== "access") {
      next(new UnAuthorizedTokenError());
    }
    req.decoded = payload;
    next();
  } catch(err) {
    if(err.message === "TokenExpiredError") {
      next(new ExpiredTokenError());
    } else {
      next(new UnAuthorizedTokenError());
    }
  }
}

const verifyTokenMiddleware: BusinessLogic = errorHandler(verifyTokenLogic);
export { verifyTokenMiddleware }