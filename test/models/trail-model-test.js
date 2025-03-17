import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { beara, testTrails } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("User Trail Tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.trailStore.deleteAllTrails(); // Empty trails before testing
    for (let i = 0; i < testTrails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testTrails[i] = await db.trailStore.addTrail(testTrails[i]);
    }
  });

  test("Create a trail", async () => {
      const newTrail = await db.trailStore.addTrail(beara);
      assertSubset(newTrail, beara);
      // assert.equal(newPlaylist, dance);
  });
  
  test("Delete all trailApi", async () => {
    let returnedTrails = await db.trailStore.getAllTrails();
    assert.equal(returnedTrails.length, 3);
    await db.trailStore.deleteAllTrails();
    returnedTrails = await db.trailStore.getAllTrails();
    assert.equal(returnedTrails.length, 0);
  });

  test("Get a trail - success", async () => {
      const trail = await db.trailStore.addTrail(beara);
      const returnedTrail = await db.trailStore.getTrailById(trail._id);
      assert.deepEqual(trail, returnedTrail);
  });

  test("Delete one trail - success", async () => {
      await db.trailStore.deleteTrailById(testTrails[0]._id);
      const returnedTrails = await db.trailStore.getAllTrails();
      assert.equal(returnedTrails.length, testTrails.length - 1);
      const deletedTrail = await db.trailStore.getTrailById(testTrails[0]._id);
      assert.isNull(deletedTrail);
  });

  // TO DO: Review test
  
  test("Get a trail - failures", async () => {
    const noTrailWithId = await db.trailStore.getTrailById("kerry"); // Fake data to test what happens if a trail doesn't exist
    assert.isNull(noTrailWithId);
  });

  test("Get a trail - bad params", async () => {
    let nullTrail = await db.trailStore.getTrailById("");
    assert.isNull(nullTrail);
    nullTrail = await db.trailStore.getTrailById();
    assert.isNull(nullTrail);
  });

  test("Delete one trail - fail", async () => {
    await db.trailStore.deleteTrailById("bad-id");
    const allTrails = await db.trailStore.getAllTrails();
    assert.equal(testTrails.length, allTrails.length);
  });     
});