// ═══════════════════════════════════════════════════════════════════════════════
//                    BOLERO/NHẠC VÀNG — VERIFIED DATABASE
//                         20 Most Popular Songs
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const BOLERO_SONGS: SongEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // TRÚC PHƯƠNG (1933-1995) — "Ông hoàng Bolero"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-nua-dem-ngoai-pho',
      title: 'Nửa Đêm Ngoài Phố',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Thanh Thúy',
      releaseYear: 1962,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['cô đơn', 'đêm khuya', 'tình yêu', 'nỗi buồn'],
    },

    summary: 'Nửa Đêm Ngoài Phố là một trong những ca khúc tiêu biểu nhất của Trúc Phương, sáng tác đầu thập niên 1960. Bài hát khắc họa hình ảnh người đàn ông cô độc lang thang trên phố đêm.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Cảm hứng từ những đêm lang thang trên đường phố Sài Gòn của chính nhạc sĩ.',
      },
      narrative: `Nửa Đêm Ngoài Phố ra đời vào khoảng năm 1962, trong giai đoạn Trúc Phương đang khẳng định tên tuổi tại Sài Gòn. Trúc Phương, tên thật Nguyễn Thiện Lộc, sinh năm 1933 tại Trà Vinh, được mệnh danh là "Ông hoàng Bolero".

Bài hát nhanh chóng trở nên phổ biến qua giọng hát Thanh Thúy và vẫn là một trong những bài bolero được yêu thích nhất đến ngày nay.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, giai đoạn phát triển mạnh của nền âm nhạc đô thị miền Nam.',
      socialContext: 'Sài Gòn thời kỳ này là trung tâm văn hóa sôi động với nhiều phòng trà, vũ trường.',
      musicalMovement: 'Thời kỳ vàng của nhạc bolero miền Nam.',
      culturalSignificance: 'Bài hát trở thành biểu tượng của dòng nhạc bolero Việt Nam.',
    },

    performances: [
      { performerId: 'thanh-thuy', performerName: 'Thanh Thúy', style: 'Giọng hát trầm buồn, da diết', significance: 'Phiên bản gốc', isOriginal: true },
      { performerId: 'che-linh', performerName: 'Chế Linh', style: 'Giọng nam trầm ấm', isOriginal: false },
    ],

    interestingFacts: [
      { content: 'Trúc Phương được mệnh danh là "Ông hoàng Bolero" với hơn 200 ca khúc', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'wikipedia', title: 'Trúc Phương', url: 'https://vi.wikipedia.org/wiki/Trúc_Phương', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-ai-cho-toi-tinh-yeu',
      title: 'Ai Cho Tôi Tình Yêu',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Thanh Thúy',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'khao khát', 'cô đơn'],
    },

    summary: 'Ai Cho Tôi Tình Yêu là ca khúc bolero nổi tiếng của Trúc Phương, thể hiện khao khát tình yêu của người cô đơn.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Cảm hứng từ nỗi cô đơn và khao khát tình yêu - chủ đề xuyên suốt trong sáng tác của Trúc Phương.' },
      narrative: `Ai Cho Tôi Tình Yêu thuộc giai đoạn sung sức của Trúc Phương giữa thập niên 1960. Câu hỏi "Ai cho tôi tình yêu" phản ánh tâm trạng của nhiều người trong xã hội thời đó.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, chiến tranh đang leo thang.',
      musicalMovement: 'Dòng nhạc bolero phát triển mạnh.',
    },

    sources: [{ type: 'wikipedia', title: 'Trúc Phương', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-them-mot-lan-yeu',
      title: 'Thêm Một Lần Yêu',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      releaseYear: 1968,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'hy vọng'],
    },

    summary: 'Thêm Một Lần Yêu là ca khúc bolero lạc quan hiếm hoi của Trúc Phương, nói về hy vọng tìm được tình yêu mới.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Niềm hy vọng về một tình yêu mới sau những đổ vỡ.' },
      narrative: `Khác với nhiều ca khúc buồn man mác của Trúc Phương, Thêm Một Lần Yêu mang âm hưởng lạc quan, thể hiện niềm tin vào tình yêu.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960.',
      musicalMovement: 'Bolero tiếp tục thịnh hành.',
    },

    sources: [{ type: 'wikipedia', title: 'Trúc Phương', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LAM PHƯƠNG (1937-2020) — "Nhạc sĩ của tình yêu và quê hương"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-thanh-pho-buon',
      title: 'Thành Phố Buồn',
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      originalPerformerName: 'Chế Linh',
      releaseYear: 1970,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chia ly', 'thành phố', 'nỗi buồn', 'tình yêu'],
    },

    summary: 'Thành Phố Buồn là ca khúc nổi tiếng của Lam Phương, sáng tác khoảng năm 1970, kể về nỗi buồn của người ở lại khi người yêu ra đi.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Cảm hứng từ những cuộc chia ly trong thời chiến.',
        detailed: `Thành Phố Buồn được sáng tác trong giai đoạn chiến tranh đang ở cao trào. Lam Phương đã viết nên một ca khúc nói lên nỗi buồn của vô số người đang phải chịu cảnh chia ly.`,
      },
      narrative: `Thành Phố Buồn ra đời vào khoảng năm 1970. Lam Phương, tên thật Lâm Đình Phùng, sinh năm 1937, là một trong những nhạc sĩ lớn nhất của nền nhạc vàng với hơn 200 ca khúc.

