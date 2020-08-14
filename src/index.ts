export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

function isNumber(o: any): o is number {
  return !Number.isNaN(o);
}

export function isVec2(o: any): o is Vec2 {
  return Array.isArray(o) && o.length === 2 && o.every(isNumber);
}

export function add([a1, a2]: Vec2, [b1, b2]: Vec2): Vec2 {
  return [a1 + b1, a2 + b2];
}

export function sub([a1, a2]: Vec2, [b1, b2]: Vec2): Vec2 {
  return [a1 - b1, a2 - b2];
}

export function mul(a: Vec2, b: Vec2): Vec2;
export function mul(a: Vec2, b: number): Vec2;
export function mul(a: Vec2, b: any): Vec2 {
  if (isVec2(b)) {
    const [a1, a2] = a;
    const [b1, b2] = b;
    return [a1 * b1, a2 * b2];
  }

  if (isNumber(b)) {
    const [a1, a2] = a;
    return [a1 * b, a2 * b];
  }

  throw new Error(`Invalid argument type b ${b} is ${typeof b}`);
}

export function div([x, y]: Vec2, s: number): Vec2 {
  return [x / s, y / s];
}

export function mag([x, y]: Vec2): number {
  return Math.sqrt(x * x + y * y);
}

export function dot([a1, a2]: Vec2, [b1, b2]: Vec2): number {
  return a1 * b1 + a2 * b2;
}

export function cross([a1, a2, a3]: Vec3, [b1, b2, b3]: Vec3): Vec3 {
  // prettier-ignore
  return [
    a2 * b3 - a3 * b2,
    a3 * b1 - a1 * b3,
    a1 * b2 - a2 * b1,
  ];
}

export function rotate(v: Vec2, radian: number): Vec2 {
  const { cos, sin } = Math;
  return [
    dot(v, [cos(radian), -1 * sin(radian)]),
    dot(v, [sin(radian), cos(radian)]),
  ];
}

export function normal(v: Vec2): Vec2 {
  const { max } = Math;
  return div(v, max(1, mag(v)));
}

export function det([top, down]: [Vec2, Vec2]): number {
  const [a, b] = top;
  const [c, d] = down;
  return a * d - b * c;
}
