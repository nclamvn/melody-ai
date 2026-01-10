"use client";

import { useMemo } from 'react';
import { VisualizerStyle, VisualizerProps, SynesthesiaColors } from '@/types/synesthesia';
import AuroraVisualizer from './visualizers/AuroraVisualizer';
import ParticlesVisualizer from './visualizers/ParticlesVisualizer';
import GeometryVisualizer from './visualizers/GeometryVisualizer';
import LiquidVisualizer from './visualizers/LiquidVisualizer';
import NebulaVisualizer from './visualizers/NebulaVisualizer';

interface SynesthesiaCanvasProps extends Omit<VisualizerProps, 'colors'> {
  style: VisualizerStyle;
}

const DEFAULT_COLORS: Record<VisualizerStyle, SynesthesiaColors> = {
  aurora: {
    bass: '#6B21A8',
    lowMid: '#0891B2',
    mid: '#F59E0B',
    highMid: '#10B981',
    high: '#FFFFFF',
  },
  particles: {
    bass: '#DC2626',
    lowMid: '#F97316',
    mid: '#FACC15',
    highMid: '#22D3EE',
    high: '#A78BFA',
  },
  geometry: {
    bass: '#7C3AED',
    lowMid: '#2563EB',
    mid: '#10B981',
    highMid: '#F59E0B',
    high: '#EC4899',
  },
  liquid: {
    bass: '#1E40AF',
    lowMid: '#7C3AED',
    mid: '#DB2777',
    highMid: '#F97316',
    high: '#FCD34D',
  },
  nebula: {
    bass: '#312E81',
    lowMid: '#7C3AED',
    mid: '#F59E0B',
    highMid: '#06B6D4',
    high: '#FFFFFF',
  },
};

export default function SynesthesiaCanvas({
  style,
  frequencyData,
  isPlaying,
  sensitivity
}: SynesthesiaCanvasProps) {
  const colors = useMemo(() => DEFAULT_COLORS[style], [style]);

  const visualizerProps: VisualizerProps = {
    frequencyData,
    isPlaying,
    sensitivity,
    colors,
  };

  const VisualizerComponent = useMemo(() => {
    switch (style) {
      case 'aurora':
        return AuroraVisualizer;
      case 'particles':
        return ParticlesVisualizer;
      case 'geometry':
        return GeometryVisualizer;
      case 'liquid':
        return LiquidVisualizer;
      case 'nebula':
        return NebulaVisualizer;
      default:
        return AuroraVisualizer;
    }
  }, [style]);

  return <VisualizerComponent {...visualizerProps} />;
}
