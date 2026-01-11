// ═══════════════════════════════════════════════════════════════════════════════
//                    AI ALBUM ART GENERATOR
//                    Generate unique artwork for songs using AI
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
//                    PROMPT TEMPLATES BY GENRE/MOOD
// ═══════════════════════════════════════════════════════════════════════════════

interface SongData {
  title: string;
  artist: string;
  genre: string;
  year?: number;
  mood?: string;
  era?: string;
  keywords?: string[];
}

interface PromptTemplate {
  style: string;
  atmosphere: string;
  colorPalette: string;
  elements: string[];
  avoid: string[];
}

const GENRE_TEMPLATES: Record<string, PromptTemplate> = {
  bolero: {
    style: 'vintage Vietnamese poster art, nostalgic, emotional',
    atmosphere: 'melancholic rain, night city, dimly lit streets',
    colorPalette: 'deep blues, muted purples, warm amber highlights',
    elements: ['rain', 'old Saigon streets', 'vintage car', 'cafe', 'neon signs', 'ao dai'],
    avoid: ['modern elements', 'bright colors', 'happy scenes'],
  },
  'nhac-trinh': {
    style: 'minimalist watercolor, contemplative, artistic',
    atmosphere: 'peaceful, philosophical, nature-inspired',
    colorPalette: 'soft earth tones, muted greens, gentle browns',
    elements: ['autumn leaves', 'empty road', 'single figure', 'Hue architecture', 'river'],
    avoid: ['crowded scenes', 'bright neon', 'modern city'],
  },
  vpop: {
    style: 'modern digital art, vibrant, dynamic',
    atmosphere: 'energetic, youthful, trendy',
    colorPalette: 'bright pinks, electric blues, neon accents',
    elements: ['city lights', 'abstract shapes', 'fashion', 'technology'],
    avoid: ['vintage', 'dull colors', 'traditional elements'],
  },
  'tien-chien': {
    style: 'classical Vietnamese painting, elegant, timeless',
    atmosphere: 'romantic, dreamy, historical',
    colorPalette: 'sepia tones, cream, gold accents',
    elements: ['traditional architecture', 'ao dai', 'lotus', 'old Hanoi'],
    avoid: ['modern elements', 'neon', 'technology'],
  },
  rock: {
    style: 'bold graphic art, intense, powerful',
    atmosphere: 'dramatic, rebellious, electric',
    colorPalette: 'deep reds, blacks, silver highlights',
    elements: ['lightning', 'fire', 'guitar', 'urban grunge'],
    avoid: ['soft', 'pastel', 'delicate'],
  },
  indie: {
    style: 'dreamy illustration, ethereal, unique',
    atmosphere: 'whimsical, introspective, artistic',
    colorPalette: 'pastels, muted rainbow, soft gradients',
    elements: ['surreal landscapes', 'floating objects', 'abstract nature'],
    avoid: ['realistic', 'mainstream', 'commercial'],
  },
};

const MOOD_MODIFIERS: Record<string, string> = {
  sad: 'melancholic atmosphere, rain, mist, solitary figure',
  happy: 'bright sunlight, warm colors, joyful expressions',
  romantic: 'soft lighting, flowers, couple silhouette, sunset',
  nostalgic: 'vintage filter, old photographs, memories fading',
  energetic: 'dynamic motion, bold strokes, explosive colors',
  peaceful: 'calm waters, gentle breeze, serene landscape',
  mysterious: 'shadows, moonlight, enigmatic symbols',
};

