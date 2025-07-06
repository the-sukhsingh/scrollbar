import { useState, useEffect, useCallback } from 'react';
import type { ScrollbarConfig, ThemeMode } from '../types';
import { applyScrollbarStyles, saveConfigToStorage, loadConfigFromStorage } from '../utils/scrollbar';

const defaultConfig: ScrollbarConfig = {
  thumbColor: '#94a3b8',
  trackColor: 'transparent',
  hoverColor: '#64748b',
  width: 8,
  height: 8,
  thumbRadius: 4,
  trackRadius: 4,
  visibility: 'auto'
};

export const useScrollbarConfig = () => {
  const [config, setConfig] = useState<ScrollbarConfig>(defaultConfig);
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = loadConfigFromStorage();
    if (savedConfig) {
      setConfig(savedConfig);
      applyScrollbarStyles(savedConfig);
    } else {
      applyScrollbarStyles(defaultConfig);
    }

    // Check for system theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  // Apply styles whenever config changes
  useEffect(() => {
    applyScrollbarStyles(config);
    saveConfigToStorage(config);
  }, [config]);

  // Also apply styles when the component first mounts
  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      applyScrollbarStyles(config);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<ScrollbarConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return {
    config,
    theme,
    updateConfig,
    resetConfig,
    toggleTheme,
    setConfig
  };
};
