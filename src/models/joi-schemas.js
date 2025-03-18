import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserLogSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const StopSpec = Joi.object()
  .keys({
    title: Joi.string().example("The Bumble Bee Bakery").required(),
    type: Joi.string().example("bakery").required(),
    hours: Joi.string().example("09:00 - 16:00"). optional()
  })
  .label("Stop");

export const StopSpecPlus = StopSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("StopPlus");

export const StopArraySpec = Joi.array().items(StopSpecPlus).label("StopArray");

export const TrailSpec = Joi.object()
  .keys({
    title: Joi.string().example("Dingle Way").required(),
    userid: IdSpec,
    stops: StopArraySpec,
  })
  .label("Trail");

  export const TrailSpecPlus = TrailSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("TrailPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArray");