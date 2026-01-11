/**
 * Vietnamese Music Sources and Genre Detection Utility
 * Provides expanded source references for accurate content generation
 */

// Genre categories for Vietnamese music
export type VietnameseGenre =
  | 'bolero'
  | 'tien_chien'
  | 'dan_ca'
  | 'nhac_do'
  | 'vpop'
  | 'indie'
  | 'rap_viet'
  | 'rock_viet'
  | 'nhac_tre'
  | 'cai_luong'
  | 'nhac_phim'
  | 'unknown';

// Confidence levels for content accuracy
export type ConfidenceLevel = 'high' | 'medium' | 'low';

// Source reliability rating
export interface MusicSource {
  name: string;
  url: string;
  reliability: 'official' | 'verified' | 'community' | 'general';
  searchKeywords: string[];
  genres: VietnameseGenre[];
  description: string;
}

// Source configuration for Vietnamese music
export const VIETNAMESE_MUSIC_SOURCES: MusicSource[] = [
  // Bolero / Nhạc Vàng sources
  {
    name: 'Nhạc Vàng Bolero',
    url: 'https://nhacvangbolero.com',
    reliability: 'community',
    searchKeywords: ['bolero', 'nhac vang', 'nhạc vàng', 'tru tinh'],
    genres: ['bolero'],
    description: 'Chuyên trang nhạc Bolero và nhạc vàng Việt Nam',
  },
  {
    name: 'Bolero Online',
    url: 'https://boleroonline.net',
    reliability: 'community',
    searchKeywords: ['bolero', 'tan co'],
    genres: ['bolero', 'cai_luong'],
    description: 'Nguồn nhạc Bolero phong phú',
  },

  // Pre-war / Tiền chiến sources
  {
    name: 'Nhạc Tiền Chiến',
    url: 'https://nhactienchien.com',
    reliability: 'community',
    searchKeywords: ['tien chien', 'tiền chiến', 'nhac xua', 'nhạc xưa'],
    genres: ['tien_chien'],
    description: 'Kho tàng nhạc tiền chiến Việt Nam',
  },
  {
    name: 'Nhạc Xưa',
    url: 'https://nhacxua.vn',
    reliability: 'community',
    searchKeywords: ['nhac xua', 'nhạc xưa', 'classic vietnamese'],
    genres: ['tien_chien', 'bolero'],
    description: 'Âm nhạc Việt Nam trước 1975',
  },

  // Folk / Dân ca sources
  {
    name: 'Dân Ca Việt Nam',
    url: 'https://danca.vn',
    reliability: 'community',
    searchKeywords: ['dan ca', 'dân ca', 'folk', 'truyen thong'],
    genres: ['dan_ca'],
    description: 'Kho tàng dân ca các vùng miền',
  },
  {
    name: 'Âm Nhạc Dân Tộc',
    url: 'https://amnhacdantoc.vn',
    reliability: 'verified',
    searchKeywords: ['dan toc', 'dân tộc', 'traditional'],
    genres: ['dan_ca'],
    description: 'Âm nhạc dân tộc Việt Nam',
  },

  // Revolutionary / Nhạc đỏ sources
  {
    name: 'Nhạc Đỏ',
    url: 'https://nhacdo.vn',
    reliability: 'community',
    searchKeywords: ['nhac do', 'nhạc đỏ', 'cach mang', 'revolutionary'],
    genres: ['nhac_do'],
    description: 'Âm nhạc cách mạng Việt Nam',
  },
  {
    name: 'Nhạc Cách Mạng',
    url: 'https://nhaccachmang.vn',
    reliability: 'verified',
    searchKeywords: ['cach mang', 'cách mạng', 'quan doi'],
    genres: ['nhac_do'],
    description: 'Kho nhạc cách mạng chính thống',
  },

  // General Vietnamese music sources
  {
    name: 'Wikipedia Tiếng Việt',
    url: 'https://vi.wikipedia.org',
    reliability: 'verified',
    searchKeywords: ['all'],
    genres: ['vpop', 'bolero', 'tien_chien', 'dan_ca', 'nhac_do', 'indie', 'rap_viet', 'rock_viet', 'nhac_tre'],
    description: 'Bách khoa toàn thư mở',
  },
  {
    name: 'Zing MP3',
    url: 'https://zingmp3.vn',
    reliability: 'official',
    searchKeywords: ['all'],
    genres: ['vpop', 'nhac_tre', 'indie', 'rap_viet'],
    description: 'Nền tảng nhạc số lớn nhất Việt Nam',
  },
  {
    name: 'NhacCuaTui',
    url: 'https://nhaccuatui.com',
    reliability: 'official',
    searchKeywords: ['all'],
    genres: ['vpop', 'nhac_tre', 'bolero', 'indie'],
    description: 'Nền tảng nhạc số Việt Nam',
  },
  {
    name: 'Spotify Vietnam',
    url: 'https://open.spotify.com',
    reliability: 'official',
    searchKeywords: ['all'],
    genres: ['vpop', 'indie', 'rap_viet', 'rock_viet'],
    description: 'Nền tảng streaming quốc tế',
  },
  {
    name: 'Genius',
    url: 'https://genius.com',
    reliability: 'verified',
    searchKeywords: ['lyrics', 'annotations'],
    genres: ['vpop', 'rap_viet', 'indie'],
    description: 'Lời bài hát và chú thích',
  },
  {
    name: 'Báo Thanh Niên - Văn hóa Giải trí',
    url: 'https://thanhnien.vn/van-hoa',
    reliability: 'verified',
    searchKeywords: ['news', 'interview'],
    genres: ['vpop', 'nhac_tre', 'indie'],
    description: 'Tin tức âm nhạc Việt Nam',
  },
  {
    name: 'Tuổi Trẻ - Văn hóa',
    url: 'https://tuoitre.vn/van-hoa',
    reliability: 'verified',
    searchKeywords: ['news', 'review'],
    genres: ['vpop', 'nhac_tre'],
    description: 'Tin tức văn hóa giải trí',
  },
];

