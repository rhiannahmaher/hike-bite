import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserLogSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const TrailSpec = {
  title: Joi.string().required(),
};

export const StopSpec = {
  title: Joi.string().required(),
  type: Joi.string().required(),
  hours: Joi.string() 
};