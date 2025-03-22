import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

  export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
  }).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const StopSpec = Joi.object()
  .keys({
    title: Joi.string().example("The Bumble Bee Bakery").required(),
    type: Joi.string().example("bakery").required(),
    hours: Joi.string().example("09:00 - 16:00").optional(),
    latitude: Joi.number().example(50).required(),
    longitude: Joi.number().allow("").example(50).required(),
    trailid: IdSpec
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