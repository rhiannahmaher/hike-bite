import Mongoose from "mongoose";
import { Trail } from "./trail.js";
import { Stop } from "./stop.js";

export const stopMongoStore = {
  async getAllStops() {
    const stops = await Stop.find().lean();
    return stops;
  },

  async addStop(trailId, stop) {
    stop.trailid = trailId;
    const newStop = new Stop(stop);
    const stopObj = await newStop.save();
    return this.getStopById(stopObj._id);
  },

  async getStopsByTrailId(id) {
    const stops = await Stop.find({ trailid: id }).lean();
    return stops;
  },
  
  async getStopById(id) {
    if (id) {
      const stop = await Stop.findOne({ _id: id }).lean();
      return stop;
    }
    return null;
  },

  async getStopsByType(trailId, type) {
    const stops = await Stop.find({ trailid: trailId, type: type }).lean();
    return stops;
  },

  async deleteStop(id) {
    try {
      await Stop.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllStops() {
    await Stop.deleteMany({});
  },

  async updateStop(stop, updatedStop) {
    const stopDoc = await Stop.findOne({ _id: stop._id });
    stopDoc.title = updatedStop.title;
    stopDoc.type = updatedStop.type;
    stopDoc.hours = updatedStop.hours;
    stopDoc.latitude = updatedStop.latitude;
    stopDoc.longitude = updatedStop.longitude;
    await stopDoc.save();
  }
};