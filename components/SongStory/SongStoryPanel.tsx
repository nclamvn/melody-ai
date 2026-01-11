'use client';

// ═══════════════════════════════════════════════════════════════════════════════
//                    Song Story Panel
//                    Progressive loading with streaming text
// ═══════════════════════════════════════════════════════════════════════════════

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSongStory } from '@/lib/hooks/useSongStory';
import { SongStorySkeleton } from './SongStorySkeleton';

interface SongStoryPanelProps {
  songTitle: string | null;
  artistName?: string | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

// Typing cursor component
const TypingCursor = () => (
  <motion.span
    className="typing-cursor"
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.5, repeat: Infinity }}
    style={{ color: '#3b82f6', fontWeight: 300 }}
  >
    |
  </motion.span>
);

// Confidence badge
const ConfidenceBadge = ({
  confidence,
  sources
}: {
  confidence: string;
  sources: string[];
}) => {
  const badges: Record<string, { label: string; color: string }> = {
    verified: { label: '★ Đã xác minh', color: '#8b5cf6' },
    high: { label: '✓ Độ tin cậy cao', color: '#22c55e' },
    medium: { label: '● Độ tin cậy trung bình', color: '#eab308' },
    low: { label: '○ Thông tin hạn chế', color: '#f97316' },
    none: { label: '? Không có nguồn xác minh', color: '#9ca3af' },
  };

  const badge = badges[confidence] || badges.none;

  return (
    <div className="confidence-badge">
      <span className="badge" style={{ color: badge.color }}>
        {badge.label}
      </span>
      {sources.length > 0 && (
        <span className="sources-info">
          Nguồn: {sources.join(', ')}
        </span>
      )}

      <style jsx>{`
        .confidence-badge {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          margin-top: 1.5rem;
        }

        .badge {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .sources-info {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export function SongStoryPanel({
  songTitle,
  artistName,
  isOpen,
  onClose,
  className = '',
}: SongStoryPanelProps) {
  const {
    title,
    artist,
    isLoading,
    phase,
    phaseMessage,
    metadata,
    sources,
    streamingText,
    isStreaming,
    content,
    displayText,
    duration,
    error,
    hasContent,
    refetch,
  } = useSongStory(isOpen ? songTitle : null, artistName);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`song-story-panel ${className}`}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="panel-header">
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Đóng"
          >
            ✕
          </button>
          <h1 className="panel-title">Câu chuyện bài hát</h1>
        </div>

        {/* Content */}
        <div className="panel-content">
          {/* Loading state with skeleton */}
          {isLoading && !hasContent && (
            <SongStorySkeleton
              title={title}
              artist={artist}
              phase={phase}
              phaseMessage={phaseMessage}
              sources={sources}
            />
          )}

          {/* Progressive content */}
          <AnimatePresence mode="wait">
            {/* Basic info - always show if available */}
            {(title || artist) && !isLoading && (
              <motion.div
                key="header-info"
                className="content-header"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="song-title">{title}</h2>
                <p className="song-artist">{artist}</p>

                {/* Metadata */}
                {metadata && (
                  <div className="metadata-row">
                    {metadata.releaseYear && (
                      <span className="metadata-item">
                        {metadata.releaseYear}
                      </span>
                    )}
                    {metadata.album && (
                      <span className="metadata-item">
                        {metadata.album}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Streaming text */}
            {isStreaming && (
              <motion.div
                key="streaming"
                className="streaming-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="streaming-header">
                  <span className="streaming-indicator">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ●
                    </motion.span>
                    {' '}Đang tạo câu chuyện...
                  </span>
                </div>
                <div className="streaming-text">
                  {streamingText}
                  <TypingCursor />
                </div>
              </motion.div>
            )}

            {/* Final content */}
            {!isStreaming && hasContent && (
              <motion.div
                key="content"
                className="final-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Main story */}
                <div className="story-section">
                  <h3>Câu chuyện</h3>
                  <div className="story-text">
                    {displayText.split('\n').map((paragraph, i) => (
                      paragraph.trim() && (
                        <p key={i}>{paragraph}</p>
                      )
                    ))}
                  </div>
                </div>

                {/* Confidence & Sources */}
                {content && (
                  <ConfidenceBadge
                    confidence={content.confidence}
                    sources={content.sources}
                  />
                )}

                {/* Duration */}
                {duration > 0 && (
                  <div className="duration-info">
                    Tải trong {(duration / 1000).toFixed(1)}s
                  </div>
                )}
              </motion.div>
            )}

            {/* Error state */}
            {error && (
              <motion.div
                key="error"
                className="error-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="error-icon">⚠️</div>
                <p className="error-message">{error}</p>
                <button
                  className="retry-button"
                  onClick={refetch}
                >
                  Thử lại
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <style jsx>{`
          .song-story-panel {
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            width: 420px;
            max-width: 100vw;
            background: linear-gradient(
              180deg,
              rgba(15, 15, 25, 0.98) 0%,
              rgba(10, 10, 20, 0.98) 100%
            );
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            overflow-y: auto;
            z-index: 1000;
            display: flex;
            flex-direction: column;
          }

          .panel-header {
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background: rgba(15, 15, 25, 0.95);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            z-index: 10;
          }

          .close-button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .close-button:hover {
            background: rgba(255, 255, 255, 0.15);
            color: white;
          }

          .panel-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: white;
            margin: 0;
          }

          .panel-content {
            flex: 1;
            padding: 1.5rem;
          }

          .content-header {
            margin-bottom: 1.5rem;
          }

          .song-title {
            font-size: 1.5rem;
            font-weight: 600;
            color: white;
            margin: 0 0 0.5rem 0;
          }

          .song-artist {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            margin: 0 0 1rem 0;
          }

          .metadata-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
          }

          .metadata-item {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.375rem 0.75rem;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
          }

          .streaming-section {
            margin-bottom: 1.5rem;
          }

          .streaming-header {
            margin-bottom: 0.75rem;
          }

          .streaming-indicator {
            font-size: 0.875rem;
            color: #3b82f6;
          }

          .streaming-text {
            font-size: 1rem;
            line-height: 1.7;
            color: rgba(255, 255, 255, 0.9);
          }

          .final-content {
            animation: fadeIn 0.5s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .story-section {
            margin-bottom: 1.5rem;
          }

          .story-section h3 {
            font-size: 1rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
            margin: 0 0 0.75rem 0;
          }

          .story-text {
            font-size: 1rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.85);
          }

          .story-text p {
            margin: 0 0 1rem 0;
          }

          .story-text p:last-child {
            margin-bottom: 0;
          }

          .duration-info {
            margin-top: 1rem;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            text-align: right;
          }

          .error-section {
            text-align: center;
            padding: 2rem;
          }

          .error-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }

          .error-message {
            color: #ef4444;
            margin-bottom: 1rem;
          }

          .retry-button {
            padding: 0.5rem 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.2s;
          }

          .retry-button:hover {
            background: rgba(255, 255, 255, 0.15);
          }

          /* Mobile responsive */
          @media (max-width: 480px) {
            .song-story-panel {
              width: 100vw;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}

export default SongStoryPanel;
