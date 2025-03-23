import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testTrails, testStops, beara, dingle, cafe, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Stop Model tests", () => {

  let bearaList = null;

  setup(async () => {
    db.init("mongo");
    await db.trailStore.deleteAllTrails();
    await db.stopStore.deleteAllStops();
    bearaList = await db.trailStore.addTrail(beara);
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testStops[i] = await db.stopStore.addStop(bearaList._id, testStops[i]);
    }
  });

  test("Create single stop", async () => {
    const dingleList = await db.trailStore.addTrail(dingle);
    const stop = await db.stopStore.addStop(dingleList._id, cafe)
    assert.isNotNull(stop._id);
    assertSubset (cafe, stop);
  });

  test("Get multiple stops", async () => {
    const stops = await db.stopStore.getStopsByTrailId(bearaList._id);
    assert.equal(stops.length, testStops.length)
  });

  test("Delete all stops", async () => {
    const stops = await db.stopStore.getAllStops();
    assert.equal(testStops.length, stops.length);
    await db.stopStore.deleteAllStops();
    const newStops = await db.stopStore.getAllStops();
    assert.equal(0, newStops.length);
  });

  test("Get a stop - success", async () => {
    const dingleList = await db.trailStore.addTrail(dingle);
    const stop = await db.stopStore.addStop(dingleList._id, cafe);
    const newStop = await db.stopStore.getStopById(stop._id);
    assertSubset (cafe, newStop);
  });

  test("Get a stop - bad params", async () => {
    assert.isNull(await db.stopStore.getStopById(""));
    assert.isNull(await db.stopStore.getStopById());
  });

  test("Delete one stop - success", async () => {
    await db.stopStore.deleteStop(testStops[0]._id);
    const stops = await db.stopStore.getAllStops();
    assert.equal(stops.length, testTrails.length - 1);
    const deletedStop = await db.stopStore.getStopById(testStops[0]._id);
    assert.isNull(deletedStop);
  });

  test("Delete one stop - fail", async () => {
    await db.stopStore.deleteStop("bad-id");
    const stops = await db.stopStore.getAllStops();
    assert.equal(stops.length, testTrails.length);
  })
})