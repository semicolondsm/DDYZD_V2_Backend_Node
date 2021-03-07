import jwt from "jsonwebtoken";
import { config } from "../config";
import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { TokenPayload } from "../shared/TokenPayloadInterface";

const verifyTokenOrDone: BusinessLogic = (req, res, next) => {
  if(req.headers["authorization"]) {
    try {
      const payload: TokenPayload = jwt.verify(req.headers["authorization"].slice(7), config.jwtSecret) as TokenPayload;
      req.decoded = payload;
      next();
    } catch(err) {
      next(); 
    }
  } else {
    next();
  }
}

export { verifyTokenOrDone }