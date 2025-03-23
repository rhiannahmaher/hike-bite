import { assert } from "chai";
import { EventEmitter } from "events";
import { hikebiteService } from "./hikebite-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, dingle, testTrails } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Trail API tests", () => {
  let user = null;

  setup(async () => {
    await hikebiteService.deleteAllTrails();
    await hikebiteService.deleteAllUsers();
    user = await hikebiteService.createUser(maggie);
    dingle.userid = user._id;
  });

  teardown(async () => {});

  test("Create trail", async () => {
    const returnedTrail = await hikebiteService.createTrail(dingle);
    assert.isNotNull(returnedTrail);
    assertSubset(dingle, returnedTrail);
  });

  test("Delete a trail", async () => {
    const trail = await hikebiteService.createTrail(dingle);
    const response = await hikebiteService.deleteTrail(trail._id);
    assert.equal(response.status, 204);
    try {
      const returnedTrail = await hikebiteService.getTrail(trail.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No trail with this id", "Incorrect Response Message");
    }
  });

  test("Create multiple trails", async () => {
    for (let i = 0; i < testTrails.length; i += 1) {
      testTrails[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await hikebiteService.createTrail(testTrails[i]);
    }
    let returnedLists = await hikebiteService.getAllTrails();
    assert.equal(returnedLists.length, testTrails.length);
    await hikebiteService.deleteAllTrails();
    returnedLists = await hikebiteService.getAllTrails();
    assert.equal(returnedLists.length, 0);
  });

  test("Remove non-existant trail", async () => {
    try {
      const response = await hikebiteService.deleteTrail("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No trail with this id", "Incorrect Response Message");
    }
  })
})
