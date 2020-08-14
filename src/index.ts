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

export function Vec3(x: number, y: number, z: number): IVec3;
export function Vec3(arr: [number, number, number]): IVec3;
export function Vec3(...args: any): IVec3 {
  if (args.length === 1 && isNumberArray(args[0]) && args[0].length === 3) {
    const [x, y, z] = args[0];
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
export function Vec2(arr: [number, number]): IVec2;
export function Vec2(...args: any): IVec2 {
  if (args.length === 1 && isNumberArray(args[0]) && args[0].length === 2) {
    const [x, y] = args[0];
    return vec2_from(x, y);
  }

  if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
    return vec2_from(args[0], args[1]);
  }

  throw new Error(`Invalid argument type`);
}

export function isVec2(o: any): o is IVec2 {
  return isNumberArray(o) && o.length === 2 && "x" in o && "y" in o;
}

export function isVec3(o: any): o is IVec3 {
  return isNumberArray(o) && o.length === 3 && "x" in o && "y" in o && "z" in o;
}

export function add([a1, a2]: IVec2, [b1, b2]: IVec2): IVec2 {
  return Vec2([a1 + b1, a2 + b2]);
}

export function sub([a1, a2]: IVec2, [b1, b2]: IVec2): IVec2 {
  return Vec2([a1 - b1, a2 - b2]);
}

export function mul(a: IVec2, b: IVec2): IVec2;
export function mul(a: IVec2, b: number): IVec2;
export function mul(a: IVec2, b: any): IVec2 {
  if (isVec2(b)) {
    const [a1, a2] = a;
    const [b1, b2] = b;
    return Vec2([a1 * b1, a2 * b2]);
  }

  if (isNumber(b)) {
    const [a1, a2] = a;
    return Vec2([a1 * b, a2 * b]);
  }

  throw new Error(`Invalid argument type b ${b} is ${typeof b}`);
}

export function div([x, y]: IVec2, s: number): IVec2 {
  return Vec2([x / s, y / s]);
}

export function mag([x, y]: IVec2): number {
  return Math.sqrt(x * x + y * y);
}

export function dot([a1, a2]: IVec2, [b1, b2]: IVec2): number {
  return a1 * b1 + a2 * b2;
}

export function cross([a1, a2, a3]: IVec3, [b1, b2, b3]: IVec3): IVec3 {
  // prettier-ignore
  return Vec3([
    a2 * b3 - a3 * b2,
    a3 * b1 - a1 * b3,
    a1 * b2 - a2 * b1,
  ]);
}

export function rotate(v: IVec2, radian: number): IVec2 {
  const { cos, sin } = Math;
  return Vec2([
    dot(v, Vec2([cos(radian), -1 * sin(radian)])),
    dot(v, Vec2([sin(radian), cos(radian)])),
  ]);
}

export function normal(v: IVec2): IVec2 {
  const { max } = Math;
  return div(v, max(1, mag(v)));
}

export function det([top, down]: [IVec2, IVec2]): number {
  const [a, b] = top;
  const [c, d] = down;
  return a * d - b * c;
}
