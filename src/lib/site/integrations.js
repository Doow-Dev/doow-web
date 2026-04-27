const VISIBLE_ORBIT_COUNT = 4;
const TWO_PI = Math.PI * 2;
const ORBIT_EDGE_FADE_SPAN = 0.08;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function wrap(value, max) {
  const wrapped = value % max;

  return wrapped < 0 ? wrapped + max : wrapped;
}

function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }

  const normalized = clamp((value - edge0) / (edge1 - edge0), 0, 1);

  return normalized * normalized * (3 - 2 * normalized);
}

function getClockwiseDelta(start, end) {
  return wrap(end - start, 1);
}

function getVisibleOrbitRange(anchorProgresses, visibleCount) {
  const visibleStart = anchorProgresses[0];
  const visibleEnd = anchorProgresses[visibleCount - 1];
  const visibleLength = getClockwiseDelta(visibleStart, visibleEnd);

  return {
    visibleEnd,
    visibleLength,
    visibleStart,
  };
}

function getOrbitEdgeOpacity(anchorProgresses, progress, visibleCount) {
  if (!Array.isArray(anchorProgresses) || anchorProgresses.length < visibleCount) {
    return 0;
  }

  const { visibleLength, visibleStart } = getVisibleOrbitRange(anchorProgresses, visibleCount);
  const hiddenLength = 1 - visibleLength;
  const edgeFadeSpan = Math.min(ORBIT_EDGE_FADE_SPAN, visibleLength * 0.24, hiddenLength * 0.24);
  const clockwiseProgress = getClockwiseDelta(visibleStart, progress);
  let localProgress = clockwiseProgress;

  if (localProgress > visibleLength + hiddenLength / 2) {
    localProgress -= 1;
  }

  if (localProgress <= -edgeFadeSpan || localProgress >= visibleLength + edgeFadeSpan) {
    return 0;
  }

  if (localProgress < edgeFadeSpan) {
    return smoothstep(-edgeFadeSpan, edgeFadeSpan, localProgress);
  }

  if (localProgress > visibleLength - edgeFadeSpan) {
    return 1 - smoothstep(visibleLength - edgeFadeSpan, visibleLength + edgeFadeSpan, localProgress);
  }

  return 1;
}

export function getOrbitSlotCenter(slot) {
  return {
    x: slot.leftPx + slot.sizePx / 2,
    y: slot.topPx + slot.sizePx / 2,
  };
}

export function getOrbitEllipseFromSlots(visibleSlots, cardVariant) {
  if (!Array.isArray(visibleSlots) || visibleSlots.length < VISIBLE_ORBIT_COUNT) {
    throw new Error("Orbit ellipse requires four visible slots.");
  }

  const leftCenter = getOrbitSlotCenter(visibleSlots[0]);
  const rightCenter = getOrbitSlotCenter(visibleSlots[visibleSlots.length - 1]);
  const middleCenters = visibleSlots.slice(1, visibleSlots.length - 1).map(getOrbitSlotCenter);
  const cx = (leftCenter.x + rightCenter.x) / 2;
  const cy = (leftCenter.y + rightCenter.y) / 2;
  const rx = Math.abs(rightCenter.x - cx);

  if (cardVariant === "upwardArc") {
    const topY = Math.min(...middleCenters.map((center) => center.y));

    return {
      cx,
      cy,
      rx,
      ry: Math.abs(cy - topY),
    };
  }

  const bottomY = Math.max(...middleCenters.map((center) => center.y));

  return {
    cx,
    cy,
    rx,
    ry: Math.abs(bottomY - cy),
  };
}

function getRawOrbitAngle(point, ellipse) {
  const dx = (point.x - ellipse.cx) / ellipse.rx;
  const dy = (point.y - ellipse.cy) / ellipse.ry;
  const angle = Math.atan2(dy, dx);

  return angle < 0 ? angle + TWO_PI : angle;
}

export function getOrbitProgressForPoint(point, ellipse, cardVariant) {
  const rawAngle = getRawOrbitAngle(point, ellipse);

  if (cardVariant === "upwardArc") {
    const adjustedAngle = rawAngle < Math.PI ? rawAngle + TWO_PI : rawAngle;

    return (adjustedAngle - Math.PI) / TWO_PI;
  }

  return wrap(Math.PI - rawAngle, TWO_PI) / TWO_PI;
}

function getOrbitAngleForProgress(progress, cardVariant) {
  if (cardVariant === "upwardArc") {
    return Math.PI + progress * TWO_PI;
  }

  return wrap(Math.PI - progress * TWO_PI, TWO_PI);
}

export function getOrbitPointAtProgress(progress, ellipse, cardVariant) {
  const angle = getOrbitAngleForProgress(progress, cardVariant);

  return {
    x: ellipse.cx + ellipse.rx * Math.cos(angle),
    y: ellipse.cy + ellipse.ry * Math.sin(angle),
  };
}

export function getOrbitAnchorProgresses(visibleSlots, cardVariant, totalApps, visibleCount = VISIBLE_ORBIT_COUNT) {
  if (!Number.isInteger(totalApps) || totalApps <= 0) {
    return [];
  }

  if (!Array.isArray(visibleSlots) || visibleSlots.length < visibleCount) {
    return [];
  }

  const ellipse = getOrbitEllipseFromSlots(visibleSlots, cardVariant);
  const visibleAnchorProgresses = visibleSlots
    .slice(0, visibleCount)
    .map((slot) => getOrbitProgressForPoint(getOrbitSlotCenter(slot), ellipse, cardVariant));

  if (totalApps <= visibleCount) {
    return visibleAnchorProgresses;
  }

  const hiddenCount = totalApps - visibleCount;
  const visibleEnd = visibleAnchorProgresses[visibleAnchorProgresses.length - 1];
  const hiddenSegmentLength = 1 - visibleEnd;
  const hiddenAnchorProgresses = Array.from({ length: hiddenCount }, (_, index) => {
    const portion = (index + 1) / (hiddenCount + 1);

    return visibleEnd + hiddenSegmentLength * portion;
  });

  return [...visibleAnchorProgresses, ...hiddenAnchorProgresses];
}

export function getOrbitAnimatedState(anchorProgresses, appIndex, phase, visibleCount = VISIBLE_ORBIT_COUNT) {
  if (!Array.isArray(anchorProgresses) || !anchorProgresses.length) {
    return {
      anchorIndex: 0,
      opacity: 0,
      progress: 0,
    };
  }

  const totalAnchors = anchorProgresses.length;
  const wrappedPhase = wrap(appIndex + phase, totalAnchors);
  const anchorIndex = Math.floor(wrappedPhase);
  const anchorOffset = wrappedPhase - anchorIndex;
  const startProgress = anchorProgresses[anchorIndex];
  let endProgress = anchorProgresses[(anchorIndex + 1) % totalAnchors];

  if (endProgress <= startProgress) {
    endProgress += 1;
  }

  const progress = wrap(startProgress + (endProgress - startProgress) * anchorOffset, 1);

  return {
    anchorIndex,
    opacity: clamp(getOrbitEdgeOpacity(anchorProgresses, progress, visibleCount), 0, 1),
    progress,
  };
}
