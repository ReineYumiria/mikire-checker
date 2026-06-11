// Reserved for canvas utilities.

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
