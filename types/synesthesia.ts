// Frequency band data
export interface FrequencyBands {
  bass: number;      // 20-250Hz (0-1)
  lowMid: number;    // 250-500Hz (0-1)
  mid: number;       // 500-2000Hz (0-1)
  highMid: number;   // 2000-4000Hz (0-1)
  high: number;      // 4000-20000Hz (0-1)
  overall: number;   // Average (0-1)
}

// Color mapping for each frequency band
export interface SynesthesiaColors {
  bass: string;
  lowMid: string;
  mid: string;
  highMid: string;
  high: string;
}

// Visualization style
export type VisualizerStyle =
  | 'aurora'
  | 'particles'
  | 'geometry'
  | 'liquid'
  | 'nebula';

// Style configuration
export interface StyleConfig {
  id: VisualizerStyle;
  name: string;
  nameVi: string;
  description: string;
  icon: string;
  colors: SynesthesiaColors;
}

// Visualizer props
export interface VisualizerProps {
  frequencyData: FrequencyBands;
  isPlaying: boolean;
  sensitivity: number; // 0.5 - 2.0
  colors: SynesthesiaColors;
}

// Canvas size
export interface CanvasSize {
  width: number;
  height: number;
}

// Capture options
export interface CaptureOptions {
  format: 'png' | 'jpg' | 'webp';
  quality: number;
  includeOverlay: boolean;
}

// Recording state
export interface RecordingState {
  isRecording: boolean;
  duration: number;
  maxDuration: number;
  blob: Blob | null;
}