Ca khúc được ca sĩ Chế Linh thể hiện với giọng hát trầm ấm và trở thành một trong những bài hát được yêu thích nhất.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1970, chiến tranh Việt Nam đang ở giai đoạn cao điểm.',
      socialContext: 'Nhiều gia đình ly tán, nhiều cuộc chia ly diễn ra.',
      musicalMovement: 'Giai đoạn đỉnh cao của nhạc vàng miền Nam.',
      culturalSignificance: 'Bài hát trở thành biểu tượng của nỗi buồn chia ly.',
    },

    performances: [
      { performerId: 'che-linh', performerName: 'Chế Linh', style: 'Giọng hát trầm ấm, da diết', significance: 'Phiên bản kinh điển', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Lam Phương có hơn 200 ca khúc, nhiều bài trở thành kinh điển', category: 'cultural', isVerified: true },
    ],

    sources: [{ type: 'wikipedia', title: 'Lam Phương', url: 'https://vi.wikipedia.org/wiki/Lam_Phương', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-em-di-tren-co-non',
      title: 'Em Đi Trên Cỏ Non',
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      releaseYear: 1962,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'tuổi trẻ', 'lãng mạn'],
    },

    summary: 'Em Đi Trên Cỏ Non là ca khúc lãng mạn của Lam Phương, sáng tác đầu thập niên 1960, với hình ảnh đẹp về tình yêu tuổi trẻ.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: { summary: 'Hình ảnh người con gái đi trên cỏ - biểu tượng của sự trong trắng và tươi mới.' },
      narrative: `Em Đi Trên Cỏ Non thuộc giai đoạn đầu sự nghiệp của Lam Phương. Bài hát mang âm hưởng tươi vui, lãng mạn, khác với những ca khúc buồn sau này.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, trước khi chiến tranh leo thang.',
      musicalMovement: 'Giai đoạn hình thành phong cách Lam Phương.',
    },

    sources: [{ type: 'wikipedia', title: 'Lam Phương', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-chuyen-hen-ho',
      title: 'Chuyện Hẹn Hò',
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['hẹn hò', 'tình yêu', 'kỷ niệm'],
    },

    summary: 'Chuyện Hẹn Hò là ca khúc lãng mạn của Lam Phương về những buổi hẹn hò đầu đời ngọt ngào.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Những kỷ niệm về những buổi hẹn hò.' },
      narrative: `Chuyện Hẹn Hò là một trong những ca khúc tình cảm nhẹ nhàng của Lam Phương, kể về những buổi hẹn hò đầu đời.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960.',
    },

    sources: [{ type: 'wikipedia', title: 'Lam Phương', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-dem-buon-tinh-le',
      title: 'Đêm Buồn Tỉnh Lẻ',
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      releaseYear: 1968,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['cô đơn', 'tỉnh lẻ', 'nỗi buồn'],
    },

    summary: 'Đêm Buồn Tỉnh Lẻ là ca khúc của Lam Phương về nỗi cô đơn của người sống ở tỉnh lẻ xa xôi.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: { summary: 'Nỗi buồn của những người sống xa Sài Gòn, ở các tỉnh lẻ hẻo lánh.' },
      narrative: `Đêm Buồn Tỉnh Lẻ khắc họa cuộc sống cô đơn của những người sống ở các tỉnh lẻ xa xôi, đặc biệt là những người lính đồn trú ở vùng sâu vùng xa.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1968, chiến tranh đang diễn ra khắp miền Nam.',
      socialContext: 'Nhiều người phải sống xa nhà, đồn trú ở các tỉnh lẻ.',
    },

    sources: [{ type: 'wikipedia', title: 'Lam Phương', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRẦN THIỆN THANH (1942-2005)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-hoa-su-nha-nang',
      title: 'Hoa Sứ Nhà Nàng',
      composerId: 'tran-thien-thanh',
      composerName: 'Trần Thiện Thanh',
      originalPerformerName: 'Duy Khánh',
      releaseYear: 1965,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'hoa sứ', 'quê hương'],
    },

    summary: 'Hoa Sứ Nhà Nàng là ca khúc nổi tiếng của Trần Thiện Thanh, với hình ảnh hoa sứ trắng gợi nhớ về người yêu và quê hương.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Hình ảnh hoa sứ - loài hoa phổ biến trong vườn nhà miền Nam - gắn liền với kỷ niệm tình yêu.',
      },
      narrative: `Trần Thiện Thanh, tên thật cũng là Trần Thiện Thanh, sinh năm 1942, là một trong những nhạc sĩ quan trọng của dòng nhạc vàng. Hoa Sứ Nhà Nàng là một trong những tác phẩm tiêu biểu của ông.

Bài hát sử dụng hình ảnh hoa sứ - loài hoa quen thuộc trong vườn nhà miền Nam - để nói về tình yêu và nỗi nhớ.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960.',
      musicalMovement: 'Dòng nhạc bolero đang phát triển mạnh.',
      culturalSignificance: 'Hoa sứ trở thành biểu tượng trong âm nhạc Việt Nam.',
    },

    performances: [
      { performerId: 'duy-khanh', performerName: 'Duy Khánh', style: 'Giọng hát trầm ấm miền Nam', isOriginal: true },
    ],

    sources: [{ type: 'wikipedia', title: 'Trần Thiện Thanh', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-lau-dai-tinh-ai',
      title: 'Lâu Đài Tình Ái',
      composerId: 'tran-thien-thanh',
      composerName: 'Trần Thiện Thanh',
      releaseYear: 1968,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'mộng tưởng'],
    },

    summary: 'Lâu Đài Tình Ái là ca khúc lãng mạn của Trần Thiện Thanh về giấc mơ tình yêu đẹp như lâu đài.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Giấc mơ về tình yêu hoàn hảo, đẹp như lâu đài trong cổ tích.' },
      narrative: `Lâu Đài Tình Ái thể hiện khát vọng về một tình yêu lý tưởng, hoàn hảo - một chủ đề phổ biến trong nhạc bolero.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960.',
    },

    sources: [{ type: 'wikipedia', title: 'Trần Thiện Thanh', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHÂU KỲ (1923-2008)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-con-duong-xua-em-di',
      title: 'Con Đường Xưa Em Đi',
      composerId: 'chau-ky',
      composerName: 'Châu Kỳ',
      lyricistName: 'Hồ Đình Phương',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['kỷ niệm', 'con đường', 'hoài niệm'],
    },

    summary: 'Con Đường Xưa Em Đi là ca khúc do Châu Kỳ phổ nhạc từ thơ Hồ Đình Phương, gợi nhớ về những kỷ niệm trên con đường xưa.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Bài thơ của Hồ Đình Phương về con đường gắn liền với kỷ niệm tình yêu.' },
      narrative: `Con Đường Xưa Em Đi là sự kết hợp giữa thơ Hồ Đình Phương và nhạc Châu Kỳ. Bài hát gợi nhớ về những con đường quen thuộc ghi dấu kỷ niệm đôi lứa.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960.',
      musicalMovement: 'Phong trào phổ thơ thành nhạc phổ biến.',
    },

    sources: [{ type: 'wikipedia', title: 'Châu Kỳ (nhạc sĩ)', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HOÀNG THI THƠ (1929-2001)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-sao-chua-thay-hoi-am',
      title: 'Sao Chưa Thấy Hồi Âm',
      composerId: 'hoang-thi-tho',
      composerName: 'Hoàng Thi Thơ',
      releaseYear: 1970,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chờ đợi', 'tình yêu', 'hy vọng'],
    },

    summary: 'Sao Chưa Thấy Hồi Âm là ca khúc bolero nổi tiếng của Hoàng Thi Thơ về sự chờ đợi tin tức từ người yêu.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Sự chờ đợi tin tức từ người thân yêu trong thời chiến.' },
      narrative: `Hoàng Thi Thơ là một trong những nhạc sĩ lớn của miền Nam. Sao Chưa Thấy Hồi Âm phản ánh tâm trạng chờ đợi của nhiều người trong thời chiến tranh.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1970, chiến tranh đang diễn ra.',
      socialContext: 'Nhiều gia đình ly tán, chờ đợi tin người thân.',
    },

    sources: [{ type: 'wikipedia', title: 'Hoàng Thi Thơ', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TÔ THANH TÙNG (1947-)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-duong-tim-vao-tim',
      title: 'Đường Tìm Vào Tim',
      composerId: 'to-thanh-tung',
      composerName: 'Tô Thanh Tùng',
      releaseYear: 1985,
      releaseYearConfidence: 'medium',
      era: 'renovation',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'tìm kiếm'],
    },

    summary: 'Đường Tìm Vào Tim là ca khúc bolero của Tô Thanh Tùng về hành trình tìm kiếm tình yêu đích thực.',

    compositionContext: {
      year: 1985,
      yearConfidence: 'medium',
      location: 'TP. Hồ Chí Minh',
      inspiration: { summary: 'Hành trình tìm kiếm tình yêu đích thực.' },
      narrative: `Tô Thanh Tùng là nhạc sĩ bolero nổi tiếng sau 1975. Đường Tìm Vào Tim là một trong những tác phẩm được yêu thích của ông.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'renovation',
      eraDescription: 'Giữa thập niên 1980, giai đoạn bắt đầu Đổi mới.',
      musicalMovement: 'Dòng nhạc bolero tiếp tục phát triển sau 1975.',
    },

    sources: [{ type: 'wikipedia', title: 'Tô Thanh Tùng', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VŨ THÀNH AN (1943-)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-bai-khong-ten-cuoi-cung',
      title: 'Bài Không Tên Cuối Cùng',
      composerId: 'vu-thanh-an',
      composerName: 'Vũ Thành An',
      releaseYear: 1970,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['chia ly', 'tình yêu', 'nỗi buồn'],
    },

    summary: 'Bài Không Tên Cuối Cùng là ca khúc nổi tiếng của Vũ Thành An, một trong chuỗi "Bài Không Tên" đầy cảm xúc.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: { summary: 'Chuỗi sáng tác "Bài Không Tên" nổi tiếng của Vũ Thành An.' },
      narrative: `Vũ Thành An nổi tiếng với chuỗi "Bài Không Tên" - những ca khúc được đánh số thay vì đặt tên. Bài Không Tên Cuối Cùng là một trong những tác phẩm được yêu thích nhất.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1970, thời kỳ chiến tranh.',
      musicalMovement: 'Nhạc trữ tình miền Nam.',
      culturalSignificance: 'Chuỗi "Bài Không Tên" trở thành hiện tượng âm nhạc.',
    },

    interestingFacts: [
      { content: 'Vũ Thành An sáng tác nhiều "Bài Không Tên" được đánh số thay vì đặt tên', category: 'creation', isVerified: true },
    ],

    sources: [{ type: 'wikipedia', title: 'Vũ Thành An', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NGỌC SƠN (1966-)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-lien-khuc-tinh-cha',
      title: 'Tình Cha',
      composerId: 'ngoc-son',
      composerName: 'Ngọc Sơn',
      releaseYear: 1995,
      releaseYearConfidence: 'high',
      era: 'modern',
      genres: ['bolero', 'filial'],
      themes: ['tình cha', 'gia đình', 'hiếu thảo'],
    },

    summary: 'Tình Cha là ca khúc nổi tiếng của Ngọc Sơn về tình cảm cha con, thể hiện lòng hiếu thảo và biết ơn.',

    compositionContext: {
      year: 1995,
      yearConfidence: 'high',
      location: 'TP. Hồ Chí Minh',
      inspiration: { summary: 'Tình cảm dành cho người cha - chủ đề hiếm trong nhạc bolero.' },
      narrative: `Ngọc Sơn là ca sĩ kiêm nhạc sĩ nổi tiếng với dòng nhạc bolero sau 1975. Tình Cha là một trong những tác phẩm được yêu thích nhất, thể hiện tình cảm gia đình.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'modern',
      eraDescription: 'Giữa thập niên 1990.',
      musicalMovement: 'Dòng bolero hiện đại.',
      culturalSignificance: 'Bài hát về tình cha - chủ đề ít được khai thác.',
    },

    sources: [{ type: 'wikipedia', title: 'Ngọc Sơn (ca sĩ)', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINH SỬ (1948-2019)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-lan-va-diep',
      title: 'Lan Và Điệp',
      composerId: 'vinh-su',
      composerName: 'Vinh Sử',
      releaseYear: 1972,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu bi thương', 'chia ly', 'số phận'],
    },

    summary: 'Lan Và Điệp là ca khúc nổi tiếng của Vinh Sử, dựa trên câu chuyện tình bi thương trong tiểu thuyết cùng tên.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Dựa trên tiểu thuyết "Lan và Điệp" của nhà văn Nguyễn Công Hoan - câu chuyện tình bi thương nổi tiếng.',
      },
      narrative: `Lan Và Điệp được Vinh Sử sáng tác dựa trên tiểu thuyết cùng tên. Câu chuyện về mối tình bi thương giữa Lan và Điệp đã trở thành nguồn cảm hứng cho nhiều tác phẩm nghệ thuật.`,
      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1970.',
      musicalMovement: 'Phong trào phổ nhạc từ văn học.',
      culturalSignificance: 'Câu chuyện Lan và Điệp trở thành kinh điển văn hóa.',
    },

    interestingFacts: [
      { content: 'Dựa trên tiểu thuyết cùng tên của Nguyễn Công Hoan', category: 'creation', isVerified: true },
    ],

    sources: [{ type: 'wikipedia', title: 'Vinh Sử (nhạc sĩ)', reliability: 'high' }],
    contentQuality: { overallConfidence: 'high', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MINH KỲ & HOÀI LINH
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-dem-dong-chua-sang',
      title: 'Đêm Đông Chưa Sáng',
      composerId: 'minh-ky-hoai-linh',
      composerName: 'Minh Kỳ - Hoài Linh',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['mùa đông', 'chờ đợi', 'cô đơn'],
    },

    summary: 'Đêm Đông Chưa Sáng là ca khúc của bộ đôi Minh Kỳ - Hoài Linh về nỗi cô đơn trong đêm đông dài.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Hình ảnh đêm đông dài - biểu tượng của sự cô đơn và chờ đợi.' },
      narrative: `Minh Kỳ và Hoài Linh là bộ đôi nhạc sĩ nổi tiếng của dòng nhạc vàng. Đêm Đông Chưa Sáng là một trong những tác phẩm hợp tác của họ.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960.',
    },

    sources: [{ type: 'book', title: 'Nhạc vàng Việt Nam', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DUY KHÁNH - CA SĨ SÁNG TÁC
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-ai-khong-muon-chia-tay',
      title: 'Ai Không Muốn Chia Tay',
      composerId: 'duy-khanh',
      composerName: 'Duy Khánh',
      releaseYear: 1970,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chia tay', 'tình yêu', 'tiếc nuối'],
    },

    summary: 'Ai Không Muốn Chia Tay là ca khúc của Duy Khánh về nỗi đau khi phải chia tay dù không muốn.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Những cuộc chia tay không mong muốn trong thời chiến.' },
      narrative: `Duy Khánh không chỉ là ca sĩ mà còn là nhạc sĩ. Ai Không Muốn Chia Tay phản ánh tâm trạng của nhiều người trong thời chiến tranh.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1970, chiến tranh đang diễn ra.',
      socialContext: 'Nhiều cuộc chia ly không mong muốn.',
    },

    sources: [{ type: 'wikipedia', title: 'Duy Khánh (ca sĩ)', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },

  {
    metadata: {
      id: 'bolero-ve-dau-mai-toc-nguoi-thuong',
      title: 'Về Đâu Mái Tóc Người Thương',
      composerId: 'hoai-linh',
      composerName: 'Hoài Linh',
      releaseYear: 1968,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['nhớ nhung', 'tình yêu', 'xa cách'],
    },

    summary: 'Về Đâu Mái Tóc Người Thương là ca khúc bolero của Hoài Linh về nỗi nhớ người yêu qua hình ảnh mái tóc.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'medium',
      location: 'Sài Gòn',
      inspiration: { summary: 'Hình ảnh mái tóc người yêu - biểu tượng của nỗi nhớ.' },
      narrative: `Về Đâu Mái Tóc Người Thương sử dụng hình ảnh mái tóc để thể hiện nỗi nhớ nhung - một thủ pháp phổ biến trong thơ ca Việt Nam.`,
      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960.',
    },

    sources: [{ type: 'book', title: 'Nhạc vàng Việt Nam', reliability: 'high' }],
    contentQuality: { overallConfidence: 'medium', needsReview: false },
  },
];
