import * as k from "../../iso/iso-kit";
import * as G from "../../iso/lathe";

export const WIDTH = 1120;
export const HEIGHT = 408;
export const AZIMUTH = 66;
export const ELEVATION = 24;

export const MAIN_BASE: k.Plan = { x: -315, y: -56, w: 630, d: 112, r: 9 };
export const ANNEX_BASE: k.Plan = { x: 112, y: -98, w: 196, d: 42, r: 7 };
export const SKID_BASE: k.Plan = { x: -306, y: 56, w: 194, d: 46, r: 7 };

export const BASE_H = 10;
export const FOOT_H = 5.5;
export const WING_TOP = -1.5;

export const P = k.fitProjection(
  [
    ...k.boxCorners(MAIN_BASE, -BASE_H - FOOT_H, 0),
    ...k.boxCorners(ANNEX_BASE, -BASE_H - FOOT_H, 96),
    ...k.boxCorners(SKID_BASE, -BASE_H - FOOT_H, 40),
    [-278, -22, 64],
    [-4, -10, 82],
    [130, -10, 72],
  ],
  WIDTH,
  HEIGHT,
  { pad: 14, azimuth: AZIMUTH, elevation: ELEVATION },
);

export const V = G.viewOf(P);
export const at = (p: k.Point3) => k.iso(p, P);
export const S = (paths: k.SolidPaths, style?: Parameters<typeof k.solidSvg>[1]) => k.solidSvg(paths, style);
export const L = (d: string, style?: Parameters<typeof k.lineSvg>[1]) => k.lineSvg(d, style);
export const D = (pts: Array<k.Flat | [number, number, number]>, style?: Parameters<typeof k.dotsSvg>[1]) => k.dotsSvg(pts, style);
export const Faded = (list: k.Faded[], style?: Parameters<typeof k.lineSvg>[1]) => k.fadedSvg(list, style);

export const depthOf = (p: k.Point3) => k.depthOf(p, P);

// Bay 1: Fluid Loop & Skid Motor
export const ACC_CENTER: [number, number] = [-278, -22];
export const PUMP_AXIS_Y = 79;
export const PUMP_AXIS_Z = 15;
export const PUMP_ORIGIN: k.Point3 = [-292, PUMP_AXIS_Y, PUMP_AXIS_Z];

// Bay 2: Differential Gearbox & Live Crank-Piston
export const FLY_CENTER: [number, number] = [-142, -12];
export const FLY_R = 21;
export const PINION_CENTER: [number, number] = [-116.2, 8.6]; // Exact pitch distance = 33 = 21 + 12
export const PINION_R = 12;
export const GOV_CENTER: [number, number] = [-150, 24];
export const CRANK_R = 11;
export const PISTON_Y = -12;
export const PISTON_Z = 16;
export const CONROD_LEN = 38;

// Bay 3: Oscilloscope Console
export const SCOPE_FRONT_Y = 12;
export const SCOPE_BEZEL = { x0: -46, x1: 20, z0: 28, z1: 70, r: 5, depth: 1.6 };
export const SCOPE_CRT = { x0: -40, x1: 14, z0: 34, z1: 64, r: 5.5, depth: 4.2 };

// Bay 4: Modular Compute Blade Cage
export const BLADE_XS = [84, 99, 114, 129, 144, 159];

// Bay 5: Gauges & Motorized Strip-Chart Drum
export const DIAL_1: [number, number] = [222, -26];
export const DIAL_1_R = 16;
export const DIAL_1_Z = 34;
export const DIAL_2: [number, number] = [272, -24];
export const DIAL_2_R = 12.5;
export const DIAL_2_Z = 31;
export const DRUM_X = 228;
export const DRUM_Y0 = 4;
export const DRUM_Y1 = 32;
export const DRUM_Z = 27.5;
export const DRUM_R = 10;
