"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AuroraBackground from "@/components/background/AuroraBackground";
import PlayerHeader from "@/components/player/PlayerHeader";
import ProgressBar from "@/components/player/ProgressBar";
import PlayerControls from "@/components/player/PlayerControls";
import VolumeControl from "@/components/player/VolumeControl";
import LyricsPanel from "@/components/player/LyricsPanel";
import YouTubePlayer, { YT_STATES } from "@/components/player/YouTubePlayer";
import { MusicNote, AlignLeft, Book } from "iconoir-react";
import { LyricLine } from "@/types";
import { cleanSongTitle, cleanArtistName } from "@/utils/cleanSongTitle";
import SongStoryPanel from "@/components/player/SongStoryPanel";
import { AlbumStoryPlayer } from "@/components/album-story";
import { MoodAura, EmotionParticles, detectMoodFromGenre, detectEmotionFromSong } from "@/components/visual";
import { DJMixerPanel } from "@/components/dj";

function PlayerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

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
  const rawTitle = safeDecodeURI(searchParams.get("title") || "Unknown");
  const rawArtist = safeDecodeURI(searchParams.get("artist") || "Unknown");
  const songCover = safeDecodeURI(searchParams.get("cover") || "");
  const youtubeId = searchParams.get("ytId") || songId;
  const genre = safeDecodeURI(searchParams.get("genre") || "bolero");

  // Detect mood and emotion from genre for visual effects
  const mood = detectMoodFromGenre(genre);
  const emotion = detectEmotionFromSong({ genre });

  // Clean up song title and artist for display
  const songTitle = cleanSongTitle(rawTitle);
  const songArtist = cleanArtistName(rawArtist);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isKaraokeMode, setIsKaraokeMode] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [seekTo, setSeekTo] = useState<number | undefined>(undefined);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [showMobileStory, setShowMobileStory] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAlbumStory, setShowAlbumStory] = useState(false);
  const [showDJMixer, setShowDJMixer] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch lyrics when song changes
  useEffect(() => {
    if (!songTitle || songTitle === "Unknown") return;

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
        } else {
          setLyrics([
            { time: 0, text: "Không tìm thấy lời bài hát" },
            { time: 5, text: "Hãy thử tìm bài hát khác" },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch lyrics:", error);
        setLyrics([
          { time: 0, text: "Lỗi khi tải lời bài hát" },
        ]);
      } finally {
        setLyricsLoading(false);
      }
    };

    if (duration > 0) {
      fetchLyrics();
    }
  }, [songTitle, songArtist, duration]);

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

  const handlePrev = useCallback(() => {
    handleSeek(0);
  }, [handleSeek]);

  const handleNext = useCallback(() => {
    handleSeek(0);
  }, [handleSeek]);

  if (!youtubeId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-void">
        <div className="text-center">
          <p className="text-secondary mb-4">Không tìm thấy video</p>
          <button
            onClick={() => router.push("/")}
            className="text-aurora-blue hover:underline"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Aurora Background - hide notes when showing lyrics */}
      <AuroraBackground noteCount={20} showNotes={!showLyrics} />

      {/* Extra Blur Overlay */}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse at center top, transparent 0%, rgba(5, 5, 7, 0.7) 70%)",
        }}
      />

      {/* YouTube Player (hidden) */}
      <YouTubePlayer
        videoId={youtubeId}
        isPlaying={isPlaying}
        volume={volume}
        seekTo={seekTo}
        onReady={() => setIsReady(true)}
        onStateChange={handleStateChange}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Header */}
      <PlayerHeader autoHide={isPlaying} />

      {/* Main Content - Fixed height container */}
      <div
        className="relative z-10 px-6"
        style={{
          position: "absolute",
          top: "80px",
          left: 0,
          right: 0,
          bottom: "180px", // Space for player controls
        }}
      >
        <AnimatePresence mode="wait">
          {showLyrics ? (
            /* Lyrics View with Split Layout - Glass Panels */
            <motion.div
              key="lyrics"
              className="h-full flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Left Panel - Lyrics in Glass Container */}
              <div className={`h-full ${!isMobile ? "w-[55%]" : "w-full"}`}>
                <LyricsPanel
                  lyrics={lyrics}
                  currentTime={currentTime}
                  isLoading={lyricsLoading}
                  songTitle={songTitle}
                  songArtist={songArtist}
                  onBack={() => setShowLyrics(false)}
                  isKaraokeMode={isKaraokeMode}
                />
              </div>

              {/* Right Panel - Song Story (Desktop only) */}
              {!isMobile && (
                <div className="w-[45%] h-full">
                  <SongStoryPanel
                    title={songTitle}
                    artist={songArtist}
                    isVisible={true}
                    isMobile={false}
                  />
                </div>
              )}
            </motion.div>
          ) : (
            /* Album Art View */
            <motion.div
              key="album"
              className="h-full flex flex-col items-center justify-center relative"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Emotion Particles - Floating particles based on song emotion */}
              {isPlaying && (
                <EmotionParticles
                  emotion={emotion}
                  intensity={0.7}
                  isActive={true}
                />
              )}

              {/* Album Art with MoodAura */}
              <MoodAura mood={mood} isPlaying={isPlaying} size={380}>
                <motion.div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-glass-lg"
                  animate={isPlaying ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                  style={{
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(91, 159, 255, 0.2)",
                  }}
                >
                  {songCover ? (
                    <Image
                      src={songCover}
                      alt={songTitle}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-aurora-blue/30 to-aurora-violet/30 flex items-center justify-center">
                      <MusicNote className="w-24 h-24 text-white/50" />
                    </div>
                  )}

                  {/* Shine overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)",
                    }}
                  />

                  {/* Loading overlay */}
                  {!isReady && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-10 h-10 border-2 border-aurora-blue border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </motion.div>
              </MoodAura>

              <div className="h-8" /> {/* Spacer for MoodAura */}

              {/* Song info */}
              <div className="text-center max-w-lg">
                <h1 className="text-title-1 sm:text-display text-primary font-semibold line-clamp-2 mb-2">
                  {songTitle}
                </h1>
                <p className="text-body-lg text-secondary">
                  {songArtist}
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex items-center gap-3 flex-wrap justify-center">
                <motion.button
                  onClick={() => setShowLyrics(true)}
                  className="flex items-center gap-2 px-4 py-2 text-callout chip-glass"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlignLeft className="w-4 h-4" />
                  Lời bài hát
                </motion.button>

                <motion.button
                  onClick={() => {
                    const params = new URLSearchParams({
                      id: songId || "",
                      title: rawTitle,
                      artist: rawArtist,
                      cover: songCover,
                      ytId: youtubeId || "",
                    });
                    router.push(`/synesthesia?${params.toString()}`);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-callout chip-glass bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  Synesthesia
                </motion.button>

                <motion.button
                  onClick={() => setShowAlbumStory(true)}
                  className="flex items-center gap-2 px-4 py-2 text-callout chip-glass bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Book className="w-4 h-4 text-amber-400" />
                  Album Story
                </motion.button>

                <motion.button
                  onClick={() => setShowDJMixer(true)}
                  className="flex items-center gap-2 px-4 py-2 text-callout chip-glass bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-pink-400">
                    <path d="M4 21V14M4 10V3M12 21V12M12 8V3M20 21V16M20 12V3"/>
                    <circle cx="4" cy="12" r="2"/>
                    <circle cx="12" cy="10" r="2"/>
                    <circle cx="20" cy="14" r="2"/>
                  </svg>
                  DJ Mixer
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Story Button - Only show in lyrics view on mobile */}
      {showLyrics && isMobile && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMobileStory(true)}
          className="fixed bottom-28 right-4 z-40 px-4 py-3 rounded-full
            flex items-center gap-2 bg-white/10 backdrop-blur-xl"
          style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
        >
          <Book className="w-4 h-4 text-purple-400" strokeWidth={2} />
          <span className="text-[13px] font-medium text-white">Câu chuyện</span>
        </motion.button>
      )}

      {/* Mobile Story Panel - Bottom Sheet */}
      {isMobile && (
        <SongStoryPanel
          title={songTitle}
          artist={songArtist}
          isVisible={showMobileStory}
          onClose={() => setShowMobileStory(false)}
          isMobile={true}
        />
      )}

      {/* Player Controls - Fixed Bottom */}
      <div className="fixed bottom-4 left-0 right-0 z-50 px-8 bg-transparent">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Progress bar */}
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
          />

          {/* Controls Row - Volume | Play | Karaoke */}
          <div className="flex items-center justify-between">
            {/* Left - Volume */}
            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
              isKaraokeMode={isKaraokeMode}
              onKaraokeModeToggle={() => setIsKaraokeMode(!isKaraokeMode)}
              showKaraoke={false}
            />

            {/* Center - Play Controls */}
            <PlayerControls
              isPlaying={isPlaying}
              onPlayPause={togglePlay}
              onPrev={handlePrev}
              onNext={handleNext}
            />

            {/* Right - Karaoke */}
            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
              isKaraokeMode={isKaraokeMode}
              onKaraokeModeToggle={() => {
                // Navigate to Synesthesia with karaoke mode
                const params = new URLSearchParams({
                  id: songId || "",
                  title: rawTitle,
                  artist: rawArtist,
                  cover: songCover,
                  ytId: youtubeId || "",
                  karaoke: "true",
                });
                router.push(`/synesthesia?${params.toString()}`);
              }}
              showVolume={false}
              showAlbumStory={false}
            />
          </div>
        </div>
      </div>

      {/* Album Story Overlay */}
      <AnimatePresence>
        {showAlbumStory && (
          <AlbumStoryPlayer
            songId={songId || ""}
            title={rawTitle}
            artist={rawArtist}
            coverImage={songCover}
            currentTime={currentTime}
            onClose={() => setShowAlbumStory(false)}
          />
        )}
      </AnimatePresence>

      {/* DJ Mixer Panel */}
      <AnimatePresence>
        {showDJMixer && (
          <DJMixerPanel
            audioRef={{ current: null }}
            isPlaying={isPlaying}
            onClose={() => setShowDJMixer(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function PlayerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-void">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-aurora-blue border-t-transparent rounded-full"
          />
        </div>
      }
    >
      <PlayerContent />
    </Suspense>
  );
}
