// ═══════════════════════════════════════════════════════════════════════════════
//                    APP PROVIDER
//                    Client-side wrapper for app-wide providers
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import React from 'react';
import { APIKeyGate } from '@/components/setup';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <APIKeyGate allowDemo={true}>
      {children}
    </APIKeyGate>
  );
}

export default AppProvider;
