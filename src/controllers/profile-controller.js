import { db } from "../models/db.js";

export const profileController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "User Profile",
        user: user,
      };
      return h.view("profile-view", viewData);
    },
  }
}