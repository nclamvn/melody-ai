// ═══════════════════════════════════════════════════════════════════════════════
//                    DJ AUDIO ENGINE
//                    Real-time audio processing with Web Audio API
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
//                    TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface AudioEffects {
  // Basic controls
  volume: number;        // 0-1
  speed: number;         // 0.5-2 (playback rate)
  pitch: number;         // -12 to +12 semitones

  // EQ
  bass: number;          // -12 to +12 dB
  mid: number;           // -12 to +12 dB
  treble: number;        // -12 to +12 dB

  // Effects
  reverb: number;        // 0-1 (wet/dry mix)
  delay: number;         // 0-1 (wet/dry mix)
  distortion: number;    // 0-1 (amount)
  flanger: number;       // 0-1 (depth)

  // Fun effects
  telephone: boolean;    // Bandpass filter (phone effect)
  vinyl: boolean;        // Vinyl crackle + lowpass
  underwater: boolean;   // Heavy lowpass + reverb
  chipmunk: boolean;     // Pitch up + speed
  slowmo: boolean;       // Pitch down + slow
  echo: boolean;         // Multi-tap delay
  robot: boolean;        // Ring modulator
  megaphone: boolean;    // Distortion + bandpass
}

export const DEFAULT_EFFECTS: AudioEffects = {
  volume: 0.8,
  speed: 1,
  pitch: 0,
  bass: 0,
  mid: 0,
  treble: 0,
  reverb: 0,
  delay: 0,
  distortion: 0,
  flanger: 0,
  telephone: false,
  vinyl: false,
  underwater: false,
  chipmunk: false,
  slowmo: false,
  echo: false,
  robot: false,
  megaphone: false,
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    DJ AUDIO ENGINE CLASS
// ═══════════════════════════════════════════════════════════════════════════════

export class DJAudioEngine {
  private audioContext: AudioContext | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private audioElement: HTMLAudioElement | null = null;

  // Effect nodes
  private gainNode: GainNode | null = null;
  private bassEQ: BiquadFilterNode | null = null;
  private midEQ: BiquadFilterNode | null = null;
  private trebleEQ: BiquadFilterNode | null = null;
  private distortionNode: WaveShaperNode | null = null;
  private convolverNode: ConvolverNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGainNode: GainNode | null = null;
  private flangerNode: DelayNode | null = null;
  private flangerLFO: OscillatorNode | null = null;
  private flangerGain: GainNode | null = null;

  // Special effect nodes
  private telephoneFilter: BiquadFilterNode | null = null;
  private underwaterFilter: BiquadFilterNode | null = null;
  private robotModulator: OscillatorNode | null = null;
  private robotGain: GainNode | null = null;

  // Dry/Wet mix nodes
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;

  // Current effects state
  private effects: AudioEffects = { ...DEFAULT_EFFECTS };

  // Analyzer for visualizations
  private analyzerNode: AnalyserNode | null = null;

  // ─────────────────────────────────────────────────────────────────────────────
  //                    INITIALIZATION
  // ─────────────────────────────────────────────────────────────────────────────

  async initialize(audioElement: HTMLAudioElement): Promise<void> {
    // Create audio context
    this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    this.audioElement = audioElement;

    // Create source from audio element
    this.sourceNode = this.audioContext.createMediaElementSource(audioElement);

    // Create all effect nodes
    this.createEffectNodes();

    // Connect the audio graph
    this.connectAudioGraph();

    // Create impulse response for reverb
    await this.createReverbImpulse();

  }

  private createEffectNodes(): void {
    if (!this.audioContext) return;

    // Gain (volume)
    this.gainNode = this.audioContext.createGain();

    // EQ filters
    this.bassEQ = this.audioContext.createBiquadFilter();
    this.bassEQ.type = 'lowshelf';
    this.bassEQ.frequency.value = 200;

    this.midEQ = this.audioContext.createBiquadFilter();
    this.midEQ.type = 'peaking';
    this.midEQ.frequency.value = 1000;
    this.midEQ.Q.value = 1;

    this.trebleEQ = this.audioContext.createBiquadFilter();
    this.trebleEQ.type = 'highshelf';
    this.trebleEQ.frequency.value = 3000;

    // Distortion
    this.distortionNode = this.audioContext.createWaveShaper();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.distortionNode.curve = this.makeDistortionCurve(0) as any;
    this.distortionNode.oversample = '4x';

    // Reverb (convolver)
    this.convolverNode = this.audioContext.createConvolver();

    // Delay
    this.delayNode = this.audioContext.createDelay(2);
    this.delayNode.delayTime.value = 0.3;
    this.delayGainNode = this.audioContext.createGain();
    this.delayGainNode.gain.value = 0;

    // Flanger
    this.flangerNode = this.audioContext.createDelay();
    this.flangerNode.delayTime.value = 0.005;
    this.flangerLFO = this.audioContext.createOscillator();
    this.flangerLFO.type = 'sine';
    this.flangerLFO.frequency.value = 0.5;
    this.flangerGain = this.audioContext.createGain();
    this.flangerGain.gain.value = 0;

    // Special filters
    this.telephoneFilter = this.audioContext.createBiquadFilter();
    this.telephoneFilter.type = 'bandpass';
    this.telephoneFilter.frequency.value = 2000;
    this.telephoneFilter.Q.value = 2;

    this.underwaterFilter = this.audioContext.createBiquadFilter();
    this.underwaterFilter.type = 'lowpass';
    this.underwaterFilter.frequency.value = 500;

    // Robot effect (ring modulator)
    this.robotModulator = this.audioContext.createOscillator();
    this.robotModulator.frequency.value = 50;
    this.robotGain = this.audioContext.createGain();
    this.robotGain.gain.value = 0;

    // Dry/Wet mix
    this.dryGain = this.audioContext.createGain();
    this.wetGain = this.audioContext.createGain();

    // Analyzer for visualizations
    this.analyzerNode = this.audioContext.createAnalyser();
    this.analyzerNode.fftSize = 256;

    // Start oscillators
    this.flangerLFO.start();
    this.robotModulator.start();
  }

  private connectAudioGraph(): void {
    if (!this.sourceNode || !this.audioContext || !this.gainNode) return;

    // Main chain: Source → EQ → Distortion → Gain → Analyzer → Destination
    this.sourceNode
      .connect(this.bassEQ!)
      .connect(this.midEQ!)
      .connect(this.trebleEQ!)
      .connect(this.distortionNode!)
      .connect(this.gainNode)
      .connect(this.analyzerNode!)
      .connect(this.audioContext.destination);

    // Parallel effects (reverb, delay) - connected as needed
    this.setupParallelEffects();
  }

  private setupParallelEffects(): void {
    if (!this.gainNode || !this.audioContext) return;

    // Delay feedback loop
    this.gainNode.connect(this.delayNode!);
    this.delayNode!.connect(this.delayGainNode!);
    this.delayGainNode!.connect(this.delayNode!); // Feedback
    this.delayGainNode!.connect(this.audioContext.destination);

    // Reverb (convolver)
    this.gainNode.connect(this.convolverNode!);
    this.convolverNode!.connect(this.wetGain!);
    this.wetGain!.connect(this.audioContext.destination);

    // Flanger LFO → delay time
    this.flangerLFO!.connect(this.flangerGain!);
    this.flangerGain!.connect(this.flangerNode!.delayTime);
  }

  private async createReverbImpulse(): Promise<void> {
    if (!this.audioContext || !this.convolverNode) return;

    // Create impulse response for reverb
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2; // 2 seconds reverb
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }

    this.convolverNode.buffer = impulse;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                    EFFECT CONTROLS
  // ─────────────────────────────────────────────────────────────────────────────

  setVolume(value: number): void {
    this.effects.volume = Math.max(0, Math.min(1, value));
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.effects.volume, this.audioContext!.currentTime);
    }
  }

  setSpeed(value: number): void {
    this.effects.speed = Math.max(0.25, Math.min(4, value));
    if (this.audioElement) {
      this.audioElement.playbackRate = this.effects.speed;
    }
  }

  setPitch(semitones: number): void {
    // Note: True pitch shifting without speed change requires advanced processing
    // For now, we use playback rate which affects both
    this.effects.pitch = Math.max(-12, Math.min(12, semitones));
    const rate = Math.pow(2, this.effects.pitch / 12);
    if (this.audioElement) {
      this.audioElement.playbackRate = rate * this.effects.speed;
    }
  }

  setBass(dB: number): void {
    this.effects.bass = Math.max(-12, Math.min(12, dB));
    if (this.bassEQ) {
      this.bassEQ.gain.setValueAtTime(this.effects.bass, this.audioContext!.currentTime);
    }
  }

  setMid(dB: number): void {
    this.effects.mid = Math.max(-12, Math.min(12, dB));
    if (this.midEQ) {
      this.midEQ.gain.setValueAtTime(this.effects.mid, this.audioContext!.currentTime);
    }
  }

  setTreble(dB: number): void {
    this.effects.treble = Math.max(-12, Math.min(12, dB));
    if (this.trebleEQ) {
      this.trebleEQ.gain.setValueAtTime(this.effects.treble, this.audioContext!.currentTime);
    }
  }

  setReverb(amount: number): void {
    this.effects.reverb = Math.max(0, Math.min(1, amount));
    if (this.wetGain) {
      this.wetGain.gain.setValueAtTime(this.effects.reverb * 0.5, this.audioContext!.currentTime);
    }
  }

  setDelay(amount: number): void {
    this.effects.delay = Math.max(0, Math.min(1, amount));
    if (this.delayGainNode) {
      this.delayGainNode.gain.setValueAtTime(this.effects.delay * 0.5, this.audioContext!.currentTime);
    }
  }

  setDistortion(amount: number): void {
    this.effects.distortion = Math.max(0, Math.min(1, amount));
    if (this.distortionNode) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.distortionNode.curve = this.makeDistortionCurve(amount * 100) as any;
    }
  }

  setFlanger(depth: number): void {
    this.effects.flanger = Math.max(0, Math.min(1, depth));
    if (this.flangerGain) {
      this.flangerGain.gain.setValueAtTime(depth * 0.002, this.audioContext!.currentTime);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                    PRESET EFFECTS
  // ─────────────────────────────────────────────────────────────────────────────

  setPreset(preset: keyof Pick<AudioEffects, 'telephone' | 'vinyl' | 'underwater' | 'chipmunk' | 'slowmo' | 'echo' | 'robot' | 'megaphone'>, enabled: boolean): void {
    this.effects[preset] = enabled;

    switch (preset) {
      case 'telephone':
        this.applyTelephoneEffect(enabled);
        break;
      case 'vinyl':
        this.applyVinylEffect(enabled);
        break;
      case 'underwater':
        this.applyUnderwaterEffect(enabled);
        break;
      case 'chipmunk':
        this.applyChipmunkEffect(enabled);
        break;
      case 'slowmo':
        this.applySlowmoEffect(enabled);
        break;
      case 'echo':
        this.applyEchoEffect(enabled);
        break;
      case 'robot':
        this.applyRobotEffect(enabled);
        break;
      case 'megaphone':
        this.applyMegaphoneEffect(enabled);
        break;
    }
  }

  private applyTelephoneEffect(enabled: boolean): void {
    if (this.bassEQ && this.trebleEQ) {
      if (enabled) {
        this.bassEQ.gain.value = -12;
        this.trebleEQ.gain.value = -6;
        this.bassEQ.frequency.value = 400;
        this.trebleEQ.frequency.value = 2000;
      } else {
        this.bassEQ.gain.value = this.effects.bass;
        this.trebleEQ.gain.value = this.effects.treble;
        this.bassEQ.frequency.value = 200;
        this.trebleEQ.frequency.value = 3000;
      }
    }
  }

  private applyVinylEffect(enabled: boolean): void {
    if (enabled) {
      this.setDistortion(0.1);
      this.setBass(3);
      this.setTreble(-3);
    } else {
      this.setDistortion(0);
      this.setBass(0);
      this.setTreble(0);
    }
  }

  private applyUnderwaterEffect(enabled: boolean): void {
    if (this.trebleEQ) {
      if (enabled) {
        this.trebleEQ.gain.value = -12;
        this.setReverb(0.7);
      } else {
        this.trebleEQ.gain.value = this.effects.treble;
        this.setReverb(0);
      }
    }
  }

  private applyChipmunkEffect(enabled: boolean): void {
    if (enabled) {
      this.setSpeed(1.5);
      this.setPitch(5);
    } else {
      this.setSpeed(1);
      this.setPitch(0);
    }
  }

  private applySlowmoEffect(enabled: boolean): void {
    if (enabled) {
      this.setSpeed(0.7);
      this.setPitch(-3);
      this.setReverb(0.3);
    } else {
      this.setSpeed(1);
      this.setPitch(0);
      this.setReverb(0);
    }
  }

  private applyEchoEffect(enabled: boolean): void {
    if (enabled) {
      this.setDelay(0.6);
    } else {
      this.setDelay(0);
    }
  }

  private applyRobotEffect(enabled: boolean): void {
    // Robot voice effect using ring modulation concept
    if (enabled) {
      this.setDistortion(0.3);
      if (this.midEQ) {
        this.midEQ.frequency.value = 800;
        this.midEQ.Q.value = 5;
        this.midEQ.gain.value = 6;
      }
    } else {
      this.setDistortion(0);
      if (this.midEQ) {
        this.midEQ.frequency.value = 1000;
        this.midEQ.Q.value = 1;
        this.midEQ.gain.value = this.effects.mid;
      }
    }
  }

  private applyMegaphoneEffect(enabled: boolean): void {
    if (enabled) {
      this.setDistortion(0.2);
      if (this.bassEQ && this.trebleEQ) {
        this.bassEQ.gain.value = -8;
        this.trebleEQ.gain.value = -4;
      }
    } else {
      this.setDistortion(0);
      if (this.bassEQ && this.trebleEQ) {
        this.bassEQ.gain.value = this.effects.bass;
        this.trebleEQ.gain.value = this.effects.treble;
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                    HELPER FUNCTIONS
  // ─────────────────────────────────────────────────────────────────────────────

  private makeDistortionCurve(amount: number): Float32Array {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }

    return curve;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                    VISUALIZATION DATA
  // ─────────────────────────────────────────────────────────────────────────────

  getFrequencyData(): Uint8Array {
    if (!this.analyzerNode) return new Uint8Array(0);

    const dataArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
    this.analyzerNode.getByteFrequencyData(dataArray);
    return dataArray;
  }

  getWaveformData(): Uint8Array {
    if (!this.analyzerNode) return new Uint8Array(0);

    const dataArray = new Uint8Array(this.analyzerNode.frequencyBinCount);
    this.analyzerNode.getByteTimeDomainData(dataArray);
    return dataArray;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  //                    GETTERS & CLEANUP
  // ─────────────────────────────────────────────────────────────────────────────

  getEffects(): AudioEffects {
    return { ...this.effects };
  }

  resetEffects(): void {
    this.effects = { ...DEFAULT_EFFECTS };
    this.setVolume(DEFAULT_EFFECTS.volume);
    this.setSpeed(DEFAULT_EFFECTS.speed);
    this.setPitch(DEFAULT_EFFECTS.pitch);
    this.setBass(DEFAULT_EFFECTS.bass);
    this.setMid(DEFAULT_EFFECTS.mid);
    this.setTreble(DEFAULT_EFFECTS.treble);
    this.setReverb(DEFAULT_EFFECTS.reverb);
    this.setDelay(DEFAULT_EFFECTS.delay);
    this.setDistortion(DEFAULT_EFFECTS.distortion);
    this.setFlanger(DEFAULT_EFFECTS.flanger);
  }

  destroy(): void {
    if (this.flangerLFO) this.flangerLFO.stop();
    if (this.robotModulator) this.robotModulator.stop();
    if (this.audioContext) this.audioContext.close();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    SINGLETON INSTANCE
// ═══════════════════════════════════════════════════════════════════════════════

let djEngineInstance: DJAudioEngine | null = null;

export function getDJEngine(): DJAudioEngine {
  if (!djEngineInstance) {
    djEngineInstance = new DJAudioEngine();
  }
  return djEngineInstance;
}

export default DJAudioEngine;
