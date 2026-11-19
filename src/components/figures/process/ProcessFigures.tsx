"use client";

import * as React from "react";
import * as k from "../../iso/iso-kit";
import { useInView } from "../../iso/react/live";

const W = 480;
const H = 310;
const PLATE: k.Plan = { x: -102, y: -58, w: 204, d: 116, r: 8 };
const PLATE_H = 10;
const FOOT_H = 4.5;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), [-90, -45, 102], [90, 45, 96]],
  W,
  H,
  { pad: 22, azimuth: 44, elevation: 30 },
);

const at = (p: k.Point3) => k.iso(p, P);
const S = (paths: k.SolidPaths, style?: Parameters<typeof k.solidSvg>[1]) => k.solidSvg(paths, style);
const L = (d: string, style?: Parameters<typeof k.lineSvg>[1]) => k.lineSvg(d, style);
const D = (pts: k.Flat[], style?: Parameters<typeof k.dotsSvg>[1]) => k.dotsSvg(pts, style);
const byDepth = (pts: k.Plane[]) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

function benchPlateSvg(rulerWidth = 156, labelX = 48) {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [fx, fy] of byDepth(k.corners(PLATE, 18))) {
    out.push(S(k.cylinder(fx, fy, 6.2, -PLATE_H - FOOT_H, 1.5, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(fx, fy, 4.8, -PLATE_H - FOOT_H + 1.5, FOOT_H - 1.5, P, 24), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid", inner: L(k.sideSeam(PLATE, -4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 4.5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.0, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.48 }));

  const strip: k.Plan = { x: -88, y: PLATE.y + PLATE.d - 13, w: rulerWidth, d: 6, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.6, 0.6, [1.8, 3.2], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  const label: k.Plan = { x: labelX, y: PLATE.y + PLATE.d - 15, w: 38, d: 9, r: 1.2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.3), 0.8, P, 3), { tone: "faint" }));
  out.push(L([24, 16].map((w, i) => k.lineOnTop([label.x + 3.5, label.y + 3 + i * 2.8], [label.x + 3.5 + w, label.y + 3 + i * 2.8], 0.8, P)).join(""), { tone: "lo", free: true }));
  return out.join("");
}

/* ============================================================================
   01. DISCOVER — Precision Dial Indicator & Stepped Gauge Blocks Rig
   ============================================================================ */
const DISC_DIAL: [number, number] = [44, 0];
const DISC_R = 17.5;
const DISC_Z = 68;
const DISC_TOP = 77;
const DISC_BLOCKS = [17, 13, 9];
const DISC_STEP = 14.5;
const DISC_BW = 14;

const DISCOVER_STATIC = (() => {
  const out = [benchPlateSvg(124, 48)];
  // Rails & end stops
  for (const ry of [-18, 13]) {
    out.push(S(k.slabOf({ x: -6, y: ry, w: 94, d: 4.5, r: 1 }, 0, 2.8, P, 3, 0.4), { tone: "mid" }));
  }
  for (const rx of [-11, 88]) {
    out.push(S(k.slabOf({ x: rx, y: -20, w: 5, d: 40, r: 1.2 }, 0, 6.5, P, 3, 0.4), { tone: "mid" }));
    out.push(D([at([rx + 2.5, -15, 6.5]), at([rx + 2.5, 15, 6.5])], { size: 0.42 }));
  }
  // Magnetic base & post
  const mag: k.Plan = { x: -86, y: -18, w: 38, d: 36, r: 3 };
  out.push(S(k.slabOf(mag, 0, 10, P, 5, 0.7), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(mag, 0.8), 10, 11, P, 5, 0.7), { tone: "mid" }));
  out.push(S(k.cylinder(-60, 10, 5.2, 21, 3.6, P, 28), { tone: "mid" }));
  out.push(L(k.knurl(-60, 10, 5.2, 21, 24.6, 28, P), { tone: "lo" }));
  out.push(S(k.cylinder(-74, 0, 4.4, 21, 3.5, P, 24), { tone: "mid" }));
  out.push(S(k.cylinder(-74, 0, 3.0, 24.5, 56, P, 24), { tone: "mid", crease: "none" }));
  out.push(S(k.slabOf({ x: -80, y: -6, w: 12, d: 12, r: 2 }, 78, 10, P, 4, 0.5), { tone: "mid" }));
  out.push(S(k.cylinder(-74, 0, 3.0, 88, 12, P, 24), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(-74, 0, 3.6, 100, 2, P, 24), { tone: "mid" }));
  out.push(S(k.slabOf({ x: -68, y: -2.6, w: DISC_DIAL[0] - DISC_R + 68 + 2, d: 5.2, r: 1.8 }, 81, 3.8, P, 3, 0.4), { tone: "mid" }));
  return out.join("");
})();

