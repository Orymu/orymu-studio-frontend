import * as k from "../../iso/iso-kit";
import * as G from "../../iso/lathe";
import { tubePieces, tubeSvg } from "../../iso/tube";
import {
  ACC_CENTER,
  ANNEX_BASE,
  BASE_H,
  BLADE_XS,
  CRANK_R,
  DIAL_1,
  DIAL_1_R,
  DIAL_1_Z,
  DIAL_2,
  DIAL_2_R,
  DIAL_2_Z,
  DRUM_R,
  DRUM_X,
  DRUM_Y0,
  DRUM_Y1,
  DRUM_Z,
  FLY_CENTER,
  FLY_R,
  FOOT_H,
  GOV_CENTER,
  MAIN_BASE,
  P,
  PINION_CENTER,
  PINION_R,
  PISTON_Y,
  PISTON_Z,
  PUMP_AXIS_Y,
  PUMP_AXIS_Z,
  SCOPE_BEZEL,
  SCOPE_CRT,
  SCOPE_FRONT_Y,
  SKID_BASE,
  V,
  WING_TOP,
  D,
  L,
  S,
  at,
  depthOf,
} from "./view";

interface DrawItem {
  depth: number;
  bias?: number;
  marker?: string;
  svg: string;
}

const byDepth2D = (pts: k.Plane[]) =>
  [...pts].sort((a, b) => depthOf([a[0], a[1], 0]) - depthOf([b[0], b[1], 0]));

const XF = G.frameOf([0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const YF = G.frameOf([0, 0, 0], [0, 1, 0], [-1, 0, 0], [0, 0, 1]);
const ZF = G.frameOf([0, 0, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0]);

const seg = (a: k.Point3, b: k.Point3) => k.segment(a, b, P);
const curve = (pts: k.Point3[], closed = false) => k.pathOf(pts.map(at), closed);

// Helper: build side panel slots on Y face or X face
const xFaceSlot = (x: number, y: number, z0: number, z1: number, half = 0.8) =>
  k.pathOf(
    k.roundedPlan({ x: y - half, y: z0, w: half * 2, d: z1 - z0, r: half }, 3).map(([u, z]) => at([x, u, z])),
    true,
  );

// Front-face local SVG mapping helper (like desk-computer)
const planeOfFront = (y: number) => k.sideMatrix([0, y], 0, P, "left");
const flatOnFront = (x0: number, z0: number, x1: number, z1: number, r: number, steps = 5) =>
  k.pathOf(
    k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z]),
    true,
  );

let clipSeq = 0;
function buildRecess(
  rect: { x0: number; x1: number; z0: number; z1: number; r: number; depth: number },
  y: number,
  backContent: string,
  backClass: string,
  insideContent = "",
) {
  const id = `ft-clip-${clipSeq++}`;
  const ring = k.roundedPlan(
    { x: rect.x0, y: rect.z0, w: rect.x1 - rect.x0, d: rect.z1 - rect.z0, r: rect.r },
    6,
  );
  const cx = (rect.x0 + rect.x1) / 2;
  const cz = (rect.z0 + rect.z1) / 2;
  const { sinA } = k.cameraOf(P);
  const tops: string[] = [];
  const sides: string[][] = [[], [], [], []];

  ring.forEach(([ax, az], idx) => {
    const [bx, bz] = ring[(idx + 1) % ring.length]!;
    const len = Math.hypot(bx - ax, bz - az) || 1;
    let [nx, nz] = [(bz - az) / len, -(bx - ax) / len];
    if (nx * (cx - (ax + bx) / 2) + nz * (cz - (az + bz) / 2) < 0) {
      nx = -nx;
      nz = -nz;
    }
    if (nx <= 0 && nz <= 0) return;
    const quad = k.pathOf(
      [at([ax, y, az]), at([bx, y, bz]), at([bx, y - rect.depth, bz]), at([ax, y - rect.depth, az])],
      true,
    );
    if (nz >= nx) tops.push(quad);
    else sides[Math.min(3, Math.max(0, Math.floor(((nx * -sinA + 1) / 2) * 4)))].push(quad);
  });

  const shape = flatOnFront(rect.x0, rect.z0, rect.x1, rect.z1, rect.r);
  return [
    `<clipPath id="${id}"><path transform="${planeOfFront(y)}" d="${shape}"/></clipPath>`,
    `<g clip-path="url(#${id})">`,
    `<path class="iso-top" d="${tops.join("")}"/>`,
    ...sides.map((d, shade) => (d.length ? `<path class="iso-shade" data-shade="${shade}" d="${d.join("")}"/>` : "")),
    `<g transform="${planeOfFront(y - rect.depth)}"><path class="${backClass}" d="${shape}"/>${backContent}<path class="iso-line" data-tone="faint" d="${shape}"/></g>`,
    insideContent,
    `</g>`,
    `<g transform="${planeOfFront(y)}"><path class="iso-line" data-tone="lo" d="${shape}"/></g>`,
  ].join("");
}