// Genre detection keywords
const GENRE_KEYWORDS: Record<VietnameseGenre, string[]> = {
  bolero: ['bolero', 'nhạc vàng', 'nhac vang', 'trữ tình', 'tru tinh', 'sến', 'rumba', 'tango'],
  tien_chien: ['tiền chiến', 'tien chien', 'nhạc xưa', 'nhac xua', '1950', '1960', '1940'],
  dan_ca: ['dân ca', 'dan ca', 'quan họ', 'chèo', 'cải lương', 'hò', 'vọng cổ', 'đờn ca tài tử'],
  nhac_do: ['nhạc đỏ', 'nhac do', 'cách mạng', 'cach mang', 'quân đội', 'kháng chiến', 'chiến sĩ'],
  vpop: ['vpop', 'v-pop', 'nhạc trẻ', 'nhac tre', 'pop việt'],
  indie: ['indie', 'underground', 'độc lập', 'alternative'],
  rap_viet: ['rap', 'hip hop', 'hip-hop', 'rapper', 'rap việt'],
  rock_viet: ['rock', 'metal', 'rock việt', 'ban nhạc'],
  nhac_tre: ['nhạc trẻ', 'nhac tre', 'teen', 'thanh niên'],
  cai_luong: ['cải lương', 'cai luong', 'vọng cổ', 'đờn ca'],
  nhac_phim: ['nhạc phim', 'ost', 'soundtrack', 'phim'],
  unknown: [],
};

