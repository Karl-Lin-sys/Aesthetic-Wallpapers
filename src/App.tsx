/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Gallery } from './components/Gallery';
import { FullScreenView } from './components/FullScreenView';

export default function App() {
  const [prompt, setPrompt] = useState('rainy cyberpunk lo-fi');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [imageSize, setImageSize] = useState('2K');
  const [model, setModel] = useState('gemini-3-pro-image-preview');
  
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const generateImages = async (referenceImage?: string) => {
    setLoading(true);
    setError(null);
    if (!referenceImage) {
      setImages([]); // clear existing for feedback on new prompt
    }
    
    try {
      const res = await fetch('/api/generate-wallpapers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio, imageSize, model, referenceImage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setImages(data.images);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemix = (imgUrl: string) => {
    setSelectedImage(null);
    generateImages(imgUrl);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-purple-500/30">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative overflow-hidden bg-gray-900 border-x border-gray-800 shadow-2xl">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 pb-12">
          <Controls 
            prompt={prompt} setPrompt={setPrompt}
            aspectRatio={aspectRatio} setAspectRatio={setAspectRatio}
            imageSize={imageSize} setImageSize={setImageSize}
            model={model} setModel={setModel}
            onGenerate={() => generateImages()}
            loading={loading}
          />
          
          <Gallery 
            images={images} 
            loading={loading} 
            onSelectImage={setSelectedImage}
            error={error}
          />
        </div>

        {selectedImage && (
          <FullScreenView 
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
            onRemix={() => handleRemix(selectedImage)}
          />
        )}
      </div>
    </div>
  );
}