function buildPipeNetwork(items: DrawItem[]) {
  const pushTube = (
    waypoints: k.Point3[],
    radius: number,
    bendR: number,
    options: {
      tone?: k.Tone;
      flanges?: [boolean, boolean];
      clampAt?: number[];
      bellows?: [number, number, number] | null;
      rings?: NonNullable<Parameters<typeof tubePieces>[3]>["rings"];
    } = {},
  ) => {
    const tone = options.tone ?? "hi";
    const flanges = options.flanges ?? [true, true];
    const dense = G.fillet(waypoints, bendR, 14, { P, tube: radius });
    const total = G.pathLength(dense);
    const gaps: Array<[number, number]> = [];
    const collars: Array<{ at: number; r: number; t: number; kind: "flange" | "clamp" }> = [];

    if (flanges[0]) {
      const t = Math.max(1.2, radius * 0.65);
      gaps.push([0, t]);
      collars.push({ at: t / 2, r: radius * 1.6, t, kind: "flange" });
    }
    if (flanges[1]) {
      const t = Math.max(1.2, radius * 0.65);
      gaps.push([total - t, total]);
      collars.push({ at: total - t / 2, r: radius * 1.6, t, kind: "flange" });
    }
    for (const share of options.clampAt ?? []) {
      const s = total * share;
      const t = Math.max(1.4, radius * 0.85);
      gaps.push([s - t / 2, s + t / 2]);
      collars.push({ at: s, r: radius * 1.38, t, kind: "clamp" });
    }
    if (options.bellows) {
      const [f, to, cnt] = options.bellows;
      const t = Math.max(0.7, radius * 0.32);
      for (let i = 0; i < cnt; i++) {
        const s = total * (f + ((to - f) * i) / (cnt - 1));
        gaps.push([s - t / 2, s + t / 2]);
        collars.push({ at: s, r: radius * 1.32, t, kind: "clamp" });
      }
    }

    for (const piece of tubePieces(dense, radius, P, { maxLength: 24, spacing: 2.0, gaps, caps: true, rings: options.rings ?? null })) {
      items.push({ depth: depthOf(piece.mid), svg: tubeSvg(piece, { tone }) });
    }
    for (const c of collars) {
      const pos = G.pointAlong(dense, c.at);
      const tan = G.tangentAlong(dense, c.at);
      const frame = G.frameAlong(pos, tan);
      const disc = G.disc(-c.t / 2, c.t / 2, c.r, frame, P, { steps: 24 });
      const bolts =
        c.kind === "flange" && Math.abs(G.dot3(frame.a, V)) > 0.14
          ? D(G.dotsOf(frame, G.dot3(frame.a, V) > 0 ? c.t / 2 : -c.t / 2, c.r * 0.72, 6, P, { all: true }), {
              size: 0.4,
              tone: "mid",
            })
          : "";
      items.push({ depth: depthOf(pos), svg: S(disc, { tone: c.kind === "flange" ? "mid" : "hi" }) + bolts });
    }
  };

  // PIPE 1: High-Pressure Discharge Pipe from Skid Pump top [-226, PUMP_AXIS_Y, 29.8] across bridge through inline Lathe Valve to Vertical Accumulator front port [ACC_CENTER[0], ACC_CENTER[1] + 19.5, 39]
  const p1A: k.Point3[] = [
    [-226, PUMP_AXIS_Y, 29.8],
    [-226, PUMP_AXIS_Y, 39],
    [-226, 48, 39],
  ];
  const p1B: k.Point3[] = [
    [-226, 30, 39],
    [-226, 12, 39],
    [ACC_CENTER[0], 12, 39],
    [ACC_CENTER[0], ACC_CENTER[1] + 19.5, 39],
  ];
  pushTube(p1A, 2.7, 6.5, { clampAt: [0.55] });
  pushTube(p1B, 2.7, 7.5, { bellows: [0.35, 0.5, 5] });

  // Inline Machined Check Valve between y=48 and y=30 on x=-226, z=39 (oriented along -Y!)
  const valveFrame = G.frameAlong([-226, 48, 39], [0, -1, 0]);
  items.push({
    depth: depthOf([-226, 39, 39]),
    svg:
      S(
        G.solidOf(
          [
            [0, 4.4],
            [1.5, 4.4],
            [2, 3.2],
            [4.5, 5.4, 1],
            [9, 6.8, 1],
            [13.5, 5.4, 1],
            [16, 3.2],
            [16.5, 4.4],
            [18, 4.4],
          ],
          valveFrame,
          P,
          { smooth: { rows: 3 } },
        ),
        { tone: "hi", crease: "lo" },
      ) +
      S(k.cylinder(-226, 39, 3.2, 44.8, 4.4, P, 20), { tone: "mid" }) +
      S(k.cylinder(-226, 39, 6.2, 49.2, 2.4, P, 24, 0.3), { tone: "hi", crease: "lo" }) +
      L(k.knurl(-226, 39, 6.2, 49.2, 51.6, 20, P), { tone: "lo" }),
  });

  // PIPE 2: Braided Heat Exchanger -> Bay 3 Oscilloscope Cooling Rear Run (behind Gearbox along y=-48)
  const p2: k.Point3[] = [
    [-229, -26, 46],
    [-229, -49, 46],
    [-229, -49, 32],
    [-46, -49, 32],
    [-46, -42, 32],
  ];
  pushTube(p2, 2.1, 6.5, {
    tone: "mid",
    rings: { pitch: 3.2, twist: 1.4, cross: true, tone: "lo" },
    clampAt: [0.4, 0.65, 0.85],
  });
  // Stand-off posts supporting Pipe 2 at y=-49 (depth < pipe, drawn behind)
  for (const sx of [-190, -130, -80]) {
    items.push({
      depth: depthOf([sx, -50, 15]),
      svg:
        S(k.slabOf({ x: sx - 3.5, y: -52.5, w: 7, d: 7, r: 1.5 }, 0, 3.5, P, 3, 0.3), { tone: "lo" }) +
        S(k.cylinder(sx, -49, 1.8, 3.5, 26.5, P, 14), { tone: "mid", crease: "none" }),
    });
  }

  // PIPE 3: Coaxial Sensor Probe Lead (Skid sight-filter/Gearbox pickup to Bay 3 Oscilloscope side BNC [-58, +24, 15])
  const p3: k.Point3[] = [
    [-112, 28, 12],
    [-92, 34, 10],
    [-70, 34, 15],
    [-58, 24, 15],
  ];
  pushTube(p3, 1.4, 5.5, {
    tone: "hi",
    rings: { pitch: 2.2, tone: "lo" },
  });

  // PIPE 4: Twin Overhead Armored Data Trunk Conduits bridging Bay 3 Scope Rear [42, -40, 56] -> Annex Isolation Chokes [145, -76, 48] & [195, -76, 54]
  const p4: k.Point3[] = [
    [40, -42, 58],
    [40, -68, 58],
    [145, -68, 58],
    [145, -76, 48],
  ];
  pushTube(p4, 2.8, 7.5, {
    tone: "mid",
    bellows: [0.42, 0.56, 5],
  });

  // PIPE 5: Power Trunk Loop from Bay 4 Annex Choke #2 Cap [195, -76, 51.5] -> Bay 5 Bulkhead Tower [250, -76, 66]
  const p5: k.Point3[] = [
    [195, -76, 51.5],
    [195, -76, 66],
    [250, -76, 66],
  ];
  pushTube(p5, 2.6, 6.5, {
    tone: "hi",
    rings: { pitch: 3.4, twist: 1.2, cross: true, tone: "lo" },
  });

  // PIPE 6: External Armored Conduit from Bay 5 Bulkhead Tower [+284, -60, 52] -> Right Corner Junction Block [+292, +22, 23]
  const p6: k.Point3[] = [
    [282, -60, 52],
    [292, -60, 52],
    [292, 22, 38],
    [292, 22, 23],
  ];
  pushTube(p6, 2.2, 6.5, {
    tone: "mid",
    clampAt: [0.55],
  });
}

