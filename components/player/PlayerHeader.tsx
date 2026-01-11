"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, ShareIos, MoreHoriz } from "iconoir-react";
import { useRouter } from "next/navigation";

interface PlayerHeaderProps {
  autoHide?: boolean;
  onLike?: () => void;
  onShare?: () => void;
  onBack?: () => boolean; // Return true if handled, false to use default router.back()
  isLiked?: boolean;
}

export default function PlayerHeader({
  autoHide = true,
  onLike,
  onShare,
  onBack,
  isLiked = false,
}: PlayerHeaderProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    if (!autoHide) return;

    const handleInteraction = () => {
      setLastInteraction(Date.now());
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    const interval = setInterval(() => {
      if (Date.now() - lastInteraction > 5000) {
        setIsVisible(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      clearInterval(interval);
    };
  }, [autoHide, lastInteraction]);

  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: "Melody AI",
          text: "Nghe nhạc trên Melody AI",
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) onLike();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        >
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // If onBack is provided and handles the action, don't use router.back()
                if (onBack && onBack()) {
                  return;
                }
                router.back();
              }}
              className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center"
              aria-label="Quay lại"
            >
              <ArrowLeft className="w-5 h-5 text-primary" strokeWidth={2} />
            </motion.button>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center"
                aria-label="Yêu thích"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    liked ? "text-aurora-rose fill-aurora-rose" : "text-primary"
                  }`}
                  strokeWidth={2}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center"
                aria-label="Chia sẻ"
              >
                <ShareIos className="w-5 h-5 text-primary" strokeWidth={2} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center"
                aria-label="Thêm"
              >
                <MoreHoriz className="w-5 h-5 text-primary" strokeWidth={2} />
              </motion.button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
