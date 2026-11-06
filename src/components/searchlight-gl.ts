// Hairline UI · searchlight-hero (Acupuncture Theme Edition) · MIT License
// Copyright (c) 2026 Hairline UI · https://hairlineui.com/license#components

/* ─────────────────────────────────────────────────────────
 * SEARCHLIGHT renderer for Arura Acupuncture Sanctuary
 *
 * Full-screen triangle with fragment shader:
 *   night   graded into deep Arura luxury wellness tones
 *           (warm plum-charcoal), soft and calming
 *   beam    focused clinical procedure luminaire with crisp
 *           light cone, illuminating the treatment scene in full
 *           warm natural color
 *   motes   gentle rising Qi biophoton motes in golden-rose
 *   lens    clinical task light lens
 * ───────────────────────────────────────────────────────── */

const VERTEX = `attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAGMENT = `precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec4 uCrop;
uniform vec2 uLamp;
uniform vec2 uDir;
uniform float uSpread;
uniform float uReach;
uniform float uLens;
uniform float uTime;
uniform float uOn;
uniform float uScale;
uniform vec4 uCopy;
uniform vec3 uDeep;
uniform vec3 uTint;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Gentle therapeutic Qi motes rising smoothly through the light
float motes(vec2 px, float cell, float speed, float size) {
  vec2 p = px / cell;
  p.y += uTime * speed / cell; // Rise gently upwards
  p.x += sin(uTime * 0.4 + floor(p.y) * 1.5) * 0.14;
  vec2 id = floor(p);
  if (hash(id) > 0.45) return 0.0;
  vec2 c = vec2(hash(id + 3.1), hash(id + 7.7)) * 0.7 + 0.15;
  float d = length((fract(p) - c) * cell);
  float s = size * (0.6 + 0.8 * hash(id + 1.3));
  return (1.0 - smoothstep(s * 0.3, s, d)) * (0.45 + 0.55 * hash(id + 9.2));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = uCrop.xy + vec2(frag.x / uRes.x, 1.0 - frag.y / uRes.y) * uCrop.zw;
  vec3 col = texture2D(uTex, uv).rgb;

  // Grade background into warm, deep Arura plum-charcoal clinical sanctuary tones
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  vec3 night = mix(uDeep, uTint, smoothstep(0.02, 0.85, lum));
  night = mix(night, col * 0.28, 0.25);

  vec2 d = frag - uLamp;
  float dist = max(length(d), 1.0);
  float c = dot(d / dist, uDir);
  float edge = (uSpread - acos(clamp(c, -1.0, 1.0))) * dist;
  float ahead = step(0.0, c);
  float far = 1.0 - smoothstep(uReach * 0.88, uReach * 1.75, dist);
  float cone = smoothstep(-1.2 * uScale, 1.2 * uScale, edge) * ahead * far * uOn;
  float fall = 1.0 / (1.0 + pow(dist / uReach, 2.0));

  // Warm daylight procedural luminaire
  vec3 warm = vec3(1.06, 0.98, 0.92);
  vec3 lit = col * warm * (0.80 + 0.45 * fall);
  lit += warm * (0.03 + 0.04 * noise(frag * 0.005 / uScale + vec2(uTime * 0.04, -uTime * 0.025))) * fall;
  float rim = (1.0 - smoothstep(0.0, 1.6 * uScale, abs(edge))) * ahead * far * uOn;

  // Over the copy area, hold down the light slightly so text maintains 100% optical contrast
  vec2 q = max(uCopy.xy - frag, frag - uCopy.zw);
  float shade = 1.0 - smoothstep(0.0, 120.0 * uScale, length(max(q, vec2(0.0))));
  lit = mix(lit, lit * 0.62, shade);
  vec3 outc = mix(night, lit, cone) + vec3(1.0, 0.84, 0.88) * rim * mix(0.20, 0.08, shade);

  // Floating warm biophoton motes in golden light
  float m = motes(frag, 40.0 * uScale, 8.0 * uScale, 1.4 * uScale) + 0.65 * motes(frag + 60.0, 24.0 * uScale, 4.5 * uScale, 0.9 * uScale);
  outc += vec3(1.0, 0.94, 0.85) * m * mix(0.04, 0.80, cone) * mix(1.0, 0.5, shade);

  // Clinical focused task lamp lens
  float lens = 1.0 - smoothstep(uLens * 0.55, uLens * 0.55 + 1.2 * uScale, length(frag - uLamp));
  outc = mix(outc, vec3(1.0, 0.98, 0.94), lens * uOn);
  gl_FragColor = vec4(outc, 1.0);
}`;

export type Rgb = [number, number, number];

export interface Frame {
  angle: number;
  spread: number;
  time: number;
  on: number;
}

export interface Layout {
  width: number;
  height: number;
  dpr: number;
  crop: [number, number, number, number];
  lamp: [number, number];
  lens: number;
  reach: number;
  copy: [number, number, number, number];
}

export function cover(boxW: number, boxH: number, imgW: number, imgH: number, focus: [number, number]): [number, number, number, number] {
  const box = boxW / boxH;
  const img = imgW / imgH;
  if (box > img) {
    const h = img / box;
    return [0, Math.min(1 - h, Math.max(0, focus[1] - h / 2)), 1, h];
  }
  const w = box / img;
  return [Math.min(1 - w, Math.max(0, focus[0] - w / 2)), 0, w, 1];
}

export const onBox = (p: [number, number], crop: Layout["crop"], w: number, h: number): [number, number] => [
  ((p[0] - crop[0]) / crop[2]) * w,
  ((p[1] - crop[1]) / crop[3]) * h,
];

export function createSearchlight(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: "low-power" });
  if (!gl) return null;

  const shader = (type: number, source: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    return s;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "program");
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const at = {
    res: u("uRes"), crop: u("uCrop"), lamp: u("uLamp"), dir: u("uDir"), spread: u("uSpread"), reach: u("uReach"),
    lens: u("uLens"), time: u("uTime"), on: u("uOn"), scale: u("uScale"), deep: u("uDeep"), tint: u("uTint"), copy: u("uCopy"),
  };
  gl.uniform1i(u("uTex"), 0);

  let layout: Layout | null = null;
  return {
    layout(next: Layout) {
      layout = next;
      canvas.width = next.width;
      canvas.height = next.height;
      gl.viewport(0, 0, next.width, next.height);
      gl.uniform2f(at.res, next.width, next.height);
      gl.uniform4f(at.crop, ...next.crop);
      gl.uniform2f(at.lamp, next.lamp[0] * next.dpr, next.height - next.lamp[1] * next.dpr);
      gl.uniform1f(at.lens, next.lens * next.dpr);
      gl.uniform1f(at.reach, next.reach * next.dpr);
      gl.uniform1f(at.scale, next.dpr);
      const [x0, y0, x1, y1] = next.copy.map((v) => v * next.dpr);
      gl.uniform4f(at.copy, x0, next.height - y1, x1, next.height - y0);
    },
    colors(deep: Rgb, tint: Rgb) {
      gl.uniform3f(at.deep, ...deep);
      gl.uniform3f(at.tint, ...tint);
    },
    draw(frame: Frame) {
      if (!layout) return;
      gl.uniform2f(at.dir, Math.cos(frame.angle), -Math.sin(frame.angle));
      gl.uniform1f(at.spread, frame.spread);
      gl.uniform1f(at.time, frame.time);
      gl.uniform1f(at.on, frame.on);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

export type Searchlight = NonNullable<ReturnType<typeof createSearchlight>>;

export function readColor(css: string): Rgb {
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d");
  if (!ctx) return [0.12, 0.04, 0.08];
  ctx.fillStyle = css;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}
