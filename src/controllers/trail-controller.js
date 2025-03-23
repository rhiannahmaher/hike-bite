import { db } from "../models/db.js";
import { StopSpec } from "../models/joi-schemas.js";

export const trailController = {
  index: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const viewData = {
        title: "Trail",
        trail: trail,
      };
      return h.view("trail-view", viewData);
    }
  },

  addStop: {
    validate: {
      payload: StopSpec,
      options: { abortEarly: false },
      failAction: function(request, h, error) {
        return h.view("trail-view", { title: "Stop error", errors: error.details, }).takeover().code(400);
      }
    },
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const newStop = {
        title: request.payload.title,
        type: request.payload.type.charAt(0).toUpperCase() + request.payload.type.slice(1).toLowerCase(), // Capitalises first letter for stop types
        hours: request.payload.hours,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude
      };
      await db.stopStore.addStop(trail._id, newStop);
      return h.redirect(`/trail/${trail._id}`);
    }
  },

  deleteStop: {
    handler: async function(request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      await db.stopStore.deleteStop(request.params.stopid);
      return h.redirect(`/trail/${trail._id}`);
    }
  }
}