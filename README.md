# Melody AI - Ứng Dụng Nghe Nhạc Việt Nam Thông Minh

<div align="center">

![Melody AI](https://img.shields.io/badge/Melody-AI-purple?style=for-the-badge&logo=music&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**Trải nghiệm âm nhạc Việt Nam với công nghệ AI tiên tiến**

[Bắt đầu](#cài-đặt) • [Tính năng](#tính-năng) • [Cấu hình](#cấu-hình) • [Đóng góp](#đóng-góp)

</div>

---

## Giới Thiệu

Melody AI là ứng dụng nghe nhạc thông minh được thiết kế đặc biệt cho âm nhạc Việt Nam. Với giao diện Apple Vision Pro hiện đại và tích hợp AI, ứng dụng mang đến trải nghiệm nghe nhạc độc đáo với lời bài hát đồng bộ, câu chuyện bài hát, hiệu ứng hình ảnh và nhiều tính năng sáng tạo khác.

## Tính Năng

### Trình Phát Nhạc
- Tích hợp YouTube Player với chất lượng cao
- Lời bài hát đồng bộ thời gian thực (từ LrcLib + OpenAI)
- Giao diện tối minimalist theo phong cách Apple Vision Pro
- Điều khiển phát nhạc đầy đủ (play/pause, seek, volume)

### Hiệu Ứng Hình Ảnh
- **MoodAura**: Hào quang màu sắc theo tâm trạng bài hát
- **EmotionParticles**: Nốt nhạc bay với hiệu ứng độ sâu 3D
- **AnimatedGradient**: Nền gradient động theo nhạc
- Thiết kế Liquid Glass theo Apple Vision Pro

### DJ Mixer
- Bộ điều chỉnh EQ (Bass, Mid, Treble)
- Hiệu ứng âm thanh: Reverb, Delay, Distortion, Flanger
- Preset nhanh: Telephone, Vinyl, Underwater, Chipmunk, Echo, Robot...
- Giao diện glass morphism cao cấp

### Câu Chuyện Bài Hát
- Tự động tạo câu chuyện về bài hát với AI
- Thông tin nghệ sĩ, lịch sử sáng tác
- Dữ liệu từ Wikipedia, MusicBrainz và nguồn đáng tin cậy

### Album Story
- Trải nghiệm nghe nhạc theo chủ đề
- Câu chuyện nghệ sĩ với hình ảnh và nội dung phong phú
- Danh sách phát được tuyển chọn

## Yêu Cầu Hệ Thống

- **Node.js**: 18.0 trở lên
- **npm** hoặc **yarn** hoặc **pnpm**
- **Trình duyệt**: Chrome, Firefox, Safari, Edge (phiên bản mới nhất)

## Cài Đặt

### 1. Clone Repository

```bash
git clone https://github.com/your-username/melody-ai.git
cd melody-ai
```

### 2. Cài Đặt Dependencies

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 3. Cấu Hình Môi Trường

Tạo file `.env.local` từ mẫu:

```bash
cp .env.example .env.local
```

Mở `.env.local` và điền API key của bạn:

```env
# Bắt buộc - OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Tùy chọn - YouTube Data API (để tìm kiếm nâng cao)
YOUTUBE_API_KEY=your-youtube-api-key

# Chế độ Demo (true = không cần API key)
NEXT_PUBLIC_DEMO_MODE=false
```

### 4. Chạy Ứng Dụng

```bash
# Chế độ phát triển
npm run dev

# Hoặc build và chạy production
npm run build
npm start
```

Truy cập ứng dụng tại: **http://localhost:3000**

## Cấu Hình

### Lấy OpenAI API Key

1. Truy cập [platform.openai.com](https://platform.openai.com)
2. Đăng nhập hoặc tạo tài khoản
3. Vào **Settings** → **API Keys**
4. Nhấn **Create new secret key**
5. Copy key và dán vào `.env.local`

> **Lưu ý**: API key được lưu trữ an toàn và không bao giờ được gửi đến server của bên thứ ba. Tất cả API calls được thực hiện trực tiếp từ server Next.js của bạn.

### Lấy YouTube API Key (Tùy chọn)

1. Truy cập [Google Cloud Console](https://console.cloud.google.com)
2. Tạo project mới hoặc chọn project có sẵn
3. Bật **YouTube Data API v3**
4. Tạo credentials (API Key)
5. Copy key và dán vào `.env.local`

## Cấu Trúc Dự Án

```
melody-ai/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── lyrics/        # API lời bài hát
│   │   ├── search/        # API tìm kiếm
│   │   ├── song-story/    # API câu chuyện bài hát
│   │   └── album-story/   # API album story
│   ├── player/            # Trang trình phát nhạc
│   ├── album-story/       # Trang album story
│   └── synesthesia/       # Trang hiệu ứng âm thanh-hình ảnh
├── components/
│   ├── player/            # Components trình phát
│   ├── visual/            # Components hiệu ứng hình ảnh
│   ├── dj/                # Components DJ Mixer
│   ├── album-story/       # Components album story
│   ├── setup/             # Components thiết lập
│   └── background/        # Components nền
├── lib/
│   ├── audio/             # Xử lý âm thanh
│   ├── cache/             # Hệ thống cache
│   ├── database/          # Cơ sở dữ liệu nội dung
│   └── services/          # Dịch vụ bên ngoài
└── types/                 # TypeScript definitions
```

## Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|-----------|----------|
| **Next.js 14** | Framework React với App Router |
| **TypeScript** | Type safety và DX tốt hơn |
| **Tailwind CSS** | Styling utility-first |
| **Framer Motion** | Animation mượt mà |
| **OpenAI API** | AI cho lời bài hát và nội dung |
| **Web Audio API** | Xử lý âm thanh DJ Mixer |
| **LrcLib** | Nguồn lời bài hát đồng bộ |

## Tính Năng Sắp Tới

- [ ] Danh sách phát tùy chỉnh
- [ ] Chế độ offline
- [ ] Chia sẻ lên mạng xã hội
- [ ] Nhận diện bài hát bằng giọng nói
- [ ] Tích hợp Spotify/Apple Music

## Đóng Góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng mới'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## Bảo Mật

- Không bao giờ commit file `.env.local` hoặc API keys
- File `client_secret.json` đã được gitignore
- API keys được mã hóa khi lưu trữ local
- Tất cả API calls được thực hiện qua server-side

## Giấy Phép

Dự án này được phân phối dưới giấy phép MIT. Xem file [LICENSE](LICENSE) cho chi tiết.

## Liên Hệ

- **Issues**: [GitHub Issues](https://github.com/your-username/melody-ai/issues)
- **Email**: your-email@example.com

---

<div align="center">

**Được tạo với tình yêu âm nhạc Việt Nam**

</div>
