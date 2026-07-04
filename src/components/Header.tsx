import React from 'react';
import { Wallpaper } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center gap-3 p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm z-10 sticky top-0">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shrink-0">
        <Wallpaper size={20} className="text-white" />
      </div>
      <div>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Aesthetic Wallpapers
        </h1>
        <p className="text-xs text-gray-400">AI-generated vibes for your phone</p>
      </div>
    </header>
  );
}
