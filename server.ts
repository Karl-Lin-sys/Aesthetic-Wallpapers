import { localApiOnly } from './local-api-guard.mjs';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
app.use('/api', localApiOnly(() => PORT));
  const PORT = 3000;

  // Increase payload limit for base64 image data
  app.use(express.json({ limit: '50mb' }));

  app.post('/api/generate-wallpapers', async (req, res) => {
    try {
      const ai = getAiClient();
      const { prompt, aspectRatio = '9:16', imageSize = '2K', model = 'gemini-3-pro-image-preview', referenceImage } = req.body;
      
      const generatePromises = Array.from({ length: 4 }).map(async () => {
        const parts: any[] = [];
        
        if (referenceImage) {
           parts.push({
             inlineData: {
               data: referenceImage.replace(/^data:image\/\w+;base64,/, ''),
               mimeType: 'image/jpeg'
             }
           });
        }
        parts.push({ text: prompt });
        
        const response = await ai.models.generateContent({
          model,
          contents: { parts },
          config: {
            imageConfig: {
              aspectRatio,
              imageSize
            }
          }
        });
        
        let base64 = null;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            base64 = part.inlineData.data;
            break;
          }
        }
        return base64 ? `data:image/jpeg;base64,${base64}` : null;
      });
      
      const results = await Promise.all(generatePromises);
      const validResults = results.filter(r => r !== null);
      
      res.json({ images: validResults });
    } catch (error: any) {
      console.error('Error generating images:', error);
      res.status(500).json({ error: error.message || 'Failed to generate images' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
