// ═══════════════════════════════════════════════════════════════════════════════
//                    STORY SCROLL CINEMA
//                    Cinematic scroll-based story presentation
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
//                    TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface StorySection {
  id: string;
  type: 'title' | 'text' | 'image' | 'quote' | 'timeline' | 'fact';
  content: string;
  subContent?: string;
  image?: string;
  year?: number;
  animation?: 'fade' | 'slide' | 'typewriter' | 'zoom';
}

interface StoryScrollProps {
  title: string;
  artist: string;
  year?: number;
  sections: StorySection[];
  backgroundImage?: string;
  mood?: 'melancholic' | 'joyful' | 'romantic' | 'peaceful' | 'energetic';
  onComplete?: () => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MOOD THEMES
// ═══════════════════════════════════════════════════════════════════════════════

const MOOD_THEMES = {
  melancholic: {
    bgOverlay: 'from-slate-900/90 via-blue-900/80 to-slate-900/90',
    textColor: 'text-blue-100',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
  },
  joyful: {
    bgOverlay: 'from-orange-900/80 via-pink-900/70 to-orange-900/80',
    textColor: 'text-orange-100',
    accentColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
  },
  romantic: {
    bgOverlay: 'from-rose-900/90 via-pink-900/80 to-rose-900/90',
    textColor: 'text-rose-100',
    accentColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
  },
  peaceful: {
    bgOverlay: 'from-emerald-900/90 via-teal-900/80 to-emerald-900/90',
    textColor: 'text-emerald-100',
    accentColor: 'text-teal-400',
    borderColor: 'border-teal-500/30',
  },
  energetic: {
    bgOverlay: 'from-red-900/90 via-orange-900/80 to-red-900/90',
    textColor: 'text-red-100',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    SECTION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function TitleSection({ 
  title, 
  artist, 
  year,
  theme 
}: { 
  title: string; 
  artist: string; 
  year?: number;
  theme: typeof MOOD_THEMES[keyof typeof MOOD_THEMES];
}) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`text-sm uppercase tracking-[0.3em] ${theme.accentColor} mb-4`}
      >
        The Story Behind
      </motion.div>
      
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`text-5xl md:text-7xl font-bold ${theme.textColor} mb-6`}
      >
        {title}
      </motion.h1>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className={`text-xl md:text-2xl ${theme.accentColor}`}
      >
        {artist} {year && `• ${year}`}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-16 flex flex-col items-center"
      >
        <span className={`text-sm ${theme.textColor}/60 mb-2`}>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`w-6 h-10 border-2 ${theme.borderColor} rounded-full flex justify-center`}
        >
          <motion.div 
            className={`w-1.5 h-3 ${theme.accentColor.replace('text-', 'bg-')} rounded-full mt-2`}
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function TextSection({ 
  content, 
  animation = 'fade',
  theme 
}: { 
  content: string; 
  animation?: string;
  theme: typeof MOOD_THEMES[keyof typeof MOOD_THEMES];
}) {
  const [displayText, setDisplayText] = useState('');
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (animation === 'typewriter' && isInView) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(content.slice(0, i));
        i++;
        if (i > content.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [animation, content, isInView]);
  
  const variants = {
    fade: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
    },
    slide: {
      initial: { x: -50, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
    },
    zoom: {
      initial: { scale: 0.9, opacity: 0 },
      whileInView: { scale: 1, opacity: 1 },
    },
  };
  
  const variant = variants[animation as keyof typeof variants] || variants.fade;
  
  return (
    <motion.div
      className="min-h-[50vh] flex items-center justify-center px-8 py-16"
      {...variant}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      onViewportEnter={() => setIsInView(true)}
    >
      <p className={`text-xl md:text-2xl leading-relaxed max-w-3xl ${theme.textColor}/90`}>
        {animation === 'typewriter' ? displayText : content}
        {animation === 'typewriter' && displayText.length < content.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            |
          </motion.span>
        )}
      </p>
    </motion.div>
  );
}

function QuoteSection({ 
  content, 
  author,
  theme 
}: { 
  content: string; 
  author?: string;
  theme: typeof MOOD_THEMES[keyof typeof MOOD_THEMES];
}) {
  return (
    <motion.div
      className="min-h-[60vh] flex items-center justify-center px-8 py-16"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={`max-w-2xl border-l-4 ${theme.borderColor} pl-8`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-6xl ${theme.accentColor} mb-4`}
        >
          "
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl md:text-3xl italic ${theme.textColor}/90 mb-6`}
        >
          {content}
        </motion.p>
        {author && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-lg ${theme.accentColor}`}
          >
            — {author}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function TimelineSection({ 
  year, 
  content,
  theme 
}: { 
  year: number; 
  content: string;
  theme: typeof MOOD_THEMES[keyof typeof MOOD_THEMES];
}) {
  return (
    <motion.div
      className="min-h-[40vh] flex items-center px-8 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`flex-shrink-0 w-24 h-24 rounded-full border-2 ${theme.borderColor} flex items-center justify-center`}
        >
          <span className={`text-2xl font-bold ${theme.accentColor}`}>{year}</span>
        </motion.div>
        <motion.p
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-lg ${theme.textColor}/80 pt-2`}
        >
          {content}
        </motion.p>
      </div>
    </motion.div>
  );
}

