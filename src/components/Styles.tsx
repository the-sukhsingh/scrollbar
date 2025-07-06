import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Save, RotateCcw, Lightbulb } from 'lucide-react';
import type { ScrollbarConfig } from '../types';

interface StylesProps {
  config: ScrollbarConfig;
  onConfigChange: (config: Partial<ScrollbarConfig>) => void;
  onSave: () => void;
  onReset: () => void;
}

export const Styles: React.FC<StylesProps> = ({
  config,
  onConfigChange,
  onSave,
  onReset
}) => {
  const [customCSS, setCustomCSS] = useState('');

  const stylePresets = [
    {
      name: 'Rounded Corners',
      description: 'Smooth rounded scrollbars',
      apply: () => onConfigChange({ thumbRadius: 8, trackRadius: 8 })
    },
    {
      name: 'Sharp Edges',
      description: 'Angular, modern look',
      apply: () => onConfigChange({ thumbRadius: 0, trackRadius: 0 })
    },
    {
      name: 'Thick Scrollbar',
      description: 'Bold and prominent',
      apply: () => onConfigChange({ width: 16, height: 16 })
    },
    {
      name: 'Thin Scrollbar',
      description: 'Subtle and minimal',
      apply: () => onConfigChange({ width: 4, height: 4 })
    },
    {
      name: 'High Contrast',
      description: 'Maximum visibility',
      apply: () => onConfigChange({ 
        thumbColor: '#000000', 
        trackColor: '#ffffff',
        hoverColor: '#333333'
      })
    },
    {
      name: 'Subtle Transparency',
      description: 'Blend with background',
      apply: () => onConfigChange({ 
        thumbColor: 'rgba(0, 0, 0, 0.3)', 
        trackColor: 'rgba(0, 0, 0, 0.1)',
        hoverColor: 'rgba(0, 0, 0, 0.5)'
      })
    }
  ];


  const tips = [
    "Use transparent track colors for a cleaner look",
    "Match your scrollbar colors to your brand palette",
    "Consider accessibility - ensure sufficient contrast",
    "Test your scrollbar on different screen sizes",
    "Subtle animations can enhance user experience",
    "Less is often more - don't over-design your scrollbars"
  ];

  const [currentTip, setCurrentTip] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-5 h-5 text-purple-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Advanced Styles
        </h2>
      </div>

      {/* Quick Style Presets */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Quick Style Presets
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stylePresets.map((preset, index) => (
            <motion.button
              key={preset.name}
              onClick={preset.apply}
              className="p-4 text-left bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {preset.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {preset.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom CSS Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Custom CSS
        </h3>
        
        <div className="relative">
          <textarea
            value={customCSS}
            onChange={(e) => setCustomCSS(e.target.value)}
            placeholder="Add your custom CSS here..."
            className="w-full h-32 p-4 bg-gray-50 text-black dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
          />
          <div className="absolute top-2 right-2 text-xs text-gray-400">
            CSS
          </div>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            onClick={() => {
              onConfigChange({ customCSS });
              setCustomCSS('');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            Apply CSS
          </motion.button>
          
          <motion.button
            onClick={() => setCustomCSS('')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </motion.button>
        </div>
      </div>

      {/* Configuration Actions */}
      <div className="space-y-4 hidden">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Configuration
        </h3>
        
        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </motion.button>
          
          <motion.button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </motion.button>
        </div>
      </div>

      {/* Design Tips */}
      <motion.div
        key={currentTip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
              Design Tip
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              {tips[currentTip]}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Current Configuration Summary */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">
          Current Configuration
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Thumb Color:</span>
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: config.thumbColor }}
              />
              <span className="font-mono text-gray-700 dark:text-gray-300">
                {config.thumbColor}
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Track Color:</span>
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: config.trackColor === 'transparent' ? '#f1f5f9' : config.trackColor }}
              />
              <span className="font-mono text-gray-700 dark:text-gray-300">
                {config.trackColor}
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Dimensions:</span>
            <span className="font-mono text-gray-700 dark:text-gray-300 ml-2">
              {config.width}×{config.height}px
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Border Radius:</span>
            <span className="font-mono text-gray-700 dark:text-gray-300 ml-2">
              {config.thumbRadius}px
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
