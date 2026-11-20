"use client";

import * as React from "react";
import * as k from "../../iso/iso-kit";
import { useInView } from "../../iso/react/live";

const WIDTH = 1040;
const HEIGHT = 320;
const AZIMUTH = 54;
const ELEVATION = 30;

const BASE: k.Plan = { x: -260, y: -62, w: 520, d: 124, r: 10 };
const BASE_H = 10;
const FOOT_H = 5;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -BASE_H - FOOT_H, 0),
    [-250, -58, 80],
    [250, 58, 76],
  ],
  WIDTH,
  HEIGHT,
  { pad: 18, azimuth: AZIMUTH, elevation: ELEVATION },
);

const at = (p: k.Point3) => k.iso(p, P);
const S = (paths: k.SolidPaths, style?: Parameters<typeof k.solidSvg>[1]) => k.solidSvg(paths, style);
const L = (d: string, style?: Parameters<typeof k.lineSvg>[1]) => k.lineSvg(d, style);
const D = (pts: k.Flat[], style?: Parameters<typeof k.dotsSvg>[1]) => k.dotsSvg(pts, style);
const byDepth = (pts: k.Plane[]) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// Station Coordinates
const GEAR_1: [number, number] = [-204, -14];
const GEAR_2: [number, number] = [-174, 14];
const PRESS_CX = -48;
const PRESS_CY = 0;
const SCANNER_CX = 44;
const DIAL_1: [number, number] = [184, -16];
const DIAL_1_R = 21;
const DIAL_2: [number, number] = [222, -18];
const DIAL_2_R = 13;

