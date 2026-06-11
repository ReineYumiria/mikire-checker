// Reserved for canvas utilities.

// Normalizes an angle in degrees to the (-180, 180] range.
export const normalizeAngle = (angle: number): number => {
  const mod = ((angle % 360) + 360) % 360;
  return mod > 180 ? mod - 360 : mod;
};

// Rotates an offset vector so the canvas/preview center stays the rotation pivot.
export const rotateOffset = (
  offsetX: number,
  offsetY: number,
  deltaDegrees: number,
): { offsetX: number; offsetY: number } => {
  const rad = (deltaDegrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return {
    offsetX: offsetX * cos - offsetY * sin,
    offsetY: offsetX * sin + offsetY * cos,
  };
};
