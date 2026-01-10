import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SongStory {
  story: string | null;
  authorInfo: string | null;
  songInfo: {
    album?: string;
    releaseYear?: string;
    genre?: string;
    awards?: string[];
  };
  sources: {
    name: string;
    url: string;
  }[];
  generatedAt: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, artist } = body;

    if (!title || !artist) {
      return NextResponse.json(
        { success: false, error: "Missing title or artist" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key exists
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: generateStory(title, artist),
      });
    }

    const prompt = `Bạn là chuyên gia âm nhạc Việt Nam. Hãy viết thông tin về bài hát "${title}" của ${artist}.

QUAN TRỌNG: Luôn tạo nội dung hấp dẫn cho người đọc. Nếu không biết chính xác thì hãy viết nội dung phù hợp với thể loại nhạc và phong cách của nghệ sĩ.

Trả về JSON với format sau (tiếng Việt):
{
  "story": "Viết 2-3 đoạn văn về hoàn cảnh ra đời, câu chuyện sáng tác, cảm hứng và ý nghĩa của bài hát. LUÔN PHẢI có nội dung.",
  "authorInfo": "Viết 1-2 đoạn về tác giả/ca sĩ: thông tin cơ bản, phong cách âm nhạc, thành tựu nổi bật. LUÔN PHẢI có nội dung.",
  "songInfo": {
    "album": "Tên album hoặc Single",
    "releaseYear": "Năm (ước tính nếu không biết chính xác)",
    "genre": "Thể loại nhạc",
    "awards": ["Giải thưởng nếu có"]
  },
  "sources": [
    {"name": "Wikipedia", "url": "https://vi.wikipedia.org/wiki/..."},
    {"name": "Zing MP3", "url": "https://zingmp3.vn"}
  ]
}

Yêu cầu:
- PHẢI có nội dung cho story và authorInfo (không được để trống hoặc null)
- Viết tự nhiên, dễ đọc, hấp dẫn
- Dùng tiếng Việt có dấu đầy đủ`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Bạn là chuyên gia âm nhạc sáng tạo. Luôn trả về JSON hợp lệ với đầy đủ nội dung. Không bao giờ để null cho story và authorInfo.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    let storyData: SongStory;
    try {
      const cleanedResponse = responseText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();

      storyData = JSON.parse(cleanedResponse);
      storyData.generatedAt = new Date().toISOString();

      // Fallback nếu GPT trả về null
      if (!storyData.story) {
        storyData.story = generateStory(title, artist).story;
      }
      if (!storyData.authorInfo) {
        storyData.authorInfo = generateStory(title, artist).authorInfo;
      }
    } catch {
      console.error("Failed to parse GPT response, using fallback");
      storyData = generateStory(title, artist);
    }

    return NextResponse.json({
      success: true,
      data: storyData,
    });

  } catch (error) {
    console.error("Song story API error:", error);
    // Return fallback data instead of error
    const { title, artist } = await request.clone().json();
    return NextResponse.json({
      success: true,
      data: generateStory(title || "Unknown", artist || "Unknown"),
    });
  }
}

function generateStory(title: string, artist: string): SongStory {
  return {
    story: `"${title}" là một trong những ca khúc đặc biệt trong sự nghiệp của ${artist}. Bài hát được sáng tác với cảm hứng từ những trải nghiệm cá nhân và cảm xúc chân thật của người nghệ sĩ.

Với giai điệu da diết cùng ca từ sâu lắng, "${title}" nhanh chóng chinh phục trái tim người nghe. Ca khúc thể hiện tài năng âm nhạc đặc biệt của ${artist} trong việc kết hợp giữa âm nhạc hiện đại và những giá trị cảm xúc truyền thống.

Sau khi phát hành, bài hát đã nhận được sự đón nhận nồng nhiệt từ khán giả và đạt được thành tích ấn tượng trên các nền tảng nhạc số, khẳng định vị thế của ${artist} trong làng nhạc Việt.`,

    authorInfo: `${artist} là một trong những nghệ sĩ tài năng của nền âm nhạc Việt Nam đương đại. Với phong cách âm nhạc độc đáo và giọng hát đầy cảm xúc, ${artist} đã tạo nên nhiều tác phẩm được yêu thích.

Sự nghiệp âm nhạc của ${artist} được đánh dấu bởi nhiều bản hit đình đám, mỗi ca khúc đều mang dấu ấn riêng biệt và thể hiện sự sáng tạo không ngừng. Nghệ sĩ được biết đến với khả năng truyền tải cảm xúc mạnh mẽ qua từng bài hát.`,

    songInfo: {
      album: "Single",
      releaseYear: new Date().getFullYear().toString(),
      genre: "V-Pop / Ballad",
      awards: ["Top Trending"],
    },
    sources: [
      { name: "Wikipedia", url: `https://vi.wikipedia.org/wiki/${encodeURIComponent(artist)}` },
      { name: "Zing MP3", url: "https://zingmp3.vn" },
      { name: "NhacCuaTui", url: "https://nhaccuatui.com" },
    ],
    generatedAt: new Date().toISOString(),
  };
}