// Famous Vietnamese artists by genre
const ARTISTS_BY_GENRE: Record<VietnameseGenre, string[]> = {
  bolero: [
    'Chế Linh', 'Tuấn Vũ', 'Như Quỳnh', 'Quang Lê', 'Phi Nhung', 'Đan Nguyên',
    'Lệ Quyên', 'Mạnh Quỳnh', 'Hoàng Oanh', 'Giao Linh', 'Thanh Tuyền', 'Hương Lan'
  ],
  tien_chien: [
    'Thái Thanh', 'Khánh Ly', 'Lệ Thu', 'Elvis Phương', 'Tuấn Ngọc', 'Duy Khánh',
    'Hoàng Oanh', 'Julie', 'Ngọc Lan', 'Thanh Thúy'
  ],
  dan_ca: [
    'NSND Thu Hiền', 'NSƯT Thanh Hoa', 'Anh Thơ', 'Tân Nhàn', 'Thu Hà',
    'Hồng Nhung', 'NSND Thanh Hải'
  ],
  nhac_do: [
    'NSND Thanh Hoa', 'NSND Thu Hiền', 'Trọng Tấn', 'Anh Thơ', 'Tùng Dương',
    'Đức Long', 'Trần Tiến'
  ],
  vpop: [
    'Mỹ Tâm', 'Sơn Tùng M-TP', 'Đàm Vĩnh Hưng', 'Hồ Ngọc Hà', 'Thu Minh',
    'Hiền Thục', 'Hoàng Thùy Linh', 'Bích Phương', 'Min', 'Vũ Cát Tường'
  ],
  indie: [
    'Ngọt', 'Cá Hồi Hoang', 'Chillies', 'Da LAB', 'Vũ', 'Trang', 'Thịnh Suy',
    'Madihu', 'MONO', 'Kai Đinh'
  ],
  rap_viet: [
    'Đen Vâu', 'Binz', 'Karik', 'Wowy', 'Suboi', 'Rhymastic', 'JustaTee',
    'B Ray', 'MCK', 'tlinh', 'Low G'
  ],
  rock_viet: [
    'Bức Tường', 'Microwave', 'Cá Hồi Hoang', 'Unlimited', 'Black Infinity',
    'Gạt Tàn Đầy', 'HKT'
  ],
  nhac_tre: [
    'Chi Pu', 'Erik', 'AMEE', 'Jack', 'Hoài Lâm', 'Noo Phước Thịnh',
    'Đông Nhi', 'Ông Cao Thắng'
  ],
  cai_luong: [
    'NSƯT Vũ Linh', 'NSƯT Thoại Mỹ', 'Kim Tử Long', 'Ngọc Huyền', 'Thanh Ngân',
    'NSƯT Thanh Thanh Tâm'
  ],
  nhac_phim: [
    'Phan Mạnh Quỳnh', 'Vũ Cát Tường', 'Uyên Linh', 'Văn Mai Hương', 'Isaac'
  ],
  unknown: [],
};

/**
 * Detect the genre of a song based on title, artist, and context
 */
export function detectGenre(title: string, artist: string, additionalContext?: string): VietnameseGenre {
  const searchText = `${title} ${artist} ${additionalContext || ''}`.toLowerCase();

  // Check artist-based genre detection first
  for (const [genre, artists] of Object.entries(ARTISTS_BY_GENRE)) {
    for (const knownArtist of artists) {
      if (artist.toLowerCase().includes(knownArtist.toLowerCase()) ||
          knownArtist.toLowerCase().includes(artist.toLowerCase())) {
        return genre as VietnameseGenre;
      }
    }
  }

  // Check keyword-based detection
  for (const [genre, keywords] of Object.entries(GENRE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return genre as VietnameseGenre;
      }
    }
  }

  return 'vpop'; // Default to V-Pop for modern Vietnamese music
}

/**
 * Get relevant sources for a specific genre
 */
export function getSourcesForGenre(genre: VietnameseGenre): MusicSource[] {
  return VIETNAMESE_MUSIC_SOURCES.filter(
    source => source.genres.includes(genre) || source.searchKeywords.includes('all')
  );
}

/**
 * Get search URLs for a song based on genre
 */
