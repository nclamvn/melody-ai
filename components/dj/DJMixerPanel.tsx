// ═══════════════════════════════════════════════════════════════════════════════
//                    DJ MIXER PANEL
//                    Apple Vision Liquid Glass Design
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DJAudioEngine, getDJEngine, DEFAULT_EFFECTS, AudioEffects } from '@/lib/audio/DJAudioEngine';

// ═══════════════════════════════════════════════════════════════════════════════
//                    GLASS VERTICAL SLIDER
// ═══════════════════════════════════════════════════════════════════════════════

interface GlassSliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  label: string;
  onChange: (value: number) => void;
  unit?: string;
  centerZero?: boolean;
}

function GlassSlider({
  value,
  min,
  max,
  step = 0.01,
  label,
  onChange,
  unit = '',
  centerZero = false,
}: GlassSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleDrag = useCallback((clientY: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = rect.bottom - clientY;
    const height = rect.height;
    const newPercentage = Math.max(0, Math.min(100, (y / height) * 100));
    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    onChange(steppedValue);
  }, [min, max, step, onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleDrag(e.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => handleDrag(e.clientY);
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDrag]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Value display */}
      <div className="text-[11px] font-medium text-white/60 tabular-nums">
        {value > 0 && centerZero ? '+' : ''}{value.toFixed(1)}{unit}
      </div>

      {/* Slider track */}
      <div
        ref={sliderRef}
        className="relative w-10 h-28 rounded-2xl cursor-pointer overflow-hidden"
        onMouseDown={handleMouseDown}
        style={{
          background: 'rgba(255,255,255,0.06)',
          boxShadow: isDragging
            ? '0 0 20px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)'
            : 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Center line for bipolar */}
        {centerZero && (
          <div
            className="absolute w-full h-px bg-white/20"
            style={{ bottom: '50%' }}
          />
        )}

        {/* Fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-b-xl"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.25), rgba(255,255,255,0.1))',
            height: `${percentage}%`,
          }}
          animate={{ height: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />

        {/* Knob */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-8 h-2 rounded-full"
          style={{
            bottom: `calc(${percentage}% - 4px)`,
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
          animate={{ scale: isDragging ? 1.1 : 1 }}
        />
      </div>

      {/* Label */}
      <div className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    GLASS HORIZONTAL SLIDER
// ═══════════════════════════════════════════════════════════════════════════════

interface GlassHSliderProps {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
}

function GlassHSlider({ value, min, max, label, onChange }: GlassHSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-medium text-white/50 uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-medium text-white/40 tabular-nums">{(value * 100).toFixed(0)}%</span>
      </div>

      <div className="relative h-1.5 rounded-full overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.08)',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
        }}
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.4)',
            width: `${percentage}%`,
          }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={0.01}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    PRESET CHIP (Minimalist)
// ═══════════════════════════════════════════════════════════════════════════════

interface PresetChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function PresetChip({ label, active, onClick }: PresetChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-2 rounded-full text-[12px] font-medium transition-all"
      style={{
        background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
        border: active ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
        color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
        boxShadow: active ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.1)',
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    AUDIO VISUALIZER (Minimal)
// ═══════════════════════════════════════════════════════════════════════════════

interface AudioVisualizerProps {
  engine: DJAudioEngine;
  isPlaying: boolean;
}

function AudioVisualizer({ engine, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const data = engine.getFrequencyData();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barCount = 32;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor(i * data.length / barCount);
        const barHeight = (data[dataIndex] / 255) * height * 0.8;

        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + (data[dataIndex] / 255) * 0.25})`;
        ctx.fillRect(
          i * (barWidth + 2) + 1,
          height - barHeight,
          barWidth,
          barHeight
        );
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [engine, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={40}
      className="w-full h-10 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MAIN DJ MIXER PANEL - LIQUID GLASS
// ═══════════════════════════════════════════════════════════════════════════════

interface DJMixerPanelProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onClose?: () => void;
}

export function DJMixerPanel({ audioRef, isPlaying, onClose }: DJMixerPanelProps) {
  const [engine, setEngine] = useState<DJAudioEngine | null>(null);
  const [effects, setEffects] = useState<AudioEffects>(DEFAULT_EFFECTS);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    if (!audioRef.current) {
      // Demo mode - no audio element available (YouTube uses iframe)
      setIsDemoMode(true);
      setIsInitialized(true);
      return;
    }

    const djEngine = getDJEngine();
    djEngine.initialize(audioRef.current).then(() => {
      setEngine(djEngine);
      setIsInitialized(true);
    }).catch(() => {
      setIsDemoMode(true);
      setIsInitialized(true);
    });
  }, [audioRef, isInitialized]);

  const updateEffect = <K extends keyof AudioEffects>(key: K, value: AudioEffects[K]) => {
    setEffects(prev => ({ ...prev, [key]: value }));

    if (engine) {
      switch (key) {
        case 'volume': engine.setVolume(value as number); break;
        case 'speed': engine.setSpeed(value as number); break;
        case 'bass': engine.setBass(value as number); break;
        case 'mid': engine.setMid(value as number); break;
        case 'treble': engine.setTreble(value as number); break;
        case 'reverb': engine.setReverb(value as number); break;
        case 'delay': engine.setDelay(value as number); break;
        case 'distortion': engine.setDistortion(value as number); break;
        case 'flanger': engine.setFlanger(value as number); break;
      }
    }
  };

  const togglePreset = (preset: 'telephone' | 'vinyl' | 'underwater' | 'chipmunk' | 'slowmo' | 'echo' | 'robot' | 'megaphone') => {
    const newValue = !effects[preset];
    setEffects(prev => ({ ...prev, [preset]: newValue }));

    if (engine) {
      engine.setPreset(preset, newValue);
    }
  };

  const resetAll = () => {
    if (engine) {
      engine.resetEffects();
    }
    setEffects(DEFAULT_EFFECTS);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Glass Panel */}
      <motion.div
        className="relative w-full max-w-[880px] max-h-[85vh] overflow-y-auto rounded-[28px]"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(40px) saturate(150%)',
          WebkitBackdropFilter: 'blur(40px) saturate(150%)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div>
            <h3 className="text-[17px] font-semibold text-white/90 tracking-tight">DJ Mixer</h3>
            <p className="text-[12px] text-white/40 mt-0.5">
              {isDemoMode ? 'Preview Mode • YouTube không hỗ trợ audio processing' : 'Real-time Audio Effects'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="px-4 py-2 rounded-full text-[12px] font-medium text-white/60 hover:text-white/90 hover:bg-white/10 transition-all"
            >
              Reset
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/90 hover:bg-white/10 transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Visualizer */}
        {engine && (
          <div className="px-6 py-4 border-b border-white/[0.04]">
            <AudioVisualizer engine={engine} isPlaying={isPlaying} />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* EQ Section */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-5">Equalizer</h4>
            <div className="flex justify-center items-end gap-6">
              <GlassSlider
                value={effects.bass}
                min={-12}
                max={12}
                step={0.5}
                label="Bass"
                unit="dB"
                centerZero
                onChange={(v) => updateEffect('bass', v)}
              />
              <GlassSlider
                value={effects.mid}
                min={-12}
                max={12}
                step={0.5}
                label="Mid"
                unit="dB"
                centerZero
                onChange={(v) => updateEffect('mid', v)}
              />
              <GlassSlider
                value={effects.treble}
                min={-12}
                max={12}
                step={0.5}
                label="Treble"
                unit="dB"
                centerZero
                onChange={(v) => updateEffect('treble', v)}
              />

              <div className="w-px h-20 bg-white/[0.06] mx-4" />

              <GlassSlider
                value={effects.volume}
                min={0}
                max={1}
                step={0.01}
                label="Volume"
                onChange={(v) => updateEffect('volume', v)}
              />
              <GlassSlider
                value={effects.speed}
                min={0.5}
                max={2}
                step={0.05}
                label="Speed"
                unit="x"
                onChange={(v) => updateEffect('speed', v)}
              />
            </div>
          </div>

          {/* Effects Section */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4">Effects</h4>
            <div className="grid grid-cols-2 gap-4">
              <GlassHSlider
                value={effects.reverb}
                min={0}
                max={1}
                label="Reverb"
                onChange={(v) => updateEffect('reverb', v)}
              />
              <GlassHSlider
                value={effects.delay}
                min={0}
                max={1}
                label="Delay"
                onChange={(v) => updateEffect('delay', v)}
              />
              <GlassHSlider
                value={effects.distortion}
                min={0}
                max={1}
                label="Distortion"
                onChange={(v) => updateEffect('distortion', v)}
              />
              <GlassHSlider
                value={effects.flanger}
                min={0}
                max={1}
                label="Flanger"
                onChange={(v) => updateEffect('flanger', v)}
              />
            </div>
          </div>

          {/* Presets Section */}
          <div>
            <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4">Presets</h4>
            <div className="flex flex-wrap gap-2">
              <PresetChip label="Telephone" active={effects.telephone} onClick={() => togglePreset('telephone')} />
              <PresetChip label="Vinyl" active={effects.vinyl} onClick={() => togglePreset('vinyl')} />
              <PresetChip label="Underwater" active={effects.underwater} onClick={() => togglePreset('underwater')} />
              <PresetChip label="Chipmunk" active={effects.chipmunk} onClick={() => togglePreset('chipmunk')} />
              <PresetChip label="Slow Motion" active={effects.slowmo} onClick={() => togglePreset('slowmo')} />
              <PresetChip label="Echo" active={effects.echo} onClick={() => togglePreset('echo')} />
              <PresetChip label="Robot" active={effects.robot} onClick={() => togglePreset('robot')} />
              <PresetChip label="Megaphone" active={effects.megaphone} onClick={() => togglePreset('megaphone')} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DJMixerPanel;
