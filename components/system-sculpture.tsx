"use client";

import { useEffect, useRef } from "react";

type Props = { paused: boolean; organized: boolean; reducedMotion: boolean; theme: "dark" | "light"; label: string };

// A torus-knot point cloud: a visual metaphor for connected, complex systems.
export default function SystemSculpture({ paused, organized, reducedMotion, theme, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const organizedRef = useRef(organized);
  const rotationRef = useRef(0.35);
  const cameraRef = useRef({ x: 0, y: 0 });
  const redrawRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    organizedRef.current = organized;
    if (paused || reducedMotion) redrawRef.current?.();
  }, [organized, paused, reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0, height = 0, frame = 0, rotation = rotationRef.current, previousTime = 0;
    let visible = true, blend = organizedRef.current ? 1 : 0;
    let pointerX = cameraRef.current.x, pointerY = cameraRef.current.y;
    let easedX = pointerX, easedY = pointerY;
    const points: { x: number; y: number; z: number; sx: number; sy: number; sz: number; accent: boolean }[] = [];
    for (let i = 0; i < 160; i++) {
      const t = (i / 160) * Math.PI * 2;
      const radius = 1.7 + 0.6 * Math.cos(3 * t);
      const x = radius * Math.cos(2 * t), y = radius * Math.sin(2 * t), z = 0.8 * Math.sin(3 * t);
      const nextT = t + 0.001;
      const nextRadius = 1.7 + 0.6 * Math.cos(3 * nextT);
      let tx = nextRadius * Math.cos(2 * nextT) - x;
      let ty = nextRadius * Math.sin(2 * nextT) - y;
      let tz = 0.8 * Math.sin(3 * nextT) - z;
      const length = Math.hypot(tx, ty, tz); tx /= length; ty /= length; tz /= length;
      const normalLength = Math.hypot(tx, ty);
      const nx = -ty / normalLength, ny = tx / normalLength;
      const bx = -tz * ny, by = tz * nx, bz = tx * ny - ty * nx;
      for (let j = 0; j < 28; j++) {
        const a = (j / 28) * Math.PI * 2;
        const tube = 0.38;
        const seed = i * 28 + j;
        points.push({
          x: x + tube * (Math.cos(a) * nx + Math.sin(a) * bx),
          y: y + tube * (Math.cos(a) * ny + Math.sin(a) * by),
          z: z + tube * Math.sin(a) * bz,
          sx: Math.sin(seed * 12.9898) * 3.1,
          sy: Math.cos(seed * 7.233) * 2.5,
          sz: Math.sin(seed * 3.791) * 2.5,
          accent: (i > 35 && i < 72) || (i > 115 && i < 132),
        });
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (paused || reducedMotion) draw(0);
    };
    const draw = (time: number) => {
      if (!width || !height) return;
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      if (!paused && !reducedMotion) rotation += delta * 0.1;
      rotationRef.current = rotation;
      const targetBlend = organizedRef.current ? 1 : 0;
      blend = reducedMotion || paused ? targetBlend : blend + (targetBlend - blend) * 0.045;
      if (!paused && !reducedMotion) {
        easedX += (pointerX - easedX) * 0.04; easedY += (pointerY - easedY) * 0.04;
        cameraRef.current = { x: easedX, y: easedY };
      }
      ctx.clearRect(0, 0, width, height);
      const ry = rotation + easedX * 0.3, rx = -0.65 + easedY * 0.3;
      const scale = Math.min(width, height) * 0.18;
      const projected = points.map((p) => {
        const x = p.sx + (p.x - p.sx) * blend;
        const y = p.sy + (p.y - p.sy) * blend;
        const z = p.sz + (p.z - p.sz) * blend;
        const x1 = x * Math.cos(ry) + z * Math.sin(ry);
        const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
        const perspective = 7 / (7 - z2);
        return { x: width / 2 + x1 * scale * perspective, y: height / 2 + y1 * scale * perspective, z: z2, accent: p.accent, perspective };
      }).sort((a, b) => a.z - b.z);
      for (const p of projected) {
        const alpha = 0.18 + ((p.z + 3) / 6) * 0.7;
        const color = p.accent ? (theme === "dark" ? "255, 153, 95" : "202, 87, 39") : (theme === "dark" ? "212, 232, 188" : "38, 65, 36");
        ctx.fillStyle = `rgba(${color}, ${Math.min(1, alpha + (p.accent ? 0.1 : 0))})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, (width < 500 ? 0.93 : 1.25) * p.perspective, 0, Math.PI * 2); ctx.fill();
      }
    };
    redrawRef.current = () => draw(0);
    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      draw(time);
      if (!paused && !reducedMotion) frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden) { previousTime = 0; frame = requestAnimationFrame(tick); } };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start();
    };
    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(canvas); intersection.observe(canvas);
    canvas.addEventListener("pointermove", onPointer);
    document.addEventListener("visibilitychange", onVisibility);
    resize(); start();
    return () => { redrawRef.current = null; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); canvas.removeEventListener("pointermove", onPointer); document.removeEventListener("visibilitychange", onVisibility); };
  }, [paused, reducedMotion, theme]);

  return <canvas ref={canvasRef} className="system-canvas" role="img" aria-label={label} />;
}
