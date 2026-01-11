import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { AlbumStoryData } from "@/types/albumStory";
import {
  detectGenre,
  getEnhancedSystemPrompt,
  formatSourcesForResponse,
  getConfidenceContext,
  VietnameseGenre,
  SourceReference,
} from "@/lib/vietnameseMusic";
import { songDatabase } from "@/lib/database/songDatabase";
import { lyricsMetadataCache } from "@/lib/cache/lyricsMetadataCache";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ═══════════════════════════════════════════════════════════════════════════════
//                    HALLUCINATION FILTER
// ═══════════════════════════════════════════════════════════════════════════════

const BANNED_PATTERNS = [
  /bài hát có câu/gi,
  /lời bài hát/gi,
  /ca từ nổi tiếng/gi,
  /với câu hát/gi,
  /những câu như/gi,
  /"[^"]{20,}"/g,  // Long quotes (likely fake lyrics)
  /'[^']{20,}'/g,
  /mưa vẫn mưa bay/gi,
  /sỏi đá cũng cần/gi,
];

function filterHallucination(text: string): string {
  if (!text) return text;

  let filtered = text;

  // Remove sentences containing banned patterns
  const sentences = text.split(/[.!?]+/);
  const cleanSentences = sentences.filter(sentence => {
    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(sentence)) {
        return false;
      }
    }
    return true;
  });

  filtered = cleanSentences.join('. ').trim();

  if (!filtered || filtered.length < 20) {
    return 'Thông tin chi tiết đang được cập nhật từ các nguồn đáng tin cậy.';
  }

  return filtered;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { songId, title, artist, coverImage } = body;

    if (!title || !artist) {
      return NextResponse.json(
        { error: "Missing title or artist" },
        { status: 400 }
      );
    }

    // Detect genre for specialized content
    const detectedGenre = detectGenre(title, artist);
    const confidenceContext = getConfidenceContext(title, artist, detectedGenre);

    // ═══════════════════════════════════════════════════════════════════════
    // TIER 1: Check verified database first (100% accurate, no AI)
    // ═══════════════════════════════════════════════════════════════════════
    const dbResult = songDatabase.searchSong(title, artist);
    if (dbResult && dbResult.contentQuality.overallConfidence !== 'unknown') {
      return NextResponse.json(
        transformDatabaseToAlbumStory(songId || "unknown", title, artist, coverImage || "/default-cover.jpg", dbResult, detectedGenre)
      );
    }

    // ═══════════════════════════════════════════════════════════════════════
    // TIER 1.5: Check lyrics cache for metadata (from Lyrics API)
    // ═══════════════════════════════════════════════════════════════════════
    const lyricsMetadata = lyricsMetadataCache.get(title, artist);
    let actualTitle = title;
    let actualArtist = artist;

    if (lyricsMetadata) {
      // Use the more accurate title/artist from lyrics search
      actualTitle = lyricsMetadata.trackName || title;
      actualArtist = lyricsMetadata.artistName || artist;
    }

    // Check if OpenAI API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        generateFallbackData(songId || "unknown", actualTitle, actualArtist, coverImage || "/default-cover.jpg", detectedGenre)
      );
    }

    // Get enhanced system prompt
    const systemPrompt = getEnhancedSystemPrompt(detectedGenre);

    // Use lyrics metadata if available (more accurate than YouTube title)
    const searchTitle = actualTitle;
    const searchArtist = actualArtist;

    const prompt = `${confidenceContext}

Hãy tạo nội dung CHI TIẾT và CHÍNH XÁC cho bài hát "${searchTitle}" của ${searchArtist}.
Thể loại được phát hiện: ${detectedGenre}

QUY TẮC QUAN TRỌNG VỀ ĐỘ CHÍNH XÁC:
1. CHỈ cung cấp thông tin bạn CHẮC CHẮN là đúng
2. Với năm phát hành, album - chỉ ghi nếu biết chắc, không thì ghi "Không rõ"
3. KHÔNG bịa đặt sự kiện, giải thưởng cụ thể
4. Nếu không chắc chắn, hãy ghi rõ "Theo thông tin phổ biến..." hoặc đặt confidence thấp

NGUỒN THAM KHẢO THEO THỂ LOẠI:
- Bolero/Nhạc Vàng: nhacvangbolero.com, các kênh bolero chính thống
- Tiền Chiến: Tài liệu lịch sử âm nhạc Việt Nam, nhactienchien.com
- Dân Ca: Các nguồn văn hóa dân tộc chính thống
- Nhạc Đỏ: Báo Quân đội nhân dân, Đài TNVN
- V-Pop: Zing MP3, NhacCuaTui, Wikipedia

Trả về JSON với format sau (tiếng Việt):
{
  "coverPage": {
    "album": "Tên album hoặc Single (chỉ ghi nếu biết chắc)",
    "year": "Năm phát hành (chỉ ghi nếu biết chắc, không thì 'Không rõ')",
    "genre": "${detectedGenre}",
    "duration": "Thời lượng (VD: 4:30)"
  },
  "lyrics": {
    "lines": [
      {"time": 0, "text": "Dòng lời bài hát", "translation": "Bản dịch (nếu tiếng Anh)", "emotion": "calm"},
      {"time": 5, "text": "Dòng tiếp theo", "emotion": "romantic"}
    ],
    "hasTranslation": false
  },
  "composition": {
    "story": "Câu chuyện sáng tác chi tiết (2-3 đoạn) - chỉ viết những gì biết chắc",
    "inspiration": "Nguồn cảm hứng (nếu biết)",
    "createdAt": "Thời gian sáng tác (nếu biết chắc)",
    "location": "Địa điểm (nếu có thông tin xác thực)",
    "funFacts": ["Sự thật thú vị ĐÃ ĐƯỢC XÁC MINH 1", "Sự thật 2"],
    "confidence": "high/medium/low"
  },
  "author": {
    "name": "Tên đầy đủ của nghệ sĩ",
    "bio": "Tiểu sử chi tiết và CHÍNH XÁC (2-3 đoạn)",
    "birthYear": "Năm sinh (chỉ ghi nếu biết chắc)",
    "nationality": "Quốc tịch",
    "genres": ["Thể loại chính", "Thể loại phụ"],
    "famousSongs": ["Bài hát nổi tiếng THẬT SỰ 1", "Bài 2"],
    "awards": ["Giải thưởng THẬT SỰ đã đạt được"],
    "timeline": [
      {"year": "20XX", "event": "Sự kiện đã xác minh"}
    ],
    "confidence": "high/medium/low"
  },
  "covers": {
    "originalArtist": "Nghệ sĩ gốc (nếu là bài cover)",
    "versions": [
      {
        "artist": "Ca sĩ cover THẬT SỰ",
        "year": "Năm cover",
        "platform": "YouTube/TikTok",
        "views": "Lượt xem (ước tính)",
        "rating": 4,
        "description": "Mô tả ngắn về phiên bản này"
      }
    ]
  },
  "stories": {
    "stories": [
      {
        "title": "Tiêu đề câu chuyện",
        "content": "Nội dung chi tiết - CHỈ viết nếu có thông tin xác thực",
        "type": "anecdote/cultural/meme/trivia",
        "source": "Nguồn thông tin (bắt buộc nếu là thông tin cụ thể)",
        "verified": true/false
      }
    ]
  },
  "overallConfidence": "high/medium/low - đánh giá tổng thể độ tin cậy của thông tin"
}

Emotion có thể là: happy, sad, romantic, energetic, calm
Story type có thể là: anecdote (giai thoại), cultural (văn hóa), meme (viral), trivia (tiểu tiết thú vị)

QUY TẮC BẮT BUỘC:
- TUYỆT ĐỐI KHÔNG viết lời bài hát - phần lyrics để trống []
- TUYỆT ĐỐI KHÔNG bịa đặt thông tin không có nguồn
- Nếu không biết chắc, ghi "Không rõ" hoặc "Đang cập nhật"
- Chỉ viết fun facts ĐÃ ĐƯỢC XÁC MINH từ nguồn đáng tin cậy
- Timeline chỉ gồm events có nguồn, nếu không biết thì để []
- Viết ngắn gọn, chính xác, tiếng Việt có dấu

LƯU Ý ĐẶC BIỆT CHO ${detectedGenre.toUpperCase()}:
${getGenreSpecificNote(detectedGenre)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt + "\n\nQUAN TRỌNG: KHÔNG BAO GIỜ viết lời bài hát. KHÔNG BAO GIỜ bịa đặt thông tin.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0, // CRITICAL: Zero creativity to prevent hallucination
      max_tokens: 2500,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    try {
      const cleanedResponse = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      const rawData = JSON.parse(cleanedResponse);

      // Apply hallucination filter to key text fields
      if (rawData.composition?.story) {
        rawData.composition.story = filterHallucination(rawData.composition.story);
      }
      if (rawData.author?.bio) {
        rawData.author.bio = filterHallucination(rawData.author.bio);
      }
      if (rawData.stories?.stories) {
        rawData.stories.stories = rawData.stories.stories.map((s: any) => ({
          ...s,
          content: filterHallucination(s.content || ''),
        }));
      }
      // Remove any lyrics that AI might have generated
      if (rawData.lyrics?.lines?.length > 0) {
        const hasRealLyrics = rawData.lyrics.lines.some((l: any) =>
          l.text && l.text.length > 10 && !l.text.includes('Đang cập nhật')
        );
        if (hasRealLyrics) {
          rawData.lyrics.lines = generateDefaultLyrics();
        }
      }

      const storyData = transformToAlbumStoryData(
        songId || "unknown",
        searchTitle, // Use corrected title from lyrics cache
        searchArtist, // Use corrected artist from lyrics cache
        coverImage || "/default-cover.jpg",
        rawData,
        detectedGenre
      );

      return NextResponse.json(storyData);
    } catch (parseError) {
      console.error("Failed to parse GPT response:", parseError);
      return NextResponse.json(
        generateFallbackData(songId || "unknown", searchTitle, searchArtist, coverImage || "/default-cover.jpg", detectedGenre)
      );
    }
  } catch (error) {
    console.error("Album story API error:", error);
    const { songId, title, artist, coverImage } = await request.clone().json().catch(() => ({}));
    const detectedGenre = detectGenre(title || "Unknown", artist || "Unknown");
    return NextResponse.json(
      generateFallbackData(
        songId || "unknown",
        title || "Unknown",
        artist || "Unknown",
        coverImage || "/default-cover.jpg",
        detectedGenre
      )
    );
  }
}

function getGenreSpecificNote(genre: VietnameseGenre): string {
  const notes: Record<VietnameseGenre, string> = {
    bolero: "Chú ý đến thời kỳ vàng son 1960-1975, các nhạc sĩ như Trúc Phương, Lam Phương. Tham khảo nhacvangbolero.com",
    tien_chien: "Giai đoạn 1930-1954, các nhạc sĩ tiên phong như Văn Cao, Phạm Duy. Tham khảo tài liệu lịch sử âm nhạc",
    dan_ca: "Phân biệt rõ vùng miền: Quan họ, Ca trù, Đờn ca tài tử. Chú ý giá trị văn hóa phi vật thể",
    nhac_do: "Gắn với lịch sử kháng chiến, các nhạc sĩ như Hoàng Vân, Phan Huỳnh Điểu. Nguồn: Báo QĐND",
    vpop: "Thông tin từ Zing MP3, NhacCuaTui, các show âm nhạc. Thành tích trên bảng xếp hạng",
    indie: "Scene indie Việt từ 2010s, các label độc lập. Nguồn: Bandcamp, Soundcloud Vietnam",
    rap_viet: "Lịch sử từ 2000s, các show Rap Việt, King of Rap. Underground và Mainstream",
    rock_viet: "Từ Bức Tường đến nay, các festival rock Việt Nam",
    nhac_tre: "Xu hướng hiện tại, viral TikTok, các idol/thần tượng",
    cai_luong: "Nghệ thuật sân khấu Nam Bộ, các nghệ sĩ gạo cội, vọng cổ",
    nhac_phim: "Phim Việt liên quan, vai trò OST trong thành công của bài hát",
    unknown: "Tìm kiếm thông tin từ các nguồn đáng tin cậy",
  };
  return notes[genre] || notes.unknown;
}

function transformToAlbumStoryData(
  songId: string,
  title: string,
  artist: string,
  coverImage: string,
  rawData: any,
  genre: VietnameseGenre
): AlbumStoryData {
  const sources = formatSourcesForResponse(genre, title, artist);

  return {
    songId,
    title,
    artist,
    coverImage,
    pages: [
      {
        id: "cover",
        type: "cover",
        title: "Bìa Album",
        content: {
          albumArt: coverImage,
          title,
          artist,
          album: rawData.coverPage?.album || "Đang cập nhật",
          year: rawData.coverPage?.year || "Không rõ",
          genre: rawData.coverPage?.genre || genre,
          duration: rawData.coverPage?.duration || "4:00",
          sources: sources.slice(0, 3),
        },
      },
      {
        id: "lyrics",
        type: "lyrics",
        title: "Lời Bài Hát",
        content: {
          lines: rawData.lyrics?.lines || generateDefaultLyrics(),
          hasTranslation: rawData.lyrics?.hasTranslation || false,
        },
      },
      {
        id: "composition",
        type: "composition",
        title: "Câu Chuyện Sáng Tác",
        content: {
          story: rawData.composition?.story || generateDefaultStory(title, artist, genre),
          inspiration: rawData.composition?.inspiration,
          createdAt: rawData.composition?.createdAt,
          location: rawData.composition?.location,
          funFacts: rawData.composition?.funFacts || [],
          confidence: rawData.composition?.confidence || "medium",
          sources: sources,
        },
      },
      {
        id: "author",
        type: "author",
        title: "Về Nghệ Sĩ",
        content: {
          name: rawData.author?.name || artist,
          image: rawData.author?.image,
          bio: rawData.author?.bio || generateDefaultBio(artist, genre),
          birthYear: rawData.author?.birthYear,
          nationality: rawData.author?.nationality || "Việt Nam",
          genres: rawData.author?.genres || [genre],
          famousSongs: rawData.author?.famousSongs || [title],
          awards: rawData.author?.awards || [],
          timeline: rawData.author?.timeline || [],
          confidence: rawData.author?.confidence || "medium",
          sources: sources,
        },
      },
      {
        id: "covers",
        type: "covers",
        title: "Các Bản Cover",
        content: {
          originalArtist: rawData.covers?.originalArtist || artist,
          versions: rawData.covers?.versions || [],
        },
      },
      {
        id: "stories",
        type: "stories",
        title: "Câu Chuyện Xung Quanh",
        content: {
          stories: rawData.stories?.stories || [],
          sources: sources,
        },
      },
    ],
    confidence: rawData.overallConfidence || "medium",
    detectedGenre: genre,
  };
}

function generateFallbackData(
  songId: string,
  title: string,
  artist: string,
  coverImage: string,
  genre: VietnameseGenre
): AlbumStoryData {
  const sources = formatSourcesForResponse(genre, title, artist);

  return {
    songId,
    title,
    artist,
    coverImage,
    pages: [
      {
        id: "cover",
        type: "cover",
        title: "Bìa Album",
        content: {
          albumArt: coverImage,
          title,
          artist,
          album: "Đang cập nhật",
          year: "Không rõ",
          genre: genre,
          duration: "4:00",
          sources: sources.slice(0, 2),
        },
      },
      {
        id: "lyrics",
        type: "lyrics",
        title: "Lời Bài Hát",
        content: {
          lines: generateDefaultLyrics(),
          hasTranslation: false,
        },
      },
      {
        id: "composition",
        type: "composition",
        title: "Câu Chuyện Sáng Tác",
        content: {
          story: generateDefaultStory(title, artist, genre),
          inspiration: "Những trải nghiệm và cảm xúc cá nhân của nghệ sĩ",
          funFacts: [
            "Thông tin chi tiết đang được cập nhật",
          ],
          confidence: "low",
          sources: sources,
        },
      },
      {
        id: "author",
        type: "author",
        title: "Về Nghệ Sĩ",
        content: {
          name: artist,
          bio: generateDefaultBio(artist, genre),
          nationality: "Việt Nam",
          genres: [genre],
          famousSongs: [title],
          timeline: [],
          confidence: "low",
          sources: sources,
        },
      },
      {
        id: "covers",
        type: "covers",
        title: "Các Bản Cover",
        content: {
          originalArtist: artist,
          versions: [],
        },
      },
      {
        id: "stories",
        type: "stories",
        title: "Câu Chuyện Xung Quanh",
        content: {
          stories: [
            {
              title: "Thông tin đang được cập nhật",
              content: `Chúng tôi đang tìm kiếm thêm thông tin về "${title}" của ${artist}. Vui lòng tham khảo các nguồn chính thống để biết chi tiết.`,
              type: "trivia",
              verified: false,
            },
          ],
          sources: sources,
        },
      },
    ],
    confidence: "low",
    detectedGenre: genre,
  };
}

function generateDefaultLyrics() {
  return [
    { time: 0, text: "♪ Nhạc dạo...", emotion: "calm" as const },
    { time: 10, text: "Lời bài hát đang được cập nhật", emotion: "calm" as const },
    { time: 15, text: "Vui lòng tham khảo nguồn chính thống", emotion: "calm" as const },
    { time: 20, text: "để xem lời bài hát đầy đủ", emotion: "calm" as const },
  ];
}

function generateDefaultStory(title: string, artist: string, genre: VietnameseGenre): string {
  const genreNames: Record<VietnameseGenre, string> = {
    bolero: "nhạc Bolero trữ tình",
    tien_chien: "tân nhạc tiền chiến",
    dan_ca: "dân ca Việt Nam",
    nhac_do: "nhạc cách mạng",
    vpop: "V-Pop đương đại",
    indie: "indie Việt Nam",
    rap_viet: "Rap Việt",
    rock_viet: "Rock Việt Nam",
    nhac_tre: "nhạc trẻ",
    cai_luong: "cải lương",
    nhac_phim: "nhạc phim",
    unknown: "âm nhạc Việt Nam",
  };

  const genreName = genreNames[genre] || genreNames.unknown;

  return `"${title}" là một ca khúc thuộc thể loại ${genreName} trong sự nghiệp của ${artist}.

