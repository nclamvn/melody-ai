// ═══════════════════════════════════════════════════════════════════════════════
//                    ARTIST STORIES DATABASE
//                         Verified Artist Biographies
// ═══════════════════════════════════════════════════════════════════════════════

import { ArtistEntry, ConfidenceLevel } from '../types';

export const ARTISTS: ArtistEntry[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // NHẠC SĨ
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'trinh-cong-son',
    name: 'Trịnh Công Sơn',
    alternativeNames: ['TCS'],
    birthYear: 1939,
    birthYearConfidence: 'verified',
    deathYear: 2001,
    birthPlace: 'Đắk Lắk',
    nationality: 'Việt Nam',

    biography: {
      summary: `Trịnh Công Sơn (1939-2001) được mệnh danh là "Bob Dylan của Việt Nam", là một trong những nhạc sĩ có ảnh hưởng nhất trong lịch sử âm nhạc Việt Nam. Ông để lại di sản hơn 600 ca khúc, trong đó nhiều bài đã trở thành kinh điển.

Âm nhạc của Trịnh Công Sơn mang đậm triết lý Phật giáo, với chủ đề về tình yêu, chiến tranh, thân phận con người và sự vô thường của cuộc sống. Phong cách của ông độc đáo đến mức được gọi riêng là "Nhạc Trịnh".`,
      detailed: `Trịnh Công Sơn sinh ngày 28 tháng 2 năm 1939 tại Buôn Ma Thuột, Đắk Lắk. Gia đình ông gốc Huế, cha làm kỹ sư cầu đường. Tuổi thơ của ông gắn liền với những di chuyển theo công việc của cha.

Năm 1943, gia đình chuyển về Huế sinh sống. Chính tại đây, Trịnh Công Sơn đã hình thành tâm hồn nghệ sĩ, với những ảnh hưởng từ văn hóa cố đô và thiên nhiên xứ Huế.

Trịnh Công Sơn bắt đầu sáng tác từ năm 1958. Ca khúc đầu tay "Ướt Mi" đã thể hiện phong cách riêng biệt của ông. Trong những năm 1960, ông sáng tác chùm "Ca khúc Da Vàng" - những bài hát phản chiến gây tiếng vang lớn.

Sự nghiệp của ông gắn liền với ca sĩ Khánh Ly - người đã thể hiện hầu hết các ca khúc nổi tiếng của ông. Cặp đôi Trịnh Công Sơn - Khánh Ly đã tạo nên một hiện tượng âm nhạc độc đáo trong lịch sử nhạc Việt.

Trịnh Công Sơn qua đời ngày 1 tháng 4 năm 2001 tại TP.HCM, để lại khoảng 600 ca khúc. Ông được coi là nhạc sĩ vĩ đại nhất của âm nhạc Việt Nam thế kỷ 20.`,
      confidence: 'verified',
    },

    career: {
      startYear: 1958,
      genres: ['Nhạc Trịnh', 'Nhạc phản chiến', 'Nhạc trữ tình'],
      famousSongs: [
        'Diễm Xưa', 'Biển Nhớ', 'Hạ Trắng', 'Cát Bụi', 'Một Cõi Đi Về',
        'Như Cánh Vạc Bay', 'Nắng Thủy Tinh', 'Em Còn Nhớ Hay Em Đã Quên',
      ],
      awards: [
        'Giải thưởng Âm nhạc Hòa bình của UNESCO (2004, truy tặng)',
        'Được vinh danh trong nhiều sách lịch sử âm nhạc thế giới',
      ],
    },

    style: {
      description: 'Phong cách độc đáo mang đậm triết lý Phật giáo, được gọi riêng là "Nhạc Trịnh".',
      influences: ['Phật giáo', 'Văn hóa Huế', 'Chiến tranh Việt Nam'],
      characteristics: ['Triết lý sâu sắc', 'Ca từ thơ mộng', 'Giai điệu nhẹ nhàng'],
    },

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Một người thơ ca, một cõi đi về', publisher: 'NXB Trẻ', reliability: 'verified' },
      { type: 'memoir', title: 'Hồi ký Khánh Ly', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    id: 'lam-phuong',
    name: 'Lam Phương',
    alternativeNames: ['Lâm Đình Phùng'],
    birthYear: 1937,
    birthYearConfidence: 'verified',
    deathYear: 2020,
    birthPlace: 'Rạch Giá, Kiên Giang',
    nationality: 'Việt Nam',

    biography: {
      summary: `Lam Phương (1937-2020) là một trong những nhạc sĩ lớn nhất của dòng nhạc vàng Việt Nam. Ông để lại hơn 200 ca khúc, nhiều bài đã trở thành kinh điển của dòng bolero.

Âm nhạc của Lam Phương đậm chất tự sự, thường viết về tình yêu, chia ly và nỗi nhớ quê hương. Giai điệu của ông dễ nghe, dễ thuộc nhưng ca từ lại rất sâu sắc.`,
      detailed: `Lam Phương tên thật là Lâm Đình Phùng, sinh năm 1937 tại Rạch Giá, Kiên Giang. Cha ông mất sớm, ông được mẹ nuôi dưỡng trong hoàn cảnh khó khăn.

Năm 13 tuổi, ông lên Sài Gòn học và bắt đầu tiếp xúc với âm nhạc. Tài năng âm nhạc của ông bộc lộ từ rất sớm dù không được đào tạo bài bản.

Lam Phương bắt đầu sáng tác từ năm 1955, khi mới 18 tuổi. Ca khúc đầu tay "Chiều Mưa Biên Giới" đã gây tiếng vang. Trong suốt thập niên 60-70, ông là nhạc sĩ được yêu thích nhất của nhạc vàng Sài Gòn.

Năm 1965, ông kết hôn với ca sĩ Túy Hồng. Cuộc hôn nhân này đã ảnh hưởng đến nhiều ca khúc của ông, đặc biệt là "Thành Phố Buồn" được viết khi hôn nhân gặp khó khăn.

Lam Phương qua đời ngày 22 tháng 12 năm 2020 tại California, Mỹ.`,
      confidence: 'verified',
    },

    career: {
      startYear: 1955,
      genres: ['Bolero', 'Nhạc vàng', 'Nhạc trữ tình'],
      famousSongs: [
        'Thành Phố Buồn', 'Chiều Mưa Biên Giới', 'Tình Bơ Vơ',
        'Phút Cuối', 'Biển Tình', 'Thu Sầu',
      ],
    },

    style: {
      description: 'Phong cách đậm chất tự sự, giai điệu dễ nghe, ca từ sâu sắc.',
      characteristics: ['Bolero buồn', 'Tình yêu và chia ly', 'Quê hương'],
    },

    sources: [
      { type: 'memoir', title: 'Hồi ký Lam Phương', reliability: 'verified' },
      { type: 'news', title: 'Các bài phỏng vấn trên báo chí Việt Nam và hải ngoại', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    id: 'truc-phuong',
    name: 'Trúc Phương',
    alternativeNames: ['Nguyễn Trúc Phương'],
    birthYear: 1933,
    birthYearConfidence: 'verified',
    deathYear: 1995,
    birthPlace: 'Trà Vinh',
    nationality: 'Việt Nam',

    biography: {
      summary: `Trúc Phương (1933-1995) được mệnh danh là "Ông hoàng Bolero" với hơn 100 ca khúc, hầu hết đều trở thành hit. Ông có biệt tài viết những bài bolero buồn chạm đến trái tim người nghe.

Âm nhạc của Trúc Phương thường về tình yêu đau khổ, chia ly và phụ bạc. Ông là nhạc sĩ có nhiều ca khúc được hát nhất trong các quán karaoke.`,
      confidence: 'verified',
    },

    career: {
      startYear: 1958,
      genres: ['Bolero', 'Nhạc vàng'],
      famousSongs: [
        'Ai Khổ Vì Ai', 'Nửa Đêm Ngoài Phố', 'Tàu Đêm Năm Cũ',
        'Hai Lối Mộng', 'Đêm Tâm Sự', 'Nếu Hai Đứa Mình',
      ],
    },

    style: {
      description: 'Bolero buồn chạm đến trái tim, thường về tình yêu đau khổ và chia ly.',
      characteristics: ['Bolero buồn', 'Tình yêu đau khổ', 'Giai điệu dễ nhớ'],
    },

    sources: [
      { type: 'book', title: 'Tuyển tập Trúc Phương', reliability: 'verified' },
      { type: 'book', title: 'Lịch sử nhạc vàng Sài Gòn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    id: 'van-cao',
    name: 'Văn Cao',
    alternativeNames: ['Nguyễn Văn Cao'],
    birthYear: 1923,
    birthYearConfidence: 'verified',
    deathYear: 1995,
    birthPlace: 'Lạch Tray, Hải Phòng',
    nationality: 'Việt Nam',

    biography: {
      summary: `Văn Cao (1923-1995) là nhạc sĩ, họa sĩ và nhà thơ Việt Nam. Ông là tác giả của Quốc ca Việt Nam "Tiến Quân Ca" và nhiều ca khúc tiền chiến nổi tiếng.

Văn Cao được coi là một trong những nghệ sĩ đa tài nhất của Việt Nam thế kỷ 20, với đóng góp lớn trong nhiều lĩnh vực nghệ thuật.`,
      detailed: `Văn Cao sinh ngày 15 tháng 11 năm 1923 tại Hải Phòng. Ông sớm bộc lộ tài năng nghệ thuật, học vẽ tại Trường Mỹ thuật Đông Dương.

Những năm 1940, ông bắt đầu sáng tác nhạc và nhanh chóng nổi tiếng với những ca khúc tiền chiến lãng mạn.

Sự nghiệp âm nhạc của Văn Cao bắt đầu từ đầu thập niên 1940 với những ca khúc tiền chiến như "Thiên Thai", "Suối Mơ", "Buồn Tàn Thu".

Năm 1944, ông sáng tác "Tiến Quân Ca", sau này trở thành Quốc ca Việt Nam. Đây là đóng góp lớn nhất của ông cho đất nước.

Văn Cao qua đời năm 1995. Di sản của ông bao gồm Quốc ca Việt Nam và nhiều ca khúc tiền chiến bất hủ.`,
      confidence: 'verified',
    },

    career: {
      startYear: 1940,
      genres: ['Tiền chiến', 'Nhạc cách mạng'],
      famousSongs: [
        'Tiến Quân Ca', 'Thiên Thai', 'Suối Mơ',
        'Buồn Tàn Thu', 'Trương Chi', 'Bến Xuân',
      ],
      awards: [
        'Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật (truy tặng)',
      ],
    },

    style: {
      description: 'Tiền chiến lãng mạn và nhạc cách mạng.',
      characteristics: ['Tiền chiến lãng mạn', 'Đa tài', 'Kinh điển'],
    },

    sources: [
      { type: 'book', title: 'Văn Cao - Cuộc đời và sự nghiệp', reliability: 'verified' },
      { type: 'academic', title: 'Lịch sử âm nhạc Việt Nam', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CA SĨ
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'khanh-ly',
    name: 'Khánh Ly',
    alternativeNames: ['Nguyễn Thị Lệ Mai', 'Nữ hoàng chân đất'],
    birthYear: 1945,
    birthYearConfidence: 'verified',
    birthPlace: 'Hà Nội',
    nationality: 'Việt Nam',

    biography: {
      summary: `Khánh Ly (sinh 1945) là ca sĩ huyền thoại của âm nhạc Việt Nam, được mệnh danh là "Nữ hoàng chân đất" và "Giọng ca vàng". Bà gắn liền với âm nhạc Trịnh Công Sơn và được coi là người thể hiện tốt nhất các ca khúc của ông.

Giọng hát của Khánh Ly có chất alto đặc biệt, khàn nhẹ và đầy nội lực, rất phù hợp với phong cách nhạc Trịnh.`,
      detailed: `Khánh Ly tên thật là Nguyễn Thị Lệ Mai, sinh năm 1945 tại Hà Nội. Năm 1954, bà theo gia đình di cư vào Nam.

Bà bắt đầu ca hát từ những năm cuối thập niên 1950, ban đầu hát trong các ban nhạc nhỏ.

Sự nghiệp của Khánh Ly bắt đầu từ cuối thập niên 1950 nhưng chỉ thực sự bùng nổ khi bà gặp Trịnh Công Sơn năm 1967. Từ đó, bà trở thành giọng ca chính thể hiện các ca khúc của nhạc sĩ này.

Hình ảnh Khánh Ly hát nhạc Trịnh với đôi chân trần trên sân khấu đã trở thành biểu tượng của âm nhạc Việt Nam thời kỳ đó.

Sau 1975, bà định cư tại Mỹ và tiếp tục ca hát. Bà vẫn biểu diễn đến nay, dù đã ngoài 75 tuổi.`,
      confidence: 'verified',
    },

    career: {
      startYear: 1959,
      genres: ['Nhạc Trịnh', 'Nhạc trữ tình'],
      famousSongs: [
        'Diễm Xưa', 'Biển Nhớ', 'Hạ Trắng', 'Cát Bụi',
        'Như Cánh Vạc Bay', 'Một Cõi Đi Về',
      ],
    },

    style: {
      description: 'Giọng alto đặc biệt, khàn nhẹ và đầy nội lực, phù hợp với nhạc Trịnh.',
      characteristics: ['Giọng alto', 'Khàn nhẹ', 'Đầy nội lực', 'Hát chân đất'],
    },

    sources: [
      { type: 'memoir', title: 'Hồi ký Khánh Ly', reliability: 'verified' },
      { type: 'book', title: 'Khánh Ly - Giọng ca vàng', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    id: 'che-linh',
    name: 'Chế Linh',
    alternativeNames: ['Lưu Văn Liên', 'Ông hoàng nhạc sến'],
    birthYear: 1942,
    birthYearConfidence: 'verified',
    birthPlace: 'Phan Rang, Ninh Thuận',
    nationality: 'Việt Nam',

    biography: {
      summary: `Chế Linh (sinh 1942) là một trong những ca sĩ bolero nổi tiếng nhất Việt Nam. Ông được mệnh danh là "Ông hoàng nhạc sến" với giọng hát trầm đặc trưng, rất phù hợp với dòng nhạc bolero buồn.

Ông gắn liền với các ca khúc của Trúc Phương, Lam Phương và nhiều nhạc sĩ bolero khác.`,
      detailed: `Chế Linh bắt đầu ca hát từ những năm 1960. Ông nhanh chóng nổi tiếng với giọng hát trầm ấm, đặc biệt phù hợp với các ca khúc bolero buồn.

Sự nghiệp của ông gắn liền với nhạc sĩ Trúc Phương - ông đã thể hiện thành công hầu hết các ca khúc của nhạc sĩ này.

Sau 1975, ông sang Mỹ định cư và tiếp tục ca hát. Ông vẫn biểu diễn đến ngày nay với phong độ ổn định.`,
      confidence: 'verified',
    },

    career: {
      startYear: 1960,
      genres: ['Bolero', 'Nhạc vàng'],
      famousSongs: [
        'Thành Phố Buồn', 'Ai Khổ Vì Ai', 'Nửa Đêm Ngoài Phố',
        'Hai Lối Mộng', 'Tàu Đêm Năm Cũ',
      ],
    },

    style: {
      description: 'Giọng hát trầm đặc trưng, phù hợp với bolero buồn.',
      characteristics: ['Giọng trầm', 'Bolero buồn', 'Ổn định'],
    },

    sources: [
      { type: 'book', title: 'Chế Linh - Giọng ca bolero huyền thoại', reliability: 'high' },
      { type: 'interview', title: 'Phỏng vấn Chế Linh trên các phương tiện truyền thông', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ARTIST DATABASE SERVICE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Normalize Vietnamese text for search
 */
function normalizeVietnamese(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

class ArtistDatabase {
  private artists: ArtistEntry[] = ARTISTS;

  /**
   * Search for an artist by name
   */
  searchArtist(name: string): ArtistEntry | null {
    const normalizedName = normalizeVietnamese(name);

    // Exact match on main name
    for (const artist of this.artists) {
      if (normalizeVietnamese(artist.name) === normalizedName) {
        return artist;
      }
    }

    // Check alternative names
    for (const artist of this.artists) {
      if (artist.alternativeNames) {
        for (const altName of artist.alternativeNames) {
          if (normalizeVietnamese(altName) === normalizedName) {
            return artist;
          }
        }
      }
    }

    // Partial match
    for (const artist of this.artists) {
      if (
        normalizeVietnamese(artist.name).includes(normalizedName) ||
        normalizedName.includes(normalizeVietnamese(artist.name))
      ) {
        return artist;
      }
    }

    return null;
  }

  /**
   * Get artist by ID
   */
  getArtistById(id: string): ArtistEntry | null {
    return this.artists.find((a) => a.id === id) || null;
  }

  /**
   * Get all artists
   */
  getAllArtists(): ArtistEntry[] {
    return this.artists;
  }

  /**
   * Get artists by genre
   */
  getArtistsByGenre(genre: string): ArtistEntry[] {
    return this.artists.filter((a) => a.career.genres.includes(genre));
  }

  /**
   * Get total artist count
   */
  getTotalCount(): number {
    return this.artists.length;
  }
}

// Export singleton instance
export const artistDatabase = new ArtistDatabase();

export default ARTISTS;