export function getSearchUrls(
  title: string,
  artist: string,
  genre: VietnameseGenre
): { name: string; url: string; reliability: string }[] {
  const sources = getSourcesForGenre(genre);
  const encodedQuery = encodeURIComponent(`${title} ${artist}`);

  return sources.map(source => ({
    name: source.name,
    url: source.url.includes('wikipedia')
      ? `${source.url}/wiki/${encodeURIComponent(artist)}`
      : `${source.url}/search?q=${encodedQuery}`,
    reliability: source.reliability,
  }));
}

/**
 * Generate enhanced system prompt based on genre
 */
export function getEnhancedSystemPrompt(genre: VietnameseGenre): string {
  const genreSpecificInstructions: Record<VietnameseGenre, string> = {
    bolero: `
Đây là nhạc Bolero/Nhạc Vàng - thể loại quan trọng trong âm nhạc Việt Nam:
- Chú ý đến thời kỳ vàng son (1960s-1975) và sự phát triển sau đó
- Đề cập đến các nhạc sĩ nổi tiếng: Trúc Phương, Lam Phương, Trịnh Công Sơn
- Nêu bật phong cách trữ tình, lãng mạn đặc trưng
- Tham khảo từ nhacvangbolero.com, các kênh Bolero chính thống`,

    tien_chien: `
Đây là nhạc Tiền Chiến - giai đoạn quan trọng trong lịch sử âm nhạc Việt Nam:
- Thời kỳ 1930s-1954, đánh dấu sự ra đời của tân nhạc Việt Nam
- Các nhạc sĩ tiên phong: Văn Cao, Phạm Duy, Đoàn Chuẩn, Nguyễn Văn Tý
- Ảnh hưởng của âm nhạc Pháp và sự kết hợp với ngũ cung Việt
- Nguồn tham khảo: nhactienchien.com, các tài liệu lịch sử âm nhạc`,

    dan_ca: `
Đây là Dân Ca Việt Nam - di sản văn hóa phi vật thể:
- Phân biệt rõ vùng miền: Quan họ Bắc Ninh, Ca trù, Hò Huế, Đờn ca tài tử Nam Bộ
- Nêu bật giá trị văn hóa và lịch sử
- Đề cập đến các nghệ nhân dân gian, NSND, NSƯT
- Tham khảo từ các nguồn văn hóa dân tộc chính thống`,

    nhac_do: `
Đây là Nhạc Đỏ/Nhạc Cách Mạng:
- Giai đoạn kháng chiến chống Pháp, chống Mỹ
- Các nhạc sĩ tiêu biểu: Văn Cao, Hoàng Vân, Phan Huỳnh Điểu, Hoàng Việt
- Ý nghĩa lịch sử và vai trò trong các phong trào cách mạng
- Nguồn tham khảo: Báo Quân đội nhân dân, Đài TNVN`,

    vpop: `
Đây là V-Pop hiện đại:
- Thông tin từ các nguồn chính thống: Zing MP3, NhacCuaTui, Spotify
- Thành tích trên các bảng xếp hạng
- Hoạt động trên mạng xã hội của nghệ sĩ
- MV, show âm nhạc, giải thưởng gần đây`,

    indie: `
Đây là Indie/Underground Việt Nam:
- Scene indie Việt Nam từ 2010s
- Các label độc lập và cộng đồng underground
- Ảnh hưởng từ indie quốc tế và bản sắc riêng`,

    rap_viet: `
Đây là Rap Việt/Hip-hop Việt Nam:
- Lịch sử rap Việt từ những năm 2000
- Các show: Rap Việt, King of Rap, The Rap of China
- Underground vs Mainstream
- Beef, collab, và các xu hướng trong cộng đồng`,

    rock_viet: `
Đây là Rock Việt Nam:
- Lịch sử rock Việt từ Bức Tường
- Các band và movement quan trọng
- Festival rock Việt Nam`,

    nhac_tre: `
Đây là Nhạc Trẻ Việt Nam:
- Xu hướng âm nhạc giới trẻ hiện tại
- Các idol, thần tượng và fandom
- Viral trend trên TikTok, YouTube`,

    cai_luong: `
Đây là Cải Lương - nghệ thuật sân khấu truyền thống:
- Lịch sử phát triển cải lương Nam Bộ
- Các nghệ sĩ gạo cội và tuồng tích nổi tiếng
- Vọng cổ và các làn điệu`,

    nhac_phim: `
Đây là nhạc phim (OST):
- Phim Việt Nam liên quan
- Vai trò của bài hát trong phim
- Tác động đến thành công của bài hát`,

    unknown: '',
  };

  return `Bạn là chuyên gia âm nhạc Việt Nam với kiến thức sâu rộng.

QUY TẮC NGHIÊM NGẶT VỀ ĐỘ CHÍNH XÁC:
1. CHỈ cung cấp thông tin bạn CHẮC CHẮN là đúng
2. Nếu không chắc chắn, hãy nói rõ "Theo thông tin phổ biến..." hoặc "Có thể..."
3. KHÔNG bịa đặt ngày tháng, sự kiện cụ thể nếu không biết chắc
4. Ưu tiên thông tin có thể xác minh từ nguồn đáng tin cậy

MỨC ĐỘ TIN CẬY:
- "high": Thông tin từ nguồn chính thức, có thể xác minh
- "medium": Thông tin phổ biến nhưng chưa xác minh hoàn toàn
- "low": Thông tin dựa trên suy luận hoặc nguồn không chính thức

${genreSpecificInstructions[genre] || ''}

NGUỒN THAM KHẢO ƯU TIÊN:
1. Wikipedia tiếng Việt (vi.wikipedia.org)
2. Các trang nhạc chính thống (Zing MP3, NhacCuaTui)
3. Báo chí uy tín (Thanh Niên, Tuổi Trẻ, VnExpress)
4. Trang web chuyên ngành theo thể loại

YÊU CẦU NỘI DUNG:
- Viết tự nhiên, hấp dẫn, đúng ngữ pháp tiếng Việt
- Cung cấp context lịch sử và văn hóa
- Nêu rõ nguồn tham khảo khi có thông tin cụ thể
- Tránh thông tin chung chung, thiếu chi tiết`;
}

