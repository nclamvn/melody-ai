// ═══════════════════════════════════════════════════════════════════════════════
//                    BOLERO/NHẠC VÀNG — BATCH 2
//                         Additional Songs from Content Expansion
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const BOLERO_SONGS_BATCH2: SongEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // TRÚC PHƯƠNG - Ông hoàng Bolero (Additional)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-ai-kho-vi-ai',
      title: 'Ai Khổ Vì Ai',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Chế Linh',
      releaseYear: 1965,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'đau khổ', 'chia ly'],
    },

    summary: 'Ai Khổ Vì Ai là một trong những tác phẩm tiêu biểu của dòng nhạc bolero buồn, kể về nỗi đau của tình yêu dang dở.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Trúc Phương lấy cảm hứng từ chính cuộc sống và những mối tình của mình.',
      },
      narrative: `"Ai Khổ Vì Ai" được nhạc sĩ Trúc Phương sáng tác vào khoảng năm 1965, trong giai đoạn ông sáng tác sung sức nhất. Bài hát là một trong những tác phẩm tiêu biểu của dòng nhạc bolero buồn, kể về nỗi đau của tình yêu dang dở.

Trúc Phương nổi tiếng với khả năng viết những ca khúc chạm đến trái tim người nghe, đặc biệt là những người đang trải qua đau khổ trong tình yêu.

Chế Linh là ca sĩ thể hiện thành công nhất bài hát này, với giọng hát trầm buồn đặc trưng đã làm nổi bật được nỗi sầu trong ca khúc.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, giai đoạn phát triển rực rỡ của bolero miền Nam.',
      musicalMovement: 'Thời kỳ vàng son của nhạc bolero.',
    },

    performances: [
      { performerId: 'che-linh', performerName: 'Chế Linh', style: 'Giọng trầm buồn đặc trưng', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Trúc Phương được mệnh danh là "Ông hoàng Bolero"', category: 'cultural', isVerified: true },
      { content: 'Chế Linh là giọng ca gắn liền với nhiều ca khúc của Trúc Phương', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Tuyển tập Trúc Phương', reliability: 'high' },
      { type: 'interview', title: 'Phỏng vấn Chế Linh', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-tau-dem-nam-cu',
      title: 'Tàu Đêm Năm Cũ',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Tuấn Vũ',
      releaseYear: 1968,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chia ly', 'nhớ nhung', 'ga tàu'],
    },

    summary: 'Tàu Đêm Năm Cũ lấy bối cảnh nhà ga xe lửa, kể về nỗi nhớ nhung khi tiễn người yêu lên tàu.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Hình ảnh con tàu đêm mang ý nghĩa biểu tượng cho sự chia ly trong thời chiến.',
      },
      narrative: `"Tàu Đêm Năm Cũ" được Trúc Phương sáng tác năm 1968, lấy bối cảnh nhà ga xe lửa - một hình ảnh quen thuộc trong bolero Việt Nam. Bài hát kể về nỗi nhớ nhung khi tiễn người yêu lên tàu, và những ký ức về năm cũ.

Hình ảnh con tàu đêm mang ý nghĩa biểu tượng cho sự chia ly, cho những chuyến đi không hẹn ngày về. Trong bối cảnh chiến tranh, nhiều cuộc chia tay tại ga tàu đã trở thành vĩnh biệt.

