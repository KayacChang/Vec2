export interface IVec2 extends Array<Number> {
  [0]: number;
  [1]: number;
  x: number;
  y: number;
}

export interface IVec3 extends IVec2 {
  [2]: number;
  z: number;
}

export type AVec2 = [number, number];
export type OVec2 = { x: number; y: number };

export type OVec3 = {
  x: number;
  y: number;
  z: number;
};
export type AVec3 = [number, number, number];

function vec2_from(x: number, y: number) {
  return Object.defineProperties([], {
    [0]: {
      set: (_x) => (x = _x),
      get: () => x,
    },
    x: {
      set: (_x) => (x = _x),
      get: () => x,
    },

    [1]: {
      set: (_y) => (y = _y),
      get: () => y,
    },
    y: {
      set: (_y) => (y = _y),
      get: () => y,
    },
  });
}

function vec3_from(x: number, y: number, z: number) {
  return Object.defineProperties(vec2_from(x, y), {
    [2]: {
      set: (_z) => (z = _z),
      get: () => z,
    },

    z: {
      set: (_z) => (z = _z),
      get: () => z,
    },
  });
}

function isNumber(o: any): o is number {
  return !Number.isNaN(o);
}

function isNumberArray(o: any): o is number[] {
  return Array.isArray(o) && o.every(isNumber);
}

function _clamp(a: number, min = 0, max = 1): number {
  return Math.min(max, Math.min(min, a));
}

function _lerp(x: number, y: number, t: number): number {
  t = _clamp(t);
  return x * (1 - t) + y * t;
}

export function isAVec2(o: any): o is AVec2 {
  return isNumberArray(o) && o.length === 2;
}

export function isOVec2(o: any): o is OVec2 {
  return "x" in o && "y" in o;
}

export function isAVec3(o: any): o is AVec3 {
  return isNumberArray(o) && o.length === 3;
}

export function isOVec3(o: any): o is OVec3 {
  return "x" in o && "y" in o && "z" in o;
}

export function isVec2(o: any): o is IVec2 {
  return isAVec2(o) && isOVec2(o);
}

export function isVec3(o: any): o is IVec3 {
  return isAVec3(o) && isOVec3(o);
}

export function Vec3(x: number, y: number, z: number): IVec3;
export function Vec3(arr: OVec3 | AVec3): IVec3;
export function Vec3(...args: any): IVec3 {
  if (args.length === 1 && isAVec3(args[0])) {
    const [x, y, z] = args[0];
    return vec3_from(x, y, z);
  }

  if (args.length === 1 && isOVec3(args[0])) {
    const { x, y, z } = args[0];
    return vec3_from(x, y, z);
  }

  if (
    args.length === 3 &&
    isNumber(args[0]) &&
    isNumber(args[1]) &&
    isNumber(args[2])
  ) {
    return vec3_from(args[0], args[1], args[2]);
  }

  throw new Error(`Invalid argument type`);
}

export function Vec2(x: number, y: number): IVec2;
export function Vec2(obj: OVec2 | AVec2): IVec2;
export function Vec2(...args: any): IVec2 {
  if (args.length === 1 && isAVec2(args[0])) {
    const [x, y] = args[0];
    return vec2_from(x, y);
  }

  if (args.length === 1 && isOVec2(args[0])) {
    const { x, y } = args[0];
    return vec2_from(x, y);
  }

  if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
    return vec2_from(args[0], args[1]);
  }

  throw new Error(`Invalid argument type`);
}

export function add([a1, a2]: IVec2 | AVec2, [b1, b2]: IVec2 | AVec2): IVec2 {
  return Vec2([a1 + b1, a2 + b2]);
}

export function sub([a1, a2]: IVec2 | AVec2, [b1, b2]: IVec2 | AVec2): IVec2 {
  return Vec2([a1 - b1, a2 - b2]);
}

export function mul(a: AVec2 | IVec2, b: number): IVec2;
export function mul(a: AVec2 | IVec2, b: AVec2 | IVec2): IVec2;
export function mul(a: AVec2 | IVec2, b: any): IVec2 {
  if (isNumber(b)) {
    const [a1, a2] = a;
    return Vec2([a1 * b, a2 * b]);
  }

  const [a1, a2] = a;
  const [b1, b2] = b;
  return Vec2([a1 * b1, a2 * b2]);
}

export function div([x, y]: IVec2 | AVec2, s: number): IVec2 {
  return Vec2([x / s, y / s]);
}

export function mag([x, y]: IVec2 | AVec2): number {
  return Math.sqrt(x * x + y * y);
}

export function dot(a: AVec2 | IVec2, b: AVec2 | IVec2): number {
  const [a1, a2] = a;
  const [b1, b2] = b;

  return a1 * b1 + a2 * b2;
}

export function det([a, b]: [AVec2 | IVec2, IVec2 | AVec2]): number {
  const [a1, a2] = a;
  const [b1, b2] = b;
  return a1 * b2 - a2 * b1;
}

export function cross(
  [a1, a2, a3]: IVec3 | AVec3,
  [b1, b2, b3]: IVec3 | AVec3
): IVec3 {
  // prettier-ignore
  return Vec3([
    a2 * b3 - a3 * b2,
    a3 * b1 - a1 * b3,
    a1 * b2 - a2 * b1,
  ]);
}

export function rotate(v: IVec2 | AVec2, radian: number): IVec2 {
  const { cos, sin } = Math;
  return Vec2([
    dot(v, Vec2([cos(radian), -1 * sin(radian)])),
    dot(v, Vec2([sin(radian), cos(radian)])),
  ]);
}

export function normal(v: IVec2 | AVec2): IVec2 {
  const { max } = Math;
  return div(v, max(1, mag(v)));
}

export function lerp(a: AVec2 | IVec2, b: AVec2 | IVec2, t: number): IVec2 {
  const [a1, a2] = a;
  const [b1, b2] = b;

  // prettier-ignore
  return Vec2([
    _lerp(a1, b1, t),
    _lerp(a2, b2, t),
  ]);
}
