import { v4 } from "uuid";

let stops = [];

export const stopMemStore = {
  async getAllStops() {
    return stops;
  },

  async addStop(trailId, stop) {
    stop._id = v4();
    stop.trailid = trailId;
    stops.push(stop);
    return stop;
  },

  async getStopsByTrailId(id) {
    return stops.filter((stop) => stop.trailid === id);
  },

  async getStopById(id) {
    let foundStop = stops.find((stop) => stop._id === id);
    if (!foundStop) {
      foundStop = null; // accounts for undefined values and converts to null to be tested
    }
    return foundStop;
  },

  async getStopsByType(trailId, type) {
      let foundStops = stops.filter((stop) => stop.trailid === trailId && stop.type === type);
      if (!foundStops) {
        foundStops = null;
      }
      return foundStops;
    },

  async getTrailStops(trailId) {
    let foundStops = stops.filter((stop) => stop.trailtid === trailId);
    if (!foundStops) {
      foundStops = null; // accounts for undefined valuea and converts to null to be tested
    }
    return foundStops;
  },

  async deleteStop(id) {
    const index = stops.findIndex((stop) => stop._id === id);
    if (index !== -1) stops.splice(index, 1);
  },

  async deleteAllStops() {
    stops = [];
  },

  async updateStop(stop, updatedStop) {
    stop.title = updatedStop.title;
    stop.type = updatedStop.type;
    stop.hours = updatedStop.hours;
    stop.latitude = updatedStop.latitude;
    stop.longitude = updatedStop.longitude;
  },
};