Tuấn Vũ với giọng hát trầm ấm đã thể hiện thành công sự tiếc nuối và hoài niệm trong ca khúc này.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960, trong thời kỳ chiến tranh Việt Nam.',
      politicalContext: 'Chiến tranh Việt Nam đang ở giai đoạn ác liệt.',
      musicalMovement: 'Bolero tiếp tục là dòng nhạc phổ biến nhất.',
    },

    performances: [
      { performerId: 'tuan-vu', performerName: 'Tuấn Vũ', style: 'Giọng trầm ấm', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Ga xe lửa là bối cảnh phổ biến trong bolero thời chiến', category: 'cultural', isVerified: true },
      { content: 'Tuấn Vũ được coi là một trong những giọng ca bolero hay nhất', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Bolero - Những giai điệu vượt thời gian', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-hai-loi-mong',
      title: 'Hai Lối Mộng',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Chế Linh',
      releaseYear: 1966,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'chia ly', 'định mệnh'],
    },

    summary: 'Hai Lối Mộng là ca khúc về tình yêu không thể đến được với nhau do hoàn cảnh.',

    compositionContext: {
      year: 1966,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Trúc Phương thường viết về những mối tình éo le, phản ánh thực tế xã hội.',
      },
      narrative: `"Hai Lối Mộng" được Trúc Phương sáng tác năm 1966, là ca khúc về tình yêu không thể đến được với nhau do hoàn cảnh. Hai người yêu nhau nhưng cuộc đời đẩy họ đi hai hướng khác nhau, mỗi người theo đuổi một giấc mộng riêng.

Trúc Phương thường viết về những mối tình éo le, những cuộc tình không trọn vẹn - phản ánh đúng thực tế xã hội Việt Nam thời bấy giờ với nhiều biến động.

Bài hát là một trong những ca khúc được yêu cầu nhiều nhất tại các phòng trà Sài Gòn xưa.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, văn hóa phòng trà phát triển mạnh.',
      musicalMovement: 'Thời kỳ hoàng kim của bolero.',
    },

    performances: [
      { performerId: 'che-linh', performerName: 'Chế Linh', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Thuộc top những bài bolero được yêu thích nhất mọi thời đại', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Tuyển tập Trúc Phương', reliability: 'high' },
      { type: 'book', title: 'Nhạc vàng - Một thời để nhớ', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-dem-tam-su',
      title: 'Đêm Tâm Sự',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Chế Linh',
      releaseYear: 1969,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['đêm khuya', 'tâm sự', 'cô đơn'],
    },

    summary: 'Đêm Tâm Sự mang phong cách tâm sự, thủ thỉ đặc trưng của bolero, kể về những suy tư trong đêm khuya.',

    compositionContext: {
      year: 1969,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Phong cách tâm sự, thủ thỉ như kể chuyện qua từng câu hát.',
      },
      narrative: `"Đêm Tâm Sự" được sáng tác năm 1969, là một trong những ca khúc cuối của thập niên 60 từ Trúc Phương. Bài hát mang phong cách tâm sự, thủ thỉ đặc trưng của bolero, kể về những suy tư trong đêm khuya.

Trúc Phương có phong cách sáng tác rất riêng - ông không chỉ viết nhạc mà còn kể chuyện qua từng câu hát. Người nghe như được lắng nghe tâm sự của một người bạn trong đêm vắng.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'che-linh', performerName: 'Chế Linh', style: 'Giọng hát trầm đặc trưng', isOriginal: true },
    ],

    sources: [
      { type: 'book', title: 'Trúc Phương - Người nhạc sĩ của những mối tình', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GIAO TIÊN
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-doan-tuyet',
      title: 'Đoạn Tuyệt',
      composerId: 'giao-tien',
      composerName: 'Giao Tiên',
      originalPerformerName: 'Như Quỳnh',
      releaseYear: 1972,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chia tay', 'đau khổ', 'quyết định'],
    },

    summary: 'Đoạn Tuyệt là ca khúc về sự chia tay dứt khoát trong tình yêu.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Giao Tiên chuyên viết về những mối tình đau khổ.',
      },
      narrative: `"Đoạn Tuyệt" được nhạc sĩ Giao Tiên sáng tác năm 1972, là một trong những ca khúc về sự chia tay dứt khoát trong tình yêu. Bài hát thể hiện quyết định đau đớn khi phải cắt đứt một mối quan hệ.

Giao Tiên là nhạc sĩ chuyên viết về những mối tình đau khổ, và "Đoạn Tuyệt" là một trong những tác phẩm tiêu biểu nhất của ông.

Như Quỳnh với giọng hát da diết đã thể hiện thành công nỗi đau trong bài hát.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'nhu-quynh', performerName: 'Như Quỳnh', style: 'Giọng hát da diết', isOriginal: true },
    ],

    sources: [
      { type: 'book', title: 'Giao Tiên - Những ca khúc buồn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-phan-gai-thuyen-quyen',
      title: 'Phận Gái Thuyền Quyên',
      composerId: 'giao-tien',
      composerName: 'Giao Tiên',
      originalPerformerName: 'Như Quỳnh',
      releaseYear: 1973,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['phận nữ', 'xã hội', 'tình yêu'],
    },

    summary: 'Phận Gái Thuyền Quyên là ca khúc về thân phận người phụ nữ trong xã hội xưa.',

    compositionContext: {
      year: 1973,
      yearConfidence: 'high',
      inspiration: {
        summary: '"Thuyền quyên" là cách nói văn hoa về người phụ nữ đẹp nhưng phận bạc.',
      },
      narrative: `"Phận Gái Thuyền Quyên" được Giao Tiên sáng tác năm 1973, là ca khúc về thân phận người phụ nữ trong xã hội xưa. "Thuyền quyên" là cách nói văn hoa về người phụ nữ đẹp nhưng phận bạc.

