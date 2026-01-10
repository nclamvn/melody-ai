import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function searchWithAI(query: string): Promise<string[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Bạn là một chuyên gia về nhạc Việt Nam. Khi người dùng mô tả một bài hát bằng lời không chính xác, giai điệu, hoặc mô tả mơ hồ, hãy đề xuất các bài hát phù hợp nhất.

Trả về danh sách tên bài hát (tối đa 5 bài) theo format JSON array, ví dụ:
["Tên bài 1", "Tên bài 2", "Tên bài 3"]

Chỉ trả về JSON array, không kèm giải thích.`,
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = completion.choices[0]?.message?.content || '[]';

    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

export default openai;
