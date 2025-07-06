import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

const predefinedColors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#64748b',
  '#374151', '#1f2937', '#111827', '#ffffff', '#f8fafc', 'transparent'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value);

  const handleColorChange = (color: string) => {
    onChange(color);
    setCustomColor(color);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      <div className="flex gap-2">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
          style={{ backgroundColor: value === 'transparent' ? '#f1f5f9' : value }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {value === 'transparent' && <Palette className="w-4 h-4 text-gray-400" />}
        </motion.button>
        
        <input
          type="text"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          onBlur={() => handleColorChange(customColor)}
          onKeyDown={(e) => e.key === 'Enter' && handleColorChange(customColor)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          placeholder="Enter color value"
        />
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
        >
          <div className="grid grid-cols-6 gap-2 mb-3">
            {predefinedColors.map((color) => (
              <motion.button
                key={color}
                onClick={() => {
                  handleColorChange(color);
                  setIsOpen(false);
                }}
                className={`w-8 h-8 rounded-md border-2 ${
                  value === color ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'
                } hover:scale-110 transition-all`}
                style={{ backgroundColor: color === 'transparent' ? '#f1f5f9' : color }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {color === 'transparent' && <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full opacity-50" />
                </div>}
              </motion.button>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <input
              type="color"
              value={customColor.startsWith('#') ? customColor : '#94a3b8'}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};
