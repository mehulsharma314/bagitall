"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ─────────────────────────────────────────────────────────────
 * ARCHIVAL CLOTH REVEAL — WebGL
 * A tactile, high-end reveal suited for archival apparel.
 * Physical unfolding motion from dark shadows to light.
 * No digital flares, no neon. Raw, Cinematic, Tactical.
 * ─────────────────────────────────────────────────────────────
 */

const VERT_SHADER = `
  attribute vec2 aPosition;
  attribute vec2 aUv;
  varying vec2 vUv;
  varying float vDist;
  uniform float uTime;
  uniform float uProgress; // 0 (hidden) -> 1 (unfolded)
  uniform vec2 uMouse;

  void main() {
    vUv = aUv;
    
    // Physics: Unfolding from a "clumped" state in the shadow
    // Vertices expand from their original positions with a subtle sway
    float noise = sin(aPosition.x * 12.0 + uTime * 0.5) * cos(aPosition.y * 10.0 + uTime * 0.4) * 0.02;
    
    // Progress-based expansion (Unfolding)
    // At uProgress=0, they are condensed and slightly offset
    vec2 clump = aPosition + vec2(noise * (1.0 - uProgress));
    vec2 pos = mix(clump * 0.8, aPosition, uProgress);
    
    // Convert to clip space
    vec2 clipPos = pos * 2.0 - 1.0;
    
    // Mouse hover sway (tactile depth)
    float dist = distance(aUv, uMouse);
    vDist = dist;
    float hover = smoothstep(0.4, 0.0, dist) * 0.03 * uProgress;
    clipPos += (uMouse - aUv) * hover;

    gl_Position = vec4(clipPos, 0.0, 1.0);
  }
`;

const FRAG_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  varying float vDist;
  uniform float uTime;
  uniform float uProgress;
  uniform sampler2D uTexture;

  void main() {
    // Grain texture for "Archival" feel
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    
    // Sample texture with subtle displacement
    vec4 tex = texture2D(uTexture, vUv);
    
    // Atmospheric cinematic color grade: Neutral Archival
    // Deeper, more neutral off-black shadows – NO artificial teal/blue bias
    vec3 shadowCol = vec3(0.02, 0.02, 0.03); 
    vec3 baseCol = mix(shadowCol, tex.rgb, uProgress * 0.95 + 0.05);

    // Spotlight Reveal (Subtle neutral light)
    float spotlight = smoothstep(0.35, 0.0, vDist) * 0.12 * uProgress;
    baseCol += vec3(0.12, 0.14, 0.18) * spotlight;

    // Cinematic Vignette (Luxury Archival Shadow)
    float vign = smoothstep(0.85, 0.3, length(vUv - 0.5));
    baseCol *= mix(0.3, 1.0, vign * uProgress);

    // Fade in from void
    float alpha = smoothstep(0.0, 0.3, uProgress);

    gl_FragColor = vec4(baseCol + (grain * 0.012), alpha);
  }
`;

export default function ArchivalCloth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    // ── Shaders ──
    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT_SHADER));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);

    // ── Plane (Higher grid for smoothness) ──
    const GRID = 40;
    const verts: number[] = [];
    const indices: number[] = [];
    for (let y = 0; y <= GRID; y++) {
      for (let x = 0; x <= GRID; x++) {
        verts.push(x / GRID, y / GRID, x / GRID, 1.0 - y / GRID);
      }
    }
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const i = y * (GRID + 1) + x;
        indices.push(i, i+1, i+GRID+1, i+1, i+GRID+2, i+GRID+1);
      }
    }

    const vBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    const iBuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPosition");
    const aUv = gl.getAttribLocation(program, "aUv");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 16, 0);
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 16, 8);

    // ── Texture loading ──
    const texture = gl.createTexture();
    const image = new window.Image();
    image.src = "/hero-bg-rk.jpg";
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    };

    const uTime = gl.getUniformLocation(program, "uTime");
    const uProgress = gl.getUniformLocation(program, "uProgress");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let startTime = Date.now();
    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Slower, weighted unfolding reveal
      const progress = Math.min(Math.pow(elapsed / 4.0, 1.5), 1.0); // 4s to full reveal
      
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uProgress, progress);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      if (elapsed < 6.0) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        // Leave the canvas settled or fade it out? (Settle)
        rafRef.current = requestAnimationFrame(render);
      }
    };
    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
