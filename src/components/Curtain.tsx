"use client";

import { useEffect, useRef } from "react";

// A wall of vertical glass ribs with soft pools of light drifting behind it,
// slowly, like liquid.
//
// How it works: a handful of light pools wander around in two dimensions.
// Each rib looks at the light from a slightly shifted position (that is the
// refraction that makes neighbouring ribs disagree) and samples it at several
// heights, so the brightness changes along the rib as well as across them.
// The sampling position also sways gently over time, which is what makes
// the light appear to flow instead of slide. The pointer adds one more pool.
//
// variant "hero"  : fades out at the bottom (Home).
// variant "band"  : a solid strip, used on project pages and boards.
// variant "floor" : a glow rising from the bottom edge.
// variant "wall"  : evenly lit from top to bottom (Contact).
// seed            : any number. Each seed gives a different set of pools,
//                   so every project gets its own pattern.
// bright          : keeps the whole wall lit, never dark, so dark text can
//                   sit on top of it and stay readable (Contact).

type Variant = "hero" | "band" | "floor" | "wall";

// One pool of light. Positions and sizes are fractions of the canvas.
type Pool = {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  speedX: number;
  speedY: number;
  phase: number;
  width: number;
  height: number;
  power: number;
};

// Vertical profile per variant: [height 0-1, light strength, opacity].
const PROFILES: Record<Variant, [number, number, number][]> = {
  hero: [
    [0, 0.75, 1],
    [0.45, 1, 1],
    [1, 0.5, 0],
  ],
  band: [
    [0, 0.55, 1],
    [0.5, 1, 1],
    [1, 0.55, 1],
  ],
  floor: [
    [0, 0.4, 0],
    [0.65, 1, 0.9],
    [1, 0.6, 1],
  ],
  wall: [
    [0, 0.9, 1],
    [0.5, 1, 1],
    [1, 0.9, 1],
  ],
};

const HERO_POOLS: Pool[] = [
  { x: 0.64, y: 0.4, driftX: 0.14, driftY: 0.22, speedX: 0.11, speedY: 0.07, phase: 0.0, width: 0.12, height: 0.55, power: 1.0 },
  { x: 0.2, y: 0.55, driftX: 0.1, driftY: 0.25, speedX: 0.07, speedY: 0.09, phase: 1.7, width: 0.16, height: 0.6, power: 0.5 },
  { x: 0.9, y: 0.3, driftX: 0.08, driftY: 0.2, speedX: 0.09, speedY: 0.06, phase: 3.1, width: 0.09, height: 0.45, power: 0.65 },
  { x: 0.42, y: 0.75, driftX: 0.16, driftY: 0.18, speedX: 0.05, speedY: 0.08, phase: 4.4, width: 0.2, height: 0.4, power: 0.35 },
  { x: 0.05, y: 0.2, driftX: 0.06, driftY: 0.15, speedX: 0.08, speedY: 0.05, phase: 5.6, width: 0.08, height: 0.5, power: 0.4 },
];

// Colour stops from "no light" to "full light".
const STOPS: [number, number, number][] = [
  [3, 22, 8],
  [10, 92, 26],
  [52, 214, 58],
  [176, 255, 120],
];

// How many heights each rib samples. More is smoother but slower.
const SAMPLES = 7;

// How fast the light flows. 1 is a very slow drift; raise it for more motion.
const FLOW_SPEED = 5;

// How far the light sways sideways as it flows, as a fraction of the width.
const SWAY = 0.03;

// A repeatable pseudo-random number between 0 and 1 for a given seed.
function random(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function poolsFor(seed: number | undefined): Pool[] {
  if (seed === undefined) return HERO_POOLS;

  return [0, 1, 2, 3].map((index) => {
    const offset = seed * 10 + index * 7;
    return {
      x: 0.08 + random(offset) * 0.84,
      y: 0.2 + random(offset + 1) * 0.6,
      driftX: 0.06 + random(offset + 2) * 0.1,
      driftY: 0.15 + random(offset + 3) * 0.2,
      speedX: 0.05 + random(offset + 4) * 0.08,
      speedY: 0.05 + random(offset + 5) * 0.06,
      phase: random(offset + 6) * 6.28,
      width: 0.08 + random(offset + 7) * 0.12,
      height: 0.5 + random(offset + 8) * 0.4,
      power: index === 0 ? 1 : 0.35 + random(offset + 9) * 0.4,
    };
  });
}

function colourFor(amount: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(1, amount)) * (STOPS.length - 1);
  const index = Math.min(STOPS.length - 2, Math.floor(clamped));
  const local = clamped - index;
  const from = STOPS[index];
  const to = STOPS[index + 1];
  return [
    from[0] + (to[0] - from[0]) * local,
    from[1] + (to[1] - from[1]) * local,
    from[2] + (to[2] - from[2]) * local,
  ];
}

// The strength and opacity a variant wants at a given height (0 top, 1 bottom).
function profileAt(profile: [number, number, number][], height: number): [number, number] {
  for (let index = 1; index < profile.length; index++) {
    const [fromHeight, fromStrength, fromOpacity] = profile[index - 1];
    const [toHeight, toStrength, toOpacity] = profile[index];
    if (height <= toHeight) {
      const local = (height - fromHeight) / (toHeight - fromHeight);
      return [fromStrength + (toStrength - fromStrength) * local, fromOpacity + (toOpacity - fromOpacity) * local];
    }
  }
  const last = profile[profile.length - 1];
  return [last[1], last[2]];
}

type Props = { variant?: Variant; seed?: number; bright?: boolean };