const DISCOVER_CARRIAGE = (() => {
  const car: k.Plan = { x: -24, y: -21, w: 48, d: 42, r: 2.8 };
  const out = [S(k.slabOf(car, 2.8, 4.5, P, 4, 0.5), { tone: "mid" })];
  DISC_BLOCKS.forEach((h, i) => {
    const bp: k.Plan = { x: -21 + DISC_STEP * i, y: -10.5, w: DISC_BW, d: 21, r: 1 };
    out.push(S(k.slabOf(bp, 7.3, h, P, 3, 0.4), { tone: "hi", crease: "lo" }));
    out.push(L(k.planOutline(k.insetPlan(bp, 1.8), 7.3 + h, P, 3), { tone: "faint" }));
  });
  return out.join("");
})();

const DISCOVER_PLUNGER = (() => {
  return (
    S(k.cylinder(DISC_DIAL[0], DISC_DIAL[1], 2.4, 0, 2.2, P, 20), { tone: "hi", lit: true }) +
    S(k.cylinder(DISC_DIAL[0], DISC_DIAL[1], 1.3, 2.2, 42, P, 16), { tone: "hi", crease: "none", lit: true })
  );
})();

const DISCOVER_DIAL = (() => {
  const [dx, dy] = DISC_DIAL;
  const out = [
    S(k.cylinder(dx, dy, 2.6, 46, DISC_Z - 46, P, 20), { tone: "mid" }),
    S(k.slabOf({ x: dx - DISC_R - 5, y: -3.5, w: 7, d: 7, r: 1.4 }, DISC_Z + 2, 13, P, 3, 0.4), { tone: "mid" }),
    S(k.cylinder(dx, dy, DISC_R, DISC_Z, 9, P, 56, 0.7), { tone: "hi", crease: "lo" }),
    L(k.knurl(dx, dy, DISC_R, DISC_TOP - 3, DISC_TOP, 72, P, 0.3), { tone: "lo" }),
    L(k.ring(dx, dy, DISC_R - 2, DISC_TOP, P, 56), { tone: "lo" }),
  ];
  const ticks = k.radialTicks(dx, dy, DISC_R - 2.6, 40, 5, DISC_TOP, [1.2, 2.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(dx, dy, 1.4, DISC_TOP, P, 16), { tone: "mid" }));
  return out.join("");
})();

const discNeedleAt = (turn: number) => {
  const a = turn * Math.PI * 2;
  const [dx, dy] = DISC_DIAL;
  return k.lineOnTop([dx - Math.sin(a) * 3, dy + Math.cos(a) * 3], [dx + Math.sin(a) * (DISC_R - 3.6), dy - Math.cos(a) * (DISC_R - 3.6)], DISC_TOP + 0.2, P);
};

/* ============================================================================
   02. DESIGN — Precision Pantograph XY Drafting Plotter Table
   ============================================================================ */
