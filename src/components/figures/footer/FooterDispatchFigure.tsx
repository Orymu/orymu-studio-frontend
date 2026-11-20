"use client";

import * as React from "react";
import * as k from "../../iso/iso-kit";
import { asksForStillness, useInView } from "../../iso/react/live";
import {
  BLADES_STATIC,
  SORTED_ITEMS,
  STATIC_FLOOR_SVG,
  dialNeedle1At,
  dialNeedle2At,
  drumAndPenSvgAt,
  gearsAndConrodSvgAt,
  pistonAndSpringsSvgAt,
  pumpFanSvgAt,
  scopeWavePathsAt,
} from "./geometry";
import { HEIGHT, P, WIDTH } from "./view";

export function FooterDispatchFigure() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef);

  React.useEffect(() => {
    const stage = rootRef.current;
    if (!stage || !visible || asksForStillness()) return;
    const svg = stage.querySelector("svg");
    if (!svg) return;

    const pumpEl = svg.querySelector('[data-part="pump-fan"]') as SVGGElement | null;
    const gearsEl = svg.querySelector('[data-part="gears"]') as SVGGElement | null;
    const pistonEl = svg.querySelector('[data-part="piston"]') as SVGGElement | null;
    const wave1El = svg.querySelector('[data-part="scope-wave-1"]') as SVGPathElement | null;
    const wave2El = svg.querySelector('[data-part="scope-wave-2"]') as SVGPathElement | null;
    const dotEl = svg.querySelector('[data-part="scope-dot"]') as SVGCircleElement | null;
    const drumPenEl = svg.querySelector('[data-part="drum-pen"]') as SVGGElement | null;
    const needle1El = svg.querySelector('[data-part="needle-1"]') as SVGPathElement | null;
    const needle2El = svg.querySelector('[data-part="needle-2"]') as SVGPathElement | null;
    const bladeEls = BLADES_STATIC.map((_, i) => svg.querySelector(`[data-part="blade-${i}"]`) as SVGGElement | null);

    let frame = 0;
    let last = 0;
    let clock = 0;
    let shaftAngle = 0.4;
    let pumpAngle = 0;
    let drumPhase = 0;

    let hovering = false;
    let pointerX = 0.5;
    let pointerY = 0.5;
    let boost = 0;
    let idleTimer = 0;

    let speedCur = 1.0;
    let dial1 = 0.34;
    let dial2 = 0.48;
    const bladeLift = BLADES_STATIC.map((_, i) => (i === 2 ? 7 : 0));

    function tick(now: number) {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      clock += dt;
      boost *= Math.exp(-dt / 0.45);

      const wantSpeed = (hovering ? 0.65 + pointerX * 1.35 : 1.0) + boost * 1.9;
      speedCur += (wantSpeed - speedCur) * (1 - Math.exp(-dt / 0.22));

      shaftAngle += dt * 1.9 * speedCur;
      pumpAngle += dt * 4.8 * speedCur;
      drumPhase += dt * 0.85 * speedCur;

      // 1. Bay 1 Impeller Fan
      if (pumpEl) pumpEl.innerHTML = pumpFanSvgAt(pumpAngle);

      // 2. Bay 2 Flywheel, Meshed Pinion, Crankarm & Piston Linkage
      const gearState = gearsAndConrodSvgAt(shaftAngle);
      if (gearsEl) gearsEl.innerHTML = gearState.svg;
      if (pistonEl) pistonEl.innerHTML = pistonAndSpringsSvgAt(gearState.pistonX);

      // 3. Bay 3 Live Recessed CRT Oscilloscope Harmonics
      const freq = hovering ? 1.4 + pointerX * 2.2 : 2.1 + Math.sin(clock * 0.4) * 0.35;
      const amp = hovering ? 6 + (1 - pointerY) * 5 : 7.8 + boost * 2.2;
      const waves = scopeWavePathsAt(clock * 3.4 * speedCur, freq, amp);
      wave1El?.setAttribute("d", waves.d1);
      wave2El?.setAttribute("d", waves.d2);
      dotEl?.setAttribute("cx", waves.dotX);
      dotEl?.setAttribute("cy", waves.dotY);

      // 4. Bay 4 Modular Compute Blades (active cycling blade smoothly elevates +7 units)
      const activeIdx = hovering
        ? Math.min(BLADES_STATIC.length - 1, Math.floor(pointerX * BLADES_STATIC.length))
        : Math.floor(clock / 1.4) % BLADES_STATIC.length;
      bladeEls.forEach((el, idx) => {
        if (!el) return;
        const targetLift = idx === activeIdx ? 7.2 : 0;
        bladeLift[idx] += (targetLift - bladeLift[idx]) * (1 - Math.exp(-dt / 0.14));
        el.setAttribute("transform", k.translateAlong(P, [0, 0, bladeLift[idx]]));
        const topSolid = el.querySelector(".iso-solid");
        if (topSolid) {
          if (idx === activeIdx) topSolid.setAttribute("data-lit", "");
          else topSolid.removeAttribute("data-lit");
        }
      });

      // 5. Bay 5 Strip-Chart Rotary Drum & Pen Carriage + Twin Gauges
      const penU = 0.5 + Math.sin(clock * 1.15) * 0.36;
      if (drumPenEl) drumPenEl.innerHTML = drumAndPenSvgAt(drumPhase, penU);

      const loadOsc = (Math.sin(shaftAngle) * 0.08 + Math.cos(clock * 1.4) * 0.05) + (speedCur - 1) * 0.25;
      const wantDial1 = Math.max(0.14, Math.min(0.86, 0.42 + loadOsc));
      const wantDial2 = Math.max(0.18, Math.min(0.82, 0.56 - loadOsc * 0.7));
      dial1 += (wantDial1 - dial1) * (1 - Math.exp(-dt / 0.18));
      dial2 += (wantDial2 - dial2) * (1 - Math.exp(-dt / 0.22));
      needle1El?.setAttribute("d", dialNeedle1At(dial1));
      needle2El?.setAttribute("d", dialNeedle2At(dial2));

      frame = requestAnimationFrame(tick);
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      pointerX = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
      pointerY = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
      hovering = true;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        hovering = false;
      }, 2400);
    };

    const onPointerLeave = () => {
      hovering = false;
    };

    const onClick = () => {
      boost = 1.0;
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    stage.addEventListener("click", onClick);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
      stage.removeEventListener("click", onClick);
    };
  }, [visible]);

  const svgMarkup = React.useMemo(() => {
    const restGear = gearsAndConrodSvgAt(0.4);
    const out: string[] = [STATIC_FLOOR_SVG];

    for (const item of SORTED_ITEMS) {
      if (!item.marker) {
        out.push(item.svg);
        continue;
      }
      if (item.marker === "PUMP_FAN") {
        out.push(`<g data-part="pump-fan">${pumpFanSvgAt(0)}</g>`);
      } else if (item.marker === "GEARS_AND_CONROD") {
        out.push(`<g data-part="gears">${restGear.svg}</g>`);
      } else if (item.marker === "PISTON_AND_SPRINGS") {
        out.push(`<g data-part="piston">${pistonAndSpringsSvgAt(restGear.pistonX)}</g>`);
      } else if (item.marker.startsWith("BLADE_")) {
        const idx = Number(item.marker.slice(6));
        const blade = BLADES_STATIC[idx];
        if (blade) {
          const lift = idx === 2 ? 7 : 0;
          out.push(`<g data-part="blade-${idx}" transform="${k.translateAlong(P, [0, 0, lift])}">${blade.svg}</g>`);
        }
      } else if (item.marker === "DRUM_PEN") {
        out.push(`<g data-part="drum-pen">${drumAndPenSvgAt(0, 0.5)}</g>`);
      } else if (item.marker === "NEEDLE_1") {
        out.push(`<path data-part="needle-1" class="iso-line" data-tone="lit" d="${dialNeedle1At(0.34)}" style="stroke-width:1.2"/>`);
      } else if (item.marker === "NEEDLE_2") {
        out.push(`<path data-part="needle-2" class="iso-line" data-tone="lit" d="${dialNeedle2At(0.48)}" style="stroke-width:1.15"/>`);
      }
    }

    return out.join("");
  }, []);

  return (
    <div className="iso footer-iso-stage" data-theme="light">
      <div
        ref={rootRef}
        className="iso-stage sp-card-stage"
        dangerouslySetInnerHTML={{
          __html: `<svg class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Integrated Systems Architecture, Cryo-Thermal Manifold, Oscilloscope and Strip-Chart Telemetry Bench">${svgMarkup}</svg>`,
        }}
      />
    </div>
  );
}
