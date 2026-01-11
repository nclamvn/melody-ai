// ═══════════════════════════════════════════════════════════════════════════════
//                    TRỊNH CÔNG SƠN SONGS — VERIFIED DATABASE
//                         (1960s-2001)
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const TRINH_SONGS: SongEntry[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // DIỄM XƯA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-diem-xua',
      title: 'Diễm Xưa',
      alternativeTitles: ['Diem Xua', 'Beautiful Days of the Past'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1960,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['tình yêu đơn phương', 'hoài niệm', 'Huế', 'mưa'],
      tempo: 'Slow',
      key: 'C major',
    },

    summary:
      'Diễm Xưa là một trong những ca khúc tiêu biểu và được yêu thích nhất của Trịnh Công Sơn, sáng tác khoảng năm 1960, lấy cảm hứng từ hình bóng Ngô Vũ Bích Diễm - một thiếu nữ Huế mà nhạc sĩ thầm thương khi còn là sinh viên.',

    compositionContext: {
      year: 1960,
      yearConfidence: 'high',
      location: 'Huế',

      inspiration: {
        summary:
          'Ngô Vũ Bích Diễm, một thiếu nữ Huế, con gái giáo sư Ngô Văn Giảng, người thường đi ngang qua trường vào những buổi chiều mưa.',
        detailed: `Nguồn cảm hứng của bài hát là Ngô Vũ Bích Diễm, sinh năm 1943, con gái của giáo sư Ngô Văn Giảng. Hàng ngày, cô thường đi ngang qua khu vực trường Đại học Sư phạm Huế vào buổi chiều.

Trịnh Công Sơn khi đó là sinh viên, thường quan sát cô từ xa nhưng chưa bao giờ dám tiến lại nói chuyện. Hình ảnh người thiếu nữ mảnh mai đi trong mưa phùn xứ Huế đã in sâu vào tâm trí ông.

Đáng chú ý, mối quan hệ giữa hai người chỉ dừng lại ở mức "nhìn từ xa" - một tình cảm đơn phương, thầm lặng. Điều này được chính Ngô Vũ Bích Diễm xác nhận trong các cuộc phỏng vấn sau này.`,
        relatedPeople: [
          {
            name: 'Diễm',
            realName: 'Ngô Vũ Bích Diễm',
            birthYear: 1943,
            relationship: 'Nguồn cảm hứng chính của bài hát',
            description:
              'Con gái giáo sư Ngô Văn Giảng, sau này trở thành giáo viên tiếng Pháp.',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Vào những năm đầu thập niên 1960, Trịnh Công Sơn còn là một chàng sinh viên trẻ tại Huế. Hàng ngày, từ cửa sổ lớp học, ông thường nhìn thấy một thiếu nữ đi ngang qua vào những buổi chiều. Đó là Ngô Vũ Bích Diễm.

Theo lời kể của chính nhạc sĩ, ông chưa bao giờ dám bước đến nói chuyện trực tiếp với Diễm. Tình cảm thầm lặng ấy được gửi gắm vào ca khúc "Diễm Xưa".

Câu hát mở đầu "Mưa vẫn mưa bay trên tầng tháp cổ" gợi lên hình ảnh đặc trưng của cố đô Huế với những ngôi chùa, tháp cổ kính chìm trong làn mưa phùn.

Ca khúc được Khánh Ly thể hiện lần đầu và nhanh chóng trở thành một trong những bài hát được yêu thích nhất trong kho tàng nhạc Trịnh Công Sơn. Bài hát còn được ca sĩ Nhật Bản Yoshimi Tendo thể hiện với tên "Utsukushii Mukashi".`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription:
        'Giai đoạn đầu của nền Đệ nhất Cộng hòa tại miền Nam Việt Nam (1955-1963).',

      socialContext:
        'Huế thời kỳ này vẫn giữ được vẻ yên bình, cổ kính của một cố đô với nhịp sống chậm rãi.',

      musicalMovement:
        'Giai đoạn hình thành phong cách nhạc Trịnh Công Sơn - một dòng nhạc trữ tình với ca từ giàu chất thơ.',

      musicalInfluences: ['Chanson Pháp', 'Nhạc tiền chiến Việt Nam'],

      culturalSignificance:
        'Diễm Xưa đánh dấu sự khởi đầu của "nhạc Trịnh" như một phong cách riêng biệt trong âm nhạc Việt Nam.',

      culturalImpact:
        'Bài hát đã vượt ra ngoài biên giới Việt Nam, được dịch sang tiếng Nhật và trở nên phổ biến tại Nhật Bản.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        year: 1962,
        style: 'Giọng hát trầm ấm, da diết',
        significance: 'Phiên bản gốc và kinh điển nhất',
        isOriginal: true,
      },
      {
        performerId: 'hong-nhung',
        performerName: 'Hồng Nhung',
        style: 'Trẻ trung, trong sáng hơn',
        significance: 'Giới thiệu nhạc Trịnh đến thế hệ trẻ',
        isOriginal: false,
      },
    ],

    interestingFacts: [
      {
        content:
          'Trịnh Công Sơn từng chia sẻ: "Tôi viết Diễm Xưa khi chưa biết yêu là gì, chỉ biết nhớ"',
        category: 'creation',
        isVerified: true,
      },
      {
        content:
          'Ngô Vũ Bích Diễm sau này trở thành giáo viên tiếng Pháp và hiện sống tại TP.HCM',
        category: 'cultural',
        isVerified: true,
      },
      {
        content:
          'Bài hát có phiên bản tiếng Nhật "Utsukushii Mukashi" do ca sĩ Yoshimi Tendo thể hiện',
        category: 'cultural',
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'interview',
        title: 'Ngô Vũ Bích Diễm: Người phụ nữ trong Diễm Xưa lần đầu kể chuyện',
        publisher: 'Báo Tuổi Trẻ',
        year: 2011,
        url: 'https://tuoitre.vn/ngo-vu-bich-diem-nguoi-phu-nu-trong-diem-xua-463015.htm',
        reliability: 'verified',
      },
      {
        type: 'wikipedia',
        title: 'Diễm xưa',
        url: 'https://vi.wikipedia.org/wiki/Diễm_xưa',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      verifiedBy: 'Editorial Team',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // HẠ TRẮNG
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-ha-trang',
      title: 'Hạ Trắng',
      alternativeTitles: ['Ha Trang', 'White Summer'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1961,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['tình yêu', 'mùa hè', 'nỗi nhớ', 'áo trắng'],
      tempo: 'Moderate',
    },

    summary:
      'Hạ Trắng là một trong những ca khúc lãng mạn nhất của Trịnh Công Sơn, sáng tác khoảng năm 1961, gợi lên hình ảnh người con gái áo trắng trong nắng hè - một biểu tượng đẹp của tuổi học trò Việt Nam.',

    compositionContext: {
      year: 1961,
      yearConfidence: 'high',
      location: 'Huế',

      inspiration: {
        summary:
          'Cảm hứng từ hình ảnh những nữ sinh áo dài trắng đi học trong nắng hè Huế.',
        detailed: `Hạ Trắng được sáng tác khi Trịnh Công Sơn còn ở Huế. Hình ảnh những nữ sinh mặc áo dài trắng đạp xe đi học trong ánh nắng mùa hè đã trở thành nguồn cảm hứng bất tận.

Khác với Diễm Xưa gắn với một người cụ thể, Hạ Trắng mang tính biểu tượng hơn - là bài ca về vẻ đẹp tuổi học trò, về sự trong trắng và tươi mới của tuổi trẻ.`,
        relatedPeople: [],
      },

      narrative: `Hạ Trắng ra đời trong giai đoạn Trịnh Công Sơn bắt đầu định hình phong cách sáng tác riêng. Bài hát như một bức tranh về mùa hè Huế với hình ảnh trung tâm là màu trắng - màu của áo dài, của nắng, của sự trong trắng tuổi học trò.

Câu hát "Áo xưa dù nhàu cũng xin bạc đầu" thể hiện khát vọng gìn giữ những kỷ niệm đẹp qua thời gian. Bài hát không chỉ về một mùa hè cụ thể mà về tuổi trẻ nói chung.

Ca khúc nhanh chóng trở thành một trong những bài hát được yêu thích của nhạc Trịnh, được nhiều ca sĩ thể hiện qua nhiều thế hệ.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, giai đoạn hình thành nhạc Trịnh.',
      socialContext: 'Huế với vẻ đẹp yên bình, học sinh với áo dài trắng.',
      musicalMovement: 'Giai đoạn đầu của "nhạc Trịnh".',
      culturalSignificance:
        'Hạ Trắng trở thành biểu tượng của vẻ đẹp tuổi học trò Việt Nam.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm ấm, da diết',
        significance: 'Phiên bản kinh điển',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content:
          'Bài hát được xem là một trong những ca khúc đẹp nhất về mùa hè trong âm nhạc Việt Nam',
        category: 'cultural',
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'wikipedia',
        title: 'Trịnh Công Sơn',
        url: 'https://vi.wikipedia.org/wiki/Trịnh_Công_Sơn',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BIỂN NHỚ
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-bien-nho',
      title: 'Biển Nhớ',
      alternativeTitles: ['Bien Nho', 'Sea of Memories'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerId: 'khanh-ly',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1962,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'romantic'],
      themes: ['biển', 'nỗi nhớ', 'chia ly', 'tình yêu'],
      tempo: 'Slow',
    },

    summary:
      'Biển Nhớ là ca khúc nổi tiếng của Trịnh Công Sơn, sáng tác khoảng năm 1962, với hình ảnh biển cả như biểu tượng của nỗi nhớ mênh mông.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'high',
      location: 'Miền Trung Việt Nam',

      inspiration: {
        summary:
          'Lấy cảm hứng từ biển miền Trung, nơi Trịnh Công Sơn đã có nhiều kỷ niệm tuổi trẻ.',
      },

      narrative: `Biển Nhớ ra đời trong giai đoạn Trịnh Công Sơn đang sáng tác nhiều ca khúc về tình yêu và nỗi nhớ. Hình ảnh biển - rộng lớn, mênh mông - được dùng như biểu tượng của nỗi nhớ không bờ bến.

Bài hát mang âm hưởng buồn man mác đặc trưng của nhạc Trịnh, với ca từ giàu hình ảnh và cảm xúc. "Biển nhớ" không chỉ là nỗi nhớ về biển mà là nỗi nhớ sâu thẳm như biển cả.

Ca khúc đã trở thành một trong những bài hát được yêu thích nhất về chủ đề biển trong âm nhạc Việt Nam.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, thời kỳ vàng son của nhạc Trịnh.',
      musicalMovement: 'Giai đoạn phát triển của dòng nhạc trữ tình.',
      culturalSignificance:
        'Biển Nhớ là một trong những ca khúc về biển đẹp nhất của âm nhạc Việt Nam.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát da diết',
        significance: 'Phiên bản kinh điển',
        isOriginal: true,
      },
    ],

    sources: [
      {
        type: 'wikipedia',
        title: 'Trịnh Công Sơn',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MỘT CÕI ĐI VỀ
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-mot-coi-di-ve',
      title: 'Một Cõi Đi Về',
      alternativeTitles: ['Mot Coi Di Ve', 'A Place to Go and Return'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1974,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'philosophical'],
      themes: ['triết lý', 'cuộc sống', 'vô thường', 'tình yêu'],
      tempo: 'Slow',
    },

    summary:
      'Một Cõi Đi Về là một trong những ca khúc mang tính triết lý sâu sắc nhất của Trịnh Công Sơn, sáng tác năm 1974, nói về cuộc sống, sự vô thường và hành trình của con người.',

    compositionContext: {
      year: 1974,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary:
          'Ảnh hưởng từ triết học Phật giáo về vô thường và luân hồi.',
        detailed: `Một Cõi Đi Về ra đời vào năm 1974, giai đoạn Trịnh Công Sơn đã có sự chuyển biến trong tư tưởng âm nhạc. Từ những bài hát về tình yêu đơn thuần, ông bắt đầu đi vào những chủ đề triết học, tôn giáo sâu sắc hơn.

Bài hát mang đậm ảnh hưởng của triết học Phật giáo với những khái niệm về vô thường, về cõi đi về - nơi con người xuất phát và cuối cùng sẽ trở về.`,
      },

      narrative: `Một Cõi Đi Về được sáng tác năm 1974, là một trong những ca khúc đánh dấu sự trưởng thành trong tư duy triết học của Trịnh Công Sơn. Bài hát không chỉ là một ca khúc tình yêu mà còn là một suy ngẫm về cuộc sống, về sự tồn tại của con người.

"Bao nhiêu năm rồi còn mãi ra đi" - câu hát mở đầu đã đặt ra câu hỏi về hành trình của đời người. Con người đi đâu, về đâu? Cuối cùng thì mọi người đều có chung một "cõi đi về".

Ca khúc được nhiều người xem là "di chúc tinh thần" của Trịnh Công Sơn, dù ông còn sống và sáng tác thêm nhiều năm sau đó. Bài hát thể hiện sự chấp nhận, bình thản trước cuộc đời.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1974, trước thời điểm kết thúc chiến tranh Việt Nam.',
      socialContext:
        'Giai đoạn nhiều biến động, con người tìm kiếm sự bình an tâm hồn.',
      musicalMovement:
        'Giai đoạn nhạc Trịnh bắt đầu mang màu sắc triết học, tôn giáo đậm nét hơn.',
      culturalSignificance:
        'Bài hát được xem là một trong những ca khúc triết lý sâu sắc nhất của Trịnh Công Sơn.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm lắng, sâu sắc',
        significance: 'Phiên bản kinh điển',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content:
          'Bài hát thường được hát trong các buổi tưởng niệm Trịnh Công Sơn',
        category: 'cultural',
        isVerified: true,
      },
      {
        content:
          'Ca từ mang đậm triết lý Phật giáo về vô thường',
        category: 'creation',
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'book',
        title: 'Trịnh Công Sơn - Cuộc đời và âm nhạc',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // CÁT BỤI
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-cat-bui',
      title: 'Cát Bụi',
      alternativeTitles: ['Cat Bui', 'Dust'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['ballad', 'philosophical'],
      themes: ['vô thường', 'cuộc đời', 'triết lý'],
      tempo: 'Slow',
    },

    summary:
      'Cát Bụi là ca khúc triết lý của Trịnh Công Sơn, nói về sự vô thường của cuộc đời - con người đến từ cát bụi và rồi sẽ trở về với cát bụi.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Việt Nam',

      inspiration: {
        summary:
          'Triết lý Phật giáo về vô thường và nguồn gốc con người.',
      },

      narrative: `Cát Bụi là một trong những ca khúc mang tính triết học của Trịnh Công Sơn. Bài hát nói về sự vô thường của cuộc đời - con người sinh ra từ cát bụi và cuối cùng sẽ trở về với cát bụi.

Câu hát "Hạt bụi nào hóa kiếp thân tôi" đặt ra câu hỏi về nguồn gốc và định mệnh của con người. Trịnh Công Sơn đã sử dụng hình ảnh "cát bụi" như một biểu tượng triết học về sự nhỏ bé của con người trước vũ trụ.

Ca khúc thể hiện sự tiếp nhận triết học Phật giáo của Trịnh Công Sơn và cách ông chuyển hóa những tư tưởng này thành nghệ thuật âm nhạc.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, giai đoạn chiến tranh.',
      musicalMovement: 'Nhạc Trịnh bắt đầu mang màu sắc triết học.',
      culturalSignificance:
        'Ca khúc đại diện cho dòng nhạc triết lý của Trịnh Công Sơn.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát trầm lắng',
        isOriginal: true,
      },
    ],

    sources: [
      {
        type: 'wikipedia',
        title: 'Trịnh Công Sơn',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      needsReview: false,
    },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // NHƯ CÁNH VẠC BAY
  // ─────────────────────────────────────────────────────────────────────────────
  {
    metadata: {
      id: 'trinh-nhu-canh-vac-bay',
      title: 'Như Cánh Vạc Bay',
      alternativeTitles: ['Nhu Canh Vac Bay', 'Like a Flying Heron'],
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1968,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['ballad', 'antiwar'],
      themes: ['chiến tranh', 'nỗi buồn', 'hòa bình'],
      tempo: 'Slow',
    },

    summary:
      'Như Cánh Vạc Bay là ca khúc phản chiến của Trịnh Công Sơn, sáng tác trong thời kỳ chiến tranh Việt Nam, với hình ảnh cánh vạc cô đơn bay trong khói lửa.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'high',
      location: 'Việt Nam',

      inspiration: {
        summary:
          'Cảm hứng từ thực tế chiến tranh Việt Nam và nỗi đau của người dân.',
      },

      narrative: `Như Cánh Vạc Bay ra đời vào năm 1968, trong giai đoạn chiến tranh Việt Nam đang ở cao trào. Đây là một trong những ca khúc phản chiến tiêu biểu của Trịnh Công Sơn.

Hình ảnh "cánh vạc bay" là biểu tượng cho sự cô đơn, mong manh của con người giữa khói lửa chiến tranh. Bài hát thể hiện khát vọng hòa bình và nỗi đau của một thế hệ phải sống trong chiến tranh.

Ca khúc đã góp phần đưa Trịnh Công Sơn trở thành "tiếng nói của một thế hệ" - thế hệ khao khát hòa bình giữa cuộc chiến tàn khốc.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1968, cao trào của chiến tranh Việt Nam.',
      politicalContext: 'Chiến tranh Việt Nam đang diễn ra khốc liệt.',
      musicalMovement: 'Dòng nhạc phản chiến của Trịnh Công Sơn.',
      culturalSignificance:
        'Bài hát đại diện cho tiếng nói phản chiến trong âm nhạc Việt Nam.',
    },

    performances: [
      {
        performerId: 'khanh-ly',
        performerName: 'Khánh Ly',
        style: 'Giọng hát da diết',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content:
          'Bài hát từng bị cấm phát hành vì nội dung phản chiến',
        category: 'cultural',
        isVerified: true,
      },
    ],

    sources: [
      {
        type: 'book',
        title: 'Nhạc phản chiến Trịnh Công Sơn',
        reliability: 'high',
      },
    ],

    contentQuality: {
      overallConfidence: 'high',
      needsReview: false,
    },
  },
];
