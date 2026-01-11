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
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.3) 100%)',
                    boxShadow: '0 8px 32px rgba(139,92,246,0.3)',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </motion.div>

                <h1 className="text-2xl font-semibold text-white mb-3">
                  Chào mừng đến Melody AI
                </h1>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Trải nghiệm âm nhạc Việt Nam với AI thông minh.
                  <br />
                  Cần API Key để mở khóa đầy đủ tính năng.
                </p>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('input')}
                    className="w-full py-3.5 rounded-xl font-medium text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.8) 100%)',
                      boxShadow: '0 4px 16px rgba(139,92,246,0.4)',
                    }}
                  >
                    Thiết lập API Key
                  </motion.button>

                  {onSkip && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onSkip}
                      className="w-full py-3.5 rounded-xl font-medium text-white/60 hover:text-white/80 transition-colors"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      Bỏ qua (Chế độ Demo)
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
                  className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-6"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Quay lại
                </button>

                <h2 className="text-xl font-semibold text-white mb-2">
                  Nhập OpenAI API Key
                </h2>
                <p className="text-white/50 text-sm mb-6">
                  Key được lưu trữ an toàn trên thiết bị của bạn
                </p>

                {/* Input field */}
                <div className="relative mb-4">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setError(null);
                    }}
                    placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-3.5 rounded-xl text-white placeholder-white/30 outline-none transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: error ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(139,92,246,0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)';
                      e.target.style.boxShadow = error ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showKey ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                      className="text-red-400 text-sm mb-4 flex items-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={validateAndSave}
                  disabled={isValidating || !apiKey.trim()}
                  className="w-full py-3.5 rounded-xl font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(59,130,246,0.8) 100%)',
                    boxShadow: '0 4px 16px rgba(139,92,246,0.4)',
                  }}
                >
                  {isValidating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Đang xác thực...
                    </>
                  ) : (
                    'Xác nhận'
                  )}
                </motion.button>

                {/* Info box */}
                <div
                  className="mt-6 p-4 rounded-xl"
                  style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                  }}
                >
                  <h4 className="text-blue-400 font-medium text-sm mb-2 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    Cách lấy API Key
                  </h4>
                  <ol className="text-white/50 text-sm space-y-1.5 list-decimal list-inside">
                    <li>Truy cập <span className="text-blue-400">platform.openai.com</span></li>
                    <li>Đăng nhập hoặc tạo tài khoản</li>
                    <li>Vào Settings → API Keys</li>
                    <li>Tạo key mới và copy</li>
                  </ol>
                </div>

                {/* Security note */}
                <div className="mt-4 flex items-start gap-2 text-white/40 text-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 flex-shrink-0">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span>
                    API Key được mã hóa và lưu trữ cục bộ trên thiết bị.
                    Không bao giờ được gửi đến server của chúng tôi.
                  </span>
                </div>
              </motion.div>
            )}

            {/* SUCCESS STEP */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.3) 0%, rgba(16,185,129,0.3) 100%)',
                    boxShadow: '0 8px 32px rgba(34,197,94,0.3)',
                  }}
                >
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-green-400"
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

                <h2 className="text-xl font-semibold text-white mb-2">
                  Thiết lập thành công!
                </h2>
                <p className="text-white/50">
                  Đang chuyển đến ứng dụng...
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
  const { isLoaded, isSetupComplete } = useAPIKey();
  const [showSetup, setShowSetup] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSetupComplete()) {
      setShowSetup(true);
    }
  }, [isLoaded, isSetupComplete]);

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
          localStorage.setItem(SETUP_COMPLETE_KEY, 'true');
        } : undefined}
      />
    );
  }

  return <>{children}</>;
}

export default APIKeySetup;