const STATIC_BACK = (() => {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];

  // 10 Heavy Support Feet beneath Base
  const footPositions: k.Plane[] = [
    [-240, -46], [-120, -46], [0, -46], [120, -46], [240, -46],
    [-240, 46], [-120, 46], [0, 46], [120, 46], [240, 46],
  ];
  for (const [fx, fy] of byDepth(footPositions)) {
    out.push(S(k.cylinder(fx, fy, 7.5, -BASE_H - FOOT_H, 1.8, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(fx, fy, 5.6, -BASE_H - FOOT_H + 1.8, FOOT_H - 1.8, P, 28), { tone: "mid" }));
  }

  // Heavy Ground Surface Plate
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(BASE, -4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5.5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // Front Precision Scale Strip across the entire bench
  const strip: k.Plan = { x: -230, y: BASE.y + BASE.d - 14, w: 460, d: 6.5, r: 1.2 };
  out.push(S(k.slabOf(strip, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.6, 0.8, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  // Laser Engraved Specifications Rating Plate
  const specPlate: k.Plan = { x: -36, y: BASE.y + BASE.d - 16, w: 72, d: 10, r: 1.5 };
  out.push(S(k.slabOf(specPlate, 0, 0.9, P, 3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(specPlate, 1.6), 0.9, P, 3), { tone: "faint" }));
  out.push(L([52, 38].map((w, i) => k.lineOnTop([specPlate.x + 4.5, specPlate.y + 3.2 + i * 3.2], [specPlate.x + 4.5 + w, specPlate.y + 3.2 + i * 3.2], 0.9, P)).join(""), { tone: "lo", free: true }));

  // ==========================================
  // STATION 1 (Left: Infeed Cassette & Gears)
  // ==========================================
  const st1Plinth: k.Plan = { x: -238, y: -46, w: 76, d: 86, r: 5 };
  out.push(S(k.slabOf(st1Plinth, 0, 7, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(st1Plinth, 3.5, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(st1Plinth, 3.2), 7, P, 5), { tone: "faint" }));
  out.push(D(k.corners(st1Plinth, 4.8).map(([x, y]) => at([x, y, 7])), { size: 0.45 }));

  // Stepper Motor Housing with Cooling Fins behind gears
  const motor: k.Plan = { x: -234, y: -42, w: 24, d: 22, r: 2 };
  out.push(S(k.slabOf(motor, 7, 18, P, 3, 0.6), { tone: "hi", crease: "lo" }));
  for (const mz of [11, 15, 19, 23]) {
    out.push(L(k.sideSeam(motor, mz, P, 3), { tone: "faint" }));
  }
  out.push(S(k.cylinder(-222, -42, 4.5, 11, 10, P, 20), { tone: "mid" }));

  // Card Magazine / Raw Ticket Hopper at [-230, 4]
  const hopper: k.Plan = { x: -234, y: 6, w: 22, d: 30, r: 2 };
  out.push(S(k.slabOf(hopper, 7, 22, P, 3, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(hopper, 2), 29, P, 3), { tone: "lo" }));
  // Raw cards stacked inside hopper
  for (const hz of [12, 16, 20, 24]) {
    out.push(L(k.lineOnTop([hopper.x + 3, hopper.y + 6], [hopper.x + 19, hopper.y + 6], hz, P), { tone: "lo", free: true }));
  }

  // Master Planetary Gear at GEAR_1 (-204, -14)
  out.push(S(k.cylinder(GEAR_1[0], GEAR_1[1], 18, 7, 6.5, P, 48, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(GEAR_1[0], GEAR_1[1], 18, 7, 13.5, 40, P, 0.25), { tone: "lo" }));
  out.push(L(k.ring(GEAR_1[0], GEAR_1[1], 15.5, 13.5, P, 40), { tone: "lo" }));
  const g1Ticks = k.radialTicks(GEAR_1[0], GEAR_1[1], 14.8, 32, 4, 13.5, [1.3, 2.5], P);
  out.push(L(g1Ticks.minor, { tone: "lo" }), L(g1Ticks.major, { tone: "mid" }));
  out.push(S(k.cylinder(GEAR_1[0], GEAR_1[1], 5.5, 13.5, 4, P, 24, 0.3), { tone: "mid" }));

  // Secondary Meshed Gear at GEAR_2 (-174, 14)
  out.push(S(k.cylinder(GEAR_2[0], GEAR_2[1], 13, 7, 5, P, 36, 0.5), { tone: "mid" }));
  out.push(L(k.knurl(GEAR_2[0], GEAR_2[1], 13, 7, 12, 28, P, 0.2), { tone: "lo" }));
  const g2Ticks = k.radialTicks(GEAR_2[0], GEAR_2[1], 11.2, 24, 4, 12, [1.1, 2.0], P);
  out.push(L(g2Ticks.minor, { tone: "lo" }), L(g2Ticks.major, { tone: "mid" }));
  out.push(S(k.cylinder(GEAR_2[0], GEAR_2[1], 4.2, 12, 3.2, P, 20, 0.3), { tone: "hi", crease: "lo" }));

  // ==========================================
  // STATION 2 (Center Precision Guide Track)
  // ==========================================
  const bed: k.Plan = { x: -156, y: -24, w: 296, d: 48, r: 4 };
  out.push(S(k.slabOf(bed, 0, 7.5, P, 6, 0.8), { tone: "hi", crease: "lo", inner: L(k.sideSeam(bed, 3.8, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(bed, 3), 7.5, P, 5), { tone: "faint" }));

  // Dual Stainless Steel Guide Rails (y = -14 and y = +14)
  for (const ry of [-14, 14]) {
    out.push(S(k.slabOf({ x: -152, y: ry - 1.8, w: 288, d: 3.6, r: 0.9 }, 7.5, 2.8, P, 2, 0.3), { tone: "mid" }));
    // Linear bearing blocks along rails
    for (const bx of [-120, -48, 36, 115]) {
      out.push(D([[bx, ry]].map(([x, y]) => at([x, y, 10.3])), { size: 0.4 }));
    }
  }

  // Idler Return Pulley at right end of track (134, 0)
  out.push(S(k.cylinder(134, 0, 8.5, 7.5, 4.2, P, 28, 0.4), { tone: "mid" }));
  out.push(L(k.knurl(134, 0, 8.5, 7.5, 11.7, 24, P), { tone: "lo" }));

  // ==========================================
  // STATION 3: Stamping Press Back Pillar (x = PRESS_CX = -48)
  // ==========================================
  const pyBack = -36;
  const pBaseBack: k.Plan = { x: PRESS_CX - 7.5, y: pyBack - 7.5, w: 15, d: 15, r: 2.2 };
  out.push(S(k.slabOf(pBaseBack, 0, 8.5, P, 4, 0.5), { tone: "mid" }));
  out.push(D(k.corners(pBaseBack, 2.8).map(([x, y]) => at([x, y, 8.5])), { size: 0.42 }));
  out.push(S(k.cylinder(PRESS_CX, pyBack, 4.4, 8.5, 48, P, 24), { tone: "mid", crease: "none" }));
  out.push(L([24, 38, 48].map((z) => k.sideArc(PRESS_CX, pyBack, 4.4, z, P, 16)).join(""), { tone: "faint" }));

  // ==========================================
  // STATION 4: Optical Scanner Back Pylon (x = SCANNER_CX = 44)
  // ==========================================
  const syBack = -26;
  const sBaseBack: k.Plan = { x: SCANNER_CX - 6, y: syBack - 6, w: 12, d: 12, r: 2 };
  out.push(S(k.slabOf(sBaseBack, 0, 8, P, 3, 0.4), { tone: "mid" }));
  out.push(S(k.cylinder(SCANNER_CX, syBack, 3.2, 8, 34, P, 20), { tone: "mid", crease: "none" }));

  // Optical Inspection Turret Bridge at x = SCANNER_CX
  const scanBridge: k.Plan = { x: SCANNER_CX - 5, y: -26, w: 10, d: 52, r: 2 };
  out.push(S(k.slabOf(scanBridge, 40, 5, P, 3, 0.5), { tone: "mid" }));
  // Downward-facing Sensor Turret at (SCANNER_CX, 0)
  out.push(S(k.cylinder(SCANNER_CX, 0, 6.5, 32, 8, P, 24, 0.4), { tone: "hi", lit: true }));
  out.push(L(k.ring(SCANNER_CX, 0, 4.5, 32, P, 20), { tone: "lo" }));
  // Status LED Beacon (Pass Green Highlight)
  out.push(S(k.cylinder(SCANNER_CX, 10, 2.2, 45, 2.5, P, 16), { tone: "hi" }));
  out.push(L(k.ring(SCANNER_CX, 10, 2.2, 47.5, P, 16), { tone: "lit" }));

  // Coiled Telemetry Conduit linking Scanner Bridge to Console
  const wire = k.coil(54, 146, [20, 8], 3.2, 7, "x", P);
  out.push(L(wire.back, { tone: "lo" }), L(wire.front, { tone: "mid" }));

  // ==========================================
  // STATION 5 (Right: Master Telemetry Console)
  // ==========================================
  const consoleBox: k.Plan = { x: 148, y: -46, w: 94, d: 92, r: 5 };
  out.push(S(k.slabOf(consoleBox, 0, 18, P, 6, 1.0), { tone: "mid", inner: L(k.sideSeam(consoleBox, 6, P, 6) + k.sideSeam(consoleBox, 13, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(consoleBox, 3.5), 18, P, 5), { tone: "faint" }));
  out.push(D(k.corners(consoleBox, 5).map(([x, y]) => at([x, y, 18])), { size: 0.45 }));

  // Large Studio Velocity Dial Gauge at DIAL_1 (184, -16)
  out.push(S(k.cylinder(DIAL_1[0], DIAL_1[1], DIAL_1_R, 18, 8, P, 56, 0.7), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(DIAL_1[0], DIAL_1[1], DIAL_1_R, 22, 26, 60, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(DIAL_1[0], DIAL_1[1], DIAL_1_R - 2.2, 26, P, 56), { tone: "lo" }));
  const d1Ticks = k.radialTicks(DIAL_1[0], DIAL_1[1], DIAL_1_R - 2.8, 40, 5, 26, [1.3, 2.6], P);
  out.push(L(d1Ticks.minor, { tone: "lo" }), L(d1Ticks.major, { tone: "mid" }));
  out.push(L(k.ring(DIAL_1[0], DIAL_1[1], 1.8, 26, P, 18), { tone: "mid" }));

  // Secondary Auxiliary Pressure Gauge at DIAL_2 (222, -18)
  out.push(S(k.cylinder(DIAL_2[0], DIAL_2[1], DIAL_2_R, 18, 6.5, P, 40, 0.5), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(DIAL_2[0], DIAL_2[1], DIAL_2_R, 21, 24.5, 44, P, 0.25), { tone: "lo" }));
  out.push(L(k.ring(DIAL_2[0], DIAL_2[1], DIAL_2_R - 1.8, 24.5, P, 40), { tone: "lo" }));
  const d2Ticks = k.radialTicks(DIAL_2[0], DIAL_2[1], DIAL_2_R - 2.2, 24, 4, 24.5, [1.1, 2.0], P);
  out.push(L(d2Ticks.minor, { tone: "lo" }), L(d2Ticks.major, { tone: "mid" }));
  out.push(L(k.ring(DIAL_2[0], DIAL_2[1], 1.4, 24.5, P, 14), { tone: "mid" }));

  // Rotary Selector Knobs on front console deck (y = 22)
  for (const [kx, ang] of [[166, -0.4], [186, 0.7], [206, 0.2], [226, -0.8]] as const) {
    out.push(S(k.cylinder(kx, 22, 5.2, 18, 4.5, P, 24, 0.35), { tone: "mid" }));
    out.push(L(k.knurl(kx, 22, 5.2, 18, 22.5, 20, P), { tone: "lo" }));
    out.push(L(k.lineOnTop([kx, 22], [kx + Math.cos(ang) * 4.2, 22 + Math.sin(ang) * 4.2], 22.5, P), { tone: "hi", free: "start" }));
  }

  // Outbox Dispatch Chute & Exit Rollers (y = 34)
  const chute: k.Plan = { x: 154, y: 32, w: 48, d: 10, r: 1.5 };
  out.push(S(k.slabOf(chute, 0, 4, P, 2, 0.4), { tone: "lo" }));
  for (const cx of [164, 188]) {
    out.push(S(k.cylinder(cx, 37, 3.2, 4, 3.5, P, 16), { tone: "hi" }));
  }

  return out.join("");
})();

// Front Arch, Front Pillar & Overhead Bridge for Press at x = PRESS_CX (-48)
// and Scanner Front Pylon at x = SCANNER_CX (44)
const STATIC_FRONT_RIGS = (() => {
  const out: string[] = [];

  // 1. Scanner Front Pylon at SCANNER_CX (44, 26)
  const syFront = 26;
  const sBaseFront: k.Plan = { x: SCANNER_CX - 6, y: syFront - 6, w: 12, d: 12, r: 2 };
  out.push(S(k.slabOf(sBaseFront, 0, 8, P, 3, 0.4), { tone: "mid" }));
  out.push(S(k.cylinder(SCANNER_CX, syFront, 3.2, 8, 34, P, 20), { tone: "mid", crease: "none" }));

  // 2. Press Front Pillar at PRESS_CX (-48, 28)
  const pyFront = 28;
  const pBaseFront: k.Plan = { x: PRESS_CX - 7.5, y: pyFront - 7.5, w: 15, d: 15, r: 2.2 };
  out.push(S(k.slabOf(pBaseFront, 0, 8.5, P, 4, 0.5), { tone: "mid" }));
  out.push(D(k.corners(pBaseFront, 2.8).map(([x, y]) => at([x, y, 8.5])), { size: 0.42 }));
  out.push(S(k.cylinder(PRESS_CX, pyFront, 4.4, 8.5, 48, P, 24), { tone: "mid", crease: "none" }));
  out.push(L([24, 38, 48].map((z) => k.sideArc(PRESS_CX, pyFront, 4.4, z, P, 16)).join(""), { tone: "faint" }));

  // 3. Overhead Crossbar Bridge spanning y = -42..32 at x = PRESS_CX (-48), z = 56..64
  const arch: k.Plan = { x: PRESS_CX - 8, y: -44, w: 16, d: 76, r: 2.5 };
  out.push(S(k.slabOf(arch, 56, 8, P, 4, 0.7), { tone: "mid", inner: L(k.sideSeam(arch, 60, P, 4), { tone: "faint" }) }));
  const aticks = k.topTicks(-34, 18, 4, 5, PRESS_CX - 7, 64, [1.4, 2.6], P, "y");
  out.push(L(aticks.minor, { tone: "lo" }), L(aticks.major, { tone: "mid" }));
  out.push(D([at([PRESS_CX, -38, 64]), at([PRESS_CX, 24, 64])], { size: 0.5 }));

  // 4. Center Guide Collar on Top of Arch Bridge at (PRESS_CX, PRESS_CY)
  out.push(S(k.cylinder(PRESS_CX, PRESS_CY, 8.5, 64, 5, P, 32, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(PRESS_CX, PRESS_CY, 8.5, 64, 69, 28, P), { tone: "lo" }));

  return out.join("");
})();

// Moving Project Card Sled (built at x = 0, y = 0, z = 7.5..11.8)
const TICKET_CARD_SVG = (() => {
  const cardPlan: k.Plan = { x: -23, y: -12, w: 46, d: 24, r: 2.2 };
  const stampSeal = k.ring(0, 0, 6.5, 11.9, P, 28);
  const checkD = k.onTop(
    [
      [-3.6, 0.4],
      [-1.0, 3.0],
      [4.2, -2.4],
    ],
    11.9,
    P,
  );
  return [
    S(k.slabOf(cardPlan, 7.5, 4.2, P, 4, 0.5), { tone: "hi", lit: true }),
    L(k.planOutline(k.insetPlan(cardPlan, 2.2), 11.7, P, 4), { tone: "lo" }),
    // Printed spec rule lines
    L(k.lineOnTop([-18, -6], [-9, -6], 11.7, P), { tone: "lo", free: true }),
    L(k.lineOnTop([-18, -1], [-10, -1], 11.7, P), { tone: "faint", free: true }),
    L(k.lineOnTop([9, 2], [18, 2], 11.7, P), { tone: "lo", free: true }),
    L(k.lineOnTop([9, 6], [16, 6], 11.7, P), { tone: "faint", free: true }),
    // Stamped verification badge in center
    `<g data-part="ticket-seal" style="opacity:1">`,
    L(stampSeal, { tone: "mid" }),
    `<path class="iso-line" data-tone="lit" d="${checkD}" style="stroke-width:1.25"/>`,
    `</g>`,
  ].join("");
})();

// Moving Stamp Ram & Hydraulic Plunger at (PRESS_CX, PRESS_CY)
const STAMP_RAM_SVG = (() => {
  return [
    // Heavy Stamping Die Block (z = 24..30 at rest; drops 13.5 units to z = 10.5 on impact)
    S(k.cylinder(PRESS_CX, PRESS_CY, 11, 24, 6.2, P, 36, 0.5), { tone: "hi", lit: true }),
    L(k.knurl(PRESS_CX, PRESS_CY, 11, 24, 30.2, 32, P), { tone: "lo" }),
    S(k.cylinder(PRESS_CX, PRESS_CY, 6.4, 30.2, 4.2, P, 24), { tone: "mid" }),
    // Hydraulic Piston Rod extending through Arch Collar
    S(k.cylinder(PRESS_CX, PRESS_CY, 2.6, 34.4, 25, P, 18), { tone: "hi", crease: "none", lit: true }),
    S(k.cylinder(PRESS_CX, PRESS_CY, 4.2, 69, 7.5, P, 20, 0.3), { tone: "hi", lit: true }),
  ].join("");
})();

const gearSpokesAt = (angle: number) => {
  const spokes: string[] = [];
  for (let i = 0; i < 4; i++) {
    const a = angle + (i * Math.PI) / 2;
    spokes.push(
      k.lineOnTop(
        [GEAR_1[0] + Math.cos(a) * 5.8, GEAR_1[1] + Math.sin(a) * 5.8],
        [GEAR_1[0] + Math.cos(a) * 14.5, GEAR_1[1] + Math.sin(a) * 14.5],
        13.6,
        P,
      ),
    );
  }
  const a2 = -angle * 1.4;
  for (let i = 0; i < 3; i++) {
    const a = a2 + (i * Math.PI * 2) / 3;
    spokes.push(
      k.lineOnTop(
        [GEAR_2[0] + Math.cos(a) * 4.2, GEAR_2[1] + Math.sin(a) * 4.2],
        [GEAR_2[0] + Math.cos(a) * 10.5, GEAR_2[1] + Math.sin(a) * 10.5],
        12.1,
        P,
      ),
    );
  }
  return spokes.join("");
};

const dialNeedle1At = (turn: number) => {
  const a = turn * Math.PI * 2;
  return k.lineOnTop(
    [DIAL_1[0] - Math.sin(a) * 3.5, DIAL_1[1] + Math.cos(a) * 3.5],
    [DIAL_1[0] + Math.sin(a) * (DIAL_1_R - 4.2), DIAL_1[1] - Math.cos(a) * (DIAL_1_R - 4.2)],
    26.2,
    P,
  );
};

const dialNeedle2At = (turn: number) => {
  const a = turn * Math.PI * 2;
  return k.lineOnTop(
    [DIAL_2[0] - Math.sin(a) * 2.4, DIAL_2[1] + Math.cos(a) * 2.4],
    [DIAL_2[0] + Math.sin(a) * (DIAL_2_R - 3.2), DIAL_2[1] - Math.cos(a) * (DIAL_2_R - 3.2)],
    24.7,
    P,
  );
};

export function FooterDispatchFigure() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);

  React.useEffect(() => {
    const stage = rootRef.current;
    if (!stage || !visible) return;
    const svg = stage.querySelector("svg");
    if (!svg) return;

    const ticketEl = svg.querySelector('[data-part="ticket"]');
    const sealEl = svg.querySelector('[data-part="ticket-seal"]') as SVGGElement | null;
    const ramEl = svg.querySelector('[data-part="ram"]');
    const spokesEl = svg.querySelector('[data-part="spokes"]');
    const needle1El = svg.querySelector('[data-part="needle-1"]');
    const needle2El = svg.querySelector('[data-part="needle-2"]');
    const pulseEl = svg.querySelector('[data-part="pulse"]') as SVGPathElement | null;

    let clock = 0;
    let frame = 0;
    let last = 0;
    let gearAngle = 0;
    let ticketX = PRESS_CX;
    const ram = { at: 0, rate: 0 };
    let dial1Turn = 0.24;
    let wantDial1 = 0.24;
    let dial2Turn = 0.35;
    let wantDial2 = 0.35;
    let manual = false;
    let manualPress = 0;
    let idleTimer = 0;

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      clock += dt;

      let wantRam = 0;
      if (!manual) {
        // 4.2s smooth engineering cycle:
        // 0.0..1.0s: infeed from hopper (-120) to press (-48) while gears spin
        // 1.0..1.7s: stamping ram strikes down, seal imprints
        // 1.7..2.8s: travels through optical scanner (+44)
        // 2.8..3.6s: glides into dispatch dock (+115), telemetry dials surge
        // 3.6..4.2s: smooth return/reset
        const cycle = 4.2;
        const t = clock % cycle;
        const p = t / cycle;

        if (p < 0.24) {
          const u = p / 0.24;
          const e = u * u * (3 - 2 * u);
          ticketX = -125 + e * (PRESS_CX - -125);
          gearAngle += dt * 2.5;
          if (sealEl) sealEl.style.opacity = "0.15";
          wantDial1 = 0.25;
          wantDial2 = 0.3;
        } else if (p < 0.42) {
          ticketX = PRESS_CX;
          if (p > 0.27 && p < 0.39) {
            wantRam = 13.5;
            if (p > 0.31 && sealEl) sealEl.style.opacity = "1";
          }
          wantDial1 = 0.65;
          wantDial2 = 0.75;
        } else if (p < 0.68) {
          const u = (p - 0.42) / 0.26;
          const e = u * u * (3 - 2 * u);
          ticketX = PRESS_CX + e * (SCANNER_CX - PRESS_CX);
          gearAngle += dt * 2.2;
          if (sealEl) sealEl.style.opacity = "1";
          wantDial1 = 0.52 - e * 0.15;
          wantDial2 = 0.58;
        } else if (p < 0.88) {
          const u = (p - 0.68) / 0.20;
          const e = u * u * (3 - 2 * u);
          ticketX = SCANNER_CX + e * (115 - SCANNER_CX);
          gearAngle += dt * 2.0;
          wantDial1 = 0.72;
          wantDial2 = 0.62;
        } else {
          const u = (p - 0.88) / 0.12;
          const e = u * u * (3 - 2 * u);
          ticketX = 115 + e * (-125 - 115);
          wantDial1 = 0.24;
          wantDial2 = 0.35;
        }
      } else {
        gearAngle += dt * 1.8;
        wantRam = manualPress;
      }

      // Spring physics for stamping ram
      const stiff = 460;
      const drag = 26;
      for (let i = 0; i < 4; i++) {
        ram.rate += ((wantRam - ram.at) * stiff - ram.rate * drag) * (dt / 4);
        ram.at += ram.rate * (dt / 4);
      }
      dial1Turn += (wantDial1 - dial1Turn) * (1 - Math.exp(-dt / 0.18));
      dial2Turn += (wantDial2 - dial2Turn) * (1 - Math.exp(-dt / 0.22));

      ticketEl?.setAttribute("transform", k.translateAlong(P, [ticketX, 0, 0]));
      ramEl?.setAttribute("transform", k.translateAlong(P, [0, 0, -ram.at]));
      spokesEl?.setAttribute("d", gearSpokesAt(gearAngle));
      needle1El?.setAttribute("d", dialNeedle1At(dial1Turn));
      needle2El?.setAttribute("d", dialNeedle2At(dial2Turn));

      if (pulseEl) {
        if (ram.at > 5) {
          const r = 9 + (ram.at / 13.5) * 8.5;
          pulseEl.setAttribute("d", k.ring(PRESS_CX, PRESS_CY, r, 12.2, P, 32));
          pulseEl.style.opacity = String(Math.max(0, 1 - ram.at / 15));
        } else {
          pulseEl.style.opacity = "0";
        }
      }

      frame = requestAnimationFrame(tick);
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      if (!box.width) return;
      const fx = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
      manual = true;
      ticketX = -125 + fx * 240;
      wantDial1 = 0.2 + fx * 0.65;
      wantDial2 = 0.3 + fx * 0.5;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        manual = false;
        manualPress = 0;
      }, 2000);
    };

    const onClick = () => {
      manual = true;
      ticketX = PRESS_CX;
      manualPress = 13.5;
      if (sealEl) sealEl.style.opacity = "1";
      wantDial1 = 0.82;
      wantDial2 = 0.88;
      window.setTimeout(() => {
        manualPress = 0;
      }, 260);
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("click", onClick);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("click", onClick);
    };
  }, [visible]);

  const svgMarkup = React.useMemo(() => {
    return [
      STATIC_BACK,
      `<path data-part="spokes" class="iso-line" data-tone="hi" d="${gearSpokesAt(0.3)}"/>`,
      `<g data-part="ticket" transform="${k.translateAlong(P, [PRESS_CX, 0, 0])}">${TICKET_CARD_SVG}</g>`,
      `<path data-part="pulse" class="iso-line" data-tone="lit" d="" style="opacity:0"/>`,
      `<g data-part="ram">${STAMP_RAM_SVG}</g>`,
      STATIC_FRONT_RIGS,
      `<path data-part="needle-1" class="iso-line" data-tone="lit" d="${dialNeedle1At(0.42)}" style="stroke-width:1.25"/>`,
      `<path data-part="needle-2" class="iso-line" data-tone="lit" d="${dialNeedle2At(0.35)}" style="stroke-width:1.15"/>`,
    ].join("");
  }, []);

  return (
    <div className="iso footer-iso-stage" data-theme="light">
      <div
        ref={rootRef}
        className="iso-stage sp-card-stage"
        dangerouslySetInnerHTML={{
          __html: `<svg class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Automated Engineering Pipeline and Dispatch Workbench">${svgMarkup}</svg>`,
        }}
      />
    </div>
  );
}
