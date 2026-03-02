/**
 * A primary network particle rendered as both a glow and a core dot.
 *
 * `depth` is a pseudo-parallax multiplier used to vary intensity and motion.
 * `age` and `lifetime` drive periodic respawn to keep the field dynamic.
 */
export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  age: number;
  lifetime: number;
};

/**
 * A lightweight background speck used to add depth behind main particles.
 */
export type DustParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

/**
 * Normalized pointer state in canvas-local coordinates.
 */
export type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

/**
 * Simple 2D point used for clustered spawn centers.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * Theme-driven RGB triplets used for drawing points, links, and dust.
 */
export type NetworkColors = {
  pointRgb: string;
  linkRgb: string;
  dustRgb: string;
};

/**
 * Cached canvas bounds in viewport coordinates.
 *
 * Used to convert global pointer events into canvas-local positions.
 */
export type CanvasBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};
