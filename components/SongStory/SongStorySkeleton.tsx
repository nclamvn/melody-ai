'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LoadingPhase, SourceStatus } from '@/lib/hooks/useSongStory';

interface SongStorySkeletonProps {
  title?: string | null;
  artist?: string | null;
  phase: LoadingPhase;
  phaseMessage: string;
  sources: SourceStatus[];
}

export function SongStorySkeleton({
  title,
  artist,
  phase,
  phaseMessage,
  sources,
}: SongStorySkeletonProps) {
  return (
    <div className="skeleton-container">
      {/* Title skeleton or actual title */}
      <div className="skeleton-header">
        {title ? (
          <h2 className="actual-title">{title}</h2>
        ) : (
          <div className="skeleton-line title-line" />
        )}
        {artist ? (
          <p className="actual-artist">{artist}</p>
        ) : (
          <div className="skeleton-line artist-line" />
        )}
      </div>

      {/* Phase indicator */}
      <motion.div
        className="phase-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span
          className="phase-dot"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ●
        </motion.span>
        <span className="phase-message">{phaseMessage}</span>
      </motion.div>

      {/* Sources status */}
      {sources.length > 0 && (
        <div className="sources-list">
          {sources.map((source) => (
            <div key={source.name} className="source-item">
              <span
                className={`source-status ${source.status}`}
              >
                {source.status === 'found' ? '✓' :
                 source.status === 'not_found' ? '✗' :
                 source.status === 'rejected' ? '⚠' :
                 source.status === 'searching' ? '...' : '!'}
              </span>
              <span className="source-name">{source.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Content skeleton */}
      <div className="skeleton-content">
        <div className="skeleton-line full" />
        <div className="skeleton-line full" />
        <div className="skeleton-line three-quarters" />
        <div className="skeleton-line full" />
        <div className="skeleton-line half" />
      </div>

      <style jsx>{`
        .skeleton-container {
          padding: 1rem 0;
        }

        .skeleton-header {
          margin-bottom: 1.5rem;
        }

        .actual-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin: 0 0 0.5rem 0;
        }

        .actual-artist {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .skeleton-line {
          height: 1rem;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.06) 25%,
            rgba(255, 255, 255, 0.12) 50%,
            rgba(255, 255, 255, 0.06) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 0.75rem;
        }

        .title-line {
          height: 1.75rem;
          width: 70%;
        }

        .artist-line {
          height: 1.25rem;
          width: 40%;
        }

        .full { width: 100%; }
        .three-quarters { width: 75%; }
        .half { width: 50%; }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .phase-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.75rem 1rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .phase-dot {
          color: #3b82f6;
          font-size: 0.75rem;
        }

        .phase-message {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
        }

        .sources-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .source-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.75rem;
        }

        .source-status {
          font-weight: 600;
        }

        .source-status.found {
          color: #22c55e;
        }

        .source-status.not_found {
          color: #6b7280;
        }

        .source-status.searching {
          color: #3b82f6;
        }

        .source-status.error {
          color: #ef4444;
        }

        .source-status.rejected {
          color: #f97316;
        }

        .source-name {
          color: rgba(255, 255, 255, 0.7);
        }

        .skeleton-content {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

export default SongStorySkeleton;
