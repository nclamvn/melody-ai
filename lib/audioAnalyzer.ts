import { FrequencyBands } from '@/types/synesthesia';

export class AudioAnalyzer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private isInitialized = false;

  // Frequency ranges (in Hz)
  private readonly BASS_RANGE: [number, number] = [20, 250];
  private readonly LOW_MID_RANGE: [number, number] = [250, 500];
  private readonly MID_RANGE: [number, number] = [500, 2000];
  private readonly HIGH_MID_RANGE: [number, number] = [2000, 4000];
  private readonly HIGH_RANGE: [number, number] = [4000, 20000];

  async initialize(audioElement?: HTMLAudioElement | HTMLVideoElement) {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();

      // Configure analyser
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);

      if (audioElement) {
        this.connectAudioElement(audioElement);
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize audio analyzer:', error);
    }
  }

  connectAudioElement(audioElement: HTMLAudioElement | HTMLVideoElement) {
    if (!this.audioContext || !this.analyser) return;

    // Disconnect existing source
    if (this.source) {
      this.source.disconnect();
    }

    this.source = this.audioContext.createMediaElementSource(audioElement);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }

  // For demo mode - generate fake frequency data
  generateDemoData(time: number): FrequencyBands {
    const t = time * 0.001;

    return {
      bass: 0.5 + 0.4 * Math.sin(t * 2) * Math.random(),
      lowMid: 0.4 + 0.3 * Math.sin(t * 3 + 1) * Math.random(),
      mid: 0.5 + 0.4 * Math.sin(t * 4 + 2) * Math.random(),
      highMid: 0.3 + 0.3 * Math.sin(t * 5 + 3) * Math.random(),
      high: 0.2 + 0.2 * Math.sin(t * 6 + 4) * Math.random(),
      overall: 0.4 + 0.3 * Math.sin(t * 2.5) * Math.random(),
    };
  }

  getFrequencyBands(): FrequencyBands {
    if (!this.analyser || !this.dataArray || !this.audioContext) {
      return {
        bass: 0,
        lowMid: 0,
        mid: 0,
        highMid: 0,
        high: 0,
        overall: 0,
      };
    }

    this.analyser.getByteFrequencyData(this.dataArray);

    const sampleRate = this.audioContext.sampleRate;
    const binCount = this.analyser.frequencyBinCount;
    const binSize = sampleRate / (binCount * 2);

    const getAverageForRange = (lowFreq: number, highFreq: number): number => {
      const lowBin = Math.floor(lowFreq / binSize);
      const highBin = Math.min(Math.floor(highFreq / binSize), binCount - 1);

      let sum = 0;
      let count = 0;

      for (let i = lowBin; i <= highBin; i++) {
        sum += this.dataArray![i];
        count++;
      }

      return count > 0 ? (sum / count) / 255 : 0;
    };

    const bass = getAverageForRange(...this.BASS_RANGE);
    const lowMid = getAverageForRange(...this.LOW_MID_RANGE);
    const mid = getAverageForRange(...this.MID_RANGE);
    const highMid = getAverageForRange(...this.HIGH_MID_RANGE);
    const high = getAverageForRange(...this.HIGH_RANGE);
    const overall = (bass + lowMid + mid + highMid + high) / 5;

    return { bass, lowMid, mid, highMid, high, overall };
  }

  resume() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  destroy() {
    if (this.source) {
      this.source.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.isInitialized = false;
  }
}

// Singleton instance
export const audioAnalyzer = new AudioAnalyzer();
