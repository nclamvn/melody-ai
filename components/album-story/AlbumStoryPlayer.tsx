"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlbumStoryData, AlbumStoryPage, PageType } from "@/types/albumStory";
import CardFlipContainer from "./CardFlipContainer";
import CoverPage from "./pages/CoverPage";
import LyricsPage from "./pages/LyricsPage";
import CompositionPage from "./pages/CompositionPage";
import AuthorPage from "./pages/AuthorPage";
import CoverVersionsPage from "./pages/CoverVersionsPage";
import StoriesPage from "./pages/StoriesPage";

// ═══════════════════════════════════════════════════════════════════════════════
//                    COSMIC BACKGROUND COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Stars rendered on canvas for performance
function CosmicStarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate stars
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      phase: number;
    }> = [];

    for (let i = 0; i < 800; i++) {
      const isBright = Math.random() > 0.88;
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: isBright ? Math.random() * 1.8 + 1 : Math.random() * 1 + 0.3,
        opacity: isBright ? Math.random() * 0.4 + 0.6 : Math.random() * 0.5 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.phase);
        const opacity = star.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Glow for bright stars
        if (star.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 2.5
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.4})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

// Meteor - tiny bright point streaking across the sky with variety
function Meteors() {
  const [meteors, setMeteors] = useState<Array<{
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    duration: number;
    brightness: number; // 0-1, affects glow intensity
    size: number; // 1-2px
  }>>([]);

  useEffect(() => {
    const createMeteor = () => {
      const id = Date.now() + Math.random();
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Random direction with more variety
      const direction = Math.floor(Math.random() * 8);
      let startX: number, startY: number, angle: number;

      switch (direction) {
        case 0: // Top-left to bottom-right (steep)
          startX = Math.random() * w * 0.5;
          startY = -10;
          angle = Math.PI / 3 + Math.random() * 0.2;
          break;
        case 1: // Top-left to bottom-right (shallow)
          startX = -10;
          startY = Math.random() * h * 0.4;
          angle = Math.PI / 6 + Math.random() * 0.2;
          break;
        case 2: // Top-right to bottom-left (steep)
          startX = w * 0.5 + Math.random() * w * 0.5;
          startY = -10;
          angle = Math.PI * 2/3 + Math.random() * 0.2;
          break;
        case 3: // Top-right to bottom-left (shallow)
          startX = w + 10;
          startY = Math.random() * h * 0.4;
          angle = Math.PI * 5/6 + Math.random() * 0.2;
          break;
        case 4: // Almost horizontal left to right
          startX = -10;
          startY = Math.random() * h * 0.7;
          angle = Math.random() * 0.15;
          break;
        case 5: // Almost horizontal right to left
          startX = w + 10;
          startY = Math.random() * h * 0.7;
          angle = Math.PI - Math.random() * 0.15;
          break;
        case 6: // Steep diagonal from top
          startX = Math.random() * w;
          startY = -10;
          angle = Math.PI / 2.5 + Math.random() * 0.3;
          break;
        default: // Another steep from top (opposite)
          startX = Math.random() * w;
          startY = -10;
          angle = Math.PI / 1.8 + Math.random() * 0.2;
      }

      // Variety in distance: short (150-250), medium (300-450), long (500-700)
      const distanceType = Math.random();
      let distance: number;
      if (distanceType < 0.3) {
        distance = 150 + Math.random() * 100; // Short
      } else if (distanceType < 0.7) {
        distance = 300 + Math.random() * 150; // Medium
      } else {
        distance = 500 + Math.random() * 200; // Long
      }

      // Variety in brightness: dim (0.4-0.6), normal (0.7-0.85), bright (0.9-1)
      const brightnessType = Math.random();
      let brightness: number;
      if (brightnessType < 0.25) {
        brightness = 0.4 + Math.random() * 0.2; // Dim
      } else if (brightnessType < 0.7) {
        brightness = 0.7 + Math.random() * 0.15; // Normal
      } else {
        brightness = 0.9 + Math.random() * 0.1; // Bright
      }

      // Size: mostly 1px, some 1.5px
      const size = Math.random() > 0.7 ? 1.5 : 1;

      // Duration based on distance (longer distance = longer duration)
      const baseDuration = 0.8 + Math.random() * 0.4;
      const duration = baseDuration * (distance / 300); // Scale with distance

      setMeteors(prev => [...prev, {
        id,
        startX,
        startY,
        endX: startX + Math.cos(angle) * distance,
        endY: startY + Math.sin(angle) * distance,
        duration: Math.min(duration, 2.5), // Cap at 2.5s
        brightness,
        size,
      }]);

      setTimeout(() => {
        setMeteors(prev => prev.filter(m => m.id !== id));
      }, 3500);
    };

    // First meteor after 1.5 seconds
    const initialTimeout = setTimeout(createMeteor, 1500);

    // Create meteor every 5 seconds
    const interval = setInterval(createMeteor, 5000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {meteors.map(meteor => {
        const b = meteor.brightness;
        const peakOpacity = Math.max(0.4, Math.min(1, b));
        return (
          <motion.div
            key={meteor.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: meteor.startX,
              top: meteor.startY,
              width: meteor.size,
              height: meteor.size,
              background: "white",
              boxShadow: `
                0 0 ${2 * b}px ${1 * b}px rgba(255,255,255,${b}),
                0 0 ${4 * b}px ${2 * b}px rgba(255,255,255,${b * 0.9}),
                0 0 ${8 * b}px ${4 * b}px rgba(255,255,255,${b * 0.7}),
                0 0 ${16 * b}px ${6 * b}px rgba(220,240,255,${b * 0.5}),
                0 0 ${24 * b}px ${10 * b}px rgba(180,220,255,${b * 0.3})
              `,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: meteor.endX - meteor.startX,
              y: meteor.endY - meteor.startY,
              opacity: [0, peakOpacity, peakOpacity, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: meteor.duration,
              ease: "linear",
              opacity: { times: [0, 0.05, 0.8, 1] },
            }}
          />
        );
      })}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════

interface AlbumStoryPlayerProps {
  songId: string;
  title: string;
  artist: string;
  coverImage: string;
  currentTime?: number;
  onClose?: () => void;
}

export default function AlbumStoryPlayer({
  songId,
  title,
  artist,
  coverImage,
  currentTime = 0,
  onClose,
}: AlbumStoryPlayerProps) {
  const [storyData, setStoryData] = useState<AlbumStoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch story data from API
  useEffect(() => {
    const fetchStoryData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/album-story", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ songId, title, artist, coverImage }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch story data");
        }

        const data = await response.json();
        setStoryData(data);
      } catch (err) {
        console.error("Error fetching album story:", err);
        setError("Không thể tải thông tin bài hát");
        // Set fallback data
        setStoryData(createFallbackData(songId, title, artist, coverImage));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoryData();
  }, [songId, title, artist, coverImage]);

  // Render page content based on type
  const renderPageContent = (page: AlbumStoryPage) => {
    switch (page.type) {
      case "cover":
        return <CoverPage content={page.content as any} />;
      case "lyrics":
        return <LyricsPage content={page.content as any} currentTime={currentTime} />;
      case "composition":
        return <CompositionPage content={page.content as any} />;
      case "author":
        return <AuthorPage content={page.content as any} />;
      case "covers":
        return <CoverVersionsPage content={page.content as any} />;
      case "stories":
        return <StoriesPage content={page.content as any} />;
      default:
        return null;
    }
  };

  // Create page elements array
  const pageElements = useMemo(() => {
    if (!storyData) return [];
    return storyData.pages.map((page) => (
      <div key={page.id} className="w-full h-full">
        {renderPageContent(page)}
      </div>
    ));
  }, [storyData, currentTime]);

  const goToPage = (page: number) => {
    if (page === currentPage || !storyData) return;
    setCurrentPage(page);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      {/* Cosmic Background - Full screen */}
      <div className="absolute inset-0 overflow-hidden" onClick={onClose}>
        {/* Deep space */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 20%, #0d0d1a 0%, #050508 50%, #000000 100%)",
          }}
        />

        {/* Nebula 1 - Purple/Pink */}
        <motion.div
          className="absolute w-[60%] h-[40%] -left-[5%] top-[5%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["0%", "8%", "0%"],
            y: ["0%", "5%", "0%"],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Nebula 2 - Blue/Cyan */}
        <motion.div
          className="absolute w-[50%] h-[35%] -right-[5%] top-[25%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, rgba(34, 211, 238, 0.1) 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: ["0%", "-6%", "0%"],
            y: ["0%", "-4%", "0%"],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        {/* Nebula 3 - Orange/Gold */}
        <motion.div
          className="absolute w-[40%] h-[30%] left-[10%] bottom-[10%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(251, 146, 60, 0.15) 0%, rgba(251, 191, 36, 0.08) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{
            x: ["0%", "10%", "0%"],
            y: ["0%", "-6%", "0%"],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />

        {/* Nebula 4 - Deep Purple */}
        <motion.div
          className="absolute w-[45%] h-[35%] right-[15%] bottom-[20%]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(88, 28, 135, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 60%)",
            filter: "blur(55px)",
          }}
          animate={{
            x: ["0%", "-8%", "0%"],
            y: ["0%", "6%", "0%"],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Stars Canvas */}
        <CosmicStarsCanvas />

        {/* Meteors - bright points streaking across */}
        <Meteors />

        {/* Bright stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              left: `${8 + (i * 8) % 84}%`,
              top: `${5 + (i * 9) % 90}%`,
              boxShadow: `0 0 ${6 + i}px ${2 + i % 2}px rgba(255,255,255,0.5), 0 0 ${12 + i * 2}px ${4 + i % 3}px rgba(139,92,246,0.2)`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* Top Bar - Back Button and Page Title */}
      <div className="absolute top-6 left-0 right-0 z-30 flex items-center justify-between px-4">
        {/* Back Button */}
        <motion.button
          onClick={onClose}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20
            flex items-center justify-center text-white/70 hover:text-white
            hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Page Title Indicator - Center */}
        <AnimatePresence mode="wait">
          {storyData && (
            <motion.div
              key={currentPage}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <p className="text-sm font-medium text-white/80 text-center">
                {storyData.pages[currentPage]?.title}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer for balance */}
        <div className="w-10 h-10" />
      </div>

      {/* Card Container - Larger size */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md h-[80vh] max-h-[750px] mx-4"
      >
        {/* Loading State - Simple glass card */}
        {isLoading && (
          <div
            className="w-full h-full rounded-3xl border border-white/10 overflow-hidden flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(15,15,30,0.9) 0%, rgba(10,10,25,0.95) 50%, rgba(15,15,30,0.9) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Cosmic loading spinner */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.8), transparent)",
                }}
              />
              <div className="absolute inset-[2px] rounded-full bg-[#0a0a15]" />
              {/* Center star */}
              <motion.div
                className="relative w-3 h-3 rounded-full bg-white"
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: "0 0 10px 3px rgba(255,255,255,0.5)" }}
              />
            </div>
            <p className="mt-6 text-white/70 text-sm">Đang tải thông tin...</p>
          </div>
        )}

        {/* Error State */}
        {error && !storyData && (
          <div className="w-full h-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-8">
            <svg className="w-16 h-16 text-red-400/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-white/60 text-center">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Album Story Content */}
        {!isLoading && storyData && (
          <CardFlipContainer
            pages={pageElements}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onClose={onClose}
          />
        )}
      </motion.div>

      {/* Bottom Navigation Row - Arrows and Page Indicators */}
      {storyData && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: currentPage > 0 ? 1 : 0.3 }}
            onClick={() => currentPage > 0 && goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className={`w-10 h-10 rounded-full
              bg-white/10 backdrop-blur-xl border border-white/20
              flex items-center justify-center transition-all
              ${currentPage > 0 ? "hover:bg-white/20 cursor-pointer" : "cursor-not-allowed"}`}
            whileHover={currentPage > 0 ? { scale: 1.1 } : {}}
            whileTap={currentPage > 0 ? { scale: 0.9 } : {}}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {storyData.pages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToPage(index)}
                className={`
                  rounded-full transition-all duration-300
                  ${index === currentPage
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }
                `}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: currentPage < storyData.pages.length - 1 ? 1 : 0.3 }}
            onClick={() => currentPage < storyData.pages.length - 1 && goToPage(currentPage + 1)}
            disabled={currentPage === storyData.pages.length - 1}
            className={`w-10 h-10 rounded-full
              bg-white/10 backdrop-blur-xl border border-white/20
              flex items-center justify-center transition-all
              ${currentPage < storyData.pages.length - 1 ? "hover:bg-white/20 cursor-pointer" : "cursor-not-allowed"}`}
            whileHover={currentPage < storyData.pages.length - 1 ? { scale: 1.1 } : {}}
            whileTap={currentPage < storyData.pages.length - 1 ? { scale: 0.9 } : {}}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      )}
    </div>
  );
}

