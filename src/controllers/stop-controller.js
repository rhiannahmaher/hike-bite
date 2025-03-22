
import { StopSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const stopController = {
  index: {
    handler: async function (request, h) {
      const trail = await db.trailStore.getTrailById(request.params.id);
      const stop = await db.stopStore.getStopById(request.params.stopid);
      const viewData = {
        title: "Edit Stop",
        trail: trail,
        stop: stop,
      };
      return h.view("stop-view", viewData);
    },
  },

  update: {
    validate: {
      payload: StopSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("stop-view", { title: "Edit stop error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const stop = await db.stopStore.getStopById(request.params.stopid);
      const newStop = {
        title: request.payload.title,
        type: request.payload.type,
        hours: request.payload.hours,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude)
      };
      await db.stopStore.updateStop(stop, newStop);
      return h.redirect(`/trail/${request.params.id}`);
    },
  },

  getStopsByType: {
    handler: async function (request, h) {
      const { trailId, type } = request.params;
      const stops = await db.stopStore.getStopsByType(trailId, type);
      const trail = await db.trailStore.getTrailById(trailId);
      if (!stops || stops.length === 0) {
        return h.response("No stops found for this type").code(404);
      }
      const viewData = {
        title: `${type} Stops`,
        stops: stops,
        type: type,
        trail: trail
      };
      return h.view("stop-type-view", viewData);
    },
  },
};
