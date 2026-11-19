"use client";

import * as React from "react";
import * as k from "../../iso/iso-kit";
import { useInView } from "../../iso/react/live";

const WIDTH = 620;
const HEIGHT = 370;
const AZIMUTH = 54;

const BASE: k.Plan = { x: -136, y: -82, w: 294, d: 152, r: 10 };
const BASE_H = 10;
const FOOT_H = 5;

const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -BASE_H - FOOT_H, 0),
    [-124, -68, 86],
    [144, 62, 74],
  ],
  WIDTH,
  HEIGHT,
  { pad: 24, azimuth: AZIMUTH, elevation: 30 },
);

const at = (p: k.Point3) => k.iso(p, P);
const S = (paths: k.SolidPaths, style?: Parameters<typeof k.solidSvg>[1]) => k.solidSvg(paths, style);
const L = (d: string, style?: Parameters<typeof k.lineSvg>[1]) => k.lineSvg(d, style);
const D = (pts: k.Flat[], style?: Parameters<typeof k.dotsSvg>[1]) => k.dotsSvg(pts, style);
const byDepth = (pts: k.Plane[]) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// Machine Layout Constants
const PRESS_CX = -34;
const PRESS_CY = -6;
const GEAR_L: [number, number] = [-96, -12];
const GEAR_R: [number, number] = [-62, -36];
const DIAL_CX = 104;
const DIAL_CY = -12;
const DIAL_R = 23;

