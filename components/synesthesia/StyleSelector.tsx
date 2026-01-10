"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { VisualizerStyle, StyleConfig } from '@/types/synesthesia';

const STYLES: StyleConfig[] = [
  {
    id: 'aurora',
    name: 'Aurora',
    nameVi: 'Cuc Quang',
    description: 'Dai anh sang uon luon nhu cuc quang',
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
    nameVi: 'Hat Vu Tru',
    description: 'Hang nghin hat phan ung theo am thanh',
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
    nameVi: 'Hinh Hoc',
    description: 'Hinh hoc thieng lieng xoay chuyen',
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
    nameVi: 'Chat Long',
    description: 'Mo phong chat long phan ung theo nhip',
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
    nameVi: 'Tinh Van',
    description: 'Tinh van va bui vu tru lung linh',
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 left-4 right-4 z-50 max-w-2xl mx-auto"
          >
            <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <h3 className="text-lg font-semibold text-white mb-4">
                Chon Phong Cach
              </h3>

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
                    className={`
                      relative p-4 rounded-2xl text-left transition-all
                      ${currentStyle === style.id
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex gap-1 mb-3">
                      {Object.values(style.colors).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">
                        {style.nameVi}
                      </span>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2">
                      {style.description}
                    </p>

                    {currentStyle === style.id && (
                      <motion.div
                        layoutId="activeStyle"
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
