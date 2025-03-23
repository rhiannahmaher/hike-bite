import { userMemStore } from "./mem/user-mem-store.js";
import { trailMemStore } from "./mem/trail-mem-store.js";
import { stopMemStore } from "./mem/stop-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { trailJsonStore } from "./json/trail-json-store.js";
import { stopJsonStore } from "./json/stop-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { trailMongoStore } from "./mongo/trail-mongo-store.js";
import { stopMongoStore } from "./mongo/stop-mongo-store.js";

export const db = {
  userStore: null,
  trailStore: null,
  stopStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.trailStore = trailJsonStore;
        this.stopStore = stopJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.trailStore = trailMongoStore;
        this.stopStore = stopMongoStore;
        connectMongo();
        break;
      // Default store
      default:
        this.userStore = userMemStore;
        this.trailStore = trailMemStore;
        this.stopStore = stopMemStore;
    }
  }
}