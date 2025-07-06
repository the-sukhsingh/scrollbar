import React from 'react';
import { motion } from 'framer-motion';
import { Star, Zap } from 'lucide-react';
import { scrollbarPresets } from '../utils/presets';
import type { ScrollbarConfig } from '../types';

interface PresetsProps {
  currentConfig: ScrollbarConfig;
  onPresetSelect: (config: ScrollbarConfig) => void;
}

export const Presets: React.FC<PresetsProps> = ({ currentConfig, onPresetSelect }) => {
  const isCurrentPreset = (presetConfig: ScrollbarConfig) => {
    return JSON.stringify(presetConfig) === JSON.stringify(currentConfig);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Scrollbar Presets
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scrollbarPresets.map((preset, index) => (
          <motion.div
            key={preset.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
              isCurrentPreset(preset.config)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => onPresetSelect(preset.config)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Preset Icon */}
            <div className="text-2xl mb-3 text-center">
              {preset.icon}
            </div>

            {/* Preset Name */}
            <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-2">
              {preset.name}
            </h3>

            {/* Preset Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              {preset.description}
            </p>

            {/* Visual Preview */}
            <div className="relative h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div
                className="absolute right-0 top-0 bottom-0 opacity-70"
                style={{
                  width: `${preset.config.width}px`,
                  background: preset.gradient || preset.config.thumbColor,
                  borderRadius: `${preset.config.thumbRadius}px`,
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 opacity-30"
                style={{
                  width: `${preset.config.width + 2}px`,
                  background: preset.config.trackColor !== 'transparent' ? preset.config.trackColor : '#e5e7eb',
                  borderRadius: `${preset.config.trackRadius}px`,
                }}
              />
              
              {/* Content lines to simulate scrollable content */}
              <div className="p-3 space-y-2">
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
              </div>
            </div>

            {/* Current indicator */}
            {isCurrentPreset(preset.config) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 hover:from-blue-500/5 hover:to-purple-500/5 rounded-xl transition-all" />
          </motion.div>
        ))}
      </div>

      {/* Custom Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
      >
        💡 Click on any preset to apply it instantly, or use the controls to create your own custom style
      </motion.div>
    </motion.div>
  );
};
