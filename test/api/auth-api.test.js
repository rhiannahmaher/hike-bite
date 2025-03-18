import { assert } from "chai";
import { hikebiteService } from "./hikebite-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    hikebiteService.clearAuth();
    await hikebiteService.createUser(maggie);
    await hikebiteService.authenticate(maggie);
    await hikebiteService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await hikebiteService.createUser(maggie);
    const response = await hikebiteService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await hikebiteService.createUser(maggie);
    const response = await hikebiteService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    hikebiteService.clearAuth();
    try {
      await hikebiteService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  })
});