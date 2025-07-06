import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, Download } from 'lucide-react';
import { generateScrollbarCSS, copyToClipboard } from '../utils/scrollbar';
import type { ScrollbarConfig } from '../types';

interface CodeExportProps {
  config: ScrollbarConfig;
}

export const CodeExport: React.FC<CodeExportProps> = ({ config }) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'css' | 'scss' | 'js'>('css');

  const cssCode = generateScrollbarCSS(config);
  
  const scssCode = `// Scrollbar Variables
$scrollbar-width: ${config.width}px;
$scrollbar-height: ${config.height}px;
$scrollbar-thumb-color: ${config.thumbColor};
$scrollbar-track-color: ${config.trackColor};
$scrollbar-thumb-hover-color: ${config.hoverColor};
$scrollbar-thumb-radius: ${config.thumbRadius}px;
$scrollbar-track-radius: ${config.trackRadius}px;

// Scrollbar Styles
::-webkit-scrollbar {
  width: $scrollbar-width;
  height: $scrollbar-height;
}

::-webkit-scrollbar-track {
  background: $scrollbar-track-color;
  border-radius: $scrollbar-track-radius;
}

::-webkit-scrollbar-thumb {
  background: $scrollbar-thumb-color;
  border-radius: $scrollbar-thumb-radius;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: $scrollbar-thumb-hover-color;
  }
}`;

  const jsCode = `// Scrollbar Configuration Object
const scrollbarConfig = ${JSON.stringify(config, null, 2)};

// Function to apply scrollbar styles
function applyScrollbarStyles(config) {
  const root = document.documentElement;
  
  root.style.setProperty('--scrollbar-width', \`\${config.width}px\`);
  root.style.setProperty('--scrollbar-height', \`\${config.height}px\`);
  root.style.setProperty('--scrollbar-thumb-color', config.thumbColor);
  root.style.setProperty('--scrollbar-track-color', config.trackColor);
  root.style.setProperty('--scrollbar-thumb-hover-color', config.hoverColor);
  root.style.setProperty('--scrollbar-thumb-radius', \`\${config.thumbRadius}px\`);
  root.style.setProperty('--scrollbar-track-radius', \`\${config.trackRadius}px\`);
  
  if (config.visibility === 'hidden') {
    root.style.setProperty('--scrollbar-width', '0px');
    root.style.setProperty('--scrollbar-height', '0px');
  }
}

// Apply the configuration
applyScrollbarStyles(scrollbarConfig);`;

  const getCurrentCode = () => {
    switch (exportFormat) {
      case 'scss':
        return scssCode;
      case 'js':
        return jsCode;
      default:
        return cssCode;
    }
  };

  const getFileExtension = () => {
    switch (exportFormat) {
      case 'scss':
        return '.scss';
      case 'js':
        return '.js';
      default:
        return '.css';
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(getCurrentCode());
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([getCurrentCode()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrollbar-styles${getFileExtension()}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Code className="w-5 h-5 text-green-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Export Code
        </h2>
      </div>

      {/* Format Selection */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { value: 'css', label: 'CSS', color: 'bg-blue-500' },
          { value: 'scss', label: 'SCSS', color: 'bg-pink-500' },
          { value: 'js', label: 'JavaScript', color: 'bg-yellow-500' }
        ].map(({ value, label, color }) => (
          <motion.button
            key={value}
            onClick={() => setExportFormat(value as 'css' | 'scss' | 'js')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              exportFormat === value
                ? `${color} text-white shadow-lg`
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Code Display */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
              scrollbar-styles{getFileExtension()}
            </span>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm font-medium">Copy</span>
                </>
              )}
            </motion.button>
            
            <motion.button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download</span>
            </motion.button>
          </div>
        </div>

        <motion.div
          key={exportFormat}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto"
        >
          <pre className="text-sm text-gray-100 font-mono leading-relaxed">
            <code>{getCurrentCode()}</code>
          </pre>
        </motion.div>
      </div>

      {/* Usage Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
      >
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          How to use:
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
          <li>• Copy the code above and paste it into your stylesheet</li>
          <li>• For CSS: Add to your main CSS file</li>
          <li>• For SCSS: Add to your SCSS file and compile</li>
          <li>• For JavaScript: Add to your JS file and run the function</li>
          <li>• The styles will apply globally to all scrollbars on your website</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};
