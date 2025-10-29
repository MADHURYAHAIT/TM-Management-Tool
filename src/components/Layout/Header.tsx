'use client';

import { useEffect, useState } from 'react';
import { Settings, Activity, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const root = document.documentElement;
    const newIsDark = !isDark;

    if (newIsDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setIsDark(newIsDark);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">TM Management Tool</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Project Quote Modernization</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Activity Button */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Activity className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Settings Button */}
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">M</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Madhurya</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