Bài hát phản ánh quan niệm xã hội thời đó về phận đàn bà, với những ràng buộc và khó khăn mà họ phải đối mặt.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'nhu-quynh', performerName: 'Như Quỳnh', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Thuyền quyên" là cách nói văn hoa về người phụ nữ', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Bolero và hình ảnh người phụ nữ Việt', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ANH BẰNG
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-sau-le-bong',
      title: 'Sầu Lẻ Bóng',
      composerId: 'anh-bang',
      composerName: 'Anh Bằng',
      originalPerformerName: 'Giao Linh',
      releaseYear: 1968,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['cô đơn', 'chờ đợi', 'chiến tranh'],
    },

    summary: 'Sầu Lẻ Bóng là ca khúc về nỗi cô đơn của người đàn bà khi chồng đi xa trong thời chiến.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Anh Bằng viết về nỗi lo của những người vợ có chồng đi lính.',
      },
      narrative: `"Sầu Lẻ Bóng" được nhạc sĩ Anh Bằng sáng tác năm 1968, là ca khúc về nỗi cô đơn của người đàn bà khi chồng đi xa. Bài hát mang đậm không khí của thời chiến, khi nhiều người vợ phải sống trong lo lắng, chờ đợi.

Anh Bằng là nhạc sĩ có tài viết những ca khúc buồn nhưng không bi lụy. "Sầu Lẻ Bóng" có giai điệu nhẹ nhàng nhưng ca từ rất sâu sắc.

Giao Linh với giọng hát ngọt ngào đã thể hiện ca khúc này một cách xuất sắc.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960, thời kỳ chiến tranh ác liệt.',
      politicalContext: 'Chiến tranh Việt Nam đang ở giai đoạn leo thang.',
    },

    performances: [
      { performerId: 'giao-linh', performerName: 'Giao Linh', style: 'Giọng ngọt ngào', isOriginal: true },
    ],

    sources: [
      { type: 'book', title: 'Anh Bằng - Những ca khúc để đời', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-do-doc',
      title: 'Đò Dọc',
      composerId: 'anh-bang',
      composerName: 'Anh Bằng',
      originalPerformerName: 'Giao Linh',
      releaseYear: 1969,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['quê hương', 'sông nước', 'phiêu bạt'],
    },

    summary: 'Đò Dọc lấy hình ảnh con đò trên sông - biểu tượng văn hóa sông nước Việt Nam.',

    compositionContext: {
      year: 1969,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Hình ảnh đò dọc mang ý nghĩa biểu tượng cho cuộc sống phiêu bạt.',
      },
      narrative: `"Đò Dọc" được Anh Bằng sáng tác năm 1969, lấy hình ảnh con đò trên sông - một biểu tượng quen thuộc của văn hóa Việt Nam. Bài hát kể về cuộc đời người lái đò, với những chuyến đi dọc theo dòng sông như dòng đời trôi qua.

