const SINGLE_LEG_GLUTE_BRIDGE_IMAGE = "/single-leg-glute-bridge.svg";

const singleLegGluteBridgePattern =
  /\bsingle[\s-]+leg\b.*\bglute\b.*\b(bridge|raise)\b/i;

export function getExerciseCorrection(name) {
  if (!name || !singleLegGluteBridgePattern.test(name)) {
    return null;
  }

  return {
    gifUrl: SINGLE_LEG_GLUTE_BRIDGE_IMAGE,
    imageAlt:
      "Single leg glute bridge: lying on your back with one knee bent, the other leg extended, and hips lifted",
    instructions:
      "Lie on your back with one knee bent and the other leg extended. Press through the foot on the floor and squeeze your glutes to lift your hips and butt upward, keeping the extended leg in line with your torso.",
  };
}

export function applyExerciseCorrections(exercise) {
  const correction = getExerciseCorrection(exercise?.name);

  if (!correction) {
    return exercise;
  }

  return {
    ...exercise,
    gifUrl: correction.gifUrl,
  };
}
