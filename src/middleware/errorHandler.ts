import { BusinessLogic } from "../shared/BusinessLogicInterface";
import { HttpError, InternalServerError } from "../shared/exception";

export const errorHandler = (myFunc: BusinessLogic): BusinessLogic => {
  return async (req, res, next) => {
    try {
      await myFunc(req, res, next);
    } catch(err) {
      console.log(err);
      if(err instanceof HttpError) {
        next(err);
      } else {
        next(new InternalServerError());
      }
    }
  }
}