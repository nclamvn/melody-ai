"use client";

import { useRef, useEffect } from 'react';
import { VisualizerProps } from '@/types/synesthesia';

export default function AuroraVisualizer({
  frequencyData,
  isPlaying,
  sensitivity,
  colors
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

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

    const waves = [
      { color: colors.bass, speed: 0.5, amplitude: 0.3, frequency: 0.5, yOffset: 0.7 },
      { color: colors.lowMid, speed: 0.7, amplitude: 0.25, frequency: 0.7, yOffset: 0.6 },
      { color: colors.mid, speed: 0.9, amplitude: 0.2, frequency: 0.9, yOffset: 0.5 },
      { color: colors.highMid, speed: 1.1, amplitude: 0.15, frequency: 1.1, yOffset: 0.4 },
      { color: colors.high, speed: 1.3, amplitude: 0.1, frequency: 1.3, yOffset: 0.3 },
    ];

    const render = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;

      ctx.fillStyle = 'rgba(5, 5, 7, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave, index) => {
        const bandValues = [
          frequencyData.bass,
          frequencyData.lowMid,
          frequencyData.mid,
          frequencyData.highMid,
          frequencyData.high,
        ];
        const intensity = bandValues[index] * sensitivity;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 5) {
          const normalizedX = x / canvas.width;
          const y1 = Math.sin(normalizedX * Math.PI * 2 * wave.frequency + t * wave.speed) * wave.amplitude;
          const y2 = Math.sin(normalizedX * Math.PI * 3 * wave.frequency + t * wave.speed * 0.7) * wave.amplitude * 0.5;
          const y3 = Math.sin(normalizedX * Math.PI * 5 * wave.frequency + t * wave.speed * 1.3) * wave.amplitude * 0.3;
          const combinedY = (y1 + y2 + y3) * (0.5 + intensity * 0.5);
          const yPos = canvas.height * wave.yOffset + combinedY * canvas.height * 0.3;
          ctx.lineTo(x, yPos);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const alpha = 0.1 + intensity * 0.4;
        gradient.addColorStop(0, `${wave.color}00`);
        gradient.addColorStop(wave.yOffset - 0.2, `${wave.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(wave.yOffset, `${wave.color}${Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${wave.color}00`);

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'screen';
      const glowGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height * 0.6,
        0,
        canvas.width / 2,
        canvas.height * 0.6,
        canvas.width * 0.5
      );
      glowGradient.addColorStop(0, `rgba(91, 159, 255, ${frequencyData.overall * 0.1})`);
      glowGradient.addColorStop(1, 'rgba(91, 159, 255, 0)');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      if (frequencyData.high > 0.3) {
        const sparkleCount = Math.floor(frequencyData.high * 20);
        for (let i = 0; i < sparkleCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height * 0.5;
          const size = Math.random() * 2 + 1;
          const alpha = Math.random() * frequencyData.high;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
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
      style={{ background: 'linear-gradient(180deg, #050507 0%, #0a0a0f 100%)' }}
    />
  );
}