function FactSection({ 
  content,
  theme 
}: { 
  content: string;
  theme: typeof MOOD_THEMES[keyof typeof MOOD_THEMES];
}) {
  return (
    <motion.div
      className="min-h-[30vh] flex items-center justify-center px-8 py-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`max-w-2xl p-8 rounded-2xl bg-white/5 backdrop-blur-sm border ${theme.borderColor}`}>
        <div className={`text-sm uppercase tracking-wider ${theme.accentColor} mb-3`}>
          ✦ Did you know?
        </div>
        <p className={`text-lg ${theme.textColor}`}>{content}</p>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MAIN STORY SCROLL COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function StoryScrollCinema({
  title,
  artist,
  year,
  sections,
  backgroundImage,
  mood = 'peaceful',
  onComplete,
}: StoryScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const theme = MOOD_THEMES[mood];
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 });
  
  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Detect completion
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.95 && onComplete) {
        onComplete();
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, onComplete]);
  
  return (
    <div ref={containerRef} className="relative">
      {/* Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 h-1 ${theme.accentColor.replace('text-', 'bg-')} z-50`}
        style={{ width: progressWidth }}
      />
      
      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ y: smoothBackgroundY }}
      >
        {backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        )}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bgOverlay}`} />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Opening Title */}
        <TitleSection title={title} artist={artist} year={year} theme={theme} />
        
        {/* Story Sections */}
        {sections.map((section) => {
          switch (section.type) {
            case 'text':
              return (
                <TextSection
                  key={section.id}
                  content={section.content}
                  animation={section.animation}
                  theme={theme}
                />
              );
            case 'quote':
              return (
                <QuoteSection
                  key={section.id}
                  content={section.content}
                  author={section.subContent}
                  theme={theme}
                />
              );
            case 'timeline':
              return (
                <TimelineSection
                  key={section.id}
                  year={section.year || 0}
                  content={section.content}
                  theme={theme}
                />
              );
            case 'fact':
              return (
                <FactSection
                  key={section.id}
                  content={section.content}
                  theme={theme}
                />
              );
            default:
              return null;
          }
        })}
        
        {/* Ending */}
        <motion.div
          className="min-h-[50vh] flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <motion.div
              className={`text-4xl ${theme.accentColor} mb-4`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎵
            </motion.div>
            <p className={`text-lg ${theme.textColor}/60`}>
              Câu chuyện của "{title}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    EXAMPLE USAGE
// ═══════════════════════════════════════════════════════════════════════════════

/*
import { StoryScrollCinema } from '@/components/visual/StoryScrollCinema';

const diemXuaStory = {
  title: "Diễm Xưa",
  artist: "Trịnh Công Sơn",
  year: 1960,
  mood: "melancholic" as const,
  backgroundImage: "/images/hue-rain.jpg",
  sections: [
    {
      id: "1",
      type: "text" as const,
      content: "Năm 1960, tại thành phố Huế mộng mơ, một chàng nhạc sĩ trẻ đã viết nên một trong những bản tình ca đẹp nhất của âm nhạc Việt Nam.",
      animation: "typewriter" as const,
    },
    {
      id: "2",
      type: "timeline" as const,
      year: 1960,
      content: "Trịnh Công Sơn gặp Ngô Vũ Bích Diễm - người con gái đã truyền cảm hứng cho bài hát này.",
    },
    {
      id: "3",
      type: "quote" as const,
      content: "Tôi viết Diễm Xưa như một lời tạ từ với mối tình đầu, với tuổi trẻ đã qua.",
      subContent: "Trịnh Công Sơn",
    },
    {
      id: "4",
      type: "fact" as const,
      content: "Diễm Xưa được viết trong vòng một đêm, khi Trịnh Công Sơn ngồi bên cửa sổ nhìn mưa rơi trên những mái nhà cổ của Huế.",
    },
  ],
};

function SongStoryPage() {
  return (
    <StoryScrollCinema {...diemXuaStory} />
  );
}
*/

export default StoryScrollCinema;
