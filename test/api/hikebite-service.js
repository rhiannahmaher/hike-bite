import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const hikebiteService = {
  hikebiteUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.hikebiteUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.hikebiteUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.hikebiteUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.hikebiteUrl}/api/users`);
    return res.data;
  },

  async createTrail(trail) {
    const res = await axios.post(`${this.hikebiteUrl}/api/trails`, trail);
    return res.data;
  },

  async getTrail(id) {
    const res = await axios.get(`${this.hikebiteUrl}/api/trails/${id}`);
    return res.data;
  },

  async getAllTrails() {
    const res = await axios.get(`${this.hikebiteUrl}/api/trails`);
    return res.data;
  },

  async deleteTrail(id) {
    const response = await axios.delete(`${this.hikebiteUrl}/api/trails/${id}`);
    return response;
  },

  async deleteAllTrails() {
    const res = await axios.delete(`${this.hikebiteUrl}/api/trails`);
    return res.data;
  },

  async createStop(stop) {
    const res = await axios.post(`${this.hikebiteUrl}/api/stops`, stop);
    return res.data;
  },

  async getStop(id) {
    const res = await axios.get(`${this.hikebiteUrl}/api/stops/${id}`);
    return res.data;
  },

  async getAllStops() {
    const res = await axios.get(`${this.hikebiteUrl}/api/stops`);
    return res.data;
  },

  async deleteStop(id) {
    const response = await axios.delete(`${this.hikebiteUrl}/api/stops/${id}`);
    return response;
  },

  async deleteAllStops() {
    const res = await axios.delete(`${this.hikebiteUrl}/api/stops`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.hikebiteUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  }
};