const ERA_MODIFIERS: Record<string, string> = {
  '1940s': 'wartime Vietnam, vintage photography style',
  '1950s': 'post-war Hanoi, French colonial architecture',
  '1960s': 'old Saigon, vintage motorcycles, coffee shops',
  '1970s': 'pre-1975 Saigon, neon lights, night life',
  '1980s': 'early renovation period, Soviet influence',
  '1990s': 'doi moi era, emerging modernity',
  '2000s': 'modern Vietnam, globalization',
  '2010s': 'digital age, social media aesthetic',
  '2020s': 'contemporary, minimalist, global fusion',
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    PROMPT GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

export function generateArtPrompt(song: SongData): string {
  const genreKey = song.genre.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/nhạc\s*trịnh/i, 'nhac-trinh')
    .replace(/tiền\s*chiến/i, 'tien-chien');
  
  const template = GENRE_TEMPLATES[genreKey] || GENRE_TEMPLATES['indie'];
  const moodMod = song.mood ? MOOD_MODIFIERS[song.mood.toLowerCase()] || '' : '';
  
  // Determine era from year
  let eraMod = '';
  if (song.year) {
    const decade = Math.floor(song.year / 10) * 10;
    eraMod = ERA_MODIFIERS[`${decade}s`] || '';
  }
  
  // Build the prompt
  const prompt = `
Album art for Vietnamese song "${song.title}" by ${song.artist}.

Style: ${template.style}
Atmosphere: ${template.atmosphere}
${moodMod ? `Mood: ${moodMod}` : ''}
${eraMod ? `Era: ${eraMod}` : ''}
Color palette: ${template.colorPalette}
Include elements: ${template.elements.slice(0, 3).join(', ')}
${song.keywords?.length ? `Keywords: ${song.keywords.join(', ')}` : ''}

High quality, artistic, album cover suitable, square format, no text, no words.

Avoid: ${template.avoid.join(', ')}, text, words, letters, watermarks
`.trim();

  return prompt;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    OPENAI DALL-E INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════════

export interface GeneratedArt {
  url: string;
  prompt: string;
  revisedPrompt?: string;
  createdAt: Date;
}

export async function generateAlbumArt(
  song: SongData,
  apiKey: string,
  options: {
    size?: '1024x1024' | '1792x1024' | '1024x1792';
    quality?: 'standard' | 'hd';
    style?: 'vivid' | 'natural';
  } = {}
): Promise<GeneratedArt> {
  const { size = '1024x1024', quality = 'standard', style = 'vivid' } = options;
  
  const prompt = generateArtPrompt(song);
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size,
      quality,
      style,
      response_format: 'url',
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate image');
  }
  
  const data = await response.json();
  
  return {
    url: data.data[0].url,
    prompt,
    revisedPrompt: data.data[0].revised_prompt,
    createdAt: new Date(),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    STABLE DIFFUSION INTEGRATION (Alternative)
// ═══════════════════════════════════════════════════════════════════════════════

export async function generateAlbumArtStableDiffusion(
  song: SongData,
  apiKey: string // Replicate API key
): Promise<GeneratedArt> {
  const prompt = generateArtPrompt(song);
  
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`,
    },
    body: JSON.stringify({
      version: 'stability-ai/sdxl:latest', // Use latest SDXL
      input: {
        prompt,
        negative_prompt: 'text, words, letters, watermark, signature, blurry, low quality',
        width: 1024,
        height: 1024,
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 50,
      },
    }),
  });
  
  const prediction = await response.json();
  
  // Poll for completion
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const pollResponse = await fetch(
      `https://api.replicate.com/v1/predictions/${prediction.id}`,
      { headers: { 'Authorization': `Token ${apiKey}` } }
    );
    result = await pollResponse.json();
  }
  
  if (result.status === 'failed') {
    throw new Error(result.error || 'Image generation failed');
  }
  
  return {
    url: result.output[0],
    prompt,
    createdAt: new Date(),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
//                    PRESET ART STYLES (For quick selection)
// ═══════════════════════════════════════════════════════════════════════════════

export const ART_STYLES = {
  vintage: {
    name: 'Vintage Vietnamese',
    prompt: 'vintage Vietnamese art style, retro poster, nostalgic colors',
    preview: '/art-styles/vintage.jpg',
  },
  watercolor: {
    name: 'Watercolor Dream',
    prompt: 'soft watercolor painting, flowing colors, artistic',
    preview: '/art-styles/watercolor.jpg',
  },
  neon: {
    name: 'Neon Nights',
    prompt: 'neon lights, cyberpunk, night city, glowing',
    preview: '/art-styles/neon.jpg',
  },
  minimalist: {
    name: 'Minimalist',
    prompt: 'minimalist design, simple shapes, clean lines',
    preview: '/art-styles/minimalist.jpg',
  },
  abstract: {
    name: 'Abstract Expression',
    prompt: 'abstract art, bold colors, emotional expression',
    preview: '/art-styles/abstract.jpg',
  },
  traditional: {
    name: 'Traditional Vietnamese',
    prompt: 'traditional Vietnamese painting, silk painting style, lacquer art',
    preview: '/art-styles/traditional.jpg',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
//                    REACT HOOK FOR AI ART GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

/*
// Usage in React component:

import { useState } from 'react';
import { generateAlbumArt, SongData } from '@/lib/ai/albumArtGenerator';

export function useAlbumArtGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [art, setArt] = useState<GeneratedArt | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const generate = async (song: SongData) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
      if (!apiKey) throw new Error('API key not configured');
      
      const result = await generateAlbumArt(song, apiKey, {
        quality: 'hd',
        style: 'vivid',
      });
      
      setArt(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { generate, art, isGenerating, error };
}

// Component usage:

function AlbumArtGenerator({ song }) {
  const { generate, art, isGenerating, error } = useAlbumArtGenerator();
  
  return (
    <div>
      <button onClick={() => generate(song)} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Art'}
      </button>
      
      {art && (
        <img src={art.url} alt="Generated album art" />
      )}
      
      {error && <p className="error">{error}</p>}
    </div>
  );
}
*/

export default {
  generateArtPrompt,
  generateAlbumArt,
  generateAlbumArtStableDiffusion,
  ART_STYLES,
};