const STATIC_BACK = (() => {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];

  // 4 Flanged Feet
  for (const [fx, fy] of byDepth(k.corners(BASE, 20))) {
    out.push(S(k.cylinder(fx, fy, 7.5, -BASE_H - FOOT_H, 1.8, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(fx, fy, 5.8, -BASE_H - FOOT_H + 1.8, FOOT_H - 1.8, P, 28), { tone: "mid" }));
  }

  // Heavy Surface Plate
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(BASE, -4, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.3, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));

  // Front Ruler Strip & Engraved Label Plate
  const strip: k.Plan = { x: -116, y: BASE.y + BASE.d - 15, w: 182, d: 7, r: 1.2 };
  out.push(S(k.slabOf(strip, 0, 0.7, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.7, 0.7, [2.0, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  const label: k.Plan = { x: 80, y: BASE.y + BASE.d - 17, w: 60, d: 11, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.9, P, 3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.9, P, 3), { tone: "faint" }));
  out.push(L([38, 26].map((w, i) => k.lineOnTop([label.x + 4.5, label.y + 3.5 + i * 3.2], [label.x + 4.5 + w, label.y + 3.5 + i * 3.2], 0.9, P)).join(""), { tone: "lo", free: true }));

  // 1. LEFT: Dual Rotary Index Gear Drive & Indexing Plinth
  const gearPlinth: k.Plan = { x: -122, y: -56, w: 82, d: 72, r: 5 };
  out.push(S(k.slabOf(gearPlinth, 0, 7, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(gearPlinth, 3.5, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(gearPlinth, 3.2), 7, P, 5), { tone: "faint" }));
  out.push(D(k.corners(gearPlinth, 4.8).map(([x, y]) => at([x, y, 7])), { size: 0.45 }));

  // Secondary Index Gear Wheel at GEAR_R (-62, -36)
  out.push(S(k.cylinder(GEAR_R[0], GEAR_R[1], 14, 7, 5, P, 40, 0.5), { tone: "mid" }));
  out.push(L(k.knurl(GEAR_R[0], GEAR_R[1], 14, 7, 12, 32, P, 0.2), { tone: "lo" }));
  const g2Ticks = k.radialTicks(GEAR_R[0], GEAR_R[1], 12.2, 24, 4, 12, [1.2, 2.2], P);
  out.push(L(g2Ticks.minor, { tone: "lo" }), L(g2Ticks.major, { tone: "mid" }));
  out.push(S(k.cylinder(GEAR_R[0], GEAR_R[1], 4.5, 12, 3.5, P, 24, 0.3), { tone: "hi", crease: "lo" }));

  // Primary Master Gear Wheel at GEAR_L (-96, -12)
  out.push(S(k.cylinder(GEAR_L[0], GEAR_L[1], 21, 7, 6.5, P, 56, 0.7), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(GEAR_L[0], GEAR_L[1], 21, 7, 13.5, 48, P, 0.25), { tone: "lo" }));
  out.push(L(k.ring(GEAR_L[0], GEAR_L[1], 18.2, 13.5, P, 48), { tone: "lo" }));
  const g1Ticks = k.radialTicks(GEAR_L[0], GEAR_L[1], 17.5, 36, 3, 13.5, [1.4, 2.8], P);
  out.push(L(g1Ticks.minor, { tone: "lo" }), L(g1Ticks.major, { tone: "mid" }));
  out.push(S(k.cylinder(GEAR_L[0], GEAR_L[1], 6.5, 13.5, 4.5, P, 28, 0.4), { tone: "mid" }));
  out.push(L(k.knurl(GEAR_L[0], GEAR_L[1], 6.5, 13.5, 18, 24, P), { tone: "lo" }));

  // 2. CENTER: Project Ticket Feed Bed & Dispatch Conveyor Track (x = -68..54, y = -28..20)
  const bed: k.Plan = { x: -68, y: -32, w: 122, d: 56, r: 4.5 };
  out.push(S(k.slabOf(bed, 0, 8, P, 6, 0.8), { tone: "hi", crease: "lo", inner: L(k.sideSeam(bed, 4, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(bed, 3.2), 8, P, 5), { tone: "faint" }));

  // Guide Rails along Conveyor Track
  for (const ry of [-22, 10]) {
    out.push(S(k.slabOf({ x: -62, y: ry - 2, w: 110, d: 4, r: 1 }, 8, 3.2, P, 3, 0.35), { tone: "mid" }));
    out.push(D([-54, -18, 18, 42].map((x) => at([x, ry, 11.2])), { size: 0.4 }));
  }

  // Back Pillar & Overhead Arch Frame for the Ticket Stamp Press at x = PRESS_CX (-34)
  for (const py of [-44, 24]) {
    const pBase: k.Plan = { x: PRESS_CX - 8, y: py - 8, w: 16, d: 16, r: 2.2 };
    if (py < 0) {
      out.push(S(k.slabOf(pBase, 0, 9, P, 4, 0.5), { tone: "mid" }));
      out.push(D(k.corners(pBase, 3).map(([x, y]) => at([x, y, 9])), { size: 0.42 }));
      out.push(S(k.cylinder(PRESS_CX, py, 4.4, 9, 52, P, 26), { tone: "mid", crease: "none" }));
      out.push(L([24, 40, 52].map((z) => k.sideArc(PRESS_CX, py, 4.4, z, P, 16)).join(""), { tone: "faint" }));
    }
  }

  // 3. RIGHT: Studio Capacity Dial Console & Dispatch Outbox Chute (x = 60..146, y = -48..42)
  const consoleBox: k.Plan = { x: 60, y: -48, w: 86, d: 90, r: 5 };
  out.push(S(k.slabOf(consoleBox, 0, 20, P, 6, 1.0), { tone: "mid", inner: L(k.sideSeam(consoleBox, 7, P, 6) + k.sideSeam(consoleBox, 15, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(consoleBox, 3.5), 20, P, 5), { tone: "faint" }));
  out.push(D(k.corners(consoleBox, 5).map(([x, y]) => at([x, y, 20])), { size: 0.45 }));

  // Large Studio Capacity Dial Gauge on Console Top at (104, -12)
  out.push(S(k.cylinder(DIAL_CX, DIAL_CY, DIAL_R, 20, 8.5, P, 60, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(DIAL_CX, DIAL_CY, DIAL_R, 25, 28.5, 68, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(DIAL_CX, DIAL_CY, DIAL_R - 2.2, 28.5, P, 60), { tone: "lo" }));
  const dticks = k.radialTicks(DIAL_CX, DIAL_CY, DIAL_R - 2.8, 45, 5, 28.5, [1.4, 2.8], P);
  out.push(L(dticks.minor, { tone: "lo" }), L(dticks.major, { tone: "mid" }));
  out.push(L(k.ring(DIAL_CX, DIAL_CY, 1.8, 28.5, P, 18), { tone: "mid" }));

  // Outbox Dispatch Ticket Hopper & Status Knobs on Front of Console (y = 22..34)
  for (const [kx, ang] of [[82, -0.4], [104, 0.6], [126, 0.2]] as const) {
    out.push(S(k.cylinder(kx, 26, 5.8, 20, 4.8, P, 28, 0.4), { tone: "mid" }));
    out.push(L(k.knurl(kx, 26, 5.8, 20, 24.8, 24, P), { tone: "lo" }));
    out.push(L(k.lineOnTop([kx, 26], [kx + Math.cos(ang) * 4.5, 26 + Math.sin(ang) * 4.5], 24.8, P), { tone: "hi", free: "start" }));
  }

  // Coiled Conduit linking Ticket Press Bed to Capacity Console
  const sp = k.coil(48, 60, [28, 6], 3.4, 7, "x", P);
  out.push(L(sp.back, { tone: "lo" }), L(sp.front, { tone: "mid" }));

  return out.join("");
})();

// Front Arch & Overhead Bridge of the Ticket Press (painted AFTER the sliding ticket so the ticket passes underneath!)
const STATIC_FRONT_ARCH = (() => {
  const out: string[] = [];
  const py = 24;
  const pBase: k.Plan = { x: PRESS_CX - 8, y: py - 8, w: 16, d: 16, r: 2.2 };
  out.push(S(k.slabOf(pBase, 0, 9, P, 4, 0.5), { tone: "mid" }));
  out.push(D(k.corners(pBase, 3).map(([x, y]) => at([x, y, 9])), { size: 0.42 }));
  out.push(S(k.cylinder(PRESS_CX, py, 4.4, 9, 52, P, 26), { tone: "mid", crease: "none" }));
  out.push(L([24, 40, 52].map((z) => k.sideArc(PRESS_CX, py, 4.4, z, P, 16)).join(""), { tone: "faint" }));

  // Overhead Crossbar Bridge spanning y = -48..28 at x = PRESS_CX (-34), z = 61..70
  const arch: k.Plan = { x: PRESS_CX - 8.5, y: -50, w: 17, d: 80, r: 2.5 };
  out.push(S(k.slabOf(arch, 61, 9, P, 4, 0.7), { tone: "mid", inner: L(k.sideSeam(arch, 65.5, P, 4), { tone: "faint" }) }));
  const aticks = k.topTicks(-38, 16, 4, 5, PRESS_CX - 7.5, 70, [1.5, 2.8], P, "y");
  out.push(L(aticks.minor, { tone: "lo" }), L(aticks.major, { tone: "mid" }));
  out.push(D([at([PRESS_CX, -44, 70]), at([PRESS_CX, 24, 70])], { size: 0.5 }));

  // Upper Flywheel & Guide Collar on Top of Arch Bridge at (PRESS_CX, PRESS_CY)
  out.push(S(k.cylinder(PRESS_CX, PRESS_CY, 9.5, 70, 5.5, P, 36, 0.5), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(PRESS_CX, PRESS_CY, 9.5, 70, 75.5, 32, P), { tone: "lo" }));
  return out.join("");
})();

// Moving Project Brief Ticket Card (built at x = 0, y = PRESS_CY = -6, z = 8..12.2)
const TICKET_CARD_SVG = (() => {
  const cardPlan: k.Plan = { x: -24, y: PRESS_CY - 12, w: 48, d: 24, r: 2.5 };
  const stampSeal = k.ring(0, PRESS_CY, 6.8, 12.3, P, 28);
  const checkD = k.onTop(
    [
      [-3.8, PRESS_CY + 0.4],
      [-1.0, PRESS_CY + 3.2],
      [4.5, PRESS_CY - 2.6],
    ],
    12.3,
    P,
  );
  return [
    S(k.slabOf(cardPlan, 8, 4.2, P, 4, 0.5), { tone: "hi", lit: true }),
    L(k.planOutline(k.insetPlan(cardPlan, 2.4), 12.2, P, 4), { tone: "lo" }),
    // Printed brief rule lines on left & right of seal
    L(k.lineOnTop([-19, PRESS_CY - 6], [-10, PRESS_CY - 6], 12.2, P), { tone: "lo", free: true }),
    L(k.lineOnTop([-19, PRESS_CY - 1], [-11, PRESS_CY - 1], 12.2, P), { tone: "faint", free: true }),
    L(k.lineOnTop([10, PRESS_CY + 2], [19, PRESS_CY + 2], 12.2, P), { tone: "lo", free: true }),
    L(k.lineOnTop([10, PRESS_CY + 6], [17, PRESS_CY + 6], 12.2, P), { tone: "faint", free: true }),
    // Stamped verification seal in center
    `<g data-part="ticket-seal" style="opacity:1">`,
    L(stampSeal, { tone: "mid" }),
    `<path class="iso-line" data-tone="lit" d="${checkD}" style="stroke-width:1.25"/>`,
    `</g>`,
  ].join("");
})();

// Moving Stamp Ram & Plunger descending from Arch Bridge at (PRESS_CX, PRESS_CY)
const STAMP_RAM_SVG = (() => {
  return [
    // Heavy Stamp Die Block (z = 26..33 at rest; drops 13.5 units to z = 12.5 on stamp)
    S(k.cylinder(PRESS_CX, PRESS_CY, 11.5, 26, 6.5, P, 40, 0.6), { tone: "hi", lit: true }),
    L(k.knurl(PRESS_CX, PRESS_CY, 11.5, 26, 32.5, 36, P), { tone: "lo" }),
    S(k.cylinder(PRESS_CX, PRESS_CY, 6.8, 32.5, 4.5, P, 28), { tone: "mid" }),
    // Piston Rod rising into Arch Bridge plus Top Actuator Cap above Flywheel
    S(k.cylinder(PRESS_CX, PRESS_CY, 2.8, 37, 25, P, 20), { tone: "hi", crease: "none", lit: true }),
    S(k.cylinder(PRESS_CX, PRESS_CY, 4.5, 75.5, 8.5, P, 24, 0.4), { tone: "hi", lit: true }),
  ].join("");
})();

const gearSpokesAt = (angle: number) => {
  const spokes: string[] = [];
  for (let i = 0; i < 4; i++) {
    const a = angle + (i * Math.PI) / 2;
    spokes.push(
      k.lineOnTop(
        [GEAR_L[0] + Math.cos(a) * 6.8, GEAR_L[1] + Math.sin(a) * 6.8],
        [GEAR_L[0] + Math.cos(a) * 16.5, GEAR_L[1] + Math.sin(a) * 16.5],
        13.6,
        P,
      ),
    );
  }
  const a2 = -angle * 1.5;
  for (let i = 0; i < 3; i++) {
    const a = a2 + (i * Math.PI * 2) / 3;
    spokes.push(
      k.lineOnTop(
        [GEAR_R[0] + Math.cos(a) * 4.6, GEAR_R[1] + Math.sin(a) * 4.6],
        [GEAR_R[0] + Math.cos(a) * 11.2, GEAR_R[1] + Math.sin(a) * 11.2],
        12.1,
        P,
      ),
    );
  }
  return spokes.join("");
};

const dialNeedleAt = (turn: number) => {
  const a = turn * Math.PI * 2;
  return k.lineOnTop(
    [DIAL_CX - Math.sin(a) * 3.8, DIAL_CY + Math.cos(a) * 3.8],
    [DIAL_CX + Math.sin(a) * (DIAL_R - 4.4), DIAL_CY - Math.cos(a) * (DIAL_R - 4.4)],
    28.7,
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
    const needleEl = svg.querySelector('[data-part="needle"]');
    const pulseEl = svg.querySelector('[data-part="pulse"]') as SVGPathElement | null;

    let clock = 0;
    let frame = 0;
    let last = 0;
    let gearAngle = 0;
    let ticketX = PRESS_CX;
    const ram = { at: 0, rate: 0 };
    let dialTurn = 0.22;
    let wantDial = 0.22;
    let manual = false;
    let manualPress = 0;
    let idleTimer = 0;

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      clock += dt;

      let wantRam = 0;
      if (!manual) {
        // 3.2s cycle:
        // 0.0..0.9s: ticket feeds from left (-52) to under press (-34) while gears turn
        // 0.9..1.5s: stamp ram strikes down onto ticket & seals it
        // 1.5..2.6s: stamped ticket glides right to dispatch console (+18)
        // 2.6..3.2s: reset smoothly for next project ticket
        const cycle = 3.2;
        const t = clock % cycle;
        const p = t / cycle;

        if (p < 0.28) {
          const u = p / 0.28;
          const e = u * u * (3 - 2 * u);
          ticketX = -54 + e * (PRESS_CX - -54);
          gearAngle += dt * 2.4;
          if (sealEl) sealEl.style.opacity = "0.15";
        } else if (p < 0.52) {
          ticketX = PRESS_CX;
          if (p > 0.31 && p < 0.46) {
            wantRam = 13.5;
            if (p > 0.36 && sealEl) sealEl.style.opacity = "1";
          }
          wantDial = 0.68;
        } else if (p < 0.86) {
          const u = (p - 0.52) / 0.34;
          const e = u * u * (3 - 2 * u);
          ticketX = PRESS_CX + e * (18 - PRESS_CX);
          gearAngle += dt * 2.8;
          if (sealEl) sealEl.style.opacity = "1";
          wantDial = 0.68 - e * 0.38;
        } else {
          const u = (p - 0.86) / 0.14;
          const e = u * u * (3 - 2 * u);
          ticketX = 18 + e * (-54 - 18);
          wantDial = 0.3;
        }
      } else {
        gearAngle += dt * 1.8;
        wantRam = manualPress;
      }

      const stiff = 460;
      const drag = 26;
      for (let i = 0; i < 4; i++) {
        ram.rate += ((wantRam - ram.at) * stiff - ram.rate * drag) * (dt / 4);
        ram.at += ram.rate * (dt / 4);
      }
      dialTurn += (wantDial - dialTurn) * (1 - Math.exp(-dt / 0.18));

      ticketEl?.setAttribute("transform", k.translateAlong(P, [ticketX, 0, 0]));
      ramEl?.setAttribute("transform", k.translateAlong(P, [0, 0, -ram.at]));
      spokesEl?.setAttribute("d", gearSpokesAt(gearAngle));
      needleEl?.setAttribute("d", dialNeedleAt(dialTurn));

      if (pulseEl) {
        if (ram.at > 5) {
          const r = 10 + (ram.at / 13.5) * 9;
          pulseEl.setAttribute("d", k.ring(PRESS_CX, PRESS_CY, r, 12.6, P, 32));
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
      ticketX = -52 + fx * 70;
      wantDial = 0.18 + fx * 0.64;
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
      wantDial = 0.78;
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
      STATIC_FRONT_ARCH,
      `<path data-part="needle" class="iso-line" data-tone="lit" d="${dialNeedleAt(0.42)}" style="stroke-width:1.25"/>`,
    ].join("");
  }, []);

  return (
    <div className="iso footer-iso-stage" data-theme="light">
      <div
        ref={rootRef}
        className="iso-stage sp-card-stage"
        dangerouslySetInnerHTML={{
          __html: `<svg class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Automated Project Dispatch and Ticket Press Machine">${svgMarkup}</svg>`,
        }}
      />
    </div>
  );
}
