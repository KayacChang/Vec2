export type Vec2 = [number, number];

export function isVec2(o: any): o is Vec2 {
  return (
    Array.isArray(o) && o.length === 2 && o.every((el) => !Number.isNaN(el))
  );
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

  if (!Number.isNaN(b)) {
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

export function normal(v: Vec2): Vec2 {
  return div(v, mag(v));
}

export function det([top, down]: [Vec2, Vec2]): number {
  const [a, b] = top;
  const [c, d] = down;

  return a * d - b * c;
}
