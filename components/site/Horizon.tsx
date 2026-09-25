"use client";

import { useEffect, useRef } from "react";

/**
 * THE HORIZON — a dusk desert drawn in one fragment shader.
 *
 * Layered dune silhouettes with aerial haze, a light source low on the horizon
 * that drifts toward the pointer, rim light on the crests nearest it, a sparse
 * field of dot-matrix digits in the upper sky, and film grain on top.
 *
 * variant="night" is the same land after dark: the glow nearly gone, stars in
 * place of digits. The contact section uses it to close the loop.
 *
 * It renders at 30 fps (the grain reads as film at that rate and the GPU does
 * half the work), stops when off-screen, and draws a single still frame for
 * reduced motion. If WebGL is unavailable the CSS gradient behind it stays.
 */

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;
uniform float uNight;
uniform float uDpr;
uniform float uFlip;
uniform float uGrain;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float n1(float x){ float i = floor(x); float f = fract(x); float u = f*f*(3.0-2.0*f);
  return mix(hash(vec2(i, 1.7)), hash(vec2(i+1.0, 1.7)), u); }
float fbm(float x){ float v = 0.0; float a = 0.5;
  for(int i=0;i<4;i++){ v += a*n1(x); x = x*2.07 + 3.1; a *= 0.45; } return v; }

// Dune profile: rounded crests, long soft flanks.
float dune(float x, float f, float seed){
  float v = fbm(x*f + seed);
  return pow(v, 1.6);
}

// 3x5 dot-matrix digits packed as 15 bits, row-major from the top.
float glyph(float d){
  if(d < 0.5) return 31599.0;  // 0
  if(d < 1.5) return 9362.0;   // 1
  if(d < 2.5) return 29671.0;  // 2
  if(d < 3.5) return 29391.0;  // 3
  if(d < 4.5) return 23497.0;  // 4
  if(d < 5.5) return 31183.0;  // 5
  if(d < 6.5) return 31215.0;  // 6
  if(d < 7.5) return 29257.0;  // 7
  if(d < 8.5) return 31727.0;  // 8
  return 31695.0;              // 9
}

