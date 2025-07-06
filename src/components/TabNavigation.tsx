import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Star, Code, Palette } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'controls' | 'presets' | 'code' | 'styles';
  onTabChange: (tab: 'controls' | 'presets' | 'code' | 'styles') => void;
}

const tabs = [
  { id: 'controls', label: 'Controls', icon: Settings },
  { id: 'presets', label: 'Presets', icon: Star },
  { id: 'code', label: 'Code', icon: Code },
  { id: 'styles', label: 'Styles', icon: Palette }
] as const;

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => onTabChange(id)}
          className={`relative flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            activeTab === id
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-800/50'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
          
          {activeTab === id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border-2 border-blue-500/20"
              initial={false}
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