const DESIGN_STATIC = (() => {
  const out = [benchPlateSvg(130, 52)];
  // Drafting Canvas Bed
  const bed: k.Plan = { x: -72, y: -36, w: 124, d: 68, r: 3.5 };
  out.push(S(k.slabOf(bed, 0, 5.5, P, 5, 0.6), { tone: "hi", crease: "lo" }));
  const sheet = k.insetPlan(bed, 5);
  out.push(L(k.planOutline(sheet, 5.5, P, 4), { tone: "lo" }));
  // Isometric blueprint grid & Bezier vector curve on sheet
  const grid: string[] = [];
  for (let gx = sheet.x + 14; gx < sheet.x + sheet.w - 4; gx += 14) grid.push(k.lineOnTop([gx, sheet.y], [gx, sheet.y + sheet.d], 5.5, P));
  for (let gy = sheet.y + 11.6; gy < sheet.y + sheet.d - 3; gy += 11.6) grid.push(k.lineOnTop([sheet.x, gy], [sheet.x + sheet.w, gy], 5.5, P));
  out.push(L(grid.join(""), { tone: "faint" }));
  // Architectural wireframe rects on drafting table
  out.push(L(k.planOutline({ x: -56, y: -22, w: 42, d: 38, r: 2 }, 5.5, P, 3), { tone: "mid" }));
  out.push(L(k.planOutline({ x: -6, y: -22, w: 44, d: 17, r: 2 }, 5.5, P, 3), { tone: "mid" }));
  out.push(L(k.planOutline({ x: -6, y: -1, w: 44, d: 17, r: 2 }, 5.5, P, 3), { tone: "lo" }));
  out.push(L(k.ring(-35, -3, 11, 5.5, P, 32), { tone: "lit" }));
  // Back & front gantry guide tracks
  out.push(S(k.slabOf({ x: -78, y: -44, w: 136, d: 5.5, r: 1.2 }, 0, 14, P, 3, 0.5), { tone: "mid" }));
  out.push(S(k.slabOf({ x: -78, y: 34, w: 136, d: 5.5, r: 1.2 }, 0, 9, P, 3, 0.5), { tone: "mid" }));
  // Right rotary proportion scale dial
  out.push(S(k.cylinder(74, -10, 14, 0, 8, P, 44, 0.6), { tone: "mid" }));
  const dt = k.radialTicks(74, -10, 11.8, 32, 4, 8, [1.1, 2.2], P);
  out.push(L(dt.minor, { tone: "lo" }), L(dt.major, { tone: "mid" }));
  out.push(S(k.cylinder(74, -10, 5.5, 8, 5, P, 28, 0.3), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(74, -10, 5.5, 8, 13, 24, P), { tone: "lo" }));
  return out.join("");
})();

const DESIGN_BRIDGE = (() => {
  // Moving X-bridge spanning y = -44..38 at x = 0
  const out = [
    S(k.slabOf({ x: -7, y: -45, w: 14, d: 8.5, r: 1.8 }, 14, 7, P, 3, 0.5), { tone: "mid" }),
    S(k.slabOf({ x: -4.2, y: -38, w: 8.4, d: 74, r: 1.4 }, 16, 4.5, P, 3, 0.4), { tone: "mid" }),
    S(k.slabOf({ x: -6, y: 33, w: 12, d: 7.5, r: 1.6 }, 9, 10, P, 3, 0.5), { tone: "mid" }),
  ];
  const ticks = k.topTicks(-32, 28, 4, 5, -3.5, 20.5, [1.4, 2.6], P, "y");
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  return out.join("");
})();

const DESIGN_HEAD = (() => {
  // Stylus carriage riding on bridge at (0, 0)
  return [
    S(k.slabOf({ x: -7.5, y: -7.5, w: 15, d: 15, r: 2 }, 15, 9, P, 4, 0.5), { tone: "hi", crease: "lo" }),
    S(k.cylinder(0, 0, 3.6, 24, 7, P, 24, 0.3), { tone: "mid" }),
    L(k.knurl(0, 0, 3.6, 24, 31, 20, P), { tone: "lo" }),
    S(k.cylinder(0, 0, 1.6, 5.6, 10, P, 18), { tone: "hi", lit: true }),
  ].join("");
})();

/* ============================================================================
   03. BUILD — Modular Desk Computer & Mechanical Key Matrix
   ============================================================================ */
const BUILD_CASE: k.Plan = { x: -68, y: -44, w: 92, d: 52, r: 6 };
const BUILD_FRONT = BUILD_CASE.y + BUILD_CASE.d; // 8
const BUILD_KEY_PLANS: k.Plan[] = [];
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 6; c++) {
    BUILD_KEY_PLANS.push({ x: -58 + c * 13.5, y: 16 + r * 11.5, w: 11.5, d: 9.8, r: 1.5 });
  }
}

