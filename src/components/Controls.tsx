import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ControlsProps {
  prompt: string; setPrompt: (s: string) => void;
  aspectRatio: string; setAspectRatio: (s: string) => void;
  imageSize: string; setImageSize: (s: string) => void;
  model: string; setModel: (s: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

export function Controls({ prompt, setPrompt, aspectRatio, setAspectRatio, imageSize, setImageSize, model, setModel, onGenerate, loading }: ControlsProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/50">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-300">Vibe / Prompt</label>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your wallpaper vibe..."
          className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-24"
        />
      </div>

      <button 
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center justify-between text-sm text-gray-400 hover:text-gray-200 transition-colors py-1"
      >
        <span>Advanced Settings</span>
        {showSettings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {showSettings && (
        <div className="flex flex-col gap-4 pt-3 border-t border-gray-700/50">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Model Quality</label>
            <select 
              value={model} onChange={(e) => setModel(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="gemini-3-pro-image-preview">Studio Quality (Pro)</option>
              <option value="gemini-3.1-flash-image-preview">Fast (Flash)</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Aspect Ratio</label>
              <select 
                value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map(ar => (
                  <option key={ar} value={ar}>{ar}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400">Resolution</label>
              <select 
                value={imageSize} onChange={(e) => setImageSize(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {['1K', '2K', '4K'].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className="mt-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Sparkles size={18} />
        )}
        <span>{loading ? 'Generating...' : 'Generate Wallpapers'}</span>
      </button>
    </div>
  );
}
