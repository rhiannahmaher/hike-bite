import { assert } from "chai";
import { hikebiteService } from "./hikebite-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    await hikebiteService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testUsers[0] = await hikebiteService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {});

  test("Create a user", async () => {
    const newUser = await hikebiteService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("Delete all users", async () => {
    let returnedUsers = await hikebiteService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await hikebiteService.deleteAllUsers();
    returnedUsers = await hikebiteService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });

  test("Get a user - success", async () => {
    const returnedUser = await hikebiteService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  // TO DO: Review test

  test("Get a user - bad id", async () => {
    try {
      const returnedUser = await hikebiteService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      console.log("Error response:", error.response); // Error 503 thrown
      assert(error.response.data.message === "No user with this id");
      // assert.equal(error.response.data.statusCode, 404);
    }
  });
  
  test("Get a user - deleted user", async () => {
    await hikebiteService.deleteAllUsers();
    try {
      const returnedUser = await hikebiteService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