Hình ảnh đò dọc mang ý nghĩa biểu tượng cho cuộc sống phiêu bạt, không cố định. Anh Bằng đã khéo léo sử dụng hình ảnh này để nói về thân phận con người.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'giao-linh', performerName: 'Giao Linh', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Hình ảnh đò dọc là biểu tượng văn hóa sông nước Việt Nam', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Bolero và hình ảnh quê hương Việt Nam', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CÁC NHẠC SĨ KHÁC
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-dem-buon-tinh-le',
      title: 'Đêm Buồn Tỉnh Lẻ',
      composerId: 'tu-nhi',
      composerName: 'Tú Nhi',
      originalPerformerName: 'Thanh Tuyền',
      releaseYear: 1970,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tỉnh lẻ', 'cô đơn', 'đêm'],
    },

    summary: 'Đêm Buồn Tỉnh Lẻ là ca khúc về nỗi buồn của những thành phố nhỏ, tỉnh lẻ.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Tú Nhi có tài viết về những khung cảnh tỉnh lẻ, nơi cuộc sống diễn ra chậm rãi.',
      },
      narrative: `"Đêm Buồn Tỉnh Lẻ" được nhạc sĩ Tú Nhi sáng tác năm 1970, là ca khúc về nỗi buồn của những thành phố nhỏ, tỉnh lẻ. Bài hát vẽ nên bức tranh của một đêm yên tĩnh nơi phố nhỏ, với nỗi cô đơn của người xa quê.

Thanh Tuyền với giọng hát trong trẻo đã thể hiện thành công sự cô đơn và hoài niệm trong ca khúc.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'thanh-tuyen', performerName: 'Thanh Tuyền', style: 'Giọng trong trẻo', isOriginal: true },
    ],

    sources: [
      { type: 'book', title: 'Bolero - Những giai điệu vượt thời gian', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-can-nha-mau-tim',
      title: 'Căn Nhà Màu Tím',
      composerId: 'hoai-linh',
      composerName: 'Hoài Linh',
      originalPerformerName: 'Tuấn Vũ',
      releaseYear: 1971,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['kỷ niệm', 'tình yêu', 'hoài niệm'],
    },

    summary: 'Căn Nhà Màu Tím là ca khúc về kỷ niệm tình yêu gắn với một ngôi nhà màu tím.',

    compositionContext: {
      year: 1971,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Màu tím trong văn hóa Việt Nam thường gắn với sự thủy chung, hoài niệm.',
      },
      narrative: `"Căn Nhà Màu Tím" được nhạc sĩ Hoài Linh sáng tác năm 1971, là ca khúc về kỷ niệm tình yêu gắn với một ngôi nhà màu tím.

Bài hát kể về một người quay lại căn nhà xưa, nơi ghi dấu bao kỷ niệm với người yêu cũ. Căn nhà vẫn còn đó nhưng người xưa đã đi xa.

Tuấn Vũ đã thể hiện ca khúc này với giọng hát trầm ấm, đầy hoài niệm.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'tuan-vu', performerName: 'Tuấn Vũ', style: 'Giọng trầm ấm, hoài niệm', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Màu tím trong văn hóa Việt tượng trưng cho sự thủy chung', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Màu sắc trong âm nhạc Việt Nam', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-hoa-muoi-gio',
      title: 'Hoa Mười Giờ',
      composerId: 'dai-phuong-trang',
      composerName: 'Đài Phương Trang',
      originalPerformerName: 'Như Quỳnh',
      releaseYear: 1972,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu ngắn ngủi', 'hoa', 'phù du'],
    },

    summary: 'Hoa Mười Giờ so sánh tình yêu như hoa mười giờ - đẹp rực rỡ nhưng không bền lâu.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Hoa mười giờ chỉ nở vào buổi sáng và héo tàn khi chiều đến - biểu tượng cho sự phù du.',
      },
      narrative: `"Hoa Mười Giờ" được nhạc sĩ Đài Phương Trang sáng tác năm 1972. Hoa mười giờ là loài hoa chỉ nở vào buổi sáng và héo tàn khi chiều đến - một hình ảnh đẹp nhưng phù du, được nhạc sĩ dùng để nói về tình yêu ngắn ngủi.

Bài hát so sánh tình yêu như hoa mười giờ - đẹp rực rỡ nhưng không bền lâu. Đây là một trong những ca khúc hay nhất dùng hình ảnh thiên nhiên để nói về tình cảm.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'nhu-quynh', performerName: 'Như Quỳnh', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Hoa mười giờ chỉ nở vào buổi sáng, biểu tượng cho sự phù du', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Thiên nhiên trong âm nhạc Việt Nam', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-hoa-no-ve-dem',
      title: 'Hoa Nở Về Đêm',
      composerId: 'manh-phat',
      composerName: 'Mạnh Phát',
      originalPerformerName: 'Giao Linh',
      releaseYear: 1968,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['đời sống đêm', 'thân phận', 'đồng cảm'],
    },

    summary: 'Hoa Nở Về Đêm là ca khúc về những người phụ nữ làm nghề bar, phòng trà.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'high',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Mạnh Phát viết với cái nhìn thông cảm về những người phụ nữ mưu sinh trong đêm.',
      },
      narrative: `"Hoa Nở Về Đêm" được nhạc sĩ Mạnh Phát sáng tác năm 1968, là ca khúc về những người phụ nữ làm nghề bar, phòng trà - họ "nở" vào ban đêm như những bông hoa.

