export interface ScrollbarConfig {
  thumbColor: string;
  trackColor: string;
  hoverColor: string;
  width: number;
  height: number;
  thumbRadius: number;
  trackRadius: number;
  visibility: 'auto' | 'hidden' | 'visible';
  customCSS?: string;
}

export interface ScrollbarPreset {
  name: string;
  description: string;
  config: ScrollbarConfig;
  gradient?: string;
  icon?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface AppState {
  config: ScrollbarConfig;
  theme: ThemeMode;
  activeTab: 'controls' | 'presets' | 'code' | 'styles';
}
