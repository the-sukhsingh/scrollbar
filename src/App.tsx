import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Controls } from './components/Controls';
import { Presets } from './components/Presets';
import { CodeExport } from './components/CodeExport';
import { Styles } from './components/Styles';
import { TabNavigation } from './components/TabNavigation';
import { useScrollbarConfig } from './hooks/useScrollbarConfig';
import { randomizeConfig } from './utils/scrollbar';

function App() {
  const { config, theme, updateConfig, resetConfig, setConfig } = useScrollbarConfig();
  const [activeTab, setActiveTab] = useState<'controls' | 'presets' | 'code' | 'styles'>('controls');

  const handleRandomize = () => {
    const randomConfig = randomizeConfig();
    setConfig(randomConfig);
  };

  const handleSave = () => {
    // Save the current configuration to localStorage
    let savedConfigs = JSON.parse(localStorage.getItem('scrollbarConfigs') || '[]');
    savedConfigs.push(config);
    localStorage.setItem('scrollbarConfigs', JSON.stringify(savedConfigs));

  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'controls':
        return (
          <Controls
            config={config}
            onConfigChange={updateConfig}
            onRandomize={handleRandomize}
          />
        );
      case 'presets':
        return (
          <Presets
            currentConfig={config}
            onPresetSelect={setConfig}
          />
        );
      case 'code':
        return <CodeExport config={config} />;
      case 'styles':
        return (
          <Styles
            config={config}
            onConfigChange={updateConfig}
            onSave={handleSave}
            onReset={resetConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Scrollbar Customizer
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Design beautiful scrollbars in real-time
                  </p>
                </div>
              </motion.div>

              <motion.button
                onClick={() => {
                  // Open GitHub repository
                  window.open('https://github.com/the-sukhsing/scrollbar', '_blank');
                }}
                className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" fill='white'>
                    <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
             </svg>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Glass Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-effect dark:glass-effect-dark rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            {/* Tab Navigation */}
            <TabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Demo Content for Scrollbar Testing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 glass-effect dark:glass-effect-dark rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Test Your Scrollbar
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Scroll through this content to see your custom scrollbar in action!
            </p>
            
            <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-4">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Scrollable Content Item {i + 1}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    This is a sample content item to demonstrate the scrollbar functionality. 
                    You can see how your custom scrollbar styles apply to this scrollable area.
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Created with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="w-4 h-4 text-red-500" />
              </motion.div>
              <span>to make your scroll smooth.</span>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}

export default App;
