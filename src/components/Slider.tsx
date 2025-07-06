import React from 'react';
import { motion, motionValue } from 'framer-motion';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.0005,
  unit = 'px',
  className = ''
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {value.toFixed(0)}{unit}
        </span>
      </div>
      
      <div className="relative">
        <motion.input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          _dragX={motionValue(50)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "tween", stiffness: 300, damping: 25 }}
        />
        
      </div>
    </div>
  );
};
