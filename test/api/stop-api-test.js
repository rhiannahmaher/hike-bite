import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { hikebiteService } from "./hikebite-service.js";
import { maggie, dingle, testTrails, testStops, cafe } from "../fixtures.js";

suite("Stop API tests", () => {
  let user = null;
  let dingleList = null;

  setup(async () => {
    await hikebiteService.deleteAllTrails();
    await hikebiteService.deleteAllUsers();
    await hikebiteService.deleteAllStops();
    user = await hikebiteService.createUser(maggie);
    dingle.userid = user._id;
    dingleList = await hikebiteService.createTrail(dingle);
  });

  teardown(async () => {});

  test("Create stop", async () => {
    const returnedStop = await hikebiteService.createStop(dingleList._id, cafe);
    assertSubset(cafe, returnedStop);
  });

  test("create Multiple stops", async () => {
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hikebiteService.createStop(dingleList._id, testStops[i]);
    }
    const returnedStops = await hikebiteService.getAllStops();
    assert.equal(returnedStops.length, testStops.length);
    for (let i = 0; i < returnedStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stop = await hikebiteService.getStop(returnedStops[i]._id);
      assertSubset(stop, returnedStops[i]);
    }
  });

  test("Delete StopApi", async () => {
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hikebiteService.createStop(dingleList._id, testStops[i]);
    }
    let returnedStops = await hikebiteService.getAllStops();
    assert.equal(returnedStops.length, testStops.length);
    for (let i = 0; i < returnedStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stop = await hikebiteService.deleteStop(returnedStops[i]._id);
    }
    returnedStops = await hikebiteService.getAllStops();
    assert.equal(returnedStops.length, 0);
  });

  test("denormalised Trail", async () => {
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await hikebiteService.createStop(dingleList._id, testStops[i]);
    }
    const returnedTrail = await hikebiteService.getTrail(dingleList._id);
    assert.equal(returnedTrail.stops.length, testStops.length);
    for (let i = 0; i < testStops.length; i += 1) {
      assertSubset(testStops[i], returnedTrail.stops[i]);
    }
  });
});