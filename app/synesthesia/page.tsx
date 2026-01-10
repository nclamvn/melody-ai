"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { VisualizerStyle, FrequencyBands } from '@/types/synesthesia';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import SynesthesiaCanvas from '@/components/synesthesia/SynesthesiaCanvas';
import SynesthesiaControls from '@/components/synesthesia/SynesthesiaControls';
import StyleSelector from '@/components/synesthesia/StyleSelector';

// Demo song data
const DEMO_SONG = {
  title: 'Midnight Dreams',
  artist: 'Aurora Beats',
  albumArt: '/images/album-art.jpg',
};

export default function SynesthesiaPage() {
  const router = useRouter();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [currentStyle, setCurrentStyle] = useState<VisualizerStyle>('aurora');
  const [sensitivity, setSensitivity] = useState(1);
  const [isStyleSelectorOpen, setIsStyleSelectorOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  const { frequencyData, isAnalyzing, startAnalyzing, stopAnalyzing } = useAudioAnalyzer();

  // Start analyzing on mount
  useEffect(() => {
    startAnalyzing();
    return () => stopAnalyzing();
  }, [startAnalyzing, stopAnalyzing]);

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleCapture = useCallback(() => {
    const canvas = canvasContainerRef.current?.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `synesthesia-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  const handleRecordToggle = useCallback(() => {
    setIsRecording((prev) => !prev);
    // TODO: Implement actual video recording with MediaRecorder API
  }, []);

  const handleClose = useCallback(() => {
    stopAnalyzing();
    router.back();
  }, [router, stopAnalyzing]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Canvas Container */}
      <div ref={canvasContainerRef} className="absolute inset-0">
        <SynesthesiaCanvas
          style={currentStyle}
          frequencyData={frequencyData}
          isPlaying={isAnalyzing}
          sensitivity={sensitivity}
        />
      </div>

      {/* Song Info Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <div className="flex items-center gap-4 bg-white/[0.05] backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium">{DEMO_SONG.title}</h3>
            <p className="text-white/60 text-sm">{DEMO_SONG.artist}</p>
          </div>
        </div>
      </motion.div>

      {/* Debug Frequency Bars */}
      {showDebug && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-6 right-6 z-20 flex items-end gap-2 h-24 bg-black/30 backdrop-blur-sm px-4 py-3 rounded-xl"
        >
          {Object.entries(frequencyData).map(([key, value]) => (
            key !== 'overall' && (
              <div key={key} className="flex flex-col items-center gap-1">
                <div
                  className="w-6 rounded-full transition-all duration-75"
                  style={{
                    height: `${(value as number) * 60}px`,
                    backgroundColor: getFrequencyColor(key),
                  }}
                />
                <span className="text-[10px] text-white/60">{key.slice(0, 3)}</span>
              </div>
            )
          ))}
        </motion.div>
      )}

      {/* Recording Indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-6 right-6 z-20 flex items-center gap-3 bg-red-500/20 backdrop-blur-xl border border-red-500/30 px-4 py-2 rounded-full"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <span className="text-white font-medium">{formatTime(recordingTime)}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug Toggle */}
      <button
        onClick={() => setShowDebug(!showDebug)}
        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        style={{ opacity: showDebug ? 0 : 1 }}
      >
        <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </button>

      {/* Controls */}
      <SynesthesiaControls
        style={currentStyle}
        sensitivity={sensitivity}
        isRecording={isRecording}
        onStyleOpen={() => setIsStyleSelectorOpen(true)}
        onSensitivityChange={setSensitivity}
        onCapture={handleCapture}
        onRecordToggle={handleRecordToggle}
        onClose={handleClose}
      />

      {/* Style Selector */}
      <StyleSelector
        currentStyle={currentStyle}
        onStyleChange={setCurrentStyle}
        isOpen={isStyleSelectorOpen}
        onClose={() => setIsStyleSelectorOpen(false)}
      />
    </div>
  );
}

function getFrequencyColor(band: string): string {
  const colors: Record<string, string> = {
    bass: '#DC2626',
    lowMid: '#F97316',
    mid: '#FACC15',
    highMid: '#22D3EE',
    high: '#A78BFA',
  };
  return colors[band] || '#FFFFFF';
}
