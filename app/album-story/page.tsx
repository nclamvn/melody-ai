"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlbumStoryPlayer } from "@/components/album-story";

function AlbumStoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const songId = searchParams.get("id") || "";
  const title = searchParams.get("title") || "Unknown Song";
  const artist = searchParams.get("artist") || "Unknown Artist";
  const coverImage = searchParams.get("cover") || "/default-cover.jpg";

  const handleClose = () => {
    // Go back to player page with song params
    const ytId = searchParams.get("ytId") || "";
    const params = new URLSearchParams({
      id: songId,
      title,
      artist,
      cover: coverImage,
      ytId,
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Album Story Player - Has cosmic background inside cards */}
      <AlbumStoryPlayer
        songId={songId}
        title={title}
        artist={artist}
        coverImage={coverImage}
        onClose={handleClose}
      />
    </div>
  );
}

export default function AlbumStoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050508] flex items-center justify-center">
          {/* Static cosmic gradient */}
          <div
            className="fixed inset-0"
            style={{
              background: "radial-gradient(ellipse at center, #0d0d1a 0%, #050508 50%, #000000 100%)",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-white/10 border-t-purple-500"
              style={{
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              }}
            />
            <span className="text-white/50 text-sm">Entering the cosmos...</span>
          </div>
        </div>
      }
    >
      <AlbumStoryContent />
    </Suspense>
  );
}
