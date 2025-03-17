import { userApi } from "./api/user-api.js";
import { trailApi } from "./api/trail-api.js";
import { stopApi } from "./api/stop-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "GET", path: "/api/trails", config: trailApi.find },
  { method: "POST", path: "/api/trails", config: trailApi.create },
  { method: "DELETE", path: "/api/trails", config: trailApi.deleteAll },
  { method: "GET", path: "/api/trails/{id}", config: trailApi.findOne },
  { method: "DELETE", path: "/api/trails/{id}", config: trailApi.deleteOne },

  { method: "GET", path: "/api/stops", config: stopApi.find },
  { method: "GET", path: "/api/stop/{id}", config: stopApi.findOne },
  { method: "POST", path: "/api/trails/{id}/stops", config: stopApi.create },
  { method: "DELETE", path: "/api/stops", config: stopApi.deleteAll },
  { method: "DELETE", path: "/api/stops/{id}", config: stopApi.deleteOne },
];