export default function Curtain({ variant = "hero", seed, bright = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pools = poolsFor(seed);
    const profile = PROFILES[variant];
    // The light every rib has before any pool reaches it, and how much the
    // pools add on top. A bright wall starts high and adds less.
    const baseLight = bright ? 0.62 : 0.07;
    const poolGain = bright ? 0.55 : 1;
    let width = 0;
    let height = 0;
    let ribWidth = 14;
    let pointerX = -1;
    let pointerY = 0.5;
    let pointerPower = 0;
    let frame = 0;
    let lastDraw = 0;
    let isOnScreen = true;
    let ribShade: CanvasPattern | null = null;

    // The shading that makes each rib look like a rounded glass rod is the
    // same for every rib, so it is painted once into a tiny tile and reused.
    const buildRibShade = () => {
      const tile = document.createElement("canvas");
      tile.width = ribWidth;
      tile.height = 1;
      const tileContext = tile.getContext("2d");
      if (!tileContext) return;

      const shade = tileContext.createLinearGradient(0, 0, ribWidth, 0);
      shade.addColorStop(0, "rgba(0, 0, 0, 0.55)");
      shade.addColorStop(0.35, "rgba(0, 0, 0, 0)");
      shade.addColorStop(0.8, "rgba(255, 255, 255, 0.07)");
      shade.addColorStop(1, "rgba(0, 0, 0, 0.35)");
      tileContext.fillStyle = shade;
      tileContext.fillRect(0, 0, ribWidth, 1);

      // A hairline highlight where the glass catches the light.
      tileContext.fillStyle = "rgba(255, 255, 255, 0.1)";
      tileContext.fillRect(Math.round(ribWidth * 0.55), 0, 1, 1);

      ribShade = context.createPattern(tile, "repeat");
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      ribWidth = width < 700 ? 10 : 15;
      buildRibShade();
    };

    const draw = (time: number) => {
      if (!reduceMotion) frame = requestAnimationFrame(draw);

      // The light moves slowly, so 30 frames a second is plenty, and nothing
      // is drawn at all while the canvas is scrolled out of view.
      if (!isOnScreen || time - lastDraw < 32) return;
      lastDraw = time;

      const seconds = (time / 1000) * FLOW_SPEED;
      const ribs = Math.ceil(width / ribWidth);
      context.clearRect(0, 0, width, height);

      // Where each pool is right now. Worked out once per frame.
      const centres = pools.map((pool) => ({
        x: pool.x + Math.sin(seconds * pool.speedX + pool.phase) * pool.driftX,
        y: pool.y + Math.cos(seconds * pool.speedY + pool.phase * 1.3) * pool.driftY,
      }));

      for (let rib = 0; rib < ribs; rib++) {
        const x = rib * ribWidth;
        // Shift where this rib "looks" so neighbours disagree a little.
        const refracted = (x + ribWidth / 2) / width + Math.sin(rib * 1.7) * 0.035;

        const fill = context.createLinearGradient(0, 0, 0, height);

        for (let sample = 0; sample < SAMPLES; sample++) {
          const level = sample / (SAMPLES - 1);
          // The sway: the sampling point drifts sideways, differently at each
          // height and over time. This is what reads as liquid.
          const across = refracted + Math.sin(level * 4.2 + seconds * 0.35 + rib * 0.21) * SWAY;

          let light = baseLight;
          for (let index = 0; index < pools.length; index++) {
            const pool = pools[index];
            const distanceX = (across - centres[index].x) / pool.width;
            const distanceY = (level - centres[index].y) / pool.height;
            light += Math.exp(-distanceX * distanceX - distanceY * distanceY) * pool.power * poolGain;
          }
          if (pointerPower > 0.01) {
            const distanceX = (across - pointerX) / 0.09;
            const distanceY = (level - pointerY) / 0.45;
            light += Math.exp(-distanceX * distanceX - distanceY * distanceY) * 0.6 * pointerPower;
          }

          const [strength, opacity] = profileAt(profile, level);
          const [red, green, blue] = colourFor(light * strength);
          fill.addColorStop(level, `rgba(${red}, ${green}, ${blue}, ${opacity})`);
        }

        context.fillStyle = fill;
        context.fillRect(x, 0, ribWidth + 0.5, height);
      }

      if (ribShade) {
        context.fillStyle = ribShade;
        context.fillRect(0, 0, width, height);
      }

      // The floor glow has to stay see-through at the top, so cut the rib
      // shading back out with the same fade.
      if (variant === "floor") {
        const cut = context.createLinearGradient(0, 0, 0, height);
        cut.addColorStop(0, "rgba(0, 0, 0, 1)");
        cut.addColorStop(0.65, "rgba(0, 0, 0, 0)");
        context.globalCompositeOperation = "destination-out";
        context.fillStyle = cut;
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = "source-over";
      }

      pointerPower *= 0.94;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      if (event.clientY < bounds.top || event.clientY > bounds.bottom) return;
      pointerX = (event.clientX - bounds.left) / bounds.width;
      pointerY = (event.clientY - bounds.top) / bounds.height;
      pointerPower = 1;
    };

    const onResize = () => {
      resize();
      lastDraw = 0;
      if (reduceMotion) draw(performance.now());
    };

    const visibility = new IntersectionObserver(([entry]) => {
      isOnScreen = entry.isIntersecting;
    });
    visibility.observe(canvas);

    resize();
    if (reduceMotion) draw(performance.now());
    else frame = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      visibility.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [variant, seed, bright]);

  return <canvas ref={canvasRef} className={`curtain curtain-${variant}`} aria-hidden="true" />;
}
