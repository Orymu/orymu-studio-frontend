"use client";

import * as React from "react";
import * as k from "../../iso/iso-kit";
import { useInView } from "../../iso/react/live";

const WIDTH = 600;
const HEIGHT = 340;
const AZIMUTH = 57;

// Identical base plate & projection envelope to Card 2 (TestRigCardFigure) so all 3 cards match in scale, angle & height
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

// 6 Booking Slot Bays (3x2 grid on the central calendar tray)
const SLOTS: Array<{ x: number; y: number; cx: number; cy: number }> = [];
for (let row = 0; row < 2; row++) {
  for (let col = 0; col < 3; col++) {
    const sx = -104 + col * 52;
    const sy = -30 + row * 34;
    SLOTS.push({ x: sx, y: sy, cx: sx + 21, cy: sy + 13 });
  }
}

// Right side: Ticket Dispenser & Booking Counter Dial Console
const CONSOLE: k.Plan = { x: 68, y: -38, w: 80, d: 80, r: 4.5 };
const CONSOLE_H = 22;
const COUNTER_CX = 108;
const COUNTER_CY = 16;
const COUNTER_R = 17;

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

  // Overhead Gantry Bridge at y = RAIL_Y (-66), z = 50..58 (matches Card 2's tall bridge silhouette)
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

  // Booking Calendar Matrix Tray (center-left bed)
  const tray: k.Plan = { x: -114, y: -38, w: 168, d: 80, r: 4.5 };
  out.push(S(k.slabOf(tray, 0, 6, P, 6, 0.8), { tone: "hi", crease: "lo", inner: L(k.sideSeam(tray, 3, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(tray, 3.2), 6, P, 5), { tone: "faint" }));
  out.push(D(k.corners(tray, 5).map(([x, y]) => at([x, y, 6])), { size: 0.45 }));

  // 6 Booking Slot Wells on Tray Top (z = 6)
  SLOTS.forEach((s) => {
    const well: k.Plan = { x: s.x, y: s.y, w: 42, d: 26, r: 2.5 };
    out.push(L(k.planOutline(well, 6, P, 4), { tone: "lo" }));
    out.push(L(k.planOutline(k.insetPlan(well, 2.2), 6, P, 4), { tone: "faint" }));
    out.push(D([at([s.x + 3.5, s.y + 3.5, 6]), at([s.x + 38.5, s.y + 3.5, 6])], { size: 0.4, tone: "lo" }));
  });

  // Right Side: Lead & Booking Counter Console + Ticket Printer Slot
  out.push(S(k.slabOf(CONSOLE, 0, CONSOLE_H, P, 6, 0.9), { tone: "mid", inner: L(k.sideSeam(CONSOLE, 7, P, 6) + k.sideSeam(CONSOLE, 16, P, 6), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(CONSOLE, 3.5), CONSOLE_H, P, 5), { tone: "faint" }));
  out.push(D(k.corners(CONSOLE, 5).map(([x, y]) => at([x, y, CONSOLE_H])), { size: 0.45 }));

  // Ticket Dispenser Platen Housing on top-back of Console (y = -31..-7)
  const printer: k.Plan = { x: 78, y: -31, w: 60, d: 22, r: 2.5 };
  out.push(S(k.slabOf(printer, CONSOLE_H, 8, P, 4, 0.5), { tone: "hi", crease: "lo" }));
  const slotOpening: k.Plan = { x: 86, y: -23, w: 44, d: 6, r: 1.2 };
  out.push(`<path class="iso-shade" data-shade="0" d="${k.pathOf(k.roundedPlan(slotOpening, 3).map(([x, y]) => at([x, y, CONSOLE_H + 8])), true)}"/>`);
  out.push(L(k.planOutline(slotOpening, CONSOLE_H + 8, P, 3), { tone: "lo" }));

  // Rotary Booking Counter Dial on Console Front-Top
  out.push(S(k.cylinder(COUNTER_CX, COUNTER_CY, COUNTER_R, CONSOLE_H, 6.5, P, 52, 0.6), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(COUNTER_CX, COUNTER_CY, COUNTER_R, CONSOLE_H + 3.8, CONSOLE_H + 6.5, 56, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(COUNTER_CX, COUNTER_CY, COUNTER_R - 2.0, CONSOLE_H + 6.5, P, 52), { tone: "lo" }));
  const cticks = k.radialTicks(COUNTER_CX, COUNTER_CY, COUNTER_R - 2.6, 36, 3, CONSOLE_H + 6.5, [1.2, 2.5], P);
  out.push(L(cticks.minor, { tone: "lo" }), L(cticks.major, { tone: "mid" }));
  out.push(L(k.ring(COUNTER_CX, COUNTER_CY, 1.5, CONSOLE_H + 6.5, P, 16), { tone: "mid" }));

  // Coiled Conduit linking Calendar Tray to Counter Console
  const sp = k.coil(54, 68, [-10, 6], 3.2, 7, "x", P);
  out.push(L(sp.back, { tone: "lo" }), L(sp.front, { tone: "mid" }));

  return out.join("");
})();

const SLOT_CARDS = SLOTS.map((s, idx) => {
  const cardPlan: k.Plan = { x: s.x + 3, y: s.y + 3, w: 36, d: 20, r: 2 };
  const checkD = k.onTop(
    [
      [s.cx - 5.5, s.cy + 0.5],
      [s.cx - 1.5, s.cy + 4.2],
      [s.cx + 6.5, s.cy - 3.6],
    ],
    9.2,
    P,
  );
  const badgeRing = k.ring(s.cx, s.cy, 8.2, 9.2, P, 24);
  return {
    idx,
    baseSvg:
      S(k.slabOf(cardPlan, 6, 3.0, P, 3, 0.35), { tone: "mid" }) +
      L(k.lineOnTop([s.x + 8, s.y + 8], [s.x + 30, s.y + 8], 9, P), { tone: "faint" }) +
      L(k.lineOnTop([s.x + 8, s.y + 13.5], [s.x + 22, s.y + 13.5], 9, P), { tone: "faint" }),
    litSvg:
      S(k.slabOf(cardPlan, 6, 3.5, P, 3, 0.4), { tone: "hi", lit: true }) +
      L(badgeRing, { tone: "lo" }) +
      `<path class="iso-line" data-tone="lit" d="${checkD}" style="stroke-width:1.2"/>`,
  };
});

const TICKET_SVG = (() => {
  const tPlan: k.Plan = { x: 90, y: -21.5, w: 36, d: 3.2, r: 0.8 };
  return [
    S(k.slabOf(tPlan, CONSOLE_H + 6, 16, P, 3, 0.3), { tone: "hi", lit: true }),
    L(k.lineOnTop([95, -20], [121, -20], CONSOLE_H + 22, P), { tone: "lo" }),
  ].join("");
})();

const REF_X = SLOTS[0]!.cx; // -83
const REF_Y = SLOTS[0]!.cy; // -17
const BRIDGE_TOP = RAIL_Z + RAIL_H; // 58

const GANTRY_X_SVG = (() => {
  const xBlock: k.Plan = { x: REF_X - 11, y: RAIL_Y - 7, w: 22, d: 14, r: 2.5 };
  const yArm: k.Plan = { x: REF_X - 3.5, y: RAIL_Y + 6, w: 7, d: 98, r: 1.5 };
  const yTicks = k.topTicks(-52, 28, 5, 5, REF_X - 2.8, BRIDGE_TOP + 8, [1.4, 2.6], P, "y");
  return [
    S(k.slabOf(xBlock, BRIDGE_TOP, 9, P, 5, 0.8), { tone: "mid" }),
    L(k.planOutline(k.insetPlan(xBlock, 2), BRIDGE_TOP + 9, P), { tone: "faint" }),
    D([at([REF_X - 7, RAIL_Y - 3, BRIDGE_TOP + 9]), at([REF_X + 7, RAIL_Y - 3, BRIDGE_TOP + 9])], { size: 0.45 }),
    S(k.slabOf(yArm, BRIDGE_TOP + 3, 5, P, 4, 0.6), { tone: "mid" }),
    L(yTicks.minor, { tone: "lo" }),
    L(yTicks.major, { tone: "mid" }),
  ].join("");
})();

const GANTRY_Y_FOLLOWER_SVG = (() => {
  const head: k.Plan = { x: REF_X - 8, y: REF_Y - 8, w: 16, d: 16, r: 2.2 };
  return [
    S(k.slabOf(head, BRIDGE_TOP + 1.5, 8.5, P, 4, 0.6), { tone: "hi", crease: "lo" }),
    D(k.corners(head, 2.8).map(([x, y]) => at([x, y, BRIDGE_TOP + 10])), { size: 0.42 }),
    S(k.cylinder(REF_X, REF_Y, 4.8, BRIDGE_TOP + 10, 5.5, P, 24, 0.3), { tone: "mid" }),
    L(k.knurl(REF_X, REF_Y, 4.8, BRIDGE_TOP + 10, BRIDGE_TOP + 15.5, 20, P), { tone: "lo" }),
  ].join("");
})();

const STAMP_PLUNGER_SVG = (() => {
  return [
    S(k.cylinder(REF_X, REF_Y, 7.2, 21, 4.2, P, 28, 0.4), { tone: "hi", lit: true }),
    L(k.knurl(REF_X, REF_Y, 7.2, 21, 25.2, 24, P), { tone: "lo" }),
    S(k.cylinder(REF_X, REF_Y, 4.2, 25.2, 3, P, 22), { tone: "mid" }),
    S(k.cylinder(REF_X, REF_Y, 2.0, 28.2, 32, P, 18), { tone: "hi", crease: "none", lit: true }),
  ].join("");
})();

const counterNeedleAt = (turn: number) => {
  const a = turn * Math.PI * 2;
  const z = CONSOLE_H + 6.7;
  return k.lineOnTop(
    [COUNTER_CX - Math.sin(a) * 3.0, COUNTER_CY + Math.cos(a) * 3.0],
    [COUNTER_CX + Math.sin(a) * (COUNTER_R - 3.8), COUNTER_CY - Math.cos(a) * (COUNTER_R - 3.8)],
    z,
    P,
  );
};

export function SmartphoneCardFigure() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);

  React.useEffect(() => {
    const stage = rootRef.current;
    if (!stage || !visible) return;
    const svg = stage.querySelector("svg");
    if (!svg) return;

    const xCarEl = svg.querySelector('[data-part="x-car"]');
    const yFolEl = svg.querySelector('[data-part="y-fol"]');
    const stampEl = svg.querySelector('[data-part="stamp"]');
    const ticketEl = svg.querySelector('[data-part="ticket"]');
    const needleEl = svg.querySelector('[data-part="needle"]');
    const pulseRingEl = svg.querySelector('[data-part="pulse-ring"]');
    const litEls = SLOTS.map((_, i) => svg.querySelector(`[data-part="slot-lit-${i}"]`) as SVGGElement | null);

    const ORDER = [0, 4, 1, 5, 2, 3];
    let stepIdx = 0;
    let stepClock = 0;
    let curX = SLOTS[0]!.cx;
    let curY = SLOTS[0]!.cy;
    let targetX = curX;
    let targetY = curY;
    const press = { at: 0, rate: 0 };
    let wantPress = 0;
    let ticketLift = 0;
    let dialAngle = 0;
    let wantDial = 0;
    let activeSlot = 0;
    let bookedSet = new Set<number>([0, 4]);

    let frame = 0;
    let last = 0;
    let manual = false;
    let idleTimer = 0;

    const syncSlots = () => {
      litEls.forEach((el, idx) => {
        if (!el) return;
        el.style.opacity = bookedSet.has(idx) ? "1" : "0";
      });
    };
    syncSlots();

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      stepClock += dt;

      if (!manual) {
        const cycle = 1.55;
        if (stepClock >= cycle) {
          stepClock -= cycle;
          stepIdx = (stepIdx + 1) % ORDER.length;
          activeSlot = ORDER[stepIdx]!;
          if (stepIdx === 0) bookedSet = new Set<number>();
          targetX = SLOTS[activeSlot]!.cx;
          targetY = SLOTS[activeSlot]!.cy;
          wantDial += 1 / 6;
        }
        const phase = stepClock / cycle;
        if (phase > 0.36 && phase < 0.68) {
          wantPress = 11.5;
          if (!bookedSet.has(activeSlot) && phase > 0.45) {
            bookedSet.add(activeSlot);
            syncSlots();
          }
        } else {
          wantPress = 0;
        }
        const wantTicket = phase > 0.38 && phase < 0.85 ? 8.0 : 0;
        ticketLift += (wantTicket - ticketLift) * (1 - Math.exp(-dt / 0.12));
      } else {
        ticketLift += ((wantPress > 5 ? 8.0 : 1.5) - ticketLift) * (1 - Math.exp(-dt / 0.12));
      }

      curX += (targetX - curX) * (1 - Math.exp(-dt / 0.13));
      curY += (targetY - curY) * (1 - Math.exp(-dt / 0.13));
      dialAngle += (wantDial - dialAngle) * (1 - Math.exp(-dt / 0.18));

      const stiff = 420;
      const drag = 26;
      for (let i = 0; i < 4; i++) {
        press.rate += ((wantPress - press.at) * stiff - press.rate * drag) * (dt / 4);
        press.at += press.rate * (dt / 4);
      }

      const dx = curX - REF_X;
      const dy = curY - REF_Y;
      xCarEl?.setAttribute("transform", k.translateAlong(P, [dx, 0, 0]));
      yFolEl?.setAttribute("transform", k.translateAlong(P, [0, dy, 0]));
      stampEl?.setAttribute("transform", k.translateAlong(P, [0, 0, -press.at]));
      ticketEl?.setAttribute("transform", k.translateAlong(P, [0, 0, ticketLift - 6]));
      needleEl?.setAttribute("d", counterNeedleAt(dialAngle));

      if (pulseRingEl) {
        if (press.at > 4) {
          const r = 7 + (press.at / 11.5) * 8.5;
          pulseRingEl.setAttribute("d", k.ring(curX, curY, r, 9.6, P, 28));
          (pulseRingEl as SVGPathElement).style.opacity = String(Math.max(0, 1 - press.at / 13.5));
        } else {
          (pulseRingEl as SVGPathElement).style.opacity = "0";
        }
      }

      frame = requestAnimationFrame(tick);
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const fx = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
      const fy = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
      const col = fx < 0.32 ? 0 : fx < 0.52 ? 1 : 2;
      const row = fy < 0.52 ? 0 : 1;
      const idx = row * 3 + col;
      manual = true;
      activeSlot = idx;
      targetX = SLOTS[idx]!.cx;
      targetY = SLOTS[idx]!.cy;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        manual = false;
        wantPress = 0;
      }, 2200);
    };

    const onClick = () => {
      manual = true;
      wantPress = 11.5;
      bookedSet.add(activeSlot);
      wantDial += 1 / 6;
      syncSlots();
      window.setTimeout(() => {
        wantPress = 0;
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
    const cardsMarkup = SLOT_CARDS.map(
      (c) =>
        `<g>${c.baseSvg}<g data-part="slot-lit-${c.idx}" style="opacity:0;transition:opacity 180ms ease">${c.litSvg}</g></g>`,
    ).join("");

    return [
      STATIC_BACK,
      cardsMarkup,
      `<path data-part="pulse-ring" class="iso-line" data-tone="lit" d="" style="opacity:0"/>`,
      `<g data-part="ticket">${TICKET_SVG}</g>`,
      `<path data-part="needle" class="iso-line" data-tone="lit" d="${counterNeedleAt(0.15)}" style="stroke-width:1.2"/>`,
      `<g data-part="x-car">${GANTRY_X_SVG}<g data-part="y-fol"><g data-part="stamp">${STAMP_PLUNGER_SVG}</g>${GANTRY_Y_FOLLOWER_SVG}</g></g>`,
    ].join("");
  }, []);

  return (
    <div className="iso iso-card-stage iso-plate" data-theme="light">
      <div
        ref={rootRef}
        className="iso-stage sp-card-stage"
        tabIndex={0}
        role="slider"
        aria-label="Automatic Booking Calendar Matrix and Lead Stamp Machine"
        aria-valuemin={1}
        aria-valuemax={6}
        aria-valuenow={2}
        dangerouslySetInnerHTML={{
          __html: `<svg class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Automated booking calendar matrix and ticket stamping machine">${svgMarkup}</svg>`,
        }}
      />
    </div>
  );
}
