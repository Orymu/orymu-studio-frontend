"use client";

import * as React from "react";
import * as k from "../../iso/iso-kit";
import { useInView } from "../../iso/react/live";

const WIDTH = 600;
const HEIGHT = 340;
const AZIMUTH = 57;

// Identical base plate, tall gantry silhouette & camera projection to Card 1 & Card 2
const BASE: k.Plan = { x: -134, y: -82, w: 298, d: 150, r: 9 };
const BASE_H = 9;
const FOOT_H = 5;
const RAIL_Y = -66;
const RAIL_D = 8;
const RAIL_Z = 50;
const RAIL_H = 8;
const POST_L = -124;
const POST_R = 66;
const POST = 12;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -BASE_H - FOOT_H, 0),
    ...k.boxCorners({ x: POST_L, y: RAIL_Y - RAIL_D / 2, w: POST_R + POST - POST_L, d: RAIL_D, r: 0 }, RAIL_Z, RAIL_Z + RAIL_H + 6),
  ],
  WIDTH,
  HEIGHT,
  { pad: 34, azimuth: AZIMUTH, elevation: 30 },
);

const at = (p: k.Point3) => k.iso(p, P);
const S = (paths: k.SolidPaths, style?: Parameters<typeof k.solidSvg>[1]) => k.solidSvg(paths, style);
const L = (d: string, style?: Parameters<typeof k.lineSvg>[1]) => k.lineSvg(d, style);
const D = (pts: k.Flat[], style?: Parameters<typeof k.dotsSvg>[1]) => k.dotsSvg(pts, style);
const byDepth = (pts: k.Plane[]) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// 4 Stage Conversion Pipeline Blocks along the central track
const STAGES = [
  { x: -102, w: 30, label: "VISIT" },
  { x: -58, w: 30, label: "INTENT" },
  { x: -14, w: 30, label: "ACTION" },
  { x: 30, w: 30, label: "GOAL" },
];

// Right side: Conversion Fan Gauge & Metric Dial Turntable
const FAN_PIVOT: [number, number] = [108, -28];
const DIAL_CX = 114;
const DIAL_CY = 18;
const DIAL_R = 19;

