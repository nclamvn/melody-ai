// ═══════════════════════════════════════════════════════════════════════════════
//                    API KEY SETUP COMPONENT
//                    First-time setup with Apple Vision Pro design
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ═══════════════════════════════════════════════════════════════════════════════
//                    CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = 'melody_ai_api_key';
const SETUP_COMPLETE_KEY = 'melody_ai_setup_complete';

// ═══════════════════════════════════════════════════════════════════════════════
//                    UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

// Simple obfuscation (not encryption, but prevents casual viewing)
function obfuscate(text: string): string {
  return btoa(text.split('').reverse().join(''));
}

function deobfuscate(text: string): string {
  try {
    return atob(text).split('').reverse().join('');
  } catch {
    return '';
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    HOOKS
// ═══════════════════════════════════════════════════════════════════════════════

export function useAPIKey() {
  const [apiKey, setApiKeyState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setApiKeyState(deobfuscate(stored));
    }
    setIsLoaded(true);
  }, []);

  const setApiKey = (key: string) => {
    localStorage.setItem(STORAGE_KEY, obfuscate(key));
    localStorage.setItem(SETUP_COMPLETE_KEY, 'true');
    setApiKeyState(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETUP_COMPLETE_KEY);
    setApiKeyState(null);
  };

  const isSetupComplete = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(SETUP_COMPLETE_KEY) === 'true';
  };

  return { apiKey, setApiKey, clearApiKey, isLoaded, isSetupComplete };
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface APIKeySetupProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function APIKeySetup({ onComplete, onSkip }: APIKeySetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'intro' | 'input' | 'success'>('intro');
  const { setApiKey: saveApiKey } = useAPIKey();

  const validateAndSave = async () => {
    if (!apiKey.trim()) {
      setError('Vui lòng nhập API Key');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      setError('API Key phải bắt đầu bằng "sk-"');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      // Test API key with a minimal request
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (response.ok) {
        saveApiKey(apiKey);
        setStep('success');
        setTimeout(onComplete, 1500);
      } else if (response.status === 401) {
        setError('API Key không hợp lệ. Vui lòng kiểm tra lại.');
      } else {
        setError('Không thể xác thực. Vui lòng thử lại.');
      }
    } catch {
      setError('Lỗi kết nối. Vui lòng kiểm tra mạng.');
    } finally {
      setIsValidating(false);
    }
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.slice(0, 7) + '•'.repeat(key.length - 11) + key.slice(-4);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-lg mx-4"
      >
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(150%)',
            WebkitBackdropFilter: 'blur(40px) saturate(150%)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <AnimatePresence mode="wait">
            {/* INTRO STEP */}
            {step === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center"
              >
                {/* Logo - Apple Vision Style */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.2, damping: 20 }}
                  className="w-24 h-24 mx-auto mb-8 rounded-[28px] flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Subtle inner glow */}
                  <div
                    className="absolute inset-0 rounded-[28px]"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                    }}
                  />
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="relative z-10">
                    <path
                      d="M9 18V5l12-2v13"
                      stroke="rgba(255,255,255,0.9)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="6" cy="18" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="rgba(255,255,255,0.1)"/>
                    <circle cx="18" cy="16" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="rgba(255,255,255,0.1)"/>
                  </svg>
                </motion.div>

                <h1 className="text-[28px] font-medium text-white mb-3 tracking-tight">
                  Melody AI
                </h1>
                <p className="text-white/50 mb-10 leading-relaxed text-[15px]">
                  Trải nghiệm âm nhạc Việt Nam với AI
                </p>

                <div className="space-y-3">
                  {/* Primary Button - Clean white style */}
                  <motion.button
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.95)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setStep('input')}
                    className="w-full py-4 rounded-2xl font-medium text-[15px] transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.9)',
                      color: '#000',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    Thiết lập API Key
                  </motion.button>

                  {/* Secondary Button - Subtle glass */}
                  {onSkip && (
                    <motion.button
                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      whileTap={{ scale: 0.99 }}
                      onClick={onSkip}
                      className="w-full py-4 rounded-2xl font-medium text-[15px] text-white/70 hover:text-white/90 transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                      }}
                    >
                      Tiếp tục với Demo
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

            {/* INPUT STEP */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setStep('intro')}
                  className="flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors mb-8 text-[13px]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Quay lại
                </button>

                <h2 className="text-[22px] font-medium text-white mb-2 tracking-tight">
                  OpenAI API Key
                </h2>
                <p className="text-white/40 text-[14px] mb-6">
                  Key được lưu an toàn trên thiết bị của bạn
                </p>

                {/* Input field - Apple style */}
                <div className="relative mb-4">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setError(null);
                    }}
                    placeholder="sk-..."
                    className="w-full px-4 py-4 rounded-2xl text-white text-[15px] placeholder-white/25 outline-none transition-all font-mono"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      boxShadow: error
                        ? 'inset 0 0 0 1px rgba(239,68,68,0.4)'
                        : 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.25)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = error
                        ? 'inset 0 0 0 1px rgba(239,68,68,0.4)'
                        : 'inset 0 0 0 1px rgba(255,255,255,0.08)';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
                  >
                    {showKey ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400/90 text-[13px] mb-4 flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit button - Clean white */}
                <motion.button
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.95)' }}
                  whileTap={{ scale: 0.99 }}
                  onClick={validateAndSave}
                  disabled={isValidating || !apiKey.trim()}
                  className="w-full py-4 rounded-2xl font-medium text-[15px] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: '#000',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  {isValidating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-black/20 border-t-black/60 rounded-full"
                      />
                      Đang xác thực
                    </>
                  ) : (
                    'Xác nhận'
                  )}
                </motion.button>

                {/* Info box - Minimalist */}
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <p className="text-white/30 text-[12px] mb-3 uppercase tracking-wider">Hướng dẫn</p>
                  <ol className="text-white/50 text-[13px] space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[11px] text-white/40">1</span>
                      Truy cập platform.openai.com
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[11px] text-white/40">2</span>
                      Settings → API Keys → Create
                    </li>
                  </ol>
                </div>

                {/* Security note - Subtle */}
                <div className="mt-6 flex items-center justify-center gap-2 text-white/25 text-[11px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span>Lưu trữ cục bộ, không gửi đến server</span>
                </div>
              </motion.div>
            )}

            {/* SUCCESS STEP */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.1, damping: 20 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.1)',
                  }}
                >
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-white/80"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      d="M20 6L9 17l-5-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>

                <h2 className="text-[20px] font-medium text-white mb-2 tracking-tight">
                  Sẵn sàng
                </h2>
                <p className="text-white/40 text-[14px]">
                  Đang khởi động...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    WRAPPER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface APIKeyGateProps {
  children: React.ReactNode;
  allowDemo?: boolean;
}

export function APIKeyGate({ children, allowDemo = true }: APIKeyGateProps) {
  const { apiKey, isLoaded } = useAPIKey();
  const [showSetup, setShowSetup] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      // Always show setup if no API key (even if previously skipped)
      // User can skip again if they want demo mode
      if (!apiKey) {
        setShowSetup(true);
      }
    }
  }, [isLoaded, apiKey]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
        />
      </div>
    );
  }

  if (showSetup && !skipped) {
    return (
      <APIKeySetup
        onComplete={() => setShowSetup(false)}
        onSkip={allowDemo ? () => {
          setSkipped(true);
          // Don't save to localStorage - just skip for this session
          // Next time user opens app, they'll see setup again
        } : undefined}
      />
    );
  }

  return <>{children}</>;
}

export default APIKeySetup;
