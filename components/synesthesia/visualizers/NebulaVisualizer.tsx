"use client";

import { useRef, useEffect } from 'react';
import { VisualizerProps } from '@/types/synesthesia';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface CosmicRay {
  x: number;
  y: number;
  angle: number;
  speed: number;
  length: number;
  life: number;
}

export default function NebulaVisualizer({
  frequencyData,
  isPlaying,
  sensitivity,
  colors
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const raysRef = useRef<CosmicRay[]>([]);
  const timeRef = useRef(0);
  const nebulaOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      starsRef.current = [];
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random(),
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nebulaOffsetRef.current.x += frequencyData.lowMid * 0.5 * sensitivity;
      nebulaOffsetRef.current.y += frequencyData.mid * 0.3 * sensitivity;

      const drawNebulaCloud = (
        cx: number,
        cy: number,
        radius: number,
        color: string,
        intensity: number
      ) => {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const alpha = intensity * 0.15;
        gradient.addColorStop(0, `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.3, `${color}${Math.floor(alpha * 0.7 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.6, `${color}${Math.floor(alpha * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color}00`);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      };

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      drawNebulaCloud(
        cx + Math.sin(t * 0.3) * 50 + nebulaOffsetRef.current.x * 0.1,
        cy + Math.cos(t * 0.4) * 30 + nebulaOffsetRef.current.y * 0.1,
        300 + frequencyData.bass * 150 * sensitivity,
        colors.bass,
        0.5 + frequencyData.bass * 0.5
      );

      drawNebulaCloud(
        cx + Math.sin(t * 0.5 + 1) * 80 + nebulaOffsetRef.current.x * 0.15,
        cy + Math.cos(t * 0.3 + 1) * 60 + nebulaOffsetRef.current.y * 0.15,
        250 + frequencyData.lowMid * 120 * sensitivity,
        colors.lowMid,
        0.4 + frequencyData.lowMid * 0.6
      );

      drawNebulaCloud(
        cx + Math.sin(t * 0.7 + 2) * 40,
        cy + Math.cos(t * 0.5 + 2) * 40,
        180 + frequencyData.mid * 100 * sensitivity,
        colors.mid,
        0.6 + frequencyData.mid * 0.4
      );

      drawNebulaCloud(
        cx + Math.sin(t * 0.9 + 3) * 100,
        cy + Math.cos(t * 0.7 + 3) * 80,
        120 + frequencyData.highMid * 80 * sensitivity,
        colors.highMid,
        0.3 + frequencyData.highMid * 0.7
      );

      // Stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        const brightness = star.brightness * twinkle * (0.5 + frequencyData.high * 0.5);

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${brightness * 0.3})`);
        gradient.addColorStop(1, 'rgba(200, 220, 255, 0)');

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.fill();
      });

      // Cosmic rays
      if (frequencyData.high > 0.6 && Math.random() < frequencyData.high * 0.3) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(canvas.width, canvas.height);
        raysRef.current.push({
          x: cx + Math.cos(angle) * distance,
          y: cy + Math.sin(angle) * distance,
          angle: angle + Math.PI,
          speed: 15 + Math.random() * 10,
          length: 50 + Math.random() * 100,
          life: 1,
        });
      }

      raysRef.current = raysRef.current.filter((ray) => {
        ray.x += Math.cos(ray.angle) * ray.speed;
        ray.y += Math.sin(ray.angle) * ray.speed;
        ray.life -= 0.02;

        if (ray.life <= 0) return false;

        const gradient = ctx.createLinearGradient(
          ray.x, ray.y,
          ray.x - Math.cos(ray.angle) * ray.length,
          ray.y - Math.sin(ray.angle) * ray.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ray.life})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(ray.x, ray.y);
        ctx.lineTo(
          ray.x - Math.cos(ray.angle) * ray.length,
          ray.y - Math.sin(ray.angle) * ray.length
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      // Bass burst
      if (frequencyData.bass > 0.7) {
        const burstRadius = (frequencyData.bass - 0.7) * 3 * 100 * sensitivity;
        const burstGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, burstRadius);
        burstGradient.addColorStop(0, `rgba(255, 255, 255, ${(frequencyData.bass - 0.7) * 0.5})`);
        burstGradient.addColorStop(0.3, `rgba(91, 159, 255, ${(frequencyData.bass - 0.7) * 0.3})`);
        burstGradient.addColorStop(1, 'rgba(91, 159, 255, 0)');

        ctx.beginPath();
        ctx.arc(cx, cy, burstRadius, 0, Math.PI * 2);
        ctx.fillStyle = burstGradient;
        ctx.fill();
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
