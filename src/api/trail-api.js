import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
  },
};