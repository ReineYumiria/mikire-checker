/**
 * Converts a screen-space offset (offsetX, offsetY) to the local coordinate
 * offset (lx, ly) that must be passed to drawImage so that, after the canvas
 * transform  translate(cx,cy) → rotate(θ) → scale(fx,fy), the image center
 * appears at (cx + offsetX, cy + offsetY) in screen space.
 *
 * This lets the rotation pivot stay at the canvas center while drag direction
 * remains screen-space (unaffected by rotation / flip).
 */
export const screenToLocalOffset = (
  offsetX: number,
  offsetY: number,
  rotation: number,
  flipX: boolean,
  flipY: boolean,
): { lx: number; ly: number } => {
  const θ = (rotation * Math.PI) / 180;
  const fx = flipX ? -1 : 1;
  const fy = flipY ? -1 : 1;
  const cos = Math.cos(θ);
  const sin = Math.sin(θ);
  return {
    lx: fx * (offsetX * cos + offsetY * sin),
    ly: fy * (-offsetX * sin + offsetY * cos),
  };
};
