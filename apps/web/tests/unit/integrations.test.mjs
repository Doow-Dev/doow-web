import assert from "node:assert/strict";

import {
  getOrbitAnchorProgresses,
  getOrbitAnimatedState,
  getOrbitEllipseFromSlots,
  getOrbitPointAtProgress,
  getOrbitProgressForPoint,
  getOrbitSlotCenter,
} from "../../src/lib/site/integrations.js";

function runTest(name, callback) {
  try {
    callback();
  } catch (error) {
    throw error;
  }
}

const upwardSlots = [
  { id: "left-mid", leftPx: 12, sizePx: 108.384, topPx: 163 },
  { id: "top-left", leftPx: 138, sizePx: 108.384, topPx: 20 },
  { id: "top-right", leftPx: 283.99, sizePx: 108.384, topPx: 20 },
  { id: "right-mid", leftPx: 400, sizePx: 108.384, topPx: 158 },
];

runTest("orbit ellipse derives from the visible slot geometry", () => {
  const ellipse = getOrbitEllipseFromSlots(upwardSlots, "upwardArc");

  assert.equal(Number(ellipse.cx.toFixed(2)), 260.19);
  assert.equal(Number(ellipse.cy.toFixed(2)), 214.69);
  assert.equal(Number(ellipse.rx.toFixed(2)), 194.00);
  assert.equal(Number(ellipse.ry.toFixed(2)), 140.50);
});

runTest("orbit progress maps the visible top-arc slots in order", () => {
  const ellipse = getOrbitEllipseFromSlots(upwardSlots, "upwardArc");
  const slotProgresses = upwardSlots.map((slot) =>
    getOrbitProgressForPoint(getOrbitSlotCenter(slot), ellipse, "upwardArc"),
  );

  assert(slotProgresses[0] > 0.99);
  assert(slotProgresses[1] < slotProgresses[2]);
  assert(slotProgresses[2] < slotProgresses[3]);
  assert.equal(Number(slotProgresses[3].toFixed(3)), 0.497);
});

runTest("progress lookup keeps the top-arc slot path above the ellipse center", () => {
  const ellipse = getOrbitEllipseFromSlots(upwardSlots, "upwardArc");
  const topLeft = getOrbitPointAtProgress(0.196, ellipse, "upwardArc");
  const topRight = getOrbitPointAtProgress(0.311, ellipse, "upwardArc");

  assert(topLeft.y < ellipse.cy);
  assert(topRight.y < ellipse.cy);
  assert(topLeft.x < ellipse.cx);
  assert(topRight.x > ellipse.cx);
});

runTest("orbit anchor generation preserves the four visible slots and distributes hidden providers on the hidden segment", () => {
  const anchorProgresses = getOrbitAnchorProgresses(upwardSlots, "upwardArc", 9);

  assert.equal(anchorProgresses.length, 9);
  assert.equal(Number(anchorProgresses[0].toFixed(3)), 0.997);
  assert.equal(Number(anchorProgresses[3].toFixed(3)), 0.497);
  assert(anchorProgresses[4] > anchorProgresses[3]);
  assert(anchorProgresses[8] < 1);
});

runTest("animated orbit state uses edge fading that stays consistent across short and long hidden lists", () => {
  const fiveAppAnchors = getOrbitAnchorProgresses(upwardSlots, "upwardArc", 5);
  const nineAppAnchors = getOrbitAnchorProgresses(upwardSlots, "upwardArc", 9);
  const fiveAppEdge = getOrbitAnimatedState(fiveAppAnchors, 0, 0);
  const nineAppEdge = getOrbitAnimatedState(nineAppAnchors, 0, 0);
  const fiveAppInterior = getOrbitAnimatedState(fiveAppAnchors, 0, 0.5);
  const nineAppInterior = getOrbitAnimatedState(nineAppAnchors, 0, 0.5);
  const fiveAppEntering = getOrbitAnimatedState(fiveAppAnchors, 4, 0.75);
  const nineAppEntering = getOrbitAnimatedState(nineAppAnchors, 8, 0.75);

  assert.equal(Number(fiveAppEdge.opacity.toFixed(2)), 0.5);
  assert.equal(Number(nineAppEdge.opacity.toFixed(2)), 0.5);
  assert.equal(fiveAppInterior.opacity, 1);
  assert.equal(nineAppInterior.opacity, 1);
  assert(fiveAppEntering.opacity > 0);
  assert(nineAppEntering.opacity > 0);
});

runTest("point lookup returns the left and right arc endpoints for progress 0 and 0.5", () => {
  const ellipse = getOrbitEllipseFromSlots(upwardSlots, "upwardArc");
  const leftPoint = getOrbitPointAtProgress(0, ellipse, "upwardArc");
  const rightPoint = getOrbitPointAtProgress(0.5, ellipse, "upwardArc");

  assert.equal(Number(leftPoint.x.toFixed(2)), 66.19);
  assert.equal(Number(rightPoint.x.toFixed(2)), 454.19);
});
