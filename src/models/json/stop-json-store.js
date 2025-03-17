import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const stopJsonStore = {
  async getAllStops() {
    await db.read();
    return db.data.stops;
  },

  async addStop(trailId, stop) {
    await db.read();
    stop._id = v4();
    stop.trailid = trailId;
    db.data.stops.push(stop);
    await db.write();
    return stop;
  },

  async getStopsByTrailId(id) {
    await db.read();
    let foundStops = db.data.stops.filter((stop) => stop.trailid === id);
    if (!foundStops) {
      foundStops = null;
    }
    return foundStops;
  },

  async getStopById(id) {
    await db.read();
    let foundStop = db.data.stops.find((stop) => stop._id === id);
    if (!foundStop) {
      foundStop = null;
    }
    return foundStop;
  },

  async getTrailStops(trailId) {
    await db.read();
    let foundStops = stops.filter((stop) => stop.trailid === trailId);
    if (!foundStops) {
      foundStops = null;
    }
    return foundStops;
  },

  async deleteStop(id) {
    await db.read();
    const index = db.data.stops.findIndex((stop) => stop._id === id);
    if (index !== -1) db.data.stops.splice(index, 1);
    await db.write();
  },

  async deleteAllStops() {
    db.data.stops = [];
    await db.write();
  },

  async updateStop(stop, updatedStop) {
    stop.title = updatedStop.title;
    stop.type = updatedStop.type;
    stop.hours = updatedStop.hours;
    await db.write();
  },
};