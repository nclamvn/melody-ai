"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { VisualizerStyle } from '@/types/synesthesia';
import { useAudioAnalyzer } from '@/hooks/useAudioAnalyzer';
import SynesthesiaCanvas from '@/components/synesthesia/SynesthesiaCanvas';
import StyleSelector from '@/components/synesthesia/StyleSelector';
import YouTubePlayer, { YT_STATES } from '@/components/player/YouTubePlayer';
import { cleanSongTitle, cleanArtistName } from '@/utils/cleanSongTitle';
import { Play, Pause, SkipPrev, SkipNext } from 'iconoir-react';
import { LyricLine } from '@/types';

function SynesthesiaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Get song data from URL params
  const safeDecodeURI = (str: string): string => {
    try {
      if (str.includes("%")) {
        return decodeURIComponent(str);
      }
      return str;
    } catch {
      return str;
    }
  };

  const songId = searchParams.get("id");
  const rawTitle = safeDecodeURI(searchParams.get("title") || "Demo Mode");
  const rawArtist = safeDecodeURI(searchParams.get("artist") || "Synesthesia");
  const songCover = safeDecodeURI(searchParams.get("cover") || "");
  const youtubeId = searchParams.get("ytId") || songId;
  const isKaraokeMode = searchParams.get("karaoke") === "true";

  const songTitle = cleanSongTitle(rawTitle);
  const songArtist = cleanArtistName(rawArtist);

  const [currentStyle, setCurrentStyle] = useState<VisualizerStyle>('aurora');
  const [sensitivity, setSensitivity] = useState(1);
  const [isStyleSelectorOpen, setIsStyleSelectorOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showDebug, setShowDebug] = useState(false);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);

  // Karaoke lyrics state
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);

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

  // Fetch lyrics for karaoke mode
  useEffect(() => {
    if (!isKaraokeMode || !songTitle || songTitle === "Demo Mode") return;

    const fetchLyrics = async () => {
      setLyricsLoading(true);
      try {
        const params = new URLSearchParams({
          title: songTitle,
          artist: songArtist,
          duration: duration.toString(),
        });
        const response = await fetch(`/api/lyrics?${params.toString()}`);
        const data = await response.json();
        if (data.success && data.lyrics.length > 0) {
          setLyrics(data.lyrics);
        }
      } catch (error) {
        console.error("Failed to fetch lyrics:", error);
      } finally {
        setLyricsLoading(false);
      }
    };

    if (duration > 0) {
      fetchLyrics();
    }
  }, [isKaraokeMode, songTitle, songArtist, duration]);

  // Find current lyric line
  const currentLineIndex = lyrics.findIndex((line, index) => {
    const nextLine = lyrics[index + 1];
    if (!nextLine) return currentTime >= line.time;
    return currentTime >= line.time && currentTime < nextLine.time;
  });

  const handleTimeUpdate = useCallback((time: number, dur: number) => {
    setCurrentTime(time);
    if (dur > 0) setDuration(dur);
  }, []);

  const handleStateChange = useCallback((state: number) => {
    if (state === YT_STATES.PLAYING) {
      setIsPlaying(true);
    } else if (state === YT_STATES.PAUSED) {
      setIsPlaying(false);
    } else if (state === YT_STATES.ENDED) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, []);

  const handleSeek = useCallback((time: number) => {
    setSeekTo(time);
    setCurrentTime(time);
    setTimeout(() => setSeekTo(undefined), 100);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

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
  }, []);

  const handleClose = useCallback(() => {
    stopAnalyzing();
    router.back();
  }, [router, stopAnalyzing]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* YouTube Player (hidden) */}
      {youtubeId && (
        <YouTubePlayer
          videoId={youtubeId}
          isPlaying={isPlaying}
          volume={volume}
          seekTo={seekTo}
          onReady={() => setIsReady(true)}
          onStateChange={handleStateChange}
          onTimeUpdate={handleTimeUpdate}
        />
      )}

      {/* Canvas Container */}
      <div ref={canvasContainerRef} className="absolute inset-0">
        <SynesthesiaCanvas
          style={currentStyle}
          frequencyData={frequencyData}
          isPlaying={isAnalyzing}
          sensitivity={sensitivity}
        />
      </div>

      {/* Karaoke Lyrics Overlay */}
      {isKaraokeMode && lyrics.length > 0 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl px-8">
            {/* Previous line */}
            {currentLineIndex > 0 && lyrics[currentLineIndex - 1] && (
              <motion.p
                key={`prev-${currentLineIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.3, y: 0 }}
                className="text-xl text-white/40 mb-4"
              >
                {lyrics[currentLineIndex - 1].text}
              </motion.p>
            )}

            {/* Current line - highlighted */}
            {lyrics[currentLineIndex] && (
              <motion.p
                key={`current-${currentLineIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  textShadow: [
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 40px rgba(147,51,234,0.8)",
                    "0 0 20px rgba(255,255,255,0.5)",
                  ]
                }}
                transition={{
                  duration: 0.3,
                  textShadow: { duration: 2, repeat: Infinity }
                }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                style={{
                  textShadow: "0 0 30px rgba(147,51,234,0.8), 0 0 60px rgba(59,130,246,0.5)",
                }}
              >
                {lyrics[currentLineIndex].text}
              </motion.p>
            )}

            {/* Next line */}
            {lyrics[currentLineIndex + 1] && (
              <motion.p
                key={`next-${currentLineIndex}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.4, y: 0 }}
                className="text-xl text-white/50"
              >
                {lyrics[currentLineIndex + 1].text}
              </motion.p>
            )}
          </div>
        </div>
      )}

      {/* Karaoke Loading */}
      {isKaraokeMode && lyricsLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-white/60">Đang tải lời bài hát...</p>
          </div>
        </div>
      )}

      {/* Song Info Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <div className="flex items-center gap-4 bg-white/[0.05] backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl">
          {songCover ? (
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <Image
                src={songCover}
                alt={songTitle}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          )}
          <div>
            <h3 className="text-white font-medium">{songTitle}</h3>
            <p className="text-white/60 text-sm">{songArtist}</p>
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="bg-white/[0.08] backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl w-full max-w-3xl">
          {/* Progress Bar - Inside control bar */}
          <div
            className="h-1.5 bg-white/20 rounded-full cursor-pointer mb-4"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              handleSeek(percent * duration);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between">
            {/* Left Group - Style & Sensitivity */}
            <div className="flex items-center gap-3 w-36">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsStyleSelectorOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </motion.button>

              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={sensitivity}
                onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            {/* Center Group - Player Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50 w-12 text-right">{formatTime(currentTime)}</span>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <SkipPrev className="w-5 h-5 text-white/70" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-black" strokeWidth={2.5} />
                ) : (
                  <Play className="w-6 h-6 text-black ml-0.5" strokeWidth={2.5} fill="black" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <SkipNext className="w-5 h-5 text-white/70" />
              </motion.button>

              <span className="text-xs text-white/50 w-12">{formatTime(duration)}</span>
            </div>

            {/* Right Group - Actions */}
            <div className="flex items-center gap-2 w-36 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCapture}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
                title="Chup anh"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRecordToggle}
                className={`p-2.5 rounded-full transition-colors ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
                title={isRecording ? 'Dung quay' : 'Quay video'}
              >
                {isRecording ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
                title="Dong"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Style Selector */}
      <StyleSelector
        currentStyle={currentStyle}
        onStyleChange={setCurrentStyle}
        isOpen={isStyleSelectorOpen}
        onClose={() => setIsStyleSelectorOpen(false)}
      />

      {/* Loading overlay */}
      {youtubeId && !isReady && (
        <div className="absolute inset-0 z-30 bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/60">Dang tai nhac...</p>
          </div>
        </div>
      )}
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

export default function SynesthesiaPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SynesthesiaContent />
    </Suspense>
  );
}