const STATIC_BACK = (() => {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];

  // 4 Flanged Feet
  for (const [fx, fy] of byDepth(k.corners(BASE, 18))) {
    out.push(S(k.cylinder(fx, fy, 7, -BASE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(fx, fy, 5.5, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }

  // Heavy Surface Plate
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(BASE, -4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 4.5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 8);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // Front Ruler Strip & Label Plate
  const strip: k.Plan = { x: -114, y: BASE.y + BASE.d - 14, w: 170, d: 6.5, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.6, 0.6, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  const label: k.Plan = { x: 76, y: BASE.y + BASE.d - 16, w: 56, d: 10, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.5), 0.8, P, 3), { tone: "faint" }));
  out.push(L([36, 24].map((w, i) => k.lineOnTop([label.x + 4, label.y + 3.2 + i * 3], [label.x + 4 + w, label.y + 3.2 + i * 3], 0.8, P)).join(""), { tone: "lo", free: true }));

  // Overhead Gantry Bridge at y = RAIL_Y (-66), z = 50..58 (matches Card 1 & Card 2 tall bridge silhouette)
  for (const px of [POST_L, POST_R]) {
    const pPlan: k.Plan = { x: px, y: RAIL_Y - POST / 2, w: POST, d: POST, r: 2 };
    out.push(S(k.slabOf(k.insetPlan(pPlan, -3), 0, 2, P, 4), { tone: "lo" }));
    out.push(D([at([pPlan.x - 1, RAIL_Y, 2]), at([pPlan.x + POST + 1, RAIL_Y, 2])], { size: 0.45 }));
    out.push(S(k.slabOf(pPlan, 2, RAIL_Z - 2, P, 4), { tone: "mid" }));
    out.push(L(k.segment([pPlan.x + POST, pPlan.y + POST, 6], [pPlan.x + POST, pPlan.y + POST, RAIL_Z - 4], P), { tone: "faint" }));
  }
  const railPlan: k.Plan = { x: POST_L - 5, y: RAIL_Y - RAIL_D / 2, w: POST_R + POST - POST_L + 10, d: RAIL_D, r: 2 };
  out.push(S(k.slabOf(railPlan, RAIL_Z, RAIL_H, P, 4, 0.8), { tone: "mid" }));
  const rticks = k.sideTicks(POST_L + POST + 6, POST_R - 6, 5, 5, RAIL_Y + RAIL_D / 2, RAIL_Z + RAIL_H - 1.2, [2.0, 4.0], P);
  out.push(L(rticks.minor, { tone: "lo" }), L(rticks.major, { tone: "mid" }));
  out.push(D([POST_L, POST_R].map((px) => at([px + POST / 2, RAIL_Y, RAIL_Z + RAIL_H])), { size: 0.5 }));

  // Central Conversion Flow Channel Manifold Deck (x = -114..68, y = -36..40)
  const deck: k.Plan = { x: -114, y: -36, w: 182, d: 76, r: 4.5 };
  out.push(S(k.slabOf(deck, 0, 6.5, P, 6, 0.8), { tone: "hi", crease: "lo", inner: L(k.sideSeam(deck, 3.2, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(deck, 3.2), 6.5, P, 5), { tone: "faint" }));
  out.push(D(k.corners(deck, 5).map(([x, y]) => at([x, y, 6.5])), { size: 0.45 }));

  // Dual Parallel Guide Rails for the Conversion Shuttle along the deck
  for (const ry of [-18, 18]) {
    out.push(S(k.slabOf({ x: -106, y: ry - 2, w: 166, d: 4, r: 1 }, 6.5, 3, P, 3, 0.3), { tone: "mid" }));
  }
  // Central Flow Groove & Calibration Ticks along the Conversion Path
  const cstrip: k.Plan = { x: -104, y: -4.5, w: 162, d: 9, r: 1.5 };
  out.push(L(k.planOutline(cstrip, 6.5, P, 3), { tone: "lo" }));
  const fticks = k.topTicks(-98, 52, 4, 5, 29, 6.5, [1.6, 3.0], P);
  out.push(L(fticks.minor, { tone: "lo" }), L(fticks.major, { tone: "mid" }));

  // Right Side: Conversion Metric Turntable & Feeler Fan Pivot Deck (x = 74..150, y = -42..42)
  const mdeck: k.Plan = { x: 74, y: -42, w: 76, d: 84, r: 4.5 };
  out.push(S(k.slabOf(mdeck, 0, 8, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(mdeck, 4, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(mdeck, 3), 8, P, 5), { tone: "faint" }));
  out.push(D(k.corners(mdeck, 4.5).map(([x, y]) => at([x, y, 8])), { size: 0.45 }));

  // Feeler Fan Pivot Post at (108, -28)
  out.push(S(k.cylinder(FAN_PIVOT[0], FAN_PIVOT[1], 7, 8, 5, P, 32, 0.4), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(FAN_PIVOT[0], FAN_PIVOT[1], 7, 8, 13, 28, P), { tone: "lo" }));
  out.push(D([at([FAN_PIVOT[0], FAN_PIVOT[1], 13])], { size: 0.55, tone: "hi" }));

  // Large Conversion Rate Dial Gauge at (114, 18)
  out.push(S(k.cylinder(DIAL_CX, DIAL_CY, DIAL_R, 8, 8, P, 56, 0.7), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(DIAL_CX, DIAL_CY, DIAL_R, 12.8, 16, 64, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(DIAL_CX, DIAL_CY, DIAL_R - 2.0, 16, P, 56), { tone: "lo" }));
  const dticks = k.radialTicks(DIAL_CX, DIAL_CY, DIAL_R - 2.6, 40, 5, 16, [1.3, 2.6], P);
  out.push(L(dticks.minor, { tone: "lo" }), L(dticks.major, { tone: "mid" }));
  out.push(L(k.ring(DIAL_CX, DIAL_CY, 1.6, 16, P, 16), { tone: "mid" }));

  return out.join("");
})();

// 4 Stage Checkpoints along the Conversion Path (base & active lit state)
const STAGE_GATES = STAGES.map((st, idx) => {
  const gateBack: k.Plan = { x: st.x, y: -28, w: st.w, d: 8, r: 1.5 };
  const gateFront: k.Plan = { x: st.x, y: 20, w: st.w, d: 8, r: 1.5 };
  const cx = st.x + st.w / 2;
  return {
    idx,
    cx,
    baseSvg:
      S(k.slabOf(gateBack, 6.5, 5, P, 3, 0.4), { tone: "mid" }) +
      S(k.slabOf(gateFront, 6.5, 5, P, 3, 0.4), { tone: "mid" }) +
      L(k.ring(cx, -24, 2.2, 11.5, P, 16), { tone: "lo" }) +
      L(k.ring(cx, 24, 2.2, 11.5, P, 16), { tone: "lo" }),
    litSvg:
      S(k.slabOf(gateBack, 6.5, 5.6, P, 3, 0.4), { tone: "hi", lit: true }) +
      S(k.slabOf(gateFront, 6.5, 5.6, P, 3, 0.4), { tone: "hi", lit: true }) +
      D([at([cx, -24, 12.1]), at([cx, 24, 12.1])], { size: 0.65, tone: "hi" }),
  };
});

// Moving Gantry Laser/Sensor Scanner Assembly & Conversion Shuttle Capsule built at Reference x = 0
const BRIDGE_TOP = RAIL_Z + RAIL_H; // 58

const GANTRY_SCANNER_SVG = (() => {
  const xBlock: k.Plan = { x: -11, y: RAIL_Y - 7, w: 22, d: 14, r: 2.5 };
  const yArm: k.Plan = { x: -3.5, y: RAIL_Y + 6, w: 7, d: 62, r: 1.5 };
  return [
    // X-Carriage on overhead bridge
    S(k.slabOf(xBlock, BRIDGE_TOP, 9, P, 5, 0.8), { tone: "mid" }),
    L(k.planOutline(k.insetPlan(xBlock, 2), BRIDGE_TOP + 9, P), { tone: "faint" }),
    D([at([-7, RAIL_Y - 3, BRIDGE_TOP + 9]), at([7, RAIL_Y - 3, BRIDGE_TOP + 9])], { size: 0.45 }),
    // Thumb knob on carriage
    S(k.cylinder(-5, RAIL_Y - 1, 2.6, BRIDGE_TOP + 9, 3.2, P, 20), { tone: "mid" }),
    // Cantilever arm reaching over the conversion channel to y = 0
    S(k.slabOf(yArm, BRIDGE_TOP + 3, 5, P, 4, 0.6), { tone: "mid" }),
    L(k.lineOnTop([0, RAIL_Y + 9], [0, -8], BRIDGE_TOP + 8, P), { tone: "faint" }),
    // Vertical Optical Telemetry Probe Housing at (0, 0)
    S(k.cylinder(0, 0, 5.5, 42, 22, P, 32, 0.4), { tone: "mid" }),
    L([48, 54].map((z) => k.sideArc(0, 0, 5.5, z, P, 20)).join(""), { tone: "faint" }),
    S(k.cylinder(0, 0, 6.3, 62, 2.2, P, 32), { tone: "mid" }),
    // Precision Sensor Stem descending to the Conversion Capsule
    S(k.cylinder(0, 0, 1.6, 17, 25, P, 18), { tone: "hi", crease: "none", lit: true }),
    S(k.cylinder(0, 0, 4.2, 14.5, 2.8, P, 28, 0.3), { tone: "hi", lit: true }),
  ].join("");
})();

const SHUTTLE_CAPSULE_SVG = (() => {
  // Precision Conversion Shuttle Capsule sliding along the central channel at x = 0, y = -11..11, z = 6.5..14.5
  const basePlan: k.Plan = { x: -16, y: -15, w: 32, d: 30, r: 3 };
  const capPlan: k.Plan = { x: -13, y: -10, w: 26, d: 20, r: 10 };
  return [
    S(k.slabOf(basePlan, 6.5, 3.5, P, 4, 0.5), { tone: "mid" }),
    S(k.slabOf(capPlan, 10, 4.5, P, 8, 0.8), { tone: "hi", lit: true }),
    L(k.planOutline(k.insetPlan(capPlan, 2.4), 14.5, P, 8), { tone: "lo" }),
  ].join("");
})();

const fanBladesSvg = (spread: number) => {
  // 5 feeler blades fanning out from FAN_PIVOT (108, -28) at z = 8.5..10
  const [px, py] = FAN_PIVOT;
  const blades: string[] = [];
  for (let i = 0; i < 5; i++) {
    const angle = (0.35 + (i / 4) * spread * 1.15) * Math.PI;
    const tipX = px + Math.cos(angle) * 24;
    const tipY = py + Math.sin(angle) * 18;
    blades.push(k.lineOnTop([px, py], [tipX, tipY], 9.5 + i * 0.2, P));
  }
  return blades.join("");
};

const dialNeedleAt = (turn: number) => {
  const a = turn * Math.PI * 2;
  return k.lineOnTop(
    [DIAL_CX - Math.sin(a) * 3.2, DIAL_CY + Math.cos(a) * 3.2],
    [DIAL_CX + Math.sin(a) * (DIAL_R - 4.0), DIAL_CY - Math.cos(a) * (DIAL_R - 4.0)],
    16.2,
    P,
  );
};

export function SpotPlateCardFigure() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);

  React.useEffect(() => {
    const stage = rootRef.current;
    if (!stage || !visible) return;
    const svg = stage.querySelector("svg");
    if (!svg) return;

    const scannerEl = svg.querySelector('[data-part="scanner"]');
    const shuttleEl = svg.querySelector('[data-part="shuttle"]');
    const flowLineEl = svg.querySelector('[data-part="flow-line"]');
    const fanEl = svg.querySelector('[data-part="fan"]');
    const needleEl = svg.querySelector('[data-part="needle"]');
    const gateEls = STAGE_GATES.map((_, i) => svg.querySelector(`[data-part="gate-lit-${i}"]`) as SVGGElement | null);

    const X_MIN = -87;
    const X_MAX = 45;
    let curX = -87;
    let targetX = -87;
    let clock = 0;
    let manual = false;
    let idleTimer = 0;
    let frame = 0;
    let last = 0;

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      clock += dt;

      if (!manual) {
        // Smooth continuous sweep from Stage 1 (VISIT) -> Stage 4 (GOAL) and back
        const cycle = (clock % 4.8) / 4.8;
        const u = cycle < 0.72 ? Math.min(1, cycle / 0.62) : 1 - (cycle - 0.72) / 0.28;
        const eased = u * u * (3 - 2 * u);
        targetX = X_MIN + eased * (X_MAX - X_MIN);
      }

      curX += (targetX - curX) * (1 - Math.exp(-dt / 0.14));
      const progress = Math.min(1, Math.max(0, (curX - X_MIN) / (X_MAX - X_MIN)));

      scannerEl?.setAttribute("transform", k.translateAlong(P, [curX, 0, 0]));
      shuttleEl?.setAttribute("transform", k.translateAlong(P, [curX, 0, 0]));

      // Lit conversion trail line from start (-98) to current shuttle position
      flowLineEl?.setAttribute("d", k.lineOnTop([-98, 0], [Math.max(-96, curX), 0], 6.8, P));

      // Light up each stage gate that the conversion shuttle has reached
      STAGE_GATES.forEach((g, idx) => {
        const el = gateEls[idx];
        if (!el) return;
        el.style.opacity = curX >= g.cx - 8 ? "1" : "0";
      });

      // Fan blades & conversion metric dial needle follow progress
      fanEl?.setAttribute("d", fanBladesSvg(0.25 + progress * 0.75));
      needleEl?.setAttribute("d", dialNeedleAt(0.08 + progress * 0.78));

      frame = requestAnimationFrame(tick);
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      if (!box.width) return;
      const fx = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
      manual = true;
      targetX = X_MIN + fx * (X_MAX - X_MIN);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        manual = false;
      }, 2000);
    };

    stage.addEventListener("pointermove", onPointerMove);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      stage.removeEventListener("pointermove", onPointerMove);
    };
  }, [visible]);

  const svgMarkup = React.useMemo(() => {
    const gatesMarkup = STAGE_GATES.map(
      (g) =>
        `<g>${g.baseSvg}<g data-part="gate-lit-${g.idx}" style="opacity:0;transition:opacity 160ms ease">${g.litSvg}</g></g>`,
    ).join("");

    return [
      STATIC_BACK,
      `<path data-part="flow-line" class="iso-line" data-tone="lit" d="${k.lineOnTop([-98, 0], [-40, 0], 6.8, P)}" style="stroke-width:1.4"/>`,
      gatesMarkup,
      `<path data-part="fan" class="iso-line" data-tone="lit" d="${fanBladesSvg(0.6)}" style="stroke-width:1.05"/>`,
      `<path data-part="needle" class="iso-line" data-tone="lit" d="${dialNeedleAt(0.45)}" style="stroke-width:1.2"/>`,
      `<g data-part="shuttle">${SHUTTLE_CAPSULE_SVG}</g>`,
      `<g data-part="scanner">${GANTRY_SCANNER_SVG}</g>`,
    ].join("");
  }, []);

  return (
    <div className="iso iso-card-stage iso-plate" data-theme="light">
      <div
        ref={rootRef}
        className="iso-stage sp-card-stage"
        tabIndex={0}
        role="slider"
        aria-label="Single Conversion Flow Pipeline and Metric Gauge Rig"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={75}
        dangerouslySetInnerHTML={{
          __html: `<svg class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Measured conversion pipeline test rig with overhead telemetry gantry and metric dial">${svgMarkup}</svg>`,
        }}
      />
    </div>
  );
}
