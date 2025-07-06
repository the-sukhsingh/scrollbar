import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Eye, EyeOff, Shuffle } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { Slider } from './Slider';
import type { ScrollbarConfig } from '../types';
import { randomizeConfig } from '../utils/scrollbar';

interface ControlsProps {
  config: ScrollbarConfig;
  onConfigChange: (config: Partial<ScrollbarConfig>) => void;
  onRandomize: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  config,
  onConfigChange,
  onRandomize
}) => {
  const handleRandomize = () => {
    const randomConfig = randomizeConfig();
    onConfigChange(randomConfig);
    onRandomize();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Scrollbar Controls
          </h2>
        </div>
        
        <motion.button
          onClick={handleRandomize}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shuffle className="w-4 h-4" />
          Randomize
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colors Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Colors
          </h3>
          
          <ColorPicker
            label="Thumb Color"
            value={config.thumbColor}
            onChange={(color) => onConfigChange({ thumbColor: color })}
          />
          
          <ColorPicker
            label="Track Color"
            value={config.trackColor}
            onChange={(color) => onConfigChange({ trackColor: color })}
          />
          
          <ColorPicker
            label="Hover Color"
            value={config.hoverColor}
            onChange={(color) => onConfigChange({ hoverColor: color })}
          />
        </div>

        {/* Dimensions Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Dimensions
          </h3>
          
          <Slider
            label="Width"
            value={config.width}
            onChange={(width) => onConfigChange({ width })}
            min={0}
            max={30}
            unit="px"
          />
          
          <Slider
            label="Height"
            value={config.height}
            onChange={(height) => onConfigChange({ height })}
            min={0}
            max={30}
            unit="px"
          />
          
          <Slider
            label="Thumb Radius"
            value={config.thumbRadius}
            onChange={(thumbRadius) => onConfigChange({ thumbRadius })}
            min={0}
            max={15}
            unit="px"
          />
          
          <Slider
            label="Track Radius"
            value={config.trackRadius}
            onChange={(trackRadius) => onConfigChange({ trackRadius })}
            min={0}
            max={15}
            unit="px"
          />
        </div>
      </div>

      {/* Visibility Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <div className="w-2 h-2 bg-orange-500 rounded-full" />
          Visibility
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'auto', label: 'Auto', icon: Eye },
            { value: 'visible', label: 'Always Visible', icon: Eye },
            { value: 'hidden', label: 'Hidden', icon: EyeOff }
          ].map(({ value, label, icon: Icon }) => (
            <motion.button
              key={value}
              onClick={() => onConfigChange({ visibility: value as 'auto' | 'visible' | 'hidden' })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                config.visibility === value
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
