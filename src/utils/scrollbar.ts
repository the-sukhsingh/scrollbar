import type { ScrollbarConfig } from '../types';

export const applyScrollbarStyles = (config: ScrollbarConfig) => {
  const root = document.documentElement;
  // Remove existing dynamic styles
  const existingStyle = document.getElementById('dynamic-scrollbar-styles');

  if (existingStyle) {
    existingStyle.remove();
  }

  // Apply CSS custom properties
  root.style.setProperty('--scrollbar-width', `${config.visibility === 'hidden' ? '0' : config.width}px`);
  root.style.setProperty('--scrollbar-height', `${config.visibility === 'hidden' ? '0' : config.height}px`);
  root.style.setProperty('--scrollbar-thumb-color', config.visibility === 'hidden' ? 'transparent' : config.thumbColor);
  root.style.setProperty('--scrollbar-track-color', config.visibility === 'hidden' ? 'transparent' : config.trackColor);
  root.style.setProperty('--scrollbar-thumb-hover-color', config.visibility === 'hidden' ? 'transparent' : config.hoverColor);
  root.style.setProperty('--scrollbar-thumb-radius', `${config.visibility === 'hidden' ? '0' : config.thumbRadius}px`);
  root.style.setProperty('--scrollbar-track-radius', `${config.visibility === 'hidden' ? '0' : config.trackRadius}px`);
  root.style.setProperty('--scrollbar-visibility', config.visibility);
  // Create and inject dynamic CSS for more reliable scrollbar styling
  const style = document.createElement('style');
  style.id = 'dynamic-scrollbar-styles';
  
  const css = `
    /* WebKit browsers (Chrome, Safari, Edge) */
    ::-webkit-scrollbar {
      width: ${config.visibility === 'hidden' ? '0' : config.width}px !important;
      height: ${config.visibility === 'hidden' ? '0' : config.height}px !important;
    }
    
    ::-webkit-scrollbar-track {
      background: ${config.visibility === 'hidden' ? 'transparent' : config.trackColor} !important;
      border-radius: ${config.trackRadius}px !important;
    }
    
    ::-webkit-scrollbar-thumb {
      background: ${config.visibility === 'hidden' ? 'transparent' : config.thumbColor} !important;
      border-radius: ${config.thumbRadius}px !important;
      transition: background-color 0.2s ease !important;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: ${config.hoverColor} !important;
    }
    
  `;
  
  style.textContent = css;
  document.head.appendChild(style);
  
  // Force reflow to ensure styles are applied immediately
  document.body.offsetHeight;
  
  // Handle visibility
  if (config.visibility === 'hidden') {
    root.style.setProperty('--scrollbar-width', '0px');
    root.style.setProperty('--scrollbar-height', '0px');
  } else if (config.visibility === 'visible') {
    // Force visible scrollbars
    document.body.style.overflow = 'scroll';
  } else {
    // Auto (default)
    document.body.style.overflow = 'auto';
  }
  
  // Force another reflow after visibility changes
  document.body.offsetHeight;
};

export const generateScrollbarCSS = (config: ScrollbarConfig): string => {
  
  return `/* Custom Scrollbar Styles */
::-webkit-scrollbar {
  width: ${config.width}px;
  height: ${config.height}px;
}

::-webkit-scrollbar-track {
  background: ${config.trackColor};
  border-radius: ${config.trackRadius}px;
}

::-webkit-scrollbar-thumb {
  background: ${config.thumbColor};
  border-radius: ${config.thumbRadius}px;
  transition: background-color 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: ${config.hoverColor};
}


/* For Internet Explorer */
body {
  -ms-overflow-style: ${config.visibility === 'hidden' ? 'none' : 'scrollbar'};
}`;
};

export const randomizeConfig = (): ScrollbarConfig => {
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
    '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
  ];
  
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const getRandomSize = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  return {
    thumbColor: getRandomColor(),
    trackColor: Math.random() > 0.5 ? 'transparent' : `${getRandomColor()}20`,
    hoverColor: getRandomColor(),
    width: getRandomSize(6, 20),
    height: getRandomSize(6, 20),
    thumbRadius: getRandomSize(0, 10),
    trackRadius: getRandomSize(0, 10),
    visibility: Math.random() > 0.8 ? 'hidden' : 'auto'
  };
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const saveConfigToStorage = (config: ScrollbarConfig) => {
  try {
    localStorage.setItem('scrollbar-config', JSON.stringify(config));
  } catch (error) {
    console.warn('Could not save config to localStorage:', error);
  }
};

export const loadConfigFromStorage = (): ScrollbarConfig | null => {
  try {
    const stored = localStorage.getItem('scrollbar-config');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Could not load config from localStorage:', error);
    return null;
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
