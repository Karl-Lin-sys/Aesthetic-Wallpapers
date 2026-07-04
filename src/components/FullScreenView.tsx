import React, { useEffect } from 'react';
import { X, Download, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FullScreenViewProps {
  image: string;
  onClose: () => void;
  onRemix: () => void;
}

export function FullScreenView({ image, onClose, onRemix }: FullScreenViewProps) {
  
  // Prevent scrolling when full screen
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = image;
    a.download = `wallpaper-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-xl"
      >
        <div className="flex justify-between items-center p-4">
          <button 
            onClick={onClose}
            className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="flex-1 w-full max-w-sm mx-auto flex items-center justify-center p-4"
        >
          <img 
            src={image} 
            alt="Full screen wallpaper" 
            className="w-full max-h-full object-contain drop-shadow-2xl rounded-md"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 p-6 pb-8 bg-gradient-to-t from-black/80 to-transparent"
        >
          <button 
            onClick={handleDownload}
            className="flex-1 max-w-[160px] flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-3.5 rounded-full font-medium transition-all active:scale-95"
          >
            <Download size={18} />
            Download
          </button>
          
          <button 
            onClick={onRemix}
            className="flex-1 max-w-[160px] flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-3.5 rounded-full font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95"
          >
            <RefreshCw size={18} />
            Remix
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
