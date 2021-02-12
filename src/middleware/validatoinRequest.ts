import Joi from "joi"
import { BusinessLogic } from "../shared/BusinessLogicInterface"
import { BadRequestError } from "../shared/exception";

type ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => BusinessLogic;

const validationRequest: ValidationRequest = <T>(schema: Joi.ObjectSchema<T>) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  error ? next(new BadRequestError()) : next();
}

export { validationRequest }