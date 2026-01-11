"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { VisualizerStyle, StyleConfig } from '@/types/synesthesia';

const STYLES: StyleConfig[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    nameVi: 'Cực Quang',
    description: 'Dải ánh sáng uốn lượn như cực quang Bắc Âu',
    icon: '',
    colors: {
      bass: '#6B21A8',
      lowMid: '#0891B2',
      mid: '#F59E0B',
      highMid: '#10B981',
      high: '#FFFFFF',
    },
  },
  {
    id: 'particles',
    name: 'Particles',
    nameVi: 'Hạt Vũ Trụ',
    description: 'Hàng nghìn hạt sáng phản ứng theo âm thanh',
    icon: '',
    colors: {
      bass: '#DC2626',
      lowMid: '#F97316',
      mid: '#FACC15',
      highMid: '#22D3EE',
      high: '#A78BFA',
    },
  },
  {
    id: 'geometry',
    name: 'Geometry',
    nameVi: 'Hình Học',
    description: 'Hình học thiêng liêng xoay chuyển theo nhịp',
    icon: '',
    colors: {
      bass: '#7C3AED',
      lowMid: '#2563EB',
      mid: '#10B981',
      highMid: '#F59E0B',
      high: '#EC4899',
    },
  },
  {
    id: 'liquid',
    name: 'Liquid',
    nameVi: 'Chất Lỏng',
    description: 'Mô phỏng chất lỏng sống động theo giai điệu',
    icon: '',
    colors: {
      bass: '#1E40AF',
      lowMid: '#7C3AED',
      mid: '#DB2777',
      highMid: '#F97316',
      high: '#FCD34D',
    },
  },
  {
    id: 'nebula',
    name: 'Nebula',
    nameVi: 'Tinh Vân',
    description: 'Tinh vân và bụi vũ trụ lung linh huyền ảo',
    icon: '',
    colors: {
      bass: '#312E81',
      lowMid: '#7C3AED',
      mid: '#F59E0B',
      highMid: '#06B6D4',
      high: '#FFFFFF',
    },
  },
];

interface StyleSelectorProps {
  currentStyle: VisualizerStyle;
  onStyleChange: (style: VisualizerStyle) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function StyleSelector({
  currentStyle,
  onStyleChange,
  isOpen,
  onClose
}: StyleSelectorProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-28 left-4 right-4 z-50 max-w-2xl mx-auto"
          >
            <div
              className="rounded-[28px] p-6 md:p-8"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
                backdropFilter: 'blur(40px) saturate(150%)',
                WebkitBackdropFilter: 'blur(40px) saturate(150%)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[20px] font-medium text-white tracking-tight">
                  Chọn Phong Cách
                </h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Style Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STYLES.map((style) => (
                  <motion.button
                    key={style.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onStyleChange(style.id);
                      onClose();
                    }}
                    className="relative p-4 rounded-2xl text-left transition-all group"
                    style={{
                      background: currentStyle === style.id
                        ? 'rgba(255,255,255,0.12)'
                        : 'rgba(255,255,255,0.04)',
                      boxShadow: currentStyle === style.id
                        ? 'inset 0 0 0 2px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.2)'
                        : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Color dots */}
                    <div className="flex gap-1.5 mb-4">
                      {Object.values(style.colors).map((color, index) => (
                        <motion.div
                          key={index}
                          className="w-3.5 h-3.5 rounded-full"
                          style={{
                            backgroundColor: color,
                            boxShadow: `0 2px 8px ${color}40`,
                          }}
                          initial={false}
                          animate={{
                            scale: currentStyle === style.id ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            repeat: currentStyle === style.id ? Infinity : 0,
                            repeatDelay: 2,
                          }}
                        />
                      ))}
                    </div>

                    {/* Title */}
                    <h4 className="text-[15px] font-medium text-white mb-1.5">
                      {style.nameVi}
                    </h4>

                    {/* Description */}
                    <p className="text-[12px] text-white/50 leading-relaxed line-clamp-2">
                      {style.description}
                    </p>

                    {/* Selected indicator */}
                    {currentStyle === style.id && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(255,255,255,0.9)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                      >
                        <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 50% 100%, ${Object.values(style.colors)[0]}20 0%, transparent 70%)`,
                      }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Footer hint */}
              <p className="mt-5 text-center text-[11px] text-white/30">
                Mỗi phong cách phản ứng khác nhau theo âm nhạc
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