Bài hát thể hiện phong cách âm nhạc đặc trưng của nghệ sĩ, với giai điệu và ca từ được chắp bút tỉ mỉ.

Lưu ý: Thông tin chi tiết về hoàn cảnh sáng tác đang được cập nhật. Vui lòng tham khảo các nguồn chính thống để biết thêm.`;
}

function generateDefaultBio(artist: string, genre: VietnameseGenre): string {
  const genreNames: Record<VietnameseGenre, string> = {
    bolero: "nhạc Bolero",
    tien_chien: "tân nhạc",
    dan_ca: "dân ca",
    nhac_do: "nhạc cách mạng",
    vpop: "V-Pop",
    indie: "indie",
    rap_viet: "Rap Việt",
    rock_viet: "Rock Việt",
    nhac_tre: "nhạc trẻ",
    cai_luong: "cải lương",
    nhac_phim: "nhạc phim",
    unknown: "âm nhạc",
  };

  const genreName = genreNames[genre] || genreNames.unknown;

  return `${artist} là nghệ sĩ hoạt động trong lĩnh vực ${genreName} của nền âm nhạc Việt Nam.

Với phong cách riêng biệt, nghệ sĩ đã tạo dấu ấn trong lòng người hâm mộ qua nhiều tác phẩm.

Lưu ý: Đây là thông tin tổng hợp. Để biết tiểu sử chi tiết và chính xác, vui lòng tham khảo các nguồn đáng tin cậy.`;
}

// Transform verified database entry to AlbumStoryData (100% accurate, no AI)
function transformDatabaseToAlbumStory(
  songId: string,
  title: string,
  artist: string,
  coverImage: string,
  dbEntry: any,
  genre: VietnameseGenre
): AlbumStoryData {
  const sources = dbEntry.sources?.map((s: any) => ({
    title: s.title,
    url: s.url,
    reliability: s.reliability,
  })) || formatSourcesForResponse(genre, title, artist);

  return {
    songId,
    title,
    artist,
    coverImage,
    pages: [
      {
        id: "cover",
        type: "cover",
        title: "Bìa Album",
        content: {
          albumArt: coverImage,
          title: dbEntry.metadata?.title || title,
          artist: dbEntry.metadata?.composerName || artist,
          album: dbEntry.metadata?.album || "Single",
          year: dbEntry.metadata?.releaseYear?.toString() || "Không rõ",
          genre: dbEntry.metadata?.genres?.[0] || genre,
          duration: "4:00",
          sources: sources.slice(0, 3),
        },
      },
      {
        id: "lyrics",
        type: "lyrics",
        title: "Lời Bài Hát",
        content: {
          lines: generateDefaultLyrics(), // Lyrics from separate API
          hasTranslation: false,
        },
      },
      {
        id: "composition",
        type: "composition",
        title: "Câu Chuyện Sáng Tác",
        content: {
          story: dbEntry.compositionContext?.narrative || dbEntry.summary || generateDefaultStory(title, artist, genre),
          inspiration: dbEntry.compositionContext?.inspiration,
          createdAt: dbEntry.metadata?.releaseYear?.toString(),
          location: dbEntry.compositionContext?.location,
          funFacts: dbEntry.interestingFacts?.map((f: any) => f.content) || [],
          confidence: dbEntry.contentQuality?.overallConfidence || "high",
          sources: sources,
        },
      },
      {
        id: "author",
        type: "author",
        title: "Về Nghệ Sĩ",
        content: {
          name: dbEntry.metadata?.composerName || artist,
          bio: dbEntry.historicalContext?.culturalSignificance || generateDefaultBio(artist, genre),
          nationality: "Việt Nam",
          genres: dbEntry.metadata?.genres || [genre],
          famousSongs: [title],
          awards: [],
          timeline: [],
          confidence: dbEntry.contentQuality?.overallConfidence || "high",
          sources: sources,
        },
      },
      {
        id: "covers",
        type: "covers",
        title: "Các Bản Cover",
        content: {
          originalArtist: dbEntry.metadata?.composerName || artist,
          versions: [],
        },
      },
      {
        id: "stories",
        type: "stories",
        title: "Câu Chuyện Xung Quanh",
        content: {
          stories: dbEntry.interestingFacts?.map((f: any) => ({
            title: "Thông tin thú vị",
            content: f.content,
            type: "trivia",
            source: f.source,
            verified: true,
          })) || [],
          sources: sources,
        },
      },
    ],
    confidence: dbEntry.contentQuality?.overallConfidence || "high",
    detectedGenre: genre,
  };
}