// Fallback data when API fails
function createFallbackData(
  songId: string,
  title: string,
  artist: string,
  coverImage: string
): AlbumStoryData {
  return {
    songId,
    title,
    artist,
    coverImage,
    pages: [
      {
        id: "cover",
        type: "cover",
        title: "Bìa Album",
        content: {
          albumArt: coverImage,
          title,
          artist,
        },
      },
      {
        id: "lyrics",
        type: "lyrics",
        title: "Lời Bài Hát",
        content: {
          lines: [
            { time: 0, text: "Đang tải lời bài hát..." },
          ],
          hasTranslation: false,
        },
      },
      {
        id: "composition",
        type: "composition",
        title: "Câu Chuyện Sáng Tác",
        content: {
          story: "Thông tin về câu chuyện sáng tác đang được cập nhật...",
        },
      },
      {
        id: "author",
        type: "author",
        title: "Về Nghệ Sĩ",
        content: {
          name: artist,
          bio: "Thông tin về nghệ sĩ đang được cập nhật...",
        },
      },
      {
        id: "covers",
        type: "covers",
        title: "Các Bản Cover",
        content: {
          originalArtist: artist,
          versions: [],
        },
      },
      {
        id: "stories",
        type: "stories",
        title: "Câu Chuyện Xung Quanh",
        content: {
          stories: [],
        },
      },
    ],
  };
}
