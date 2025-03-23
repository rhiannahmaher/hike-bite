import { Trail } from "./trail.js";
import { stopMongoStore } from "./stop-mongo-store.js";

export const trailMongoStore = {
  async getAllTrails() {
    const trails = await Trail.find().lean();
    return trails;
  },

  async getTrailById(id) {
    if (id) {
      const trail = await Trail.findOne({ _id: id }).lean();
      if (trail) {
        trail.stops = await stopMongoStore.getStopsByTrailId(trail._id);
      }
      return trail;
    }
    return null;
  },

  async addTrail(trail) {
    const newTrail = new Trail(trail);
    const trailObj = await newTrail.save();
    return this.getTrailById(trailObj._id);
  },

  async getUserTrails(id) {
    const trail = await Trail.find({ userid: id }).lean();
    return trail;
  },

  async deleteTrailById(id) {
    try {
      await Trail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTrails() {
    await Trail.deleteMany({});
  }
}