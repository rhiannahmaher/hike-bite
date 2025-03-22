import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const userController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const user = await db.userStore.getUserById(loggedInUser._id);
            const viewData = {
                title: "Edit User Details",
                user: user,
            };
            return h.view("user-view", viewData);
        }
    },
    
    update: {
        validate: {
            payload: UserSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
            return h.view("profile-view", { title: "Edit profile error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const user = await db.userStore.getUserById(loggedInUser._id);
            const newUser = {
            firstName: request.payload.firstName,
            lastName: request.payload.lastName,
            email: request.payload.email,
            password: request.payload.password,
            };
            await db.userStore.updateUser(user._id, newUser);
            return h.redirect("/login");
        },
    },

    deleteUser: {
        handler: async function (request, h) {
        const user = await db.userStore.getUserById(request.params.id);
        await db.userStore.deleteUserById(user._id);
        return h.redirect("/login");
        },
    },
}