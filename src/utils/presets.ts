import type { ScrollbarPreset } from '../types';

export const scrollbarPresets: ScrollbarPreset[] = [
  {
    name: 'Default',
    description: 'Clean and minimal',
    config: {
      thumbColor: '#94a3b8',
      trackColor: 'transparent',
      hoverColor: '#64748b',
      width: 8,
      height: 8,
      thumbRadius: 4,
      trackRadius: 4,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
    icon: '🎨'
  },
  {
    name: 'Dark Mode',
    description: 'Perfect for dark themes',
    config: {
      thumbColor: '#374151',
      trackColor: '#1f2937',
      hoverColor: '#4b5563',
      width: 8,
      height: 8,
      thumbRadius: 5,
      trackRadius: 5,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    icon: '🌙'
  },
  {
    name: 'Neon',
    description: 'Electric and vibrant',
    config: {
      thumbColor: '#10b981',
      trackColor: '#064e3b',
      hoverColor: '#059669',
      width: 8,
      height: 8,
      thumbRadius: 6,
      trackRadius: 6,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: '⚡'
  },
  {
    name: 'Glassmorphism',
    description: 'Translucent and modern',
    config: {
      thumbColor: 'rgba(255, 255, 255, 0.3)',
      trackColor: 'rgba(255, 255, 255, 0.1)',
      hoverColor: 'rgba(255, 255, 255, 0.5)',
      width: 8,
      height: 8,
      thumbRadius: 7,
      trackRadius: 7,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
    icon: '🔮'
  },
  {
    name: 'Ocean Breeze',
    description: 'Calm and refreshing',
    config: {
      thumbColor: '#0ea5e9',
      trackColor: '#e0f2fe',
      hoverColor: '#0284c7',
      width: 8,
      height: 8,
      thumbRadius: 5,
      trackRadius: 5,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    icon: '🌊'
  },
  {
    name: 'Cyberpunk',
    description: 'Futuristic and bold',
    config: {
      thumbColor: '#f59e0b',
      trackColor: '#7c2d12',
      hoverColor: '#d97706',
      width: 8,
      height: 8,
      thumbRadius: 2,
      trackRadius: 2,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: '🤖'
  },
  {
    name: 'Sunset',
    description: 'Warm and inviting',
    config: {
      thumbColor: '#f97316',
      trackColor: '#fed7aa',
      hoverColor: '#ea580c',
      width: 8,
      height: 8,
      thumbRadius: 6,
      trackRadius: 6,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    icon: '🌅'
  },
  {
    name: 'Forest',
    description: 'Natural and earthy',
    config: {
      thumbColor: '#16a34a',
      trackColor: '#dcfce7',
      hoverColor: '#15803d',
      width: 8,
      height: 8,
      thumbRadius: 5,
      trackRadius: 5,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    icon: '🌲'
  },
  {
    name: 'Lavender',
    description: 'Soft and elegant',
    config: {
      thumbColor: '#8b5cf6',
      trackColor: '#f3e8ff',
      hoverColor: '#7c3aed',
      width: 8,
      height: 8,
      thumbRadius: 4,
      trackRadius: 4,
      visibility: 'auto'
    },
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    icon: '🌸'
  },
  {
    name: 'Invisible',
    description: 'Minimal and hidden',
    config: {
      thumbColor: 'transparent',
      trackColor: 'transparent',
      hoverColor: 'rgba(0, 0, 0, 0.1)',
      width: 0,
      height: 0,
      thumbRadius: 0,
      trackRadius: 0,
      visibility: 'hidden'
    },
    gradient: 'linear-gradient(135deg, transparent 0%, transparent 100%)',
    icon: '👻'
  }
];
