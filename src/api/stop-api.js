
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { StopSpec, TrailSpec } from "../models/joi-schemas.js";

// TO DO: Add code for retrieving data from database

export const stopApi = { 
  find: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
    },
  },
};
