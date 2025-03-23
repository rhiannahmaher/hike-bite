
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, StopSpec, StopSpecPlus, StopArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const stopApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stops = await db.stopStore.getAllStops();
        return stops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: StopArraySpec, failAction: validationError },
    description: "Get all stopApi",
    notes: "Returns all stopApi"
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const stop = await db.stopStore.getStopById(request.params.id);
        if (!stop) {
          return Boom.notFound("No stop with this id");
        }
        return stop;
      } catch (err) {
        return Boom.serverUnavailable("No stop with this id");
      }
    },
    tags: ["api"],
    description: "Find a Stop",
    notes: "Returns a stop",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: StopSpecPlus, failAction: validationError }
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stop = await db.stopStore.addStop(request.params.id, request.payload);
        if (stop) {
          return h.response(stop).code(201);
        }
        return Boom.badImplementation("Error creating stop");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a stop",
    notes: "Returns the newly created stop",
    validate: { payload: StopSpec },
    response: { schema: StopSpecPlus, failAction: validationError }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.stopStore.deleteAllStops();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all stopApi"
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stop = await db.stopStore.getStopById(request.params.id);
        if (!stop) {
          return Boom.notFound("No stop with this id");
        }
        await db.stopStore.deleteStop(stop._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No stop with this id");
      }
    },
    tags: ["api"],
    description: "Delete a stop",
    validate: { params: { id: IdSpec }, failAction: validationError }
  },
};
