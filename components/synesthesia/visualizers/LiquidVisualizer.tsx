"use client";

import { useRef, useEffect } from 'react';
import { VisualizerProps } from '@/types/synesthesia';

interface Blob {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
}

export default function LiquidVisualizer({
  frequencyData,
  isPlaying,
  sensitivity,
  colors
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const blobsRef = useRef<Blob[]>([]);

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

    // Initialize blobs
    if (blobsRef.current.length === 0) {
      const blobColors = [colors.bass, colors.lowMid, colors.mid, colors.highMid, colors.high];
      for (let i = 0; i < 8; i++) {
        blobsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 80 + Math.random() * 120,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: blobColors[i % blobColors.length],
        });
      }
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 5, 7, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      blobsRef.current.forEach((blob, index) => {
        const bands = [frequencyData.bass, frequencyData.lowMid, frequencyData.mid, frequencyData.highMid, frequencyData.high];
        const bandValue = bands[index % bands.length];

        blob.vx += (Math.random() - 0.5) * bandValue * sensitivity;
        blob.vy += (Math.random() - 0.5) * bandValue * sensitivity;
        blob.vx *= 0.98;
        blob.vy *= 0.98;
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1;
        if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1;

        blob.x = Math.max(0, Math.min(canvas.width, blob.x));
        blob.y = Math.max(0, Math.min(canvas.height, blob.y));

        const dynamicRadius = blob.radius * (0.8 + bandValue * 0.5 * sensitivity);

        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, dynamicRadius
        );

        const alpha = 0.3 + bandValue * 0.4;
        gradient.addColorStop(0, `${blob.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${blob.color}${Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${blob.color}00`);

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Metaball connections
      ctx.globalCompositeOperation = 'screen';
      blobsRef.current.forEach((blob1, i) => {
        blobsRef.current.forEach((blob2, j) => {
          if (i >= j) return;

          const dx = blob2.x - blob1.x;
          const dy = blob2.y - blob1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = blob1.radius + blob2.radius;

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.3 * frequencyData.overall;
            ctx.beginPath();
            ctx.moveTo(blob1.x, blob1.y);
            ctx.lineTo(blob2.x, blob2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });
      ctx.globalCompositeOperation = 'source-over';

      // Ripple effect on high bass
      if (frequencyData.bass > 0.5) {
        const rippleRadius = (frequencyData.bass - 0.5) * 2 * 200 * sensitivity;
        const rippleGradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, rippleRadius * 0.8,
          canvas.width / 2, canvas.height / 2, rippleRadius
        );
        rippleGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        rippleGradient.addColorStop(0.5, `rgba(91, 159, 255, ${(frequencyData.bass - 0.5) * 0.3})`);
        rippleGradient.addColorStop(1, 'rgba(91, 159, 255, 0)');

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = rippleGradient;
        ctx.lineWidth = 3;
        ctx.stroke();
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
