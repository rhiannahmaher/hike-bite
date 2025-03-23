import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { TrailSpec, IdSpec, TrailSpecPlus, TrailArraySpec } from "../models/joi-schemas.js";import { validationError } from "./logger.js";

export const trailApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const trails = await db.trailStore.getAllTrails();
        return trails;
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Get all trailApi",
    notes: "Returns details of all trailApi",
    response: { schema: TrailArraySpec, failAction: validationError }
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No trail with this id");
        }
        return trail;
      } catch (err) {
        return Boom.serverUnavailable("No trail with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific trail",
    notes: "Returns trail details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError }
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const trail = request.payload;
        const newTrail = await db.trailStore.addTrail(trail);
        if (newTrail) {
          return h.response(newTrail).code(201);
        }
        return Boom.badImplementation("Error creating trail");
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Create a Trail",
    notes: "Returns the newly created trail",
    validate: { payload: TrailSpec, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError }
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const trail = await db.trailStore.getTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No Trail with this id");
        }
        await db.trailStore.deleteTrailById(trail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No trail with this id");
      }
    },
    tags: ["api"],
    description: "Delete a trail",
    validate: { params: { id: IdSpec }, failAction: validationError }
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.trailStore.deleteAllTrails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database error");
      }
    },
    tags: ["api"],
    description: "Delete all trailApi"
  }
};