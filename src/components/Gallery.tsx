import React from 'react';

interface GalleryProps {
  images: string[];
  loading: boolean;
  onSelectImage: (img: string) => void;
  error: string | null;
}

export function Gallery({ images, loading, onSelectImage, error }: GalleryProps) {
  if (error) {
    return (
      <div className="p-4 bg-red-950/50 border border-red-900 rounded-xl text-red-200 text-sm">
        {error}
      </div>
    );
  }

  if (loading && images.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[9/16] bg-gray-800 rounded-xl animate-pulse flex items-center justify-center overflow-hidden">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-gray-400 rounded-full animate-spin opacity-50" />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-3 py-12">
        <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center transform rotate-12 shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-gray-700 -rotate-12 absolute opacity-50" />
        </div>
        <p className="text-sm mt-2">Describe a vibe to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((img, i) => (
        <button 
          key={i} 
          onClick={() => onSelectImage(img)}
          className="aspect-[9/16] relative rounded-xl overflow-hidden group border border-gray-700/50 hover:border-purple-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
        >
          {loading && (
            <div className="absolute inset-0 bg-gray-900/80 z-10 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          )}
          <img 
            src={img} 
            alt={`Variation ${i + 1}`} 
            className={`w-full h-full object-cover ${loading ? 'opacity-30' : 'opacity-100'}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </button>
      ))}
    </div>
  );
}
