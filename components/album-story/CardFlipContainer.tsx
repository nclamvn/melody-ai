"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface CardFlipContainerProps {
  pages: ReactNode[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onClose?: () => void;
}

export default function CardFlipContainer({
  pages,
  currentPage,
  onPageChange,
  onClose,
}: CardFlipContainerProps) {
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;

    if (info.offset.x < -threshold && currentPage < pages.length - 1) {
      setDirection("next");
      onPageChange(currentPage + 1);
    } else if (info.offset.x > threshold && currentPage > 0) {
      setDirection("prev");
      onPageChange(currentPage - 1);
    }
  };

  // 3D Flip animation variants
  const flipVariants = {
    enter: (dir: "next" | "prev") => ({
      rotateY: dir === "next" ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      z: -100,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: (dir: "next" | "prev") => ({
      rotateY: dir === "next" ? -90 : 90,
      opacity: 0,
      scale: 0.9,
      z: -100,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <div className="relative w-full h-full" ref={containerRef}>
      {/* Close Button - Inside card, top right */}
      {onClose && (
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full
            bg-white/10 backdrop-blur-xl border border-white/20
            flex items-center justify-center text-white/70 hover:text-white
            hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}

      {/* 3D Flip Container */}
      <div
        className="relative w-full h-full"
        style={{
          perspective: "1500px",
          transformStyle: "preserve-3d",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={flipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