// Source reference type for API responses
export interface SourceReference {
  name: string;
  url: string;
  reliability?: 'official' | 'verified' | 'community' | 'general';
}

/**
 * Format sources for API response
 */
export function formatSourcesForResponse(
  genre: VietnameseGenre,
  title: string,
  artist: string
): SourceReference[] {
  const sources = getSourcesForGenre(genre);
  const primarySources: SourceReference[] = [];

  // Always include Wikipedia
  primarySources.push({
    name: 'Wikipedia',
    url: `https://vi.wikipedia.org/wiki/${encodeURIComponent(artist)}`,
    reliability: 'verified',
  });

  // Add genre-specific sources
  for (const source of sources.slice(0, 4)) {
    if (!source.url.includes('wikipedia')) {
      primarySources.push({
        name: source.name,
        url: source.url,
        reliability: source.reliability,
      });
    }
  }

  return primarySources;
}

/**
 * Get confidence assessment context
 */
export function getConfidenceContext(
  title: string,
  artist: string,
  genre: VietnameseGenre
): string {
  const knownArtists = ARTISTS_BY_GENRE[genre] || [];
  const isKnownArtist = knownArtists.some(
    a => artist.toLowerCase().includes(a.toLowerCase()) || a.toLowerCase().includes(artist.toLowerCase())
  );

  if (isKnownArtist) {
    return `Đây là nghệ sĩ nổi tiếng trong thể loại ${genre}. Ưu tiên thông tin chính xác từ nguồn đáng tin cậy.`;
  }

  return `Nghệ sĩ có thể ít phổ biến. Hãy cẩn thận với thông tin và nêu rõ mức độ tin cậy.`;
}
