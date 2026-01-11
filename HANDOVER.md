# HANDOVER - Melody AI

> **Khi quay lại, chỉ cần nói: "Đọc file HANDOVER.md để tiếp tục"**

## Dự án là gì?
Ứng dụng web nghe nhạc Việt Nam với nhiều tính năng AI:
- Tìm bài hát → Phát nhạc từ YouTube
- Hiển thị lyrics karaoke sync theo thời gian
- Album Story - câu chuyện về bài hát/nghệ sĩ
- Synesthesia - visual effects theo nhạc
- DJ Mixer - hiệu ứng âm thanh

## Tech Stack
- Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- YouTube IFrame API (phát nhạc)
- LrcLib API (lyrics có timestamp)
- OpenAI API với web_search_preview (lyrics fallback + album story)

## Cấu trúc quan trọng

```
/app
  /api/lyrics/route.ts       ← API tìm lyrics (LrcLib + OpenAI parallel)
  /api/album-story/route.ts  ← API lấy thông tin bài hát/nghệ sĩ
  /api/search/route.ts       ← API search YouTube
  /api/song-story/           ← API câu chuyện bài hát
  /player/page.tsx           ← Trang player chính
  /synesthesia/page.tsx      ← Trang visual effects
  /page.tsx                  ← Trang home/search

/components
  /player/
    LyricsPanel.tsx          ← Panel hiển thị lyrics
    SongStoryPanel.tsx       ← Panel câu chuyện bài hát
    YouTubePlayer.tsx        ← Player YouTube ẩn
    PlayerControls.tsx       ← Điều khiển play/pause/skip
  /album-story/
    AlbumStoryPlayer.tsx     ← Card story dạng flip
    pages/LyricsPage.tsx     ← Trang lyrics trong Album Story
  /synesthesia/
    StyleSelector.tsx        ← Chọn phong cách visual
  /setup/
    APIKeySetup.tsx          ← Màn hình setup API key lần đầu
  /dj/
    DJMixerPanel.tsx         ← Panel DJ mixer
```

## Env cần thiết
```
OPENAI_API_KEY=sk-xxx   # Bắt buộc cho lyrics fallback + album story
```

## Chạy dev
```bash
cd /Users/mac/musicAI/melody-ai
npm run dev -- -p 3001
# http://localhost:3001
```

## Git Repository
- **URL:** https://github.com/nclamvn/melody-ai
- **Branch:** main
- **Status:** Public, safe to share (no secrets committed)

---

## Session gần nhất (2026-01-11)

### Những gì đã làm:

1. **Fix Album Story LyricsPage trống**
   - Problem: LyricsPage trong Album Story không hiển thị lyrics
   - Solution: AlbumStoryPlayer giờ fetch lyrics riêng từ `/api/lyrics`
   - File: `components/album-story/AlbumStoryPlayer.tsx`

2. **Cải thiện APIKeySetup với Apple Vision Pro design**
   - Glass morphism effects
   - Monochrome white buttons
   - Subtle borders và shadows
   - File: `components/setup/APIKeySetup.tsx`

3. **Fix Back Button Navigation**
   - Problem: Bấm back khi xem lyrics → về trang search (mất nhạc đang phát)
   - Solution: Thêm persistent back button đóng panels theo thứ tự priority
   - Order: DJ Mixer → Album Story → Mobile Story → Lyrics → router.back()
   - File: `app/player/page.tsx`

4. **Nâng cấp StyleSelector**
   - Thêm tiếng Việt có dấu đầy đủ
   - Enhanced Apple Vision Pro design
   - Animated color dots
   - Close button + hover glow effects
   - File: `components/synesthesia/StyleSelector.tsx`

5. **Xóa lyrics khỏi SongStoryPanel**
   - Lyrics chỉ hiển thị trong Album Story LyricsPage
   - SongStoryPanel chỉ show: Hoàn cảnh ra đời, Về nghệ sĩ, Thông tin bài hát
   - File: `components/player/SongStoryPanel.tsx`

### Commits:
```
dc79b2e feat: UI improvements and Album Story lyrics fix
2a46eaa feat: Major update - Visual effects, DJ Mixer, API Key setup
40949b5 Initial commit: Melody AI music player
```

---

## Cách hoạt động của các tính năng chính

### 1. Lyrics Flow
```
User mở player → useEffect fetch /api/lyrics
                         ↓
              LrcLib search (quick) ──┬── OpenAI web search (parallel)
                         ↓            │
              Return first success ←──┘
                         ↓
              LyricsPanel hiển thị với sync time
```

### 2. Album Story Flow
```
User bấm "Album Story" → AlbumStoryPlayer mount
                              ↓
              Fetch /api/album-story (song info, author, story)
              Fetch /api/lyrics (real lyrics) ← [PARALLEL]
                              ↓
              LyricsPage nhận real lyrics từ state
              Các page khác nhận data từ album-story API
```

### 3. API Key Setup Flow
```
App load → AppProvider check localStorage
                  ↓
        No API key? → Show APIKeySetup modal
                  ↓
        User nhập key → Validate (starts with sk-)
                  ↓
        Save to localStorage (obfuscated key)
```

---

## Vấn đề còn tồn tại

1. **Lyrics sync không chính xác 100%**
   - OpenAI trả về text thuần, không có timestamp chính xác
   - Đang dùng ước lượng: intro 15s + chia đều
   - User có thể điều chỉnh bằng nút Sync +/-

2. **Một số bài Việt không có trên LrcLib**
   - Phụ thuộc vào OpenAI web search
   - Có thể không tìm thấy bài quá mới hoặc ít phổ biến

3. **DJ Mixer chưa hoạt động với YouTube audio**
   - audioRef truyền vào là null
   - Cần Web Audio API integration

---

## Có thể làm tiếp

- [ ] DJ Mixer integration với Web Audio API
- [ ] Cache lyrics đã tìm được (localStorage/IndexedDB)
- [ ] Playlist / Queue system
- [ ] PWA support
- [ ] Thêm nguồn lyrics khác (Genius, Musixmatch)
- [ ] User submit/edit lyrics

---

## Commands hữu ích

```bash
# Chạy dev server
npm run dev -- -p 3001

# Check TypeScript errors
npx tsc --noEmit

# Git push
git add -A && git commit -m "message" && git push origin main

# Test lyrics API
curl "http://localhost:3001/api/lyrics?title=Ten%20Bai%20Hat&artist=Ca%20Si&duration=300"
```

---
**Last updated:** 2026-01-11