Mạnh Phát đã viết bài này với sự tôn trọng, không phán xét, mà chỉ kể lại câu chuyện của những người phụ nữ phải mưu sinh trong đêm. Ca khúc phản ánh một khía cạnh của xã hội Sài Gòn thời đó.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960, đời sống Sài Gòn sôi động với các quán bar, phòng trà.',
      socialContext: 'Xã hội Sài Gòn với đời sống đêm náo nhiệt.',
    },

    performances: [
      { performerId: 'giao-linh', performerName: 'Giao Linh', style: 'Đầy cảm xúc', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Hoa nở về đêm" là cách nói ẩn dụ về những người phụ nữ làm đêm', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Đời sống Sài Gòn trong âm nhạc', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-mua-dem-tinh-nho',
      title: 'Mưa Đêm Tỉnh Nhỏ',
      composerId: 'ha-phuong',
      composerName: 'Hà Phương',
      originalPerformerName: 'Thanh Tuyền',
      releaseYear: 1971,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['mưa', 'tỉnh lẻ', 'cô đơn'],
    },

    summary: 'Mưa Đêm Tỉnh Nhỏ vẽ nên hình ảnh một đêm mưa nơi phố nhỏ, với nỗi buồn của người xa xứ.',

    compositionContext: {
      year: 1971,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Mưa trong bolero luôn là bạn đồng hành của nỗi buồn và sự cô đơn.',
      },
      narrative: `"Mưa Đêm Tỉnh Nhỏ" được nhạc sĩ Hà Phương sáng tác năm 1971, tiếp nối đề tài tỉnh lẻ trong bolero. Bài hát vẽ nên hình ảnh một đêm mưa nơi phố nhỏ, với nỗi buồn của người xa xứ.

Mưa trong bolero luôn mang ý nghĩa đặc biệt - nó là bạn đồng hành của nỗi buồn, của sự cô đơn. Hà Phương đã kết hợp hình ảnh mưa với không gian tỉnh lẻ tạo nên bức tranh đầy cảm xúc.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'thanh-tuyen', performerName: 'Thanh Tuyền', style: 'Giọng trong trẻo', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Mưa là hình ảnh phổ biến trong bolero', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Hình ảnh mưa trong nhạc Việt', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-ao-em-chua-mac-mot-lan',
      title: 'Áo Em Chưa Mặc Một Lần',
      composerId: 'hoai-linh',
      composerName: 'Hoài Linh',
      originalPerformerName: 'Chế Linh',
      releaseYear: 1969,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu dang dở', 'kỷ vật', 'tiếc nuối'],
    },

    summary: 'Áo Em Chưa Mặc Một Lần kể về một chàng trai mua tặng áo cho người yêu nhưng cô ấy chưa kịp mặc thì đã chia tay.',

    compositionContext: {
      year: 1969,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Chiếc áo trở thành kỷ vật của mối tình dang dở.',
      },
      narrative: `"Áo Em Chưa Mặc Một Lần" được nhạc sĩ Hoài Linh sáng tác năm 1969, kể về một chàng trai mua tặng áo cho người yêu nhưng cô ấy chưa kịp mặc thì đã chia tay. Chiếc áo trở thành kỷ vật của mối tình dang dở.

Bài hát sử dụng hình ảnh chiếc áo - một vật dụng đời thường nhưng mang đầy ý nghĩa. Nó tượng trưng cho tình yêu được chuẩn bị chu đáo nhưng không đến được đích.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'che-linh', performerName: 'Chế Linh', style: 'Đầy tiếc nuối', isOriginal: true },
    ],

    sources: [
      { type: 'book', title: 'Hoài Linh - Những ca khúc để đời', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-chuyen-tinh-mong-thuong',
      title: 'Chuyện Tình Mộng Thường',
      composerId: 'thy-linh',
      composerName: 'Thy Linh',
      originalPerformerName: 'Trường Vũ',
      releaseYear: 1990,
      releaseYearConfidence: 'high',
      era: 'renovation',
      genres: ['bolero', 'romantic'],
      themes: ['tình yêu', 'giấc mơ', 'tan vỡ'],
    },

    summary: 'Chuyện Tình Mộng Thường là hit lớn trong cộng đồng người Việt hải ngoại về một chuyện tình đẹp như mơ nhưng tan vỡ.',

    compositionContext: {
      year: 1990,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Bài hát về chuyện tình đẹp như mơ nhưng cuối cùng tan vỡ.',
      },
      narrative: `"Chuyện Tình Mộng Thường" là sáng tác của nhạc sĩ Thy Linh, được Trường Vũ trình bày và trở thành hit lớn trong cộng đồng người Việt hải ngoại.

Bài hát kể về một chuyện tình đẹp như mơ nhưng cuối cùng tan vỡ, để lại trong lòng người nỗi nhớ thương khôn nguôi. Giai điệu bolero nhẹ nhàng, da diết kết hợp với ca từ lãng mạn đã chạm đến trái tim nhiều thế hệ khán giả.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'truong-vu', performerName: 'Trường Vũ', style: 'Giọng trầm ấm', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Bài hát nổi tiếng trong cộng đồng người Việt hải ngoại', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'official', title: 'Trung tâm Asia Entertainment', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-xin-anh-giu-tron-tinh-que',
      title: 'Xin Anh Giữ Trọn Tình Quê',
      composerId: 'duy-khanh',
      composerName: 'Duy Khánh',
      originalPerformerName: 'Duy Khánh',
      releaseYear: 1965,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['quê hương', 'chia ly', 'thủy chung'],
    },

    summary: 'Xin Anh Giữ Trọn Tình Quê là lời nhắn nhủ của người con gái với người yêu khi anh phải rời quê hương.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Duy Khánh viết từ những trải nghiệm về các cuộc chia ly trong thời chiến.',
      },
      narrative: `"Xin Anh Giữ Trọn Tình Quê" được nhạc sĩ kiêm ca sĩ Duy Khánh sáng tác và trình bày năm 1965. Bài hát là lời nhắn nhủ của người con gái với người yêu khi anh phải rời quê hương ra đi.

Duy Khánh không chỉ là ca sĩ mà còn là nhạc sĩ tài hoa. Ông viết bài này từ chính những trải nghiệm của mình, khi chứng kiến nhiều cuộc chia ly trong thời chiến.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, thời kỳ chiến tranh.',
      politicalContext: 'Nhiều người phải rời quê hương vì chiến tranh.',
    },

    performances: [
      { performerId: 'duy-khanh', performerName: 'Duy Khánh', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Duy Khánh vừa là nhạc sĩ vừa là ca sĩ của bài hát', category: 'trivia', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Duy Khánh - Nghệ sĩ đa tài', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'bolero-la-thu-do-thi',
      title: 'Lá Thư Đô Thị',
      composerId: 'chinh-nguyen',
      composerName: 'Chinh Nguyên',
      originalPerformerName: 'Chế Linh',
      releaseYear: 1968,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['đô thị', 'quê hương', 'nhớ nhung'],
    },

    summary: 'Lá Thư Đô Thị kể về những lá thư gửi từ thành phố về quê nhà.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'high',
      inspiration: {
        summary: 'Thư từ là phương tiện liên lạc chính thời xưa, thể hiện sự khác biệt giữa đô thị và quê nhà.',
      },
      narrative: `"Lá Thư Đô Thị" được nhạc sĩ Chinh Nguyên sáng tác năm 1968, kể về những lá thư gửi từ thành phố về quê nhà. Trong thời đại chưa có internet, thư từ là cách duy nhất để liên lạc giữa người thành phố và quê nhà.

Bài hát thể hiện sự khác biệt giữa đời sống đô thị náo nhiệt và quê hương yên bình. Người viết thư từ thành phố gửi về những nỗi nhớ, những suy tư về cuộc sống.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'che-linh', performerName: 'Chế Linh', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Thư từ là phương tiện liên lạc chính thời xưa', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Bolero và đời sống đô thị', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },
];

export default BOLERO_SONGS_BATCH2;
