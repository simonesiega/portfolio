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

export type DustParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

export type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

export type Point = {
  x: number;
  y: number;
};

export type NetworkColors = {
  pointRgb: string;
  linkRgb: string;
  dustRgb: string;
};

export type CanvasBounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};
