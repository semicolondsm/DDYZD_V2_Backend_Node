import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { HttpError, InternalServerError } from "../shared/exception";
import { logger } from "../shared/logger";

export const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      if(err instanceof HttpError) {
        logger.info(err.message);
        next(err);
      } else {
        console.log(err);
        logger.info(err.message);
        next(new InternalServerError());
      }
    }
  }
}