function buildFloorDeck() {
  const out: string[] = [];

  // 1. Halos under all three butt-jointed platform plates
  out.push(`<path class="iso-halo" d="${k.haloOf(ANNEX_BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`);
  out.push(`<path class="iso-halo" d="${k.haloOf(MAIN_BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`);
  out.push(`<path class="iso-halo" d="${k.haloOf(SKID_BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`);

  // 2. 14 Heavy Elastomer Vibration Isolator Feet sorted back-to-front
  const feetPts: k.Plane[] = [
    [ANNEX_BASE.x + 18, ANNEX_BASE.y + 14],
    [ANNEX_BASE.x + ANNEX_BASE.w / 2, ANNEX_BASE.y + 14],
    [ANNEX_BASE.x + ANNEX_BASE.w - 18, ANNEX_BASE.y + 14],
    [MAIN_BASE.x + 22, MAIN_BASE.y + 16],
    [MAIN_BASE.x + 170, MAIN_BASE.y + 16],
    [MAIN_BASE.x + 315, MAIN_BASE.y + 16],
    [MAIN_BASE.x + 460, MAIN_BASE.y + 16],
    [MAIN_BASE.x + MAIN_BASE.w - 22, MAIN_BASE.y + 16],
    [MAIN_BASE.x + 22, MAIN_BASE.y + MAIN_BASE.d - 16],
    [MAIN_BASE.x + 170, MAIN_BASE.y + MAIN_BASE.d - 16],
    [MAIN_BASE.x + 315, MAIN_BASE.y + MAIN_BASE.d - 16],
    [MAIN_BASE.x + 460, MAIN_BASE.y + MAIN_BASE.d - 16],
    [MAIN_BASE.x + MAIN_BASE.w - 22, MAIN_BASE.y + MAIN_BASE.d - 16],
    [SKID_BASE.x + 20, SKID_BASE.y + SKID_BASE.d - 14],
    [SKID_BASE.x + SKID_BASE.w - 20, SKID_BASE.y + SKID_BASE.d - 14],
  ];
  for (const [fx, fy] of byDepth2D(feetPts)) {
    out.push(S(k.cylinder(fx, fy, 7.2, -BASE_H - FOOT_H, 1.8, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(fx, fy, 5.4, -BASE_H - FOOT_H + 1.8, FOOT_H - 1.8, P, 24), { tone: "mid" }));
  }

  // 3. Base slabs strictly ordered far -> middle -> near: ANNEX_BASE -> MAIN_BASE -> SKID_BASE
  out.push(
    S(k.slabOf(ANNEX_BASE, -BASE_H, BASE_H + WING_TOP, P, 6, 1.2), {
      tone: "mid",
      inner: L(k.sideSeam(ANNEX_BASE, -4.5, P, 6), { tone: "faint" }),
    }),
  );
  out.push(L(k.planOutline(k.insetPlan(ANNEX_BASE, 4), WING_TOP, P, 5), { tone: "faint" }));

  out.push(
    S(k.slabOf(MAIN_BASE, -BASE_H, BASE_H, P, 8, 1.6), {
      tone: "mid",
      inner: L(k.sideSeam(MAIN_BASE, -4, P, 8), { tone: "faint" }),
    }),
  );
  out.push(L(k.planOutline(k.insetPlan(MAIN_BASE, 5.5), 0, P, 6), { tone: "lo" }));

  // Deck splice gusset straps locking Annex to Main Plate
  for (const sx of [136, 232, 286]) {
    out.push(
      S(k.slabOf({ x: sx - 7, y: -62, w: 14, d: 12, r: 1.5 }, 0, 2.0, P, 3, 0.3), { tone: "hi", crease: "lo" }),
    );
    out.push(D([at([sx, -59.5, 2]), at([sx, -52.5, 2])], { size: 0.42 }));
  }

  out.push(
    S(k.slabOf(SKID_BASE, -BASE_H, BASE_H + WING_TOP, P, 6, 1.2), {
      tone: "mid",
      inner: L(k.sideSeam(SKID_BASE, -4.5, P, 6), { tone: "faint" }),
    }),
  );
  out.push(L(k.planOutline(k.insetPlan(SKID_BASE, 4), WING_TOP, P, 5), { tone: "lo" }));

  // Deck splice straps locking Main Plate to Front Skid
  for (const sx of [-284, -206, -138]) {
    out.push(
      S(k.slabOf({ x: sx - 7, y: 50, w: 14, d: 12, r: 1.5 }, 0, 2.0, P, 3, 0.3), { tone: "hi", crease: "lo" }),
    );
    out.push(D([at([sx, 52.5, 2]), at([sx, 59.5, 2])], { size: 0.42 }));
  }

  // Main Plate perimeter corner bolts + M6 optical table mounting grid dots on exposed walkways
  const corners = k.corners(MAIN_BASE, 9);
  out.push(L(corners.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(corners.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  out.push(D(k.dotGrid(-295, 22, 8, 2, 10, 0, P), { size: 0.42, tone: "lo" }));
  out.push(D(k.dotGrid(76, 40, 12, 1, 10, 0, P), { size: 0.42, tone: "lo" }));

  // Full-length Precision Millimeter Scale Bar along front lip (y = 44)
  const ruler: k.Plan = { x: -292, y: 43, w: 584, d: 6.2, r: 1.2 };
  out.push(S(k.slabOf(ruler, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(ruler.x + 4, ruler.x + ruler.w - 4, 4, 5, ruler.y + 0.6, 0.8, [1.8, 3.3], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  // Three Machined Spec Nameplates along apron / wing
  const plates: Array<{ p: k.Plan; z: number; widths: number[] }> = [
    { p: { x: -286, y: 89, w: 54, d: 9.5, r: 1.4 }, z: WING_TOP, widths: [36, 24] },
    { p: { x: -32, y: 42.5, w: 66, d: 9.5, r: 1.4 }, z: 0.9, widths: [46, 32] },
    { p: { x: 212, y: 42.5, w: 56, d: 9.5, r: 1.4 }, z: 0.9, widths: [38, 26] },
  ];
  for (const { p, z, widths } of plates) {
    out.push(S(k.slabOf(p, z, 0.9, P, 3), { tone: "lo", crease: "none" }));
    out.push(L(k.planOutline(k.insetPlan(p, 1.4), z + 0.9, P, 3), { tone: "faint" }));
    out.push(
      L(
        widths
          .map((w, i) => k.lineOnTop([p.x + 4, p.y + 3.2 + i * 3], [p.x + 4 + w, p.y + 3.2 + i * 3], z + 0.9, P))
          .join(""),
        { tone: "lo", free: true },
      ),
    );
    out.push(D([at([p.x + p.w - 3, p.y + p.d / 2, z + 0.9])], { size: 0.45 }));
  }

  return out.join("");
}

function buildSuperstructure(): { items: DrawItem[] } {
  const items: DrawItem[] = [];

  // =========================================================================
  // BAY 1: PRESSURE ACCUMULATOR, STACKED HEAT EXCHANGER & SKID PUMP MOTOR
  // =========================================================================
  {
    const [ax, ay] = ACC_CENTER;
    const accF = G.frameOf([ax, ay, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
    const accBody = G.solidOf(
      [
        [0, 22],
        [4, 22],
        [5.5, 19.5],
        [37, 19.5],
        [39, 21.2],
        [42.5, 21.2],
        [43.5, 19.2, 1],
        [49, 15.8, 1],
        [53.5, 9.2, 1],
        [55.5, 0, 1],
      ],
      accF,
      P,
      { smooth: { rows: 4 }, steps: 48 },
    );
    const seams = [16, 29].map((z) => G.arcOf(accF, z, 19.5, P)).join("");
    const boltsTop = D(G.dotsOf(accF, 42.5, 16, 12, P, { all: true }), { size: 0.42, tone: "mid" });
    const boltsBot = D(G.dotsOf(accF, 4, 20.6, 10, P, { all: true }), { size: 0.42, tone: "mid" });
    const reliefCap = S(k.cylinder(ax, ay, 4.8, 55.5, 5, P, 24, 0.35), { tone: "mid" });
    const reliefKnurl = L(k.knurl(ax, ay, 4.8, 55.5, 60.5, 18, P), { tone: "lo" });
    items.push({
      depth: depthOf([ax, ay, 24]),
      svg: S(accBody, { tone: "hi", crease: "lo", inner: L(seams, { tone: "faint" }) }) + boltsTop + boltsBot + reliefCap + reliefKnurl,
    });

    // Stacked Fin Plate Heat Exchanger Tower at [-230, -26]
    const hx: k.Plan = { x: -246, y: -42, w: 34, d: 32, r: 2.5 };
    const hxParts: string[] = [];
    hxParts.push(S(k.slabOf(hx, 0, 4.5, P, 4, 0.5), { tone: "mid" }));
    for (let i = 0; i < 8; i++) {
      const fz = 6.5 + i * 4.2;
      hxParts.push(S(k.slabOf(k.insetPlan(hx, 1.5), fz, 2.0, P, 3, 0.25), { tone: i % 2 === 0 ? "hi" : "mid", crease: "faint" }));
    }
    hxParts.push(S(k.slabOf(hx, 40.5, 5.5, P, 4, 0.6), { tone: "mid" }));
    hxParts.push(D(k.corners(hx, 3.8).map(([x, y]) => at([x, y, 46])), { size: 0.45 }));
    items.push({ depth: depthOf([-229, -26, 22]), svg: hxParts.join("") });

    // Front-Left Skid Centrifugal Motor + Axial Cooling Ribs + Open Fan End (+X facing!)
    // Cradle feet at y=79
    for (const mx of [-280, -234]) {
      items.push({
        depth: depthOf([mx, PUMP_AXIS_Y, 4]),
        svg: S(k.slabOf({ x: mx - 6, y: PUMP_AXIS_Y - 12, w: 12, d: 24, r: 2 }, WING_TOP, 8.5, P, 3, 0.4), { tone: "mid" }),
      });
    }
    const motorOrigin: k.Point3 = [-292, PUMP_AXIS_Y, PUMP_AXIS_Z];
    const motorF = G.frameAlong(motorOrigin, [1, 0, 0]);
    const motorBody = G.solidOf(
      [
        [0, 0, 1],
        [3.5, 9.5, 1],
        [7, 13, 1],
        [10, 13],
        [44, 13],
        [46, 11],
        [46, 7.2],
        [54, 7.2],
        [56, 15],
        [68, 15],
        [68, 16.5],
        [72, 16.5],
        [72, 12],
      ],
      motorF,
      P,
      { smooth: { rows: 3 }, steps: 36 },
    );
    const ribs = G.ribsOf(motorF, 11.5, 42.5, 13, 18, P, { seams: true }) as string;
    const faceEndDots = D(G.dotsOf(motorF, 72, 14.2, 8, P, { all: true }), { size: 0.42, tone: "mid" });
    const fanRecessRing = L(G.circleOf(motorF, 72, 10.2, P, 24), { tone: "lo" });
    items.push({
      depth: depthOf([-255, PUMP_AXIS_Y, PUMP_AXIS_Z]),
      svg: S(motorBody, { tone: "hi", crease: "lo", inner: L(ribs, { tone: "faint" }) }) + faceEndDots + fanRecessRing,
    });
    // Live Pump Fan slot at [+X] open face (s = 72.2 -> x = -219.8)
    items.push({ depth: depthOf([-218, PUMP_AXIS_Y, PUMP_AXIS_Z]), marker: "PUMP_FAN", svg: "" });

    // Twin Sight-Glass Filter Cylinders on Skid right side ([-182, 79] & [-148, 79])
    for (const [idx, fx] of [-182, -148].entries()) {
      const fF = G.frameOf([fx, PUMP_AXIS_Y, WING_TOP], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
      const body = G.solidOf(
        [
          [0, 11],
          [3, 11],
          [4, 9.2],
          [20, 9.2],
          [21, 10.6],
          [23.5, 10.6],
          [24.5, 8.2, 1],
          [27, 4.5, 1],
          [28, 0, 1],
        ],
        fF,
        P,
        { smooth: { rows: 3 }, steps: 32 },
      );
      const sightRings = [8.5, 15.5].map((z) => G.arcOf(fF, z, 9.2, P)).join("");
      const crown = S(k.cylinder(fx, PUMP_AXIS_Y, 3.6, WING_TOP + 28, 3.8, P, 20), { tone: idx === 0 ? "hi" : "mid", crease: "lo" });
      items.push({
        depth: depthOf([fx, PUMP_AXIS_Y, 12]),
        svg: S(body, { tone: "hi", crease: "lo", inner: L(sightRings, { tone: "faint" }) }) + crown,
      });
    }
  }

  // =========================================================================
  // BAY 2: DIFFERENTIAL GEARBOX, MESHED GEARS & CRANK-PISTON LINKAGE
  // =========================================================================
  {
    const bed: k.Plan = { x: -174, y: -38, w: 98, d: 72, r: 4.5 };
    // Explicit depth -61.5 ensures Bay 2 Bed draws strictly AFTER Pipe 2 (-64) and BEFORE all parts mounted on Bay 2 (>=-58.7)!
    items.push({
      depth: -61.5,
      svg:
        S(k.slabOf(bed, 0, 7, P, 5, 0.8), { tone: "mid", inner: L(k.sideSeam(bed, 3.5, P, 5), { tone: "faint" }) }) +
        L(k.planOutline(k.insetPlan(bed, 3), 7, P, 4), { tone: "faint" }) +
        D(k.corners(bed, 4.5).map(([x, y]) => at([x, y, 7])), { size: 0.45 }),
    });

    // 1. Primary Slotted Flywheel Base at FLY_CENTER
    items.push({
      depth: depthOf([FLY_CENTER[0], FLY_CENTER[1], 10]),
      svg:
        S(k.cylinder(FLY_CENTER[0], FLY_CENTER[1], FLY_R, 7, 6.5, P, 48, 0.6), { tone: "hi", crease: "lo" }) +
        L(k.knurl(FLY_CENTER[0], FLY_CENTER[1], FLY_R, 7, 13.5, 48, P, 0.25), { tone: "lo" }) +
        L(k.ring(FLY_CENTER[0], FLY_CENTER[1], FLY_R - 2.6, 13.5, P, 44), { tone: "lo" }) +
        (() => {
          const rt = k.radialTicks(FLY_CENTER[0], FLY_CENTER[1], FLY_R - 3.2, 36, 4, 13.5, [1.2, 2.4], P);
          return L(rt.minor, { tone: "lo" }) + L(rt.major, { tone: "mid" });
        })() +
        S(k.cylinder(FLY_CENTER[0], FLY_CENTER[1], 5.2, 13.5, 3.8, P, 24, 0.3), { tone: "mid" }),
    });

    // 2. Meshed Pinion Gear at PINION_CENTER (distance 33 = 21 + 12)
    items.push({
      depth: depthOf([PINION_CENTER[0], PINION_CENTER[1], 9.5]),
      svg:
        S(k.cylinder(PINION_CENTER[0], PINION_CENTER[1], PINION_R, 7, 5.2, P, 36, 0.5), { tone: "mid" }) +
        L(k.knurl(PINION_CENTER[0], PINION_CENTER[1], PINION_R, 7, 12.2, 32, P, 0.2), { tone: "lo" }) +
        L(k.ring(PINION_CENTER[0], PINION_CENTER[1], PINION_R - 2.2, 12.2, P, 36), { tone: "lo" }) +
        S(k.cylinder(PINION_CENTER[0], PINION_CENTER[1], 3.8, 12.2, 3.2, P, 20, 0.3), { tone: "hi", crease: "lo" }),
    });

    // 3. Governor Belt Drum at GOV_CENTER & Exact Geometric External-Tangent Drive Belt
    const gx = GOV_CENTER[0] - FLY_CENTER[0];
    const gy = GOV_CENTER[1] - FLY_CENTER[1];
    const gDist = Math.hypot(gx, gy);
    const gTheta = Math.atan2(gy, gx);
    const gPhi = Math.acos((FLY_R - 9) / gDist);
    const beltA1 = gTheta + gPhi;
    const beltA2 = gTheta - gPhi;
    items.push({
      depth: depthOf([GOV_CENTER[0], GOV_CENTER[1], 10]),
      svg:
        S(k.cylinder(GOV_CENTER[0], GOV_CENTER[1], 9, 7, 5.5, P, 28, 0.4), { tone: "mid" }) +
        L(k.knurl(GOV_CENTER[0], GOV_CENTER[1], 9, 7, 12.5, 24, P), { tone: "lo" }) +
        S(k.cylinder(GOV_CENTER[0], GOV_CENTER[1], 3.2, 12.5, 4.5, P, 18), { tone: "hi", crease: "lo" }) +
        L(
          k.lineOnTop(
            [FLY_CENTER[0] + Math.cos(beltA1) * FLY_R, FLY_CENTER[1] + Math.sin(beltA1) * FLY_R],
            [GOV_CENTER[0] + Math.cos(beltA1) * 9, GOV_CENTER[1] + Math.sin(beltA1) * 9],
            12.3,
            P,
          ) +
            k.lineOnTop(
              [FLY_CENTER[0] + Math.cos(beltA2) * FLY_R, FLY_CENTER[1] + Math.sin(beltA2) * FLY_R],
              [GOV_CENTER[0] + Math.cos(beltA2) * 9, GOV_CENTER[1] + Math.sin(beltA2) * 9],
              12.3,
              P,
            ),
          { tone: "mid" },
        ),
    });

    // Slot for Dynamic Rotating Wheel Spokes & Crank Arm
    items.push({ depth: depthOf([FLY_CENTER[0] + 8, FLY_CENTER[1], 15.5]), marker: "GEARS_AND_CONROD", svg: "" });

    // Open Crosshead Guide Back Wall & Bearing Guide Cylinder (z=7..19)
    items.push({
      depth: depthOf([-98, PISTON_Y - 7, PISTON_Z]),
      svg: S(k.slabOf({ x: -118, y: PISTON_Y - 10, w: 40, d: 3.5, r: 0.8 }, 7, 12, P, 2, 0.3), { tone: "mid" }),
    });
    // Back Cylinder Boss Flange at x = -78
    const cylEndF = G.frameAlong([-79, PISTON_Y, PISTON_Z], [1, 0, 0]);
    items.push({
      depth: depthOf([-76, PISTON_Y, PISTON_Z]),
      svg:
        S(G.disc(0, 6.5, 7.2, cylEndF, P, { steps: 24, bevel: 0.4 }), { tone: "mid" }) +
        L(G.circleOf(cylEndF, 0, 4.6, P, 20), { tone: "faint" }),
    });
    // Slot for Reciprocating Piston Head + Back/Front Helical Springs along y = PISTON_Y
    items.push({ depth: depthOf([-98, PISTON_Y, PISTON_Z]), marker: "PISTON_AND_SPRINGS", svg: "" });
    // Front Crosshead Guide Rail Wall
    items.push({
      depth: depthOf([-98, PISTON_Y + 8.5, PISTON_Z]),
      svg: S(k.slabOf({ x: -118, y: PISTON_Y + 6.5, w: 40, d: 3.5, r: 0.8 }, 7, 12, P, 2, 0.3), { tone: "mid" }),
    });
  }

  // =========================================================================
  // BAY 3: RECESSED DUAL-TRACE CRT OSCILLOSCOPE & PATCH CONSOLE
  // =========================================================================
  {
    // Lower Patch Matrix Cabinet (x = -58..+62, y = -42..+40, z = 0..20)
    // Explicit depth -10 ensures Lower Cab draws strictly AFTER Pipe 2 (-39) and BEFORE Scope Hood (+7.8) & Knobs (>=+15)!
    const lowerCab: k.Plan = { x: -58, y: -42, w: 120, d: 82, r: 5 };
    items.push({
      depth: -10,
      svg:
        S(k.slabOf(lowerCab, 0, 20, P, 6, 1.0), {
          tone: "mid",
          inner: L(k.sideSeam(lowerCab, 10, P, 6), { tone: "faint" }),
        }) +
        L(k.planOutline(k.insetPlan(lowerCab, 3.5), 20, P, 4), { tone: "faint" }),
    });

    // Upper Oscilloscope Instrument Hood (x = -54..+58, y = -42..+12, z = 20..76)
    const scopeHood: k.Plan = { x: -54, y: -42, w: 112, d: 54, r: 5 };
    const topVents = Array.from({ length: 7 }, (_, i) =>
      k.planOutline({ x: -34, y: -34 + i * 3.8, w: 68, d: 1.5, r: 0.7 }, 76, P, 3),
    ).join("");
    const sideLouvers = Array.from({ length: 8 }, (_, i) => xFaceSlot(58, -32 + i * 4.4, 34, 62, 0.9)).join("");
    const carryHandle: k.Plan = { x: -24, y: -12, w: 48, d: 8, r: 3 };
    items.push({
      depth: depthOf([2, -15, 48]),
      svg:
        S(k.slabOf(scopeHood, 20, 56, P, 6, 1.4), {
          tone: "mid",
          inner: L(k.sideSeam(scopeHood, 26, P, 6), { tone: "faint" }),
        }) +
        L(topVents + sideLouvers, { tone: "faint" }) +
        S(k.slabOf(carryHandle, 76, 3.2, P, 3, 0.3), { tone: "hi", crease: "lo" }),
    });

    // Scope Front Plane at y = SCOPE_FRONT_Y (12) — Recessed CRT + Right Panel Rotary Micro-Knobs
    const bezelCenterY = SCOPE_FRONT_Y;
    const crtW = SCOPE_CRT.x1 - SCOPE_CRT.x0;
    const crtH = SCOPE_CRT.z1 - SCOPE_CRT.z0;
    const crtGrid: string[] = [];
    for (let i = 1; i < 6; i++) {
      const gx = SCOPE_CRT.x0 + (crtW * i) / 6;
      crtGrid.push(`M${gx.toFixed(1)} ${(-SCOPE_CRT.z1).toFixed(1)}V${(-SCOPE_CRT.z0).toFixed(1)}`);
    }
    for (let j = 1; j < 4; j++) {
      const gz = SCOPE_CRT.z0 + (crtH * j) / 4;
      crtGrid.push(`M${SCOPE_CRT.x0.toFixed(1)} ${(-gz).toFixed(1)}H${SCOPE_CRT.x1.toFixed(1)}`);
    }
    const initialWaves = scopeWavePathsAt(0.4, 2.2, 8.5);
    const crtBackStatic =
      `<path class="iso-line" data-tone="faint" d="${crtGrid.join("")}"/>` +
      `<path data-part="scope-wave-2" class="iso-line" data-tone="mid" d="${initialWaves.d2}"/>` +
      `<path data-part="scope-wave-1" class="iso-line" data-tone="lit" d="${initialWaves.d1}" style="stroke-width:1.35"/>` +
      `<circle data-part="scope-dot" class="iso-wire-end" cx="${initialWaves.dotX}" cy="${initialWaves.dotY}" r="1.4" style="stroke:var(--anatomy-lit);fill:var(--anatomy-lit)"/>` +
      `<path class="iso-line" data-tone="lo" data-free="" d="M${SCOPE_CRT.x0 + 4} ${-(SCOPE_CRT.z1 - 11)}Q${SCOPE_CRT.x0 + 5} ${-(SCOPE_CRT.z1 - 4.5)} ${SCOPE_CRT.x0 + 12} ${-(SCOPE_CRT.z1 - 4)}"/>`;

    const recessedScopeSvg =
      `<g transform="${planeOfFront(bezelCenterY)}"><path class="iso-line" data-tone="faint" d="${flatOnFront(-50, 24, 54, 72, 4)}"/></g>` +
      buildRecess(SCOPE_BEZEL, bezelCenterY, "", "sp-screen-bg", buildRecess(SCOPE_CRT, bezelCenterY - SCOPE_BEZEL.depth, crtBackStatic, "sp-scope-bg")) +
      // Right vertical control trim panel at x = 24..52 on front face y = 12
      `<g transform="${planeOfFront(bezelCenterY)}">` +
      `<path class="iso-line" data-tone="faint" d="${flatOnFront(24, 28, 51, 70, 3)}"/>` +
      `</g>`;

    items.push({ depth: depthOf([-4, bezelCenterY, 48]), svg: recessedScopeSvg });

    // Horizontal Micro-Knobs protruding outward along +Y on right scope front trim (z = 36, 48, 60)
    for (const [idx, kz] of [36, 48, 60].entries()) {
      const kF = G.frameAlong([37.5, bezelCenterY, kz], [0, 1, 0]);
      items.push({
        depth: depthOf([37.5, bezelCenterY + 2, kz]),
        svg:
          S(G.disc(0, 3.8, 3.6, kF, P, { steps: 22, bevel: 0.3 }), { tone: idx === 1 ? "hi" : "mid" }) +
          L(k.lineOnTop([37.5, bezelCenterY], [37.5 + Math.cos(idx * 0.9) * 2.5, bezelCenterY + 3.8], kz, P), { tone: "lit", free: true }),
      });
    }

    // 5 Calibrated Rotary Attenuator Knobs across front deck (y = 26, z = 20..25)
    for (const [kx, ang, isLit] of [
      [-42, -0.7, false],
      [-24, 0.4, false],
      [-6, 1.1, true],
      [12, -0.3, false],
      [30, 0.8, false],
    ] as const) {
      items.push({
        depth: depthOf([kx, 26, 22]),
        svg:
          S(k.cylinder(kx, 26, 5.2, 20, 4.6, P, 24, 0.4), { tone: isLit ? "hi" : "mid", lit: isLit }) +
          L(k.knurl(kx, 26, 5.2, 20, 24.6, 20, P), { tone: "lo" }) +
          L(k.lineOnTop([kx, 26], [kx + Math.cos(ang) * 4.2, 26 + Math.sin(ang) * 4.2], 24.6, P), { tone: isLit ? "lit" : "hi", free: "start" }),
      });
    }

    // BNC Left Port Block at [-58, +24, 15] + Front-right Toggle Switch & Pulsing LED Cluster
    items.push({
      depth: depthOf([-58, 24, 15]),
      svg: S(k.slabOf({ x: -61, y: 20, w: 3, d: 8, r: 1 }, 11, 8, P, 2), { tone: "mid" }),
    });
    items.push({
      depth: depthOf([48, 28, 22]),
      svg:
        S(k.slabOf({ x: 42, y: 21, w: 14, d: 14, r: 2 }, 20, 3, P, 3, 0.3), { tone: "hi", crease: "lo" }) +
        D(k.dotGrid(44.5, 24, 3, 2, 4.2, 23, P), { size: 0.75, tone: "hi", pulse: true }),
    });
  }

  // =========================================================================
  // BAY 4: MODULAR COMPUTE BLADE CAGE & REAR ANNEX ISOLATORS
  // =========================================================================
  {
    // Annex Isolated Choke Cylinders at [145, -76] & [195, -76] on ANNEX_BASE (top WING_TOP = -1.5)
    for (const [idx, cx] of [145, 195].entries()) {
      const chF = G.frameOf([cx, -76, WING_TOP], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
      const choke = G.solidOf(
        [
          [0, 14],
          [4, 14],
          [5, 12],
          [38, 12],
          [40, 13.8],
          [43, 13.8],
          [44, 10, 1],
          [47, 5, 1],
          [49, 0, 1],
        ],
        chF,
        P,
        { smooth: { rows: 3 }, steps: 32 },
      );
      const ribs = G.ribsOf(chF, 8, 36, 12, 18, P, { seams: true }) as string;
      const cap = S(k.cylinder(cx, -76, 3.6, WING_TOP + 49, 4, P, 18), { tone: idx === 0 ? "hi" : "mid" });
      items.push({
        depth: depthOf([cx, -76, 22]),
        svg: S(choke, { tone: "hi", crease: "lo", inner: L(ribs, { tone: "faint" }) }) + cap,
      });
    }

    // Bay 4 Card Cage Plinth & Backplane Spine Wall (x = 76..176, y = -44..38)
    // Explicit depth 23 ensures cageFloor draws AFTER Pipe 4 (<=20.9) & Choke 1 (+0.3), and BEFORE all Bay 4 cage parts (>=27.7)!
    const cageFloor: k.Plan = { x: 74, y: -44, w: 104, d: 82, r: 4 };
    items.push({
      depth: 23,
      svg: S(k.slabOf(cageFloor, 0, 8, P, 5, 0.7), { tone: "mid" }),
    });

    // Back wall of card cage (y = -44..-35, z = 8..60)
    const cageBack: k.Plan = { x: 74, y: -44, w: 104, d: 9, r: 2 };
    items.push({
      depth: depthOf([126, -39.5, 34]),
      svg:
        S(k.slabOf(cageBack, 8, 52, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(cageBack, 34, P, 4), { tone: "faint" }) }) +
        D(k.dotGrid(84, -40, 6, 1, 15, 60, P), { size: 0.45 }),
    });

    // Left Frame Pylon of Cage (x = 74..79) — depth < blades
    items.push({
      depth: depthOf([76, -2, 34]),
      svg: S(k.slabOf({ x: 74, y: -35, w: 5.5, d: 73, r: 1.5 }, 8, 48, P, 3, 0.4), { tone: "mid" }),
    });

    // 6 Dynamic Vertical Compute Blade Slots (sorted sequentially x = 84..159)
    BLADE_XS.forEach((bx, idx) => {
      items.push({ depth: depthOf([bx, -2, 34]), marker: `BLADE_${idx}`, svg: "" });
    });

    // Right Ventilated Outer Cage Wall (x = 171..178, z = 8..58) — depth > blades
    const sideVent = Array.from({ length: 7 }, (_, i) => xFaceSlot(178, -28 + i * 7, 18, 46, 1.1)).join("");
    items.push({
      depth: depthOf([174.5, -2, 34]),
      bias: 8,
      svg:
        S(k.slabOf({ x: 171, y: -35, w: 7, d: 73, r: 1.5 }, 8, 48, P, 3, 0.5), { tone: "mid" }) +
        L(sideVent, { tone: "faint" }),
    });

    // Front Top Retention Bridge Crossbar across front of blades (y = 31..38, z = 48..54 & front lip z = 8..14)
    items.push({
      depth: depthOf([126, 34.5, 11]),
      bias: 8,
      svg: S(k.slabOf({ x: 74, y: 31, w: 104, d: 7, r: 1.5 }, 8, 6, P, 3, 0.4), { tone: "mid" }),
    });
    items.push({
      depth: depthOf([126, 34.5, 51]),
      bias: 8,
      svg:
        S(k.slabOf({ x: 74, y: 31, w: 104, d: 7, r: 1.5 }, 49, 5, P, 3, 0.4), { tone: "hi", crease: "lo" }) +
        D(BLADE_XS.map((bx) => at([bx, 34.5, 54])), { size: 0.48 }),
    });
  }

  // =========================================================================
  // BAY 5: BULKHEAD TOWER, DUAL GAUGES, MOTORIZED CHART DRUM & E-STOP
  // =========================================================================
  {
    // 1. Tall Rear Bulkhead Power Distribution Tower on ANNEX_BASE (x = 248..298, y = -94..-60, z = -1.5..82)
    const tower: k.Plan = { x: 248, y: -94, w: 50, d: 34, r: 4 };
    const tSideLouvers = Array.from({ length: 5 }, (_, i) => xFaceSlot(298, -88 + i * 4.5, 22, 62, 0.9)).join("");
    const towerParts: string[] = [
      S(k.slabOf(tower, WING_TOP, 80, P, 5, 1.2), {
        tone: "mid",
        inner: L(k.sideSeam(tower, 32, P, 5) + k.sideSeam(tower, 58, P, 5), { tone: "faint" }),
      }),
      L(tSideLouvers, { tone: "faint" }),
    ];
    // Twin Ceramic High-Voltage Insulator Bushings on top of tower (z = 78.5..93)
    for (const ix of [262, 284]) {
      const insF = G.frameOf([ix, -77, 78.5], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
      towerParts.push(
        S(
          G.solidOf(
            [
              [0, 6.5],
              [2, 6.5],
              [2.5, 3.6],
              [4, 5.8],
              [5.5, 3.6],
              [7, 5.8],
              [8.5, 3.6],
              [10, 5.2],
              [12, 2.2],
              [14, 2.2],
            ],
            insF,
            P,
            { steps: 24 },
          ),
          { tone: "hi", crease: "lo" },
        ),
      );
    }
    items.push({ depth: depthOf([273, -77, 42]), svg: towerParts.join("") });

    // 2. Right Operator Console Deck (x = 194..304, y = -42..40, z = 0..19)
    // Explicit depth 72 ensures conDeck draws AFTER Annex Tower (+54) & Choke 2 (+18) and BEFORE Dial 1 (>=77) & Chart Drum (>=90)!
    const conDeck: k.Plan = { x: 194, y: -42, w: 110, d: 82, r: 5 };
    items.push({
      depth: 72,
      svg:
        S(k.slabOf(conDeck, 0, 19, P, 6, 1.0), {
          tone: "mid",
          inner: L(k.sideSeam(conDeck, 9.5, P, 6), { tone: "faint" }),
        }) +
        L(k.planOutline(k.insetPlan(conDeck, 3.5), 19, P, 5), { tone: "faint" }),
    });

    // 3. Elevated Rear Instrument Risers + Twin Analog Telemetry Dial Gauges
    const buildDial = (cx: number, cy: number, r: number, topZ: number, tickCount: number) => {
      const riserBaseZ = 19;
      const plinthTopZ = topZ - 7.5;
      const riserPlan: k.Plan = { x: cx - r - 3, y: cy - r - 3, w: (r + 3) * 2, d: (r + 3) * 2, r: 3.5 };
      const ticks = k.radialTicks(cx, cy, r - 2.4, tickCount, 5, topZ, [1.2, 2.5], P);
      return (
        S(k.slabOf(riserPlan, riserBaseZ, plinthTopZ - riserBaseZ, P, 4, 0.6), { tone: "mid" }) +
        S(k.cylinder(cx, cy, r, plinthTopZ, topZ - plinthTopZ, P, 48, 0.7), { tone: "hi", crease: "lo" }) +
        L(k.knurl(cx, cy, r, topZ - 3.6, topZ, 48, P, 0.3), { tone: "lo" }) +
        L(k.ring(cx, cy, r - 2.0, topZ, P, 48), { tone: "lo" }) +
        L(ticks.minor, { tone: "lo" }) +
        L(ticks.major, { tone: "mid" }) +
        L(k.ring(cx, cy, 1.6, topZ, P, 16), { tone: "mid" })
      );
    };
    items.push({ depth: depthOf([DIAL_1[0], DIAL_1[1], DIAL_1_Z - 4]), svg: buildDial(DIAL_1[0], DIAL_1[1], DIAL_1_R, DIAL_1_Z, 40) });
    items.push({ depth: depthOf([DIAL_1[0] + 1, DIAL_1[1] + 1, DIAL_1_Z + 1]), marker: "NEEDLE_1", svg: "" });

    items.push({ depth: depthOf([DIAL_2[0], DIAL_2[1], DIAL_2_Z - 4]), svg: buildDial(DIAL_2[0], DIAL_2[1], DIAL_2_R, DIAL_2_Z, 28) });
    items.push({ depth: depthOf([DIAL_2[0] + 1, DIAL_2[1] + 1, DIAL_2_Z + 1]), marker: "NEEDLE_2", svg: "" });

    // 4. Strip-Chart Paper Drum on Y-axis (DRUM_X = 228, y = 4..32, z = DRUM_Z = 27.5)
    // Back Stanchion (y = 0..4)
    items.push({
      depth: depthOf([DRUM_X, DRUM_Y0 - 2, DRUM_Z - 4]),
      svg: S(k.slabOf({ x: DRUM_X - 6.5, y: DRUM_Y0 - 4, w: 13, d: 4, r: 1 }, 19, 14.5, P, 3, 0.4), { tone: "mid" }),
    });
    // Horizontal Lathe Paper Drum Barrel along +Y axis
    const drumF = G.frameAlong([DRUM_X, DRUM_Y0, DRUM_Z], [0, 1, 0]);
    const drumLen = DRUM_Y1 - DRUM_Y0;
    const drumBody = G.solidOf(
      [
        [0, DRUM_R + 1.2],
        [2, DRUM_R + 1.2],
        [2.2, DRUM_R],
        [drumLen - 2.2, DRUM_R],
        [drumLen - 2, DRUM_R + 1.2],
        [drumLen, DRUM_R + 1.2],
      ],
      drumF,
      P,
      { steps: 36 },
    );
    items.push({
      depth: depthOf([DRUM_X, (DRUM_Y0 + DRUM_Y1) / 2, DRUM_Z]),
      svg:
        S(drumBody, { tone: "hi", crease: "lo", inner: L(G.arcOf(drumF, 2.2, DRUM_R, P) + G.arcOf(drumF, drumLen - 2.2, DRUM_R, P), { tone: "faint" }) }) +
        L(G.circleOf(drumF, drumLen, DRUM_R - 1.8, P, 28), { tone: "lo" }),
    });
    // Slot for Dynamic Rotating Drum Grid Lines + Live Sliding Pen Carriage
    items.push({ depth: depthOf([DRUM_X, (DRUM_Y0 + DRUM_Y1) / 2, DRUM_Z + DRUM_R + 2.5]), marker: "DRUM_PEN", svg: "" });

    // Front Stanchion (y = 32..36) + Knurled Advance Knob extending past front face (y = 36..40)
    const frontKnobF = G.frameAlong([DRUM_X, DRUM_Y1 + 4, DRUM_Z], [0, 1, 0]);
    items.push({
      depth: depthOf([DRUM_X, DRUM_Y1 + 2.5, DRUM_Z]),
      svg:
        S(k.slabOf({ x: DRUM_X - 6.5, y: DRUM_Y1, w: 13, d: 4, r: 1 }, 19, 14.5, P, 3, 0.4), { tone: "mid" }) +
        S(G.disc(0, 4.2, 4.8, frontKnobF, P, { steps: 24, bevel: 0.35 }), { tone: "hi", crease: "lo" }) +
        L(G.ribsOf(frontKnobF, 0.5, 3.7, 4.8, 16, P, { seams: true }) as string, { tone: "lo" }),
    });

    // Overhead Traverse Bridge Bar spanning stanchions at z = DRUM_Z + DRUM_R + 2.5 = 40..43
    items.push({
      depth: depthOf([DRUM_X, (DRUM_Y0 + DRUM_Y1) / 2, 42]),
      svg: S(k.slabOf({ x: DRUM_X - 2, y: DRUM_Y0 - 3, w: 4, d: drumLen + 6, r: 1.2 }, 40, 2.8, P, 3, 0.3), { tone: "mid" }),
    });

    // 5. Emergency Mushroom Stop Switch & Front Deck Rocker Toggles (shifted left away from Pipe 6 terminal!)
    items.push({
      depth: depthOf([264, 21, 22]),
      svg:
        S(k.cylinder(264, 15, 7.6, 19, 2.8, P, 28, 0.3), { tone: "mid" }) +
        S(k.cylinder(264, 15, 5.8, 21.8, 3.6, P, 28, 0.5), { tone: "hi", lit: true }) +
        L(k.ring(264, 15, 3.8, 25.4, P, 20), { tone: "red" }) +
        [252, 264, 276]
          .map(
            (tx) =>
              S(k.slabOf({ x: tx - 2.6, y: 27, w: 5.2, d: 6.5, r: 1 }, 19, 2.0, P, 2), { tone: "mid" }) +
              L(seg([tx, 30.2, 21.0], [tx, 32.5, 24.5]), { tone: "hi" }),
          )
          .join(""),
    });

    // Far-right Corner Junction Terminal Block receiving Pipe 6 ([292, 22, 23])
    items.push({
      depth: depthOf([292, 22, 20]),
      svg:
        S(k.slabOf({ x: 284, y: 14, w: 16, d: 16, r: 2.5 }, 19, 4, P, 3, 0.4), { tone: "mid" }) +
        D(k.corners({ x: 284, y: 14, w: 16, d: 16, r: 2.5 }, 2.5).map(([x, y]) => at([x, y, 23])), { size: 0.42 }),
    });
  }

  // Add All Routed 3D Pipes & Braided Conduit Chunks with Collars/Flanges into Depth Sorter
  buildPipeNetwork(items);

  // Strict 3D painter's order sort!
  items.sort((a, b) => a.depth + (a.bias ?? 0) - (b.depth + (b.bias ?? 0)));

  return { items };
}

// Dynamic Piece Builders (Hoisted pure functions & rest elements!)

export function scopeWavePathsAt(phase: number, freq: number, amp: number) {
  const x0 = SCOPE_CRT.x0;
  const x1 = SCOPE_CRT.x1;
  const midZ = (SCOPE_CRT.z0 + SCOPE_CRT.z1) / 2;
  const p1: k.Flat[] = [];
  const p2: k.Flat[] = [];
  const steps = 46;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const x = x0 + (x1 - x0) * u;
    const w1 = Math.sin(u * Math.PI * 2 * freq - phase) * amp * (0.7 + 0.3 * Math.sin(u * Math.PI));
    const w2 = Math.cos(u * Math.PI * 3.5 - phase * 1.4) * (amp * 0.45);
    p1.push([x, -(midZ + w1)]);
    p2.push([x, -(midZ + w2)]);
  }
  const scanU = 0.08 + (((phase * 0.18) % 1 + 1) % 1) * 0.84;
  const dotX = x0 + (x1 - x0) * scanU;
  const dotZ = midZ + Math.sin(scanU * Math.PI * 2 * freq - phase) * amp * (0.7 + 0.3 * Math.sin(scanU * Math.PI));
  return {
    d1: k.pathOf(p1),
    d2: k.pathOf(p2),
    dotX: dotX.toFixed(1),
    dotY: (-dotZ).toFixed(1),
  };
}

export function pumpFanSvgAt(angle: number) {
  const f = G.frameAlong([-219.5, PUMP_AXIS_Y, PUMP_AXIS_Z], [1, 0, 0]);
  return (
    L(G.circleOf(f, 0, 2.5, P, 18), { tone: "hi" }) +
    D([at([-219.5, PUMP_AXIS_Y, PUMP_AXIS_Z])], { size: 0.7, tone: "hi" }) +
    L(G.spokesOf(f, 0, 2.5, 10.2, 6, P, { phase: angle, sweep: 0.35 }), { tone: "lit" })
  );
}

export function gearsAndConrodSvgAt(angle: number) {
  const out: string[] = [];
  // 1. Primary Flywheel 6 Spokes from hub r=5.2 out to groove ring r=FLY_R-2.6
  for (let i = 0; i < 6; i++) {
    const a = angle + (i * Math.PI * 2) / 6;
    out.push(
      L(
        k.lineOnTop(
          [FLY_CENTER[0] + Math.cos(a) * 5.2, FLY_CENTER[1] + Math.sin(a) * 5.2],
          [FLY_CENTER[0] + Math.cos(a) * (FLY_R - 2.6), FLY_CENTER[1] + Math.sin(a) * (FLY_R - 2.6)],
          13.6,
          P,
        ),
        { tone: "hi" },
      ),
    );
  }
  // 2. Meshed Pinion Gear 4 Spokes from hub r=3.8 out to groove ring r=PINION_R-2.2
  const a2 = -angle * (FLY_R / PINION_R);
  for (let i = 0; i < 4; i++) {
    const a = a2 + (i * Math.PI) / 2;
    out.push(
      L(
        k.lineOnTop(
          [PINION_CENTER[0] + Math.cos(a) * 3.8, PINION_CENTER[1] + Math.sin(a) * 3.8],
          [PINION_CENTER[0] + Math.cos(a) * (PINION_R - 2.2), PINION_CENTER[1] + Math.sin(a) * (PINION_R - 2.2)],
          12.3,
          P,
        ),
        { tone: "hi" },
      ),
    );
  }
  // 3. Crankpin on Flywheel & Reciprocating Wrist Pin Position
  const crankX = FLY_CENTER[0] + Math.cos(angle) * CRANK_R;
  const crankY = FLY_CENTER[1] + Math.sin(angle) * CRANK_R;
  const dy = crankY - PISTON_Y;
  const pistonX = crankX + Math.sqrt(Math.max(100, 38 * 38 - dy * dy));

  // Connecting Rod Bar + Crankpin Collar
  out.push(L(k.lineOnTop([crankX, crankY], [pistonX, PISTON_Y], PISTON_Z, P), { tone: "lit" }));
  out.push(S(k.cylinder(crankX, crankY, 2.2, 13.5, 3.2, P, 14), { tone: "hi", lit: true }));

  return { svg: out.join(""), pistonX };
}

export function pistonAndSpringsSvgAt(pistonX: number) {
  const headPlan: k.Plan = { x: pistonX - 5, y: PISTON_Y - 5, w: 10, d: 10, r: 2 };
  const c = k.coil(pistonX + 5, -78, [PISTON_Y, PISTON_Z], 4.2, 5, "x", P);
  return (
    L(c.back, { tone: "lo" }) +
    S(k.slabOf({ x: pistonX + 5, y: PISTON_Y - 1.6, w: -78 - (pistonX + 5), d: 3.2, r: 1 }, PISTON_Z - 1.6, 3.2, P, 2), {
      tone: "hi",
      lit: true,
    }) +
    S(k.slabOf(headPlan, PISTON_Z - 4.5, 9, P, 3, 0.4), { tone: "hi", lit: true }) +
    L(c.front, { tone: "mid" })
  );
}

// Prebuilt 6 Compute Blade SVG Elements (each built at rest z = 8..56)
export const BLADES_STATIC = BLADE_XS.map((bx, i) => {
  const bPlan: k.Plan = { x: bx - 3.8, y: -32, w: 7.6, d: 62, r: 1.2 };
  const isDefaultActive = i === 2;
  return {
    idx: i,
    svg:
      S(k.slabOf(bPlan, 9, 46, P, 3, 0.45), { tone: "hi", crease: "lo", lit: isDefaultActive }) +
      S(k.slabOf({ x: bx - 2.6, y: -30, w: 5.2, d: 5, r: 0.8 }, 55, 3.2, P, 2), { tone: "mid" }) +
      S(k.slabOf({ x: bx - 2.6, y: 23, w: 5.2, d: 5, r: 0.8 }, 55, 3.2, P, 2), { tone: "mid" }) +
      L(k.topTicks(-20, 18, 4, 4, bx - 1.5, 55, [1.2, 2.4], P, "y").major, { tone: "lo" }) +
      D([at([bx, -16, 55.2]), at([bx, 0, 55.2]), at([bx, 16, 55.2])], { size: 0.55, tone: "hi", pulse: true }),
  };
});

export function drumAndPenSvgAt(drumPhase: number, penU: number) {
  const penY = DRUM_Y0 + 3 + penU * (DRUM_Y1 - DRUM_Y0 - 6);
  const drumF = G.frameAlong([DRUM_X, DRUM_Y0, DRUM_Z], [0, 1, 0]);
  const ribs = G.ribsOf(drumF, 2.2, DRUM_Y1 - DRUM_Y0 - 2.2, DRUM_R + 0.05, 10, P, {
    phase: drumPhase,
    least: 0.05,
    seams: true,
  }) as string;
  // Live Seismic Telemetry Ink Wave anchored from back end flange (y = DRUM_Y0+2.2) to front end flange (y = DRUM_Y1-2.2)
  const wavePts: k.Flat[] = [];
  const waveFrom = DRUM_Y0 + 2.2;
  const waveTo = DRUM_Y1 - 2.2;
  for (let i = 0; i <= 28; i++) {
    const u = i / 28;
    const wy = waveFrom + u * (waveTo - waveFrom);
    const ang = 1.28 + Math.sin(u * 14 - drumPhase * 3) * 0.16;
    const wx = DRUM_X + Math.cos(ang) * (DRUM_R + 0.15);
    const wz = DRUM_Z + Math.sin(ang) * (DRUM_R + 0.15);
    wavePts.push(at([wx, wy, wz]));
  }
  const penContactU = (penY - waveFrom) / (waveTo - waveFrom);
  const penContactAng = 1.28 + Math.sin(penContactU * 14 - drumPhase * 3) * 0.16;
  const penContactX = DRUM_X + Math.cos(penContactAng) * (DRUM_R + 0.15);
  const penContactZ = DRUM_Z + Math.sin(penContactAng) * (DRUM_R + 0.15);
  const carriage =
    S(k.slabOf({ x: DRUM_X - 4.2, y: penY - 3.8, w: 8.4, d: 7.6, r: 1.4 }, 38.8, 5.2, P, 2, 0.3), { tone: "hi", lit: true }) +
    L(seg([DRUM_X, penY, 39.2], [penContactX, penY, penContactZ]), { tone: "lit" });
  return L(ribs, { tone: "faint" }) + L(k.pathOf(wavePts), { tone: "lit" }) + carriage;
}

export function dialNeedle1At(turn: number) {
  const a = turn * Math.PI * 2;
  return k.lineOnTop(
    [DIAL_1[0] - Math.sin(a) * 3.0, DIAL_1[1] + Math.cos(a) * 3.0],
    [DIAL_1[0] + Math.sin(a) * (DIAL_1_R - 3.6), DIAL_1[1] - Math.cos(a) * (DIAL_1_R - 3.6)],
    DIAL_1_Z + 0.25,
    P,
  );
}

export function dialNeedle2At(turn: number) {
  const a = turn * Math.PI * 2;
  return k.lineOnTop(
    [DIAL_2[0] - Math.sin(a) * 2.2, DIAL_2[1] + Math.cos(a) * 2.2],
    [DIAL_2[0] + Math.sin(a) * (DIAL_2_R - 2.8), DIAL_2[1] - Math.cos(a) * (DIAL_2_R - 2.8)],
    DIAL_2_Z + 0.25,
    P,
  );
}

// Compute static floor & sorted items strictly after all pure builders are initialized!
export const STATIC_FLOOR_SVG = buildFloorDeck();
export const SORTED_ITEMS = buildSuperstructure().items;
