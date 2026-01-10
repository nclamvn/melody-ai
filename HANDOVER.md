# HANDOVER - Melody AI

## Dự án là gì?
Ứng dụng web nghe nhạc với lyrics karaoke. Tìm bài hát → Phát nhạc từ YouTube → Hiển thị lời bài hát sync theo thời gian.

## Tech Stack
- Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- YouTube IFrame API (phát nhạc)
- LrcLib API (lyrics có timestamp)
- OpenAI API với web_search_preview (fallback tìm lyrics)

## Cấu trúc quan trọng

```
/app
  /api/lyrics/route.ts    ← API tìm lyrics (LrcLib + OpenAI parallel)
  /api/search/route.ts    ← API search YouTube
  /player/page.tsx        ← Trang player chính
  /page.tsx               ← Trang home/search

/components
  /player/LyricsDisplay.tsx   ← Hiển thị lyrics karaoke
  /player/YouTubePlayer.tsx   ← Player YouTube ẩn
  /background/MusicParticles.tsx  ← Hiệu ứng nốt nhạc bay
```

## Env cần thiết
```
OPENAI_API_KEY=sk-xxx   # Bắt buộc cho lyrics fallback
```

## Chạy dev
```bash
cd /Users/mac/musicAI/melody-ai
npm run dev
# http://localhost:3001
```

## Những gì đã làm trong session này

1. **Fix light theme** - Text color không hiện trong light mode
   - Thêm CSS overrides trong `globals.css`

2. **Fix YouTube không phát tiếng**
   - Volume 0.8 → 80 (YouTube dùng 0-100)
   - Thêm `unMute()`
   - Đổi hidden div từ `display:none` sang off-screen

3. **Fix URL encoding** - Cover image bị encode 2 lần
   - Bỏ `encodeURIComponent` trong SongCard (URLSearchParams tự encode)

4. **Lyrics system hoàn chỉnh**
   - LrcLib cho synced lyrics
   - OpenAI web search làm fallback
   - Chạy parallel để nhanh hơn (~10-15s thay vì ~35s)
   - Filter OpenAI copyright refusals
   - Placeholder khi không tìm thấy

5. **Sync adjustment** - Nút +/- để điều chỉnh lyrics timing thủ công
   - State `lyricsOffset` trong player/page.tsx
   - Mỗi lần nhấn +/- thay đổi 2 giây

6. **Meteor animation** - Nốt nhạc bay như sao băng
   - Từ 5 hướng khác nhau
   - Tốc độ 2-7 giây mỗi meteor
   - Sync với beat khi nhạc phát

## Vấn đề còn tồn tại

1. **Lyrics sync không chính xác** với bài hát thực
   - OpenAI trả về text thuần, không có timestamp
   - Đang dùng ước lượng: intro 15s + chia đều
   - User có thể điều chỉnh bằng nút Sync +/-

2. **OpenAI hay từ chối vì copyright**
   - Đã filter patterns như "xin lỗi", "bản quyền"
   - Fallback sang placeholder

3. **Một số bài Việt không có trên LrcLib**
   - Phụ thuộc OpenAI hoặc placeholder

## Tiếp tục từ đây

Có thể làm tiếp:
- [ ] Thêm nguồn lyrics khác (Genius, Musixmatch)
- [ ] Cache lyrics đã tìm được
- [ ] Cho phép user edit/submit lyrics
- [ ] Playlist / Queue system
- [ ] PWA support

## Commands hữu ích

```bash
# Xem logs server
tail -f /tmp/claude/-Users-mac-musicAI/tasks/b30bf21.output

# Test lyrics API
curl "http://localhost:3001/api/lyrics?title=Ten%20Bai%20Hat&artist=Ca%20Si&duration=300"
```

---
Last updated: 2026-01-03
