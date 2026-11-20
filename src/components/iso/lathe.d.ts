import type { Flat, Plane, Point3, Projection, SolidPaths } from "./iso-kit";

export interface Frame3D {
  o: Point3;
  a: Point3;
  u: Point3;
  v: Point3;
}

export type MeridianPoint = [number, number] | [number, number, number];

export const dot3: (a: Point3, b: Point3) => number;
export const add3: (a: Point3, b: Point3) => Point3;
export const sub3: (a: Point3, b: Point3) => Point3;
export const mul3: (a: Point3, k: number) => Point3;
export const len3: (a: Point3) => number;
export const unit3: (a: Point3) => Point3;
export const cross3: (a: Point3, b: Point3) => Point3;
export const lerp3: (a: Point3, b: Point3, t: number) => Point3;

export function viewOf(P: Projection): Point3;
export function lightOf(P: Projection): Point3;
export const scaleOf: (P: Projection) => number;
export function toneOf(normal: Point3, P: Projection): number;
export function frameAlong(o: Point3, a: Point3): Frame3D;
export const frameOf: (o: Point3, a: Point3, u: Point3, v: Point3) => Frame3D;
export function pointOf(F: Frame3D, s: number, r: number, angle: number): Point3;

export function stepsFor(radius: number, least?: number, most?: number, scale?: number): number;

export function solidOf(
  profile: MeridianPoint[],
  F: Frame3D,
  P: Projection,
  options?: {
    steps?: number;
    fill?: "auto" | "surface" | "hull";
    hole?: number | null;
    bevel?: number;
    rims?: "all" | "none" | "ends";
    smooth?: boolean | "auto" | { rows?: number; slope?: (s: number) => number; radius?: (s: number) => number };
    waist?: number;
  },
): SolidPaths;

export function disc(
  s0: number,
  s1: number,
  r: number,
  F: Frame3D,
  P: Projection,
  options?: { steps?: number; bevel?: number; rims?: "all" | "none" | "ends" },
): SolidPaths;

export function ringBand(
  s0: number,
  s1: number,
  rIn: number,
  rOut: number,
  F: Frame3D,
  P: Projection,
  options?: { steps?: number; bevel?: number },
): SolidPaths;

export function sphereOf(centre: Point3, r: number, P: Projection, options?: { steps?: number }): SolidPaths;
export function prismOf(F: Frame3D, polygon: Plane[], s0: number, s1: number, P: Projection): SolidPaths;
export function saddleStart(R: number, a: number, angle: number): number;
export function saddleOf(F: Frame3D, a: number, start: (angle: number) => number, s1: number, P: Projection, options?: { steps?: number }): SolidPaths;

export function arcOf(
  F: Frame3D,
  s: number,
  r: number,
  P: Projection,
  options?: { slope?: number; steps?: number; least?: number; inward?: boolean; from?: number; to?: number; trim?: number },
): string;

export function circleOf(F: Frame3D, s: number, r: number, P: Projection, steps?: number): string;
export function spokesOf(F: Frame3D, s: number, r0: number, r1: number, count: number, P: Projection, options?: { phase?: number; sweep?: number; from?: number; to?: number }): string;
export function ribsOf(
  F: Frame3D,
  s0: number,
  s1: number,
  r: number,
  count: number,
  P: Projection,
  options?: { phase?: number; twist?: number; least?: number; r1?: number; fade?: [number, number] | null; seams?: boolean },
): string | Array<{ d: string; alpha: number }>;
export function rodOut(
  F: Frame3D,
  from: number,
  to: number,
  r: number,
  P: Projection,
  options?: { stroke?: number; steps?: number; bevel?: number; rims?: "all" | "none" | "ends" },
): { paths: SolidPaths; clip: string; from: number; to: number; stroke: number; reach: number };
export function dotsOf(
  F: Frame3D,
  s: number,
  r: number,
  count: number,
  P: Projection,
  options?: { phase?: number; slope?: number; least?: number; all?: boolean; fade?: [number, number] | null },
): Array<Flat | [number, number, number]>;
export function fillet(points: Point3[], radius: number, perArc?: number, options?: { P?: Projection | null; tube?: number; margin?: number }): Point3[];
export function resample(points: Point3[], spacing: number): Point3[];
export function pathLength(points: Point3[]): number;
export function pointAlong(points: Point3[], at: number): Point3;
export function tangentAlong(points: Point3[], at: number): Point3;
export function spiral(F: Frame3D, s: number, r0: number, r1: number, a0: number, a1: number, steps?: number): Point3[];
export function arcPoints(F: Frame3D, s: number, r: number, a0: number, a1: number, steps?: number): Point3[];
