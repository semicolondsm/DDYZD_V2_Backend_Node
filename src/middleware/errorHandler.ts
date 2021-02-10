import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { logger } from "../shared/logger";

export const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      logger.error(err.message);
      next(err);
    }
  }
}