const BUILD_STATIC = (() => {
  const out = [benchPlateSvg(124, 48)];
  // Plinth & tall computer case
  out.push(S(k.slabOf(k.insetPlan(BUILD_CASE, 3), 0, 4, P, 6), { tone: "lo" }));
  out.push(S(k.slabOf(BUILD_CASE, 4, 74, P, 6, 1.4), { tone: "hi", crease: "lo", inner: L(k.sideSeam(BUILD_CASE, 24, P, 6), { tone: "faint" }) }));
  // Top vents
  out.push(L(Array.from({ length: 6 }, (_, i) => k.planOutline({ x: -52, y: -34 + i * 4.2, w: 60, d: 1.6, r: 0.8 }, 78, P, 3)).join(""), { tone: "faint" }));
  // Front CRT bezel frame on y = BUILD_FRONT
  const scrPts = [[-56, 30], [12, 30], [12, 70], [-56, 70]] as const;
  out.push(L(k.pathOf(scrPts.map(([x, z]) => at([x, BUILD_FRONT, z])), true), { tone: "lo" }));
  const inPts = [[-52, 34], [8, 34], [8, 66], [-52, 66]] as const;
  out.push(`<path class="iso-shade" data-shade="0" d="${k.pathOf(inPts.map(([x, z]) => at([x, BUILD_FRONT, z])), true)}"/>`);
  out.push(L(k.pathOf(inPts.map(([x, z]) => at([x, BUILD_FRONT, z])), true), { tone: "mid" }));
  // Mechanical keyboard tray in front
  const kb: k.Plan = { x: -64, y: 12, w: 94, d: 40, r: 3.5 };
  out.push(S(k.slabOf(kb, 0, 5.5, P, 5, 0.7), { tone: "mid" }));
  // Coiled bus harness to expansion drive module on right
  const mod: k.Plan = { x: 38, y: -28, w: 46, d: 62, r: 4 };
  out.push(S(k.slabOf(mod, 0, 22, P, 5, 0.8), { tone: "mid", inner: L(k.sideSeam(mod, 11, P, 5), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(mod, 3.5), 22, P, 4), { tone: "lo" }));
  for (let i = 0; i < 3; i++) {
    out.push(S(k.slabOf({ x: 45, y: -20 + i * 16, w: 32, d: 11, r: 1.8 }, 22, 4.5, P, 3, 0.4), { tone: "hi", crease: "lo" }));
  }
  const sp = k.coil(24, 38, [-8, 7], 3.2, 9, "x", P);
  out.push(L(sp.back, { tone: "lo" }), L(sp.front, { tone: "mid" }));
  return out.join("");
})();

const BUILD_KEYS = BUILD_KEY_PLANS.map((plan, idx) => ({
  idx,
  svg: S(k.slabOf(plan, 5.5, 4.2, P, 3, 0.3), { tone: idx % 5 === 0 ? "hi" : "mid", lit: idx === 7 }),
}));

/* ============================================================================
   04. LAUNCH — Dual-Column Pneumatic Valve & Thrust Pressure Test Stand
   ============================================================================ */
const LAUNCH_STATIC = (() => {
  const out = [benchPlateSvg(124, 48)];
  // Test stand columns & overhead bridge
  for (const px of [-54, 18]) {
    out.push(S(k.slabOf({ x: px - 9, y: -16, w: 18, d: 18, r: 2.2 }, 0, 8, P, 4, 0.5), { tone: "mid" }));
    out.push(S(k.cylinder(px, -7, 4.2, 8, 66, P, 24), { tone: "mid", crease: "none" }));
    out.push(L([28, 48, 64].map((z) => k.sideArc(px, -7, 4.2, z, P, 16)).join(""), { tone: "faint" }));
    out.push(S(k.slabOf({ x: px - 7, y: -14, w: 14, d: 14, r: 2 }, 72, 10, P, 4, 0.5), { tone: "mid" }));
  }
  out.push(S(k.slabOf({ x: -47, y: -13, w: 58, d: 12, r: 2 }, 73, 8, P, 4, 0.6), { tone: "mid" }));
  // Thrust chamber & stepped nozzle bell hanging from bridge at (-18, -7)
  out.push(S(k.cylinder(-18, -7, 15, 52, 21, P, 44, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(-18, -7, 15, 55, 70, 48, P), { tone: "faint" }));
  out.push(S(k.cylinder(-18, -7, 11.5, 42, 10, P, 36), { tone: "mid" }));
  out.push(S(k.cylinder(-18, -7, 17, 24, 18, P, 48, 0.6), { tone: "hi", crease: "lo" }));
  out.push(S(k.cylinder(-18, -7, 20.5, 14, 10, P, 52, 0.6), { tone: "hi", crease: "lo" }));
  // Blast flame deflector pit on base under nozzle
  out.push(S(k.cylinder(-18, -7, 24, 0, 3.5, P, 52, 0.4), { tone: "lo" }));
  out.push(L(k.ring(-18, -7, 19, 3.5, P, 44), { tone: "lo" }));
  // Right Telemetry & Pressure Gauge Manifold Block
  const man: k.Plan = { x: 36, y: -26, w: 48, d: 54, r: 4 };
  out.push(S(k.slabOf(man, 0, 18, P, 5, 0.7), { tone: "mid" }));
  out.push(S(k.cylinder(60, 0, 16, 18, 8, P, 48, 0.6), { tone: "hi", crease: "lo" }));
  const gt = k.radialTicks(60, 0, 13.5, 36, 5, 26, [1.2, 2.4], P);
  out.push(L(gt.minor, { tone: "lo" }), L(gt.major, { tone: "mid" }));
  out.push(L(k.ring(60, 0, 1.5, 26, P, 16), { tone: "mid" }));
  return out.join("");
})();

const LAUNCH_ACTUATOR = (() => {
  // Moving valve actuator piston & lit thrust ring above bridge at (-18, -7)
  return [
    S(k.cylinder(-18, -7, 8.5, 82, 11, P, 32, 0.5), { tone: "hi", lit: true }),
    L(k.knurl(-18, -7, 8.5, 83, 92, 28, P), { tone: "lo" }),
    S(k.cylinder(-18, -7, 3.5, 93, 6, P, 24, 0.3), { tone: "mid" }),
  ].join("");
})();

const launchNeedleAt = (turn: number) => {
  const a = turn * Math.PI * 2;
  return k.lineOnTop([60 - Math.sin(a) * 2.8, Math.cos(a) * 2.8], [60 + Math.sin(a) * 11.5, -Math.cos(a) * 11.5], 26.2, P);
};

/* ============================================================================
   05. IMPROVE — 4-Channel Harmonic Equalizer & Wave Drum Recorder
   ============================================================================ */
const IMP_FADERS = [-64, -44, -24, -4];

const IMPROVE_STATIC = (() => {
  const out = [benchPlateSvg(124, 48)];
  // Left 4-channel fader console deck
  const deck: k.Plan = { x: -82, y: -34, w: 96, d: 66, r: 4 };
  out.push(S(k.slabOf(deck, 0, 12, P, 5, 0.7), { tone: "mid", inner: L(k.sideSeam(deck, 6, P, 5), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(deck, 3.5), 12, P, 4), { tone: "faint" }));
  for (const fx of IMP_FADERS) {
    const slot: k.Plan = { x: fx - 1.5, y: -22, w: 3, d: 42, r: 1.2 };
    out.push(L(k.planOutline(slot, 12, P, 3), { tone: "lo" }));
    const ticks = k.topTicks(-18, 16, 4, 4, fx + 2.5, 12, [1.4, 2.5], P, "y");
    out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  }
  // Right Telemetry Chart Platen & Rotary Drum
  const chart: k.Plan = { x: 24, y: -34, w: 62, d: 66, r: 4 };
  out.push(S(k.slabOf(chart, 0, 16, P, 5, 0.7), { tone: "hi", crease: "lo" }));
  const win = k.insetPlan(chart, 5.5);
  out.push(L(k.planOutline(win, 16, P, 4), { tone: "lo" }));
  const grid: string[] = [];
  for (let gx = win.x + 10; gx < win.x + win.w - 3; gx += 10) grid.push(k.lineOnTop([gx, win.y], [gx, win.y + win.d], 16, P));
  for (let gy = win.y + 11; gy < win.y + win.d - 3; gy += 11) grid.push(k.lineOnTop([win.x, gy], [win.x + win.w, gy], 16, P));
  out.push(L(grid.join(""), { tone: "faint" }));
  return out.join("");
})();

const IMPROVE_KNOBS = IMP_FADERS.map((fx, i) => ({
  fx,
  svg: S(k.slabOf({ x: fx - 5.5, y: -5, w: 11, d: 10, r: 1.8 }, 12, 6.5, P, 3, 0.4), { tone: "hi", crease: "lo", lit: i === 1 }) +
       L(k.lineOnTop([fx - 4, 0], [fx + 4, 0], 18.6, P), { tone: i === 1 ? "lit" : "hi" }),
}));

/* ============================================================================
   06. HAK MILIK PENUH — Precision Pin-Tumbler Vault Lock & Master Key Rig
   ============================================================================ */
const OWN_PINS = [-44, -28, -12, 4, 20];

const OWNERSHIP_STATIC = (() => {
  const out = [benchPlateSvg(124, 48)];
  // Heavy Vault Lock Block cutaway housing
  const body: k.Plan = { x: -64, y: -26, w: 104, d: 50, r: 4.5 };
  out.push(S(k.slabOf(body, 0, 14, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(body, 7, P, 6), { tone: "faint" }) }));
  // Upper transparent/cutaway Bible Frame holding 5 pin chambers
  const bible: k.Plan = { x: -56, y: -14, w: 88, d: 26, r: 3 };
  out.push(S(k.slabOf(bible, 14, 34, P, 5, 0.7), { tone: "hi", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(bible, 3), 48, P, 4), { tone: "lo" }));
  // 5 Top Cap Plugs & Bore Rings
  for (const px of OWN_PINS) {
    out.push(S(k.cylinder(px, -1, 4.2, 48, 3, P, 24, 0.3), { tone: "mid" }));
    out.push(L(k.ring(px, -1, 2.4, 51, P, 16), { tone: "lo" }));
  }
  // Right Torque Seal Wheel & Deadbolt Receiver
  out.push(S(k.cylinder(64, -1, 18, 0, 12, P, 48, 0.7), { tone: "mid" }));
  const wt = k.radialTicks(64, -1, 15.2, 36, 4, 12, [1.2, 2.4], P);
  out.push(L(wt.minor, { tone: "lo" }), L(wt.major, { tone: "mid" }));
  out.push(S(k.cylinder(64, -1, 8, 12, 7, P, 32, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(64, -1, 8, 12, 19, 28, P), { tone: "lo" }));
  return out.join("");
})();

const OWNERSHIP_KEY = (() => {
  // Sliding Master Key Blade & Bow entering from left (-88..-52)
  const out = [
    // Key bow handle
    S(k.cylinder(-78, -1, 13, 16, 5, P, 36, 0.5), { tone: "hi", lit: true }),
    L(k.ring(-78, -1, 6.5, 21, P, 24), { tone: "lo" }),
    // Key collar & serrated blade shaft
    S(k.slabOf({ x: -67, y: -5, w: 22, d: 8, r: 1.2 }, 17, 3.5, P, 3, 0.3), { tone: "hi", lit: true }),
  ];
  return out.join("");
})();

const OWNERSHIP_PINS = OWN_PINS.map((px, i) => ({
  px,
  svg:
    S(k.cylinder(px, -1, 3.4, 51, 9, P, 20, 0.3), { tone: "hi", lit: i === 2 }) +
    L(k.sideArc(px, -1, 3.4, 55, P, 14), { tone: "lo" }),
}));

/* ============================================================================
   LIVE INTERACTIVE COMPONENT FOR ALL 6 PROCESS MACHINES
   ============================================================================ */
export type ProcessVariant = "discover" | "design" | "build" | "launch" | "improve" | "ownership";

export function ProcessCardFigure({ variant }: { variant: ProcessVariant }) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);

  React.useEffect(() => {
    const stage = rootRef.current;
    if (!stage || !visible) return;
    const svg = stage.querySelector("svg");
    if (!svg) return;

    let frame = 0;
    let last = 0;
    let clock = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      pointerX = Math.min(1, Math.max(0, (e.clientX - box.left) / box.width));
      pointerY = Math.min(1, Math.max(0, (e.clientY - box.top) / box.height));
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);

    // Query movable elements
    const carEl = svg.querySelector('[data-part="car"]');
    const subEl = svg.querySelector('[data-part="sub"]');
    const needleEl = svg.querySelector('[data-part="needle"]');
    const waveEl = svg.querySelector('[data-part="wave"]');
    const items = Array.from(svg.querySelectorAll('[data-part^="item-"]'));

    let curA = 0;
    let curB = 0;

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      clock += dt;

      if (variant === "discover") {
        const stops = [65, 50.5, 36];
        const targetX = hovering ? 34 + pointerX * 34 : stops[Math.floor(clock / 1.6) % 3]!;
        curA += (targetX - curA) * (1 - Math.exp(-dt / 0.18));
        // Compute block height under dial at x = 44
        let h = 7.3;
        DISC_BLOCKS.forEach((bh, idx) => {
          const from = curA - 21 + DISC_STEP * idx;
          if (DISC_DIAL[0] >= from - 2 && DISC_DIAL[0] <= from + DISC_BW + 2) h = Math.max(h, 7.3 + bh);
        });
        curB += (h - curB) * (1 - Math.exp(-dt / 0.1));
        carEl?.setAttribute("transform", k.translateAlong(P, [curA, 0, 0]));
        subEl?.setAttribute("transform", k.translateAlong(P, [0, 0, curB]));
        needleEl?.setAttribute("d", discNeedleAt((curB - 7.3) / 22));
      } else if (variant === "design") {
        const tx = hovering ? -45 + pointerX * 75 : Math.sin(clock * 1.4) * 34 - 8;
        const ty = hovering ? -20 + pointerY * 40 : Math.cos(clock * 2.1) * 18 - 2;
        curA += (tx - curA) * (1 - Math.exp(-dt / 0.16));
        curB += (ty - curB) * (1 - Math.exp(-dt / 0.16));
        carEl?.setAttribute("transform", k.translateAlong(P, [curA, 0, 0]));
        subEl?.setAttribute("transform", k.translateAlong(P, [0, curB, 0]));
        // Dynamic vector trace on drafting bed
        const pts: k.Plane[] = [];
        for (let i = 0; i <= 24; i++) {
          const u = i / 24;
          const px = -60 + u * 100;
          const py = -2 + Math.sin(u * Math.PI * 2.5 + clock * 2.2) * 14;
          pts.push([px, py]);
        }
        waveEl?.setAttribute("d", k.onTop(pts, 5.6, P));
      } else if (variant === "build") {
        const activeKey = hovering
          ? Math.floor(pointerX * BUILD_KEYS.length) % BUILD_KEYS.length
          : Math.floor(clock * 7) % BUILD_KEYS.length;
        items.forEach((el, idx) => {
          const down = idx === activeKey || idx === (activeKey + 5) % BUILD_KEYS.length ? -2.2 : 0;
          el.setAttribute("transform", k.translateAlong(P, [0, 0, down]));
        });
        // Live CRT code waveform line
        const w = 14 + ((Math.sin(clock * 3.5) + 1) * 0.5) * 34;
        waveEl?.setAttribute("d", k.pathOf([at([-46, BUILD_FRONT, 54]), at([-46 + w, BUILD_FRONT, 54])]));
      } else if (variant === "launch") {
        const lift = hovering ? pointerY * 8 : (Math.sin(clock * 2.8) + 1) * 3.8;
        curA += (lift - curA) * (1 - Math.exp(-dt / 0.12));
        carEl?.setAttribute("transform", k.translateAlong(P, [0, 0, curA]));
        needleEl?.setAttribute("d", launchNeedleAt(0.15 + curA * 0.08));
      } else if (variant === "improve") {
        items.forEach((el, idx) => {
          const targetY = hovering
            ? (pointerX - 0.5) * 24 * (idx % 2 === 0 ? 1 : -1)
            : Math.sin(clock * 2.2 + idx * 1.3) * 13;
          el.setAttribute("transform", k.translateAlong(P, [0, targetY, 0]));
        });
        const pts: k.Plane[] = [];
        for (let i = 0; i <= 24; i++) {
          const u = i / 24;
          const wx = 30 + u * 50;
          const wy = -1 + Math.sin(u * Math.PI * 3 - clock * 3.2) * 15 * Math.exp(-Math.pow(u - 0.5, 2) * 2.5);
          pts.push([wx, wy]);
        }
        waveEl?.setAttribute("d", k.onTop(pts, 16.1, P));
      } else if (variant === "ownership") {
        const slideX = hovering ? pointerX * 14 : (Math.sin(clock * 2.0) + 1) * 6.5;
        curA += (slideX - curA) * (1 - Math.exp(-dt / 0.14));
        carEl?.setAttribute("transform", k.translateAlong(P, [curA, 0, 0]));
        items.forEach((el, idx) => {
          const bitting = Math.sin(curA * 0.45 + idx * 1.4) * 3.2 + 2.5;
          el.setAttribute("transform", k.translateAlong(P, [0, 0, bitting]));
        });
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [visible, variant]);

  const innerSvg = React.useMemo(() => {
    if (variant === "discover") {
      return (
        DISCOVER_STATIC +
        `<g data-part="car" transform="${k.translateAlong(P, [65, 0, 0])}">${DISCOVER_CARRIAGE}</g>` +
        `<g data-part="sub" transform="${k.translateAlong(P, [0, 0, 24.3])}">${DISCOVER_PLUNGER}</g>` +
        DISCOVER_DIAL +
        `<path data-part="needle" class="iso-line" data-tone="lit" d="${discNeedleAt(17 / 22)}" style="stroke-width:1.15"/>`
      );
    }
    if (variant === "design") {
      return (
        DESIGN_STATIC +
        `<path data-part="wave" class="iso-line" data-tone="lit" d="${k.lineOnTop([-55, 0], [35, 0], 5.6, P)}" style="stroke-width:1.1"/>` +
        `<g data-part="car">${DESIGN_BRIDGE}<g data-part="sub">${DESIGN_HEAD}</g></g>`
      );
    }
    if (variant === "build") {
      return (
        BUILD_STATIC +
        `<path data-part="wave" class="iso-line" data-tone="lit" d="${k.pathOf([at([-46, BUILD_FRONT, 54]), at([-12, BUILD_FRONT, 54])])}" style="stroke-width:1.3"/>` +
        `<path class="iso-line" data-tone="hi" d="${k.pathOf([at([-46, BUILD_FRONT, 46]), at([-22, BUILD_FRONT, 46])])}"/>` +
        BUILD_KEYS.map((item) => `<g data-part="item-${item.idx}">${item.svg}</g>`).join("")
      );
    }
    if (variant === "launch") {
      return (
        LAUNCH_STATIC +
        `<g data-part="car">${LAUNCH_ACTUATOR}</g>` +
        `<path data-part="needle" class="iso-line" data-tone="lit" d="${launchNeedleAt(0.25)}" style="stroke-width:1.15"/>`
      );
    }
    if (variant === "improve") {
      return (
        IMPROVE_STATIC +
        IMPROVE_KNOBS.map((kItem, i) => `<g data-part="item-${i}">${kItem.svg}</g>`).join("") +
        `<path data-part="wave" class="iso-line" data-tone="lit" d="${k.lineOnTop([30, -1], [80, -1], 16.1, P)}" style="stroke-width:1.15"/>`
      );
    }
    return (
      OWNERSHIP_STATIC +
      `<g data-part="car">${OWNERSHIP_KEY}</g>` +
      OWNERSHIP_PINS.map((pItem, i) => `<g data-part="item-${i}">${pItem.svg}</g>`).join("")
    );
  }, [variant]);

  return (
    <div className="iso iso-card-stage iso-plate" data-theme="light">
      <div
        ref={rootRef}
        className="iso-stage sp-card-stage"
        dangerouslySetInnerHTML={{
          __html: `<svg class="iso-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Interactive isometric process machine">${innerSvg}</svg>`,
        }}
      />
    </div>
  );
}
