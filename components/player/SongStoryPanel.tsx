"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, User, MusicDoubleNote, Link as LinkIcon, NavArrowDown, Xmark } from "iconoir-react";

interface SongStory {
  story: string | null;
  authorInfo: string | null;
  songInfo: {
    album?: string;
    releaseYear?: string;
    genre?: string;
    awards?: string[];
  };
  sources: {
    name: string;
    url: string;
  }[];
}

interface SongStoryPanelProps {
  title: string;
  artist: string;
  isVisible: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function SongStoryPanel({
  title,
  artist,
  isVisible,
  onClose,
  isMobile = false,
}: SongStoryPanelProps) {
  const [story, setStory] = useState<SongStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Default expand story section
  const [expandedSection, setExpandedSection] = useState<string>("story");

  useEffect(() => {
    if (isVisible && title && artist) {
      fetchStory();
    }
  }, [title, artist, isVisible]);

  const fetchStory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/song-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, artist }),
      });

      const data = await response.json();

      if (data.success) {
        setStory(data.data);
      } else {
        setError("Không thể tải thông tin bài hát");
      }
    } catch (err) {
      console.error("Failed to fetch story:", err);
      setError("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(section);
  };

  const panelVariants = {
    hidden: isMobile
      ? { y: "100%", opacity: 0 }
      : { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 200 },
    },
    exit: isMobile
      ? { y: "100%", opacity: 0, transition: { duration: 0.3 } }
      : { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`
            ${isMobile
              ? "fixed inset-x-0 bottom-0 z-50 max-h-[70vh] rounded-t-3xl"
              : "h-full w-full"
            }
          `}
        >
          <div
            className={`
              h-full overflow-hidden flex flex-col bg-white/[0.03] backdrop-blur-xl
              ${isMobile ? "rounded-t-3xl" : "rounded-2xl"}
            `}
            style={{
              boxShadow: "0 -4px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Mobile Drag Handle */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Book className="w-4 h-4 text-purple-400" strokeWidth={2} />
                </div>
                <h3 className="text-[15px] font-semibold text-white">
                  Câu Chuyện Bài Hát
                </h3>
              </div>

              {isMobile && onClose && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <Xmark className="w-4 h-4 text-white/60" strokeWidth={2} />
                </motion.button>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {isLoading ? (
                <LoadingSkeleton />
              ) : error ? (
                <ErrorState message={error} onRetry={fetchStory} />
              ) : story ? (
                <>
                  {/* Song Story Section */}
                  {story.story && (
                    <CollapsibleSection
                      icon={<Book className="w-4 h-4" strokeWidth={2} />}
                      title="Hoàn Cảnh Ra Đời"
                      isExpanded={expandedSection === "story"}
                      onToggle={() => toggleSection("story")}
                      accentColor="blue"
                    >
                      <p className="text-[13px] text-white/60 leading-relaxed whitespace-pre-line">
                        {story.story}
                      </p>
                    </CollapsibleSection>
                  )}

                  {/* Author Info Section */}
                  {story.authorInfo && (
                    <CollapsibleSection
                      icon={<User className="w-4 h-4" strokeWidth={2} />}
                      title={`Về ${artist}`}
                      isExpanded={expandedSection === "author"}
                      onToggle={() => toggleSection("author")}
                      accentColor="purple"
                    >
                      <p className="text-[13px] text-white/60 leading-relaxed whitespace-pre-line">
                        {story.authorInfo}
                      </p>
                    </CollapsibleSection>
                  )}

                  {/* Song Info Section */}
                  {story.songInfo && (
                    <CollapsibleSection
                      icon={<MusicDoubleNote className="w-4 h-4" strokeWidth={2} />}
                      title="Thông Tin Bài Hát"
                      isExpanded={expandedSection === "songInfo"}
                      onToggle={() => toggleSection("songInfo")}
                      accentColor="cyan"
                    >
                      <div className="space-y-2">
                        {story.songInfo.album && (
                          <InfoRow label="Album" value={story.songInfo.album} />
                        )}
                        {story.songInfo.releaseYear && (
                          <InfoRow label="Năm phát hành" value={story.songInfo.releaseYear} />
                        )}
                        {story.songInfo.genre && (
                          <InfoRow label="Thể loại" value={story.songInfo.genre} />
                        )}
                        {story.songInfo.awards && story.songInfo.awards.length > 0 && (
                          <div>
                            <span className="text-[11px] text-white/40">Giải thưởng:</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {story.songInfo.awards.map((award, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px]"
                                >
                                  {award}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CollapsibleSection>
                  )}

                  {/* Sources Section */}
                  {story.sources && story.sources.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <LinkIcon className="w-3.5 h-3.5 text-white/30" strokeWidth={2} />
                        <span className="text-[11px] text-white/30">Nguồn tham khảo</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {story.sources.map((source, index) => (
                          <a
                            key={index}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                              bg-white/5 border border-white/10
                              text-[11px] text-white/50
                              hover:text-blue-400 hover:border-blue-400/30
                              transition-all duration-200"
                          >
                            <span>{source.name}</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <EmptyState title={title} artist={artist} />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Collapsible Section Component
function CollapsibleSection({
  icon,
  title,
  children,
  isExpanded,
  onToggle,
  accentColor = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  accentColor?: string;
}) {
  const colors: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
    cyan: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  };

  const color = colors[accentColor] || colors.blue;

  return (
    <div className="bg-white/5 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg ${color.bg} flex items-center justify-center ${color.text}`}>
            {icon}
          </div>
          <span className="text-[13px] font-medium text-white">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <NavArrowDown className="w-4 h-4 text-white/40" strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Info Row Component
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[11px] text-white/40">{label}</span>
      <span className="text-[13px] text-white">{value}</span>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/10 animate-pulse" />
            <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-4/5 bg-white/10 rounded animate-pulse" />
            <div className="h-3 w-3/5 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error State
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
        <Xmark className="w-6 h-6 text-red-500" strokeWidth={2} />
      </div>
      <p className="text-[13px] text-white/60 mb-4">{message}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="px-4 py-2 rounded-full bg-white/10 text-white text-[13px]"
      >
        Thử lại
      </motion.button>
    </div>
  );
}

// Empty State
function EmptyState({ title, artist }: { title: string; artist: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
        <Book className="w-6 h-6 text-white/30" strokeWidth={1.5} />
      </div>
      <h4 className="text-[15px] font-medium text-white mb-2">Chưa có thông tin</h4>
      <p className="text-[13px] text-white/50 max-w-xs mx-auto">
        Hiện chưa có thông tin về bài hát &ldquo;{title}&rdquo; - {artist}
      </p>
    </div>
  );
}
