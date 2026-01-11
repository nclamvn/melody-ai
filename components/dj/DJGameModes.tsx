// ═══════════════════════════════════════════════════════════════════════════════
//                    DJ GAME MODES
//                    Interactive games using audio effects
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DJAudioEngine, getDJEngine, AudioEffects, DEFAULT_EFFECTS } from '@/lib/audio/DJAudioEngine';

// ═══════════════════════════════════════════════════════════════════════════════
//                    GAME TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type GameMode = 'guess-song' | 'remix-challenge' | 'beat-match' | 'genre-transform';

interface Song {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  genre: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    GAME 1: GUESS THE SONG
//                    Bài hát bị méo tiếng, đoán tên bài
// ═══════════════════════════════════════════════════════════════════════════════

interface GuessSongGameProps {
  songs: Song[];
  engine: DJAudioEngine;
  onComplete: (score: number) => void;
}

export function GuessSongGame({ songs, engine, onComplete }: GuessSongGameProps) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [options, setOptions] = useState<Song[]>([]);
  const [distortionLevel, setDistortionLevel] = useState(1); // 1 = max distortion
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);

  const maxRounds = 5;

  // Start new round
  const startRound = useCallback(() => {
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    const correct = shuffled[0];
    const wrongOptions = shuffled.slice(1, 4);

    setCurrentSong(correct);
    setOptions([correct, ...wrongOptions].sort(() => Math.random() - 0.5));
    setDistortionLevel(1);
    setShowResult(null);

    // Apply maximum distortion
    engine.setPreset('underwater', true);
    engine.setSpeed(0.8);
    engine.setDistortion(0.5);
    engine.setBass(-6);
    engine.setTreble(-8);
  }, [songs, engine]);

  useEffect(() => {
    if (songs.length >= 4) {
      startRound();
    }
  }, [songs, startRound]);

  // Reveal more (reduce distortion) - costs points
  const revealMore = () => {
    if (distortionLevel <= 0) return;

    const newLevel = distortionLevel - 0.25;
    setDistortionLevel(newLevel);
    setHintsUsed(prev => prev + 1);

    // Gradually remove effects
    engine.setDistortion(newLevel * 0.5);
    engine.setSpeed(0.8 + (1 - newLevel) * 0.2);
    if (newLevel < 0.5) {
      engine.setPreset('underwater', false);
      engine.setBass(0);
      engine.setTreble(-4 * newLevel);
    }
  };

  // Check answer
  const checkAnswer = (selected: Song) => {
    const isCorrect = selected.id === currentSong?.id;
    setShowResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      // Score based on distortion level (more distortion = more points)
      const roundScore = Math.round(100 * distortionLevel) - (hintsUsed * 10);
      setScore(prev => prev + Math.max(10, roundScore));
    }

    // Next round after delay
    setTimeout(() => {
      if (round < maxRounds) {
        setRound(prev => prev + 1);
        setHintsUsed(0);
        startRound();
      } else {
        onComplete(score);
      }
    }, 2000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">🎵 Đoán Bài Hát</h2>
          <p className="text-white/60">Nghe bài hát bị méo và đoán tên</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-yellow-400">{score}</div>
          <div className="text-white/60 text-sm">Round {round}/{maxRounds}</div>
        </div>
      </div>

      {/* Distortion Meter */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-white/60 mb-2">
          <span>Độ méo tiếng</span>
          <span>{Math.round(distortionLevel * 100)}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
            animate={{ width: `${distortionLevel * 100}%` }}
          />
        </div>
      </div>

      {/* Reveal Button */}
      <button
        onClick={revealMore}
        disabled={distortionLevel <= 0}
        className={`w-full py-3 rounded-xl mb-6 font-medium transition-all
          ${distortionLevel > 0
            ? 'bg-purple-600 hover:bg-purple-500 text-white'
            : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
      >
        👂 Nghe rõ hơn (-10 điểm)
      </button>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence>
          {options.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => checkAnswer(song)}
              disabled={showResult !== null}
              className={`
                p-4 rounded-xl text-left transition-all
                ${showResult === null
                  ? 'bg-white/10 hover:bg-white/20'
                  : song.id === currentSong?.id
                    ? 'bg-green-500/30 border-2 border-green-500'
                    : 'bg-white/5'
                }
              `}
            >
              <div className="font-medium text-white truncate">{song.title}</div>
              <div className="text-sm text-white/60 truncate">{song.artist}</div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Result Overlay */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`
              fixed inset-0 flex items-center justify-center z-50
              ${showResult === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'}
            `}
          >
            <div className="text-center">
              <div className="text-8xl mb-4">
                {showResult === 'correct' ? '🎉' : '😅'}
              </div>
              <div className={`text-3xl font-bold ${showResult === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {showResult === 'correct' ? 'Chính xác!' : 'Sai rồi!'}
              </div>
              {showResult === 'wrong' && currentSong && (
                <div className="text-white/80 mt-2">
                  Đáp án: {currentSong.title} - {currentSong.artist}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    GAME 2: REMIX CHALLENGE
//                    Tạo remix hay nhất, vote bởi users khác
// ═══════════════════════════════════════════════════════════════════════════════

interface RemixChallengeProps {
  song: Song;
  engine: DJAudioEngine;
  onSave: (remix: SavedRemix) => void;
}

export interface SavedRemix {
  songId: string;
  effects: AudioEffects;
  name: string;
  createdAt: Date;
  votes: number;
}

export function RemixChallenge({ song, engine, onSave }: RemixChallengeProps) {
  const [remixName, setRemixName] = useState('');
  const [effects, setEffects] = useState<AudioEffects>(DEFAULT_EFFECTS);
  const [isSaving, setIsSaving] = useState(false);

  const presetStyles = [
    { name: 'Lo-Fi Chill', icon: '🌙', effects: { bass: 3, treble: -4, reverb: 0.4, speed: 0.9 } },
    { name: 'Club Remix', icon: '🎪', effects: { bass: 6, treble: 4, distortion: 0.2, speed: 1.2 } },
    { name: 'Vintage Radio', icon: '📻', effects: { bass: -3, treble: -6, distortion: 0.1 } },
    { name: 'Underwater Dream', icon: '🌊', effects: { bass: 4, treble: -8, reverb: 0.7, speed: 0.8 } },
    { name: 'Chipmunk Party', icon: '🐿️', effects: { speed: 1.5, treble: 4 } },
    { name: 'Slow Jam', icon: '💜', effects: { speed: 0.7, bass: 4, reverb: 0.5 } },
  ];

  const applyPreset = (preset: typeof presetStyles[0]) => {
    const newEffects = { ...DEFAULT_EFFECTS, ...preset.effects };
    setEffects(newEffects);

    Object.entries(preset.effects).forEach(([key, value]) => {
      switch (key) {
        case 'bass': engine.setBass(value as number); break;
        case 'mid': engine.setMid(value as number); break;
        case 'treble': engine.setTreble(value as number); break;
        case 'reverb': engine.setReverb(value as number); break;
        case 'delay': engine.setDelay(value as number); break;
        case 'distortion': engine.setDistortion(value as number); break;
        case 'speed': engine.setSpeed(value as number); break;
      }
    });
  };

  const handleSave = () => {
    if (!remixName.trim()) return;

    setIsSaving(true);

    const remix: SavedRemix = {
      songId: song.id,
      effects: engine.getEffects(),
      name: remixName,
      createdAt: new Date(),
      votes: 0,
    };

    onSave(remix);
    setIsSaving(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">🎧 Remix Challenge</h2>
        <p className="text-white/60">Tạo remix độc đáo của bạn</p>
        <div className="mt-2 px-4 py-2 bg-white/10 rounded-lg inline-block">
          <span className="text-white/80">{song.title}</span>
          <span className="text-white/40 mx-2">•</span>
          <span className="text-white/60">{song.artist}</span>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mb-6">
        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Quick Styles</h3>
        <div className="grid grid-cols-3 gap-2">
          {presetStyles.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-center"
            >
              <div className="text-2xl mb-1">{preset.icon}</div>
              <div className="text-xs text-white/80">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Effects Display */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl">
        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-3">Current Mix</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-400">{effects.bass.toFixed(0)}</div>
            <div className="text-xs text-white/40">Bass</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-400">{effects.treble.toFixed(0)}</div>
            <div className="text-xs text-white/40">Treble</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">{(effects.reverb * 100).toFixed(0)}%</div>
            <div className="text-xs text-white/40">Reverb</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">{effects.speed.toFixed(1)}x</div>
            <div className="text-xs text-white/40">Speed</div>
          </div>
        </div>
      </div>

      {/* Save Remix */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Đặt tên cho remix của bạn..."
          value={remixName}
          onChange={(e) => setRemixName(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSave}
          disabled={!remixName.trim() || isSaving}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-medium text-white disabled:opacity-50"
        >
          {isSaving ? 'Đang lưu...' : '💾 Lưu Remix'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    GAME 3: GENRE TRANSFORM
//                    Biến đổi thể loại nhạc (Bolero → EDM, etc.)
// ═══════════════════════════════════════════════════════════════════════════════

interface GenreTransformProps {
  song: Song;
  engine: DJAudioEngine;
}

const GENRE_PRESETS = {
  original: {
    name: 'Original',
    icon: '🎵',
    effects: DEFAULT_EFFECTS,
  },
  edm: {
    name: 'EDM/Dance',
    icon: '🎪',
    effects: {
      ...DEFAULT_EFFECTS,
      bass: 8,
      treble: 4,
      speed: 1.25,
      distortion: 0.15,
    },
  },
  lofi: {
    name: 'Lo-Fi',
    icon: '🌙',
    effects: {
      ...DEFAULT_EFFECTS,
      bass: 4,
      treble: -6,
      speed: 0.9,
      reverb: 0.4,
    },
  },
  jazz: {
    name: 'Jazz',
    icon: '🎷',
    effects: {
      ...DEFAULT_EFFECTS,
      mid: 4,
      reverb: 0.3,
      speed: 0.95,
    },
  },
  rock: {
    name: 'Rock',
    icon: '🎸',
    effects: {
      ...DEFAULT_EFFECTS,
      bass: 4,
      treble: 6,
      distortion: 0.3,
      speed: 1.1,
    },
  },
  acoustic: {
    name: 'Acoustic',
    icon: '🪕',
    effects: {
      ...DEFAULT_EFFECTS,
      treble: -2,
      reverb: 0.2,
      speed: 0.95,
    },
  },
  '8bit': {
    name: '8-Bit',
    icon: '👾',
    effects: {
      ...DEFAULT_EFFECTS,
      distortion: 0.4,
      bass: -4,
      treble: 6,
    },
  },
  opera: {
    name: 'Opera',
    icon: '🎭',
    effects: {
      ...DEFAULT_EFFECTS,
      reverb: 0.8,
      mid: 4,
      speed: 0.85,
    },
  },
};

export function GenreTransform({ song, engine }: GenreTransformProps) {
  const [currentGenre, setCurrentGenre] = useState<keyof typeof GENRE_PRESETS>('original');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transformTo = (genre: keyof typeof GENRE_PRESETS) => {
    setIsTransitioning(true);
    setCurrentGenre(genre);

    const preset = GENRE_PRESETS[genre];
    const { effects } = preset;

    // Smooth transition
    engine.setBass(effects.bass);
    engine.setMid(effects.mid);
    engine.setTreble(effects.treble);
    engine.setReverb(effects.reverb);
    engine.setDelay(effects.delay);
    engine.setDistortion(effects.distortion);
    engine.setSpeed(effects.speed);

    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">🎭 Genre Transform</h2>
        <p className="text-white/60">Biến đổi thể loại bài hát</p>
        <div className="mt-2 px-4 py-2 bg-white/10 rounded-lg inline-block">
          <span className="text-white/80">{song.title}</span>
          <span className="text-white/40 mx-2">→</span>
          <span className="text-purple-400">{GENRE_PRESETS[currentGenre].name}</span>
        </div>
      </div>

      {/* Genre Wheel */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {Object.entries(GENRE_PRESETS).map(([key, preset]) => (
          <motion.button
            key={key}
            onClick={() => transformTo(key as keyof typeof GENRE_PRESETS)}
            whileTap={{ scale: 0.95 }}
            className={`
              p-4 rounded-2xl transition-all text-center
              ${currentGenre === key
                ? 'bg-purple-600 ring-2 ring-purple-400'
                : 'bg-white/10 hover:bg-white/20'
              }
            `}
          >
            <div className="text-3xl mb-2">{preset.icon}</div>
            <div className="text-xs text-white/80">{preset.name}</div>
          </motion.button>
        ))}
      </div>

      {/* Transition Indicator */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-purple-400"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="inline-block text-2xl"
            >
              🔄
            </motion.div>
            <div className="text-sm mt-2">Đang biến đổi...</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips */}
      <div className="mt-6 p-4 bg-white/5 rounded-xl">
        <h3 className="text-white/60 text-sm uppercase tracking-wider mb-2">💡 Mẹo</h3>
        <p className="text-white/40 text-sm">
          Thử biến một bài Bolero buồn thành EDM sôi động, hoặc một bài Vpop thành phong cách Lo-Fi chill!
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MAIN GAME HUB
// ═══════════════════════════════════════════════════════════════════════════════

interface DJGameHubProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentSong?: Song;
  songs?: Song[];
}

export function DJGameHub({ audioRef, currentSong, songs = [] }: DJGameHubProps) {
  const [engine, setEngine] = useState<DJAudioEngine | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameMode | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const djEngine = getDJEngine();
    djEngine.initialize(audioRef.current).then(() => {
      setEngine(djEngine);
    });
  }, [audioRef]);

  const games = [
    {
      id: 'guess-song' as GameMode,
      name: 'Đoán Bài Hát',
      icon: '🎵',
      description: 'Nghe bài hát bị méo tiếng và đoán tên',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 'remix-challenge' as GameMode,
      name: 'Remix Challenge',
      icon: '🎧',
      description: 'Tạo bản remix độc đáo của riêng bạn',
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 'genre-transform' as GameMode,
      name: 'Genre Transform',
      icon: '🎭',
      description: 'Biến đổi thể loại bài hát',
      color: 'from-orange-600 to-red-600',
    },
  ];

  if (!engine) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-white/60">Đang khởi tạo...</div>
      </div>
    );
  }

  if (selectedGame && currentSong) {
    return (
      <div>
        <button
          onClick={() => setSelectedGame(null)}
          className="m-4 px-4 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20"
        >
          ← Quay lại
        </button>

        {selectedGame === 'guess-song' && songs.length >= 4 && (
          <GuessSongGame
            songs={songs}
            engine={engine}
            onComplete={(score) => {
              alert(`🎉 Hoàn thành! Điểm: ${score}`);
              setSelectedGame(null);
            }}
          />
        )}

        {selectedGame === 'remix-challenge' && (
          <RemixChallenge
            song={currentSong}
            engine={engine}
            onSave={(remix) => {
              alert(`✅ Đã lưu remix "${remix.name}"!`);
            }}
          />
        )}

        {selectedGame === 'genre-transform' && (
          <GenreTransform song={currentSong} engine={engine} />
        )}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">🎮 DJ Games</h2>
        <p className="text-white/60">Chơi và khám phá âm nhạc theo cách mới</p>
      </div>

      <div className="grid gap-4">
        {games.map((game) => (
          <motion.button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-6 rounded-2xl bg-gradient-to-r ${game.color}
              text-left transition-all
            `}
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{game.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{game.name}</h3>
                <p className="text-white/80">{game.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default DJGameHub;
