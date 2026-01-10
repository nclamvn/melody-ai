"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { FrequencyBands } from '@/types/synesthesia';
import { audioAnalyzer } from '@/lib/audioAnalyzer';

interface UseAudioAnalyzerOptions {
  demoMode?: boolean;
  sensitivity?: number;
}

export function useAudioAnalyzer(options: UseAudioAnalyzerOptions = {}) {
  const { demoMode = true, sensitivity = 1 } = options;

  const [frequencyData, setFrequencyData] = useState<FrequencyBands>({
    bass: 0,
    lowMid: 0,
    mid: 0,
    highMid: 0,
    high: 0,
    overall: 0,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  const applySmoothing = useCallback((data: FrequencyBands): FrequencyBands => {
    const smoothed = { ...data };

    // Apply sensitivity
    Object.keys(smoothed).forEach((key) => {
      const k = key as keyof FrequencyBands;
      smoothed[k] = Math.min(1, smoothed[k] * sensitivity);
    });

    return smoothed;
  }, [sensitivity]);

  const startAnalyzing = useCallback(async (audioElement?: HTMLAudioElement) => {
    if (!demoMode && audioElement) {
      await audioAnalyzer.initialize(audioElement);
      audioAnalyzer.resume();
    }

    setIsAnalyzing(true);
    startTimeRef.current = performance.now();

    const analyze = () => {
      let data: FrequencyBands;

      if (demoMode) {
        const elapsed = performance.now() - startTimeRef.current;
        data = audioAnalyzer.generateDemoData(elapsed);
      } else {
        data = audioAnalyzer.getFrequencyBands();
      }

      setFrequencyData(applySmoothing(data));
      animationFrameRef.current = requestAnimationFrame(analyze);
    };

    analyze();
  }, [demoMode, applySmoothing]);

  const stopAnalyzing = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsAnalyzing(false);
  }, []);

  useEffect(() => {
    return () => {
      stopAnalyzing();
    };
  }, [stopAnalyzing]);

  return {
    frequencyData,
    isAnalyzing,
    startAnalyzing,
    stopAnalyzing,
  };
}
