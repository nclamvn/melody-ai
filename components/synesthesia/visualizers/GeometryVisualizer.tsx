"use client";

import { useRef, useEffect } from 'react';
import { VisualizerProps } from '@/types/synesthesia';

export default function GeometryVisualizer({
  frequencyData,
  isPlaying,
  sensitivity,
  colors
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawPolygon = (
      cx: number,
      cy: number,
      radius: number,
      sides: number,
      rotation: number,
      color: string,
      alpha: number,
      lineWidth: number = 2
    ) => {
      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = (i / sides) * Math.PI * 2 + rotation;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const render = () => {
      rotationRef.current += 0.005 + frequencyData.overall * 0.02;

      ctx.fillStyle = 'rgba(5, 5, 7, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;

      // Outer rings (bass)
      for (let i = 0; i < 5; i++) {
        const radius = baseRadius * (1.2 + i * 0.15) + frequencyData.bass * 50 * sensitivity;
        const alpha = 0.1 + frequencyData.bass * 0.3;
        drawPolygon(cx, cy, radius, 6, rotationRef.current * (0.5 + i * 0.1), colors.bass, alpha);
      }

      // Middle rings (mids)
      for (let i = 0; i < 4; i++) {
        const radius = baseRadius * (0.8 + i * 0.1) + frequencyData.mid * 40 * sensitivity;
        const alpha = 0.15 + frequencyData.mid * 0.4;
        drawPolygon(cx, cy, radius, 8, -rotationRef.current * (0.7 + i * 0.15), colors.mid, alpha);
      }

      // Inner rings (highs)
      for (let i = 0; i < 3; i++) {
        const radius = baseRadius * (0.4 + i * 0.1) + frequencyData.high * 30 * sensitivity;
        const alpha = 0.2 + frequencyData.high * 0.5;
        drawPolygon(cx, cy, radius, 12, rotationRef.current * (1 + i * 0.2), colors.high, alpha, 1);
      }

      // Center mandala
      const centerRadius = baseRadius * 0.2 + frequencyData.overall * 20 * sensitivity;

      const pulseGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, centerRadius * 2);
      pulseGradient.addColorStop(0, `${colors.mid}${Math.floor(frequencyData.overall * 0.8 * 255).toString(16).padStart(2, '0')}`);
      pulseGradient.addColorStop(0.5, `${colors.highMid}${Math.floor(frequencyData.overall * 0.3 * 255).toString(16).padStart(2, '0')}`);
      pulseGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, centerRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = pulseGradient;
      ctx.fill();

      // Connecting lines
      if (frequencyData.overall > 0.3) {
        const lineCount = 6;
        for (let i = 0; i < lineCount; i++) {
          const angle = (i / lineCount) * Math.PI * 2 + rotationRef.current;
          const innerRadius = centerRadius;
          const outerRadius = baseRadius * 1.5;

          ctx.beginPath();
          ctx.moveTo(
            cx + Math.cos(angle) * innerRadius,
            cy + Math.sin(angle) * innerRadius
          );
          ctx.lineTo(
            cx + Math.cos(angle) * outerRadius,
            cy + Math.sin(angle) * outerRadius
          );
          ctx.strokeStyle = `rgba(255, 255, 255, ${frequencyData.overall * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    if (isPlaying) {
      render();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequencyData, isPlaying, sensitivity, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#050507' }}
    />
  );
}
