import type { Point3, Projection, Tone } from "./iso-kit";

export interface TubePiece {
  rings: Array<{ d: string; alpha: number }>;
  ringTone: string;
  mid: Point3;
  body: string;
  shine: string;
  shade: string;
  edges: string;
  wide: boolean;
  points: Point3[];
  radii: number[];
  ends: [boolean, boolean];
  from: number;
  to: number;
}

export function crossingsOf(points: Point3[], centre: Point3, axis: Point3, radius: number): number[];

export function tubePieces(
  points3: Point3[],
  radius: number | ((u: number) => number),
  P: Projection,
  options?: {
    maxLength?: number;
    spacing?: number;
    closed?: boolean;
    breaks?: number[];
    gaps?: Array<[number, number]>;
    caps?: boolean | [boolean, boolean];
    stripes?: "auto" | boolean;
    rings?: {
      pitch?: number;
      twist?: number;
      cross?: boolean;
      fade?: [number, number];
      phase?: number;
      steps?: number;
      tone?: Tone;
    } | null;
  },
): TubePiece[];

export function tubeSvg(piece: TubePiece, options?: { tone?: Tone }): string;
export function ringsSvg(rings: Array<{ d: string; alpha: number }>, tone?: Tone): string;