vec3 skyCol(float y, float night){
  vec3 top  = mix(vec3(0.035,0.035,0.060), vec3(0.020,0.020,0.035), night);
  vec3 high = mix(vec3(0.105,0.095,0.170), vec3(0.040,0.042,0.075), night);
  vec3 mid  = mix(vec3(0.300,0.245,0.370), vec3(0.075,0.075,0.125), night);
  vec3 low  = mix(vec3(0.640,0.430,0.470), vec3(0.150,0.130,0.180), night);
  vec3 hor  = mix(vec3(0.960,0.640,0.420), vec3(0.300,0.210,0.220), night);
  vec3 c = mix(hor, low, smoothstep(0.40, 0.49, y));
  c = mix(c, mid, smoothstep(0.47, 0.60, y));
  c = mix(c, high, smoothstep(0.58, 0.80, y));
  c = mix(c, top, smoothstep(0.78, 1.00, y));
  return c;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  // RTL pages mirror the land so the light stays away from the headline.
  uv.x = mix(uv.x, 1.0 - uv.x, uFlip);
  float asp = uRes.x / uRes.y;
  float night = uNight;
  float t = uTime;
  vec2 ptr = uPtr - 0.5;
  ptr.x *= 1.0 - 2.0 * uFlip;

  // Portrait screens: lift the horizon so the land still reads.
  float hz = mix(0.43, 0.50, clamp((1.0 - asp) * 1.4, 0.0, 1.0));
  float y = uv.y - (hz - 0.43);
  float x = (uv.x - 0.5) * max(asp, 0.9) + 0.5;

  // Light source: low on the horizon, drifting a little toward the pointer.
  vec2 sun = vec2(0.66 + ptr.x*0.10, 0.425 + ptr.y*0.02 + sin(t*0.07)*0.004);
  vec2 d = vec2((x - sun.x) / 1.0, (y - sun.y) * 2.4);
  float glow = exp(-dot(d,d) * 9.0);
  float halo = exp(-dot(d,d) * 1.6);

  vec3 col = skyCol(y, night);
  vec3 warm = mix(vec3(1.0, 0.72, 0.46), vec3(0.45, 0.35, 0.38), night);
  col += warm * (glow*0.55 + halo*0.16) * (1.0 - night*0.75);

  // ---- sky details -------------------------------------------------------
  if (night < 0.5) {
    // Dot-matrix digits: sparse columns, very quiet.
    float px = 2.6 * uDpr;                 // dot pitch
    vec2 cell = vec2(4.0, 7.0) * px;       // 3x5 glyph + gap
    vec2 g = floor(frag / cell);
    vec2 inCell = mod(frag, cell) / px;    // 0..4, 0..7 in dots
    float colSeed = hash(vec2(g.x, 7.0));
    float active = step(0.80, colSeed);
    float speed = 0.05 + colSeed * 0.10;
    float wave = fract(g.y * 0.045 + t * speed + colSeed * 13.0);
    float bright = smoothstep(0.70, 1.0, wave) * active;
    float digit = floor(hash(g + floor(t * 1.5 + colSeed * 9.0)) * 10.0);
    vec2 dp = floor(inCell);
    float on = 0.0;
    if (dp.x < 3.0 && dp.y < 5.0) {
      float idx = dp.y * 3.0 + (2.0 - dp.x);
      on = mod(floor(glyph(digit) / pow(2.0, idx)), 2.0);
      vec2 f = fract(inCell) - 0.5;
      on *= smoothstep(0.42, 0.22, length(f));
    }
    float band = smoothstep(0.64, 0.80, uv.y) * smoothstep(1.02, 0.86, uv.y);
    col += vec3(0.92, 0.88, 0.95) * on * bright * band * 0.085;
  } else {
    // Stars: a few, faint, slow twinkle.
    vec2 sc = floor(frag / (3.0 * uDpr));
    float s = hash(sc);
    float star = step(0.9965, s) * (0.55 + 0.45 * sin(t * (0.6 + s * 3.0) + s * 40.0));
    col += vec3(0.85, 0.87, 1.0) * star * smoothstep(0.48, 0.75, y) * 0.55;
  }

  // ---- dunes, far to near -------------------------------------------------
  vec3 hazeCol = mix(vec3(0.58, 0.40, 0.48), vec3(0.10, 0.09, 0.13), night);
  vec3 rose = mix(vec3(0.86, 0.46, 0.44), vec3(0.30, 0.24, 0.30), night);
  vec3 ink = vec3(0.043, 0.043, 0.047);
  for (int i = 0; i < 4; i++) {
    float k = float(i) / 3.0;                        // 0 far .. 1 near
    float par = ptr.x * (0.004 + k * 0.022);         // parallax
    float drift = t * (0.0025 + k * 0.004);
    float xx = x + par + drift;
    float base = mix(0.415, 0.20, k);
    float amp = mix(0.03, 0.12, k);
    float f = mix(2.8, 1.1, k);
    float h = base + amp * dune(xx, f, float(i) * 17.3);
    if (i == 3) {
      // The near mound: one broad, soft dome, like a body of sand.
      float dx = (x + par * 1.4 - 0.30) / 0.62;
      h = 0.05 + 0.25 * exp(-dx * dx * 1.6) + 0.03 * dune(xx, 0.8, 5.0);
    }
    float aa = 1.5 / uRes.y;
    float m = smoothstep(h + aa, h - aa, y);
    if (m > 0.0) {
      float depth = h - y;
      vec3 top = mix(hazeCol * mix(0.85, 0.30, k), ink * 1.4, k * k);
      vec3 dc = mix(top, ink, smoothstep(0.0, mix(0.05, 0.16, k), depth) * mix(0.55, 0.95, k));
      // Rim light: warm right under the crest, strongest near the light.
      float rimW = mix(0.004, 0.018, k);
      float near = exp(-pow((x - sun.x) * mix(2.6, 1.1, k), 2.0));
      float rim = exp(-depth / rimW) * (0.25 + 0.75 * near);
      dc += rose * rim * mix(0.55, 0.42, k) * (1.0 - night * 0.7);
      col = mix(col, dc, m);
    }
  }

  // Let the land fall into the page colour at the bottom edge.
  col = mix(col, ink, smoothstep(0.10, 0.0, uv.y));

  // Vignette.
  vec2 v = uv - 0.5;
  col *= 1.0 - dot(v*vec2(0.9, 1.2), v*vec2(0.9, 1.2)) * 0.55;

  // Film grain, luminance only, stronger in the mids.
  float gr = hash(frag + fract(t * 0.713) * vec2(1731.0, 913.0)) - 0.5;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float land = smoothstep(0.47, 0.30, y);
  col += gr * (mix(0.075, 0.11, smoothstep(0.02, 0.35, lum)) + land * 0.05) * (0.6 + lum) * uGrain;
  // Dither away banding.
  col += (hash(frag * 1.37) - 0.5) / 255.0;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

type Props = { variant?: "dusk" | "night"; className?: string };

export default function Horizon({ variant = "dusk", className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = wrap.current;
    const el = canvas.current;
    if (!host || !el) return;

    // failIfMajorPerformanceCaveat: no GPU (software rendering) means no
    // shader. Drawing it on the CPU costs far more than it's worth, and the
    // still underneath is already the same picture.
    let gl: WebGLRenderingContext | null = null;
    let disposed = false;
    let idle: number | undefined;
    let poll = 0;
    let stop: (() => void) | undefined;

    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;

    // 1. Wait until the canvas is near the viewport and the page is idle.
    const gate = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        gate.disconnect();
        idle = ric(compile, { timeout: 1200 } as IdleRequestOptions) as number;
      },
      { rootMargin: "600px 0px" },
    );
    gate.observe(host);

    // 2. Compile without asking for the result. Querying COMPILE/LINK_STATUS
    //    blocks the main thread until the driver is done; with
    //    KHR_parallel_shader_compile we poll for completion across frames.
    function compile() {
      if (disposed) return;
      gl = el!.getContext("webgl", {
        antialias: false,
        alpha: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true,
      });
      if (!gl) return;
      const g = gl;
      const shader = (type: number, src: string) => {
        const sh = g.createShader(type)!;
        g.shaderSource(sh, src);
        g.compileShader(sh);
        return sh;
      };
      const prog = g.createProgram()!;
      g.attachShader(prog, shader(g.VERTEX_SHADER, VERT));
      g.attachShader(prog, shader(g.FRAGMENT_SHADER, FRAG));
      g.linkProgram(prog);
      const parallel = g.getExtension("KHR_parallel_shader_compile");
      const check = () => {
        if (disposed) return;
        if (parallel && !g.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR)) {
          poll = requestAnimationFrame(check);
          return;
        }
        if (!g.getProgramParameter(prog, g.LINK_STATUS)) {
          console.warn("[horizon]", g.getProgramInfoLog(prog));
          return;
        }
        stop = run(g, prog, host!, el!);
      };
      poll = requestAnimationFrame(check);
    }

    return () => {
      disposed = true;
      gate.disconnect();
      if (idle !== undefined) cic(idle);
      cancelAnimationFrame(poll);
      stop?.();
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [variant]);

  // 3. Draw: 30 fps, paused off-screen and in background tabs.
  function run(gl: WebGLRenderingContext, prog: WebGLProgram, host: HTMLDivElement, el: HTMLCanvasElement) {
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      ptr: gl.getUniformLocation(prog, "uPtr"),
      night: gl.getUniformLocation(prog, "uNight"),
      dpr: gl.getUniformLocation(prog, "uDpr"),
      flip: gl.getUniformLocation(prog, "uFlip"),
      grain: gl.getUniformLocation(prog, "uGrain"),
    };
    gl.uniform1f(u.night, variant === "night" ? 1 : 0);
    gl.uniform1f(u.flip, document.documentElement.dir === "rtl" ? 1 : 0);
    // Set by scripts/capture-horizon.js to export the no-GPU fallback stills.
    const still = (window as unknown as { __horizonStill?: boolean }).__horizonStill === true;
    gl.uniform1f(u.grain, still ? 0 : 1);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Phones render at a lower scale; the grain hides it.
    const scale = coarse ? 0.7 : Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const w = Math.max(1, Math.round(host.clientWidth * scale));
      const h = Math.max(1, Math.round(host.clientHeight * scale));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u.res, w, h);
      gl.uniform1f(u.dpr, scale);
    };
    resize();

    const target = { x: 0.5, y: 0.5 };
    const ptr = { x: 0.5, y: 0.5 };
    const onMove = (cx: number, cy: number) => {
      const r = host.getBoundingClientRect();
      target.x = Math.min(1, Math.max(0, (cx - r.left) / r.width));
      target.y = 1 - Math.min(1, Math.max(0, (cy - r.top) / r.height));
    };
    const pm = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => e.touches[0] && onMove(e.touches[0].clientX, e.touches[0].clientY);
    window.addEventListener("pointermove", pm, { passive: true });
    host.addEventListener("touchmove", tm, { passive: true });

    const draw = (time: number) => {
      ptr.x += (target.x - ptr.x) * 0.035;
      ptr.y += (target.y - ptr.y) * 0.035;
      gl.uniform1f(u.time, time);
      gl.uniform2f(u.ptr, ptr.x, ptr.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let visible = true;
    let last = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 1000 / 30) return;
      last = now;
      draw((now - start) / 1000 + 20);
    };

    // One frame first, then fade the canvas in over the still.
    draw(20);
    host.dataset.ready = "1";

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || still) draw(20);
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(host);
    const onVis = () => (visible = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    if (!reduced && !still) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", pm);
      host.removeEventListener("touchmove", tm);
      document.removeEventListener("visibilitychange", onVis);
    };
  }

  return (
    <div ref={wrap} className={`horizon horizon--${variant} ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  );
}
