import { v4 } from "uuid";
import { stopMemStore } from "./stop-mem-store.js";

let trails = [];

export const trailMemStore = {
  async getAllTrails() {
    return trails;
  },

  async addTrail(trail) {
    trail._id = v4();
    trails.push(trail);
    return trail;
  },

  async getTrailById(id) {
    const list = trails.find((trail) => trail._id === id);
    list.stops = await stopMemStore.getStopsByTrailId(list._id);
    return list;
  },

  async deleteTrailById(id) {
    const index = trails.findIndex((trail) => trail._id === id);
    trails.splice(index, 1);
  },

  async deleteAllTrails() {
    trails = [];
  },
  
  async getUserTrails(userid) {
    return trails.filter((trail) => trail.userid === userid);
  }
}