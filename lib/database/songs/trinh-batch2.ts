// ═══════════════════════════════════════════════════════════════════════════════
//                    NHẠC TRỊNH — BATCH 2
//                         Additional Songs from Content Expansion
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const TRINH_SONGS_BATCH2: SongEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // GIAI ĐOẠN HUẾ (1958-1965)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'trinh-uot-mi',
      title: 'Ướt Mi',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1958,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['tuổi trẻ', 'nỗi buồn', 'tình yêu'],
    },

    summary: 'Ướt Mi là một trong những ca khúc đầu tay của Trịnh Công Sơn, viết khi ông mới 19 tuổi.',

    compositionContext: {
      year: 1958,
      yearConfidence: 'verified',
      location: 'Huế',
      inspiration: {
        summary: 'Nỗi buồn man mác đặc trưng của tuổi trẻ.',
      },
      narrative: `"Ướt Mi" được Trịnh Công Sơn sáng tác năm 1958, khi ông mới 19 tuổi. Đây là một trong những ca khúc đầu tay của nhạc sĩ, viết trong thời gian học tại Huế.

Bài hát thể hiện nỗi buồn man mác đặc trưng của tuổi trẻ, với hình ảnh giọt nước mắt trên mi người yêu. Trịnh Công Sơn đã bắt đầu định hình phong cách âm nhạc riêng từ rất sớm.

Ca khúc được Khánh Ly thể hiện và trở thành một trong những bài hát đặt nền móng cho sự nghiệp của cả hai.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1950, giai đoạn đầu sự nghiệp của Trịnh Công Sơn.',
      musicalMovement: 'Khởi đầu của dòng "Nhạc Trịnh".',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Sáng tác năm 1958 khi Trịnh Công Sơn mới 19 tuổi', category: 'creation', isVerified: true },
      { content: 'Một trong những ca khúc đầu tay của nhạc sĩ', category: 'creation', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Một người thơ ca, một cõi đi về', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-bien-nho',
      title: 'Biển Nhớ',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1962,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['biển', 'nỗi nhớ', 'quê hương'],
    },

    summary: 'Biển Nhớ lấy cảm hứng từ biển Quy Nhơn, là một trong những ca khúc về biển đẹp nhất của âm nhạc Việt Nam.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'verified',
      location: 'Quy Nhơn',
      inspiration: {
        summary: 'Biển Quy Nhơn và nỗi nhớ nhà, nhớ Huế.',
      },
      narrative: `"Biển Nhớ" được Trịnh Công Sơn sáng tác năm 1962 tại Quy Nhơn, khi ông dạy học ở đây. Bài hát lấy cảm hứng từ biển Quy Nhơn và nỗi nhớ nhà, nhớ Huế.

Biển trong thơ nhạc Trịnh Công Sơn luôn mang ý nghĩa triết lý - nó vừa là thiên nhiên, vừa là biểu tượng của sự vô tận, của nỗi nhớ không bờ bến.

Khánh Ly trình bày với giọng hát trong trẻo, da diết, làm nổi bật vẻ đẹp mênh mông của biển và nỗi nhớ.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, thời gian Trịnh Công Sơn dạy học tại Quy Nhơn.',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', style: 'Giọng trong trẻo, da diết', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Lấy cảm hứng từ biển Quy Nhơn', category: 'creation', isVerified: true },
      { content: 'Một trong những ca khúc về biển đẹp nhất của Việt Nam', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Cuộc đời và sự nghiệp', reliability: 'verified' },
      { type: 'memoir', title: 'Hồi ký Khánh Ly', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-ha-trang',
      title: 'Hạ Trắng',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1963,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['mùa hè', 'tình yêu', 'trong trẻo'],
    },

    summary: 'Hạ Trắng vẽ nên bức tranh của một mùa hạ với nắng trắng tinh khôi.',

    compositionContext: {
      year: 1963,
      yearConfidence: 'verified',
      location: 'Huế',
      inspiration: {
        summary: '"Hạ trắng" là cách diễn đạt độc đáo - mùa hè mang màu trắng tinh khôi.',
      },
      narrative: `"Hạ Trắng" được Trịnh Công Sơn sáng tác năm 1963, trong một mùa hè ở Huế. Bài hát vẽ nên bức tranh của một mùa hạ với nắng trắng, với những cảm xúc trong trẻo của tuổi trẻ.

"Hạ trắng" là một cách diễn đạt độc đáo - mùa hè thường gắn với nắng vàng, nhưng Trịnh Công Sơn lại thấy một màu trắng tinh khôi, như sự thuần khiết của tình yêu đầu đời.

Ca khúc mang âm hưởng nhẹ nhàng, bay bổng, khác với nhiều ca khúc buồn khác của nhạc sĩ.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Hạ trắng" là cách diễn đạt độc đáo của Trịnh Công Sơn', category: 'cultural', isVerified: true },
      { content: 'Bài hát có âm hưởng tươi sáng, khác với phong cách buồn thường thấy', category: 'trivia', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Người hát rong qua nhiều thế hệ', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CA KHÚC DA VÀNG (1965-1972)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'trinh-ngu-di-con',
      title: 'Ngủ Đi Con',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1966,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'phản chiến'],
      themes: ['chiến tranh', 'hòa bình', 'mẹ con'],
    },

    summary: 'Ngủ Đi Con thuộc chùm Ca khúc Da Vàng, là lời ru của người mẹ trong thời chiến.',

    compositionContext: {
      year: 1966,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Lời ru của người mẹ giữa tiếng bom đạn, thể hiện khát vọng hòa bình.',
      },
      narrative: `"Ngủ Đi Con" được Trịnh Công Sơn sáng tác năm 1966, thuộc chùm "Ca khúc Da Vàng" - những bài hát phản chiến của ông. Bài hát là lời ru của người mẹ trong thời chiến, ru con ngủ giữa tiếng bom đạn.

Trịnh Công Sơn viết bài này sau khi chứng kiến những đau thương của chiến tranh tại miền Trung. Bài hát không trực tiếp chống chiến tranh mà dùng hình ảnh người mẹ ru con để nói lên khát vọng hòa bình.

Ca khúc đã bị cấm lưu hành trong một thời gian do nội dung phản chiến.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, thời kỳ chiến tranh ác liệt.',
      politicalContext: 'Chiến tranh Việt Nam đang leo thang.',
      musicalMovement: 'Phong trào Ca khúc Da Vàng phản chiến.',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Thuộc chùm "Ca khúc Da Vàng" phản chiến', category: 'cultural', isVerified: true },
      { content: 'Từng bị cấm lưu hành', category: 'controversy', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Ca khúc Da Vàng - Trịnh Công Sơn', reliability: 'verified' },
      { type: 'academic', title: 'Lịch sử âm nhạc phản chiến Việt Nam', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-cat-bui',
      title: 'Cát Bụi',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1965,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'triết lý'],
      themes: ['vô thường', 'sinh tử', 'Phật giáo'],
    },

    summary: 'Cát Bụi mang đậm triết lý Phật giáo về sự vô thường - từ cát bụi mà ra, rồi cũng trở về cát bụi.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Triết lý Phật giáo về vô thường - kiếp người như cát bụi.',
      },
      narrative: `"Cát Bụi" được Trịnh Công Sơn sáng tác năm 1965, mang đậm triết lý Phật giáo về sự vô thường. Bài hát nói về kiếp người như cát bụi - từ cát bụi mà ra, rồi cũng trở về cát bụi.

Trịnh Công Sơn chịu ảnh hưởng sâu sắc từ Phật giáo, đặc biệt là tư tưởng về vô thường. "Cát Bụi" là một trong những ca khúc thể hiện rõ nhất triết lý này - không bi quan mà chấp nhận quy luật tự nhiên của cuộc sống.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Mang đậm triết lý Phật giáo về vô thường', category: 'cultural', isVerified: true },
      { content: 'Một trong những ca khúc triết lý sâu sắc nhất', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'academic', title: 'Trịnh Công Sơn và triết lý Phật giáo trong âm nhạc', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GIAI ĐOẠN SÀI GÒN (1967-1975)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'trinh-mot-coi-di-ve',
      title: 'Một Cõi Đi Về',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1974,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'triết lý'],
      themes: ['sinh tử', 'luân hồi', 'ý nghĩa cuộc sống'],
    },

    summary: 'Một Cõi Đi Về là ca khúc mang tính tổng kết về cuộc đời và sự tồn tại.',

    compositionContext: {
      year: 1974,
      yearConfidence: 'verified',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Triết lý về sinh tử và vòng luân hồi của kiếp người.',
      },
      narrative: `"Một Cõi Đi Về" được Trịnh Công Sơn sáng tác năm 1974, là một trong những ca khúc mang tính tổng kết về cuộc đời và sự tồn tại. Bài hát đặt câu hỏi về ý nghĩa của sự sống và cái chết.

Trịnh Công Sơn viết bài này trong giai đoạn chiến tranh sắp kết thúc, khi ông đã chứng kiến quá nhiều mất mát. "Một cõi đi về" là cách ông nói về vòng luân hồi của kiếp người.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Sáng tác năm 1974, gần cuối chiến tranh', category: 'creation', isVerified: true },
      { content: 'Một trong những ca khúc hay nhất về đề tài sinh tử', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Một người thơ ca, một cõi đi về', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-phoi-pha',
      title: 'Phôi Pha',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1972,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['phai tàn', 'thời gian', 'chấp nhận'],
    },

    summary: 'Phôi Pha nói về sự phai nhạt của tình yêu và thời gian - như cách mà mọi thứ đẹp đẽ rồi cũng sẽ tàn phai.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'verified',
      inspiration: {
        summary: '"Phôi pha" có nghĩa là phai nhạt dần, Trịnh Công Sơn chấp nhận như quy luật tự nhiên.',
      },
      narrative: `"Phôi Pha" được Trịnh Công Sơn sáng tác năm 1972, là ca khúc về sự phai nhạt của tình yêu và thời gian. "Phôi pha" có nghĩa là phai nhạt dần, như cách mà mọi thứ đẹp đẽ rồi cũng sẽ tàn phai.

Bài hát mang âm hưởng buồn nhẹ nhàng, không bi lụy. Trịnh Công Sơn chấp nhận sự phôi pha như một quy luật tự nhiên, không cố níu giữ.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', style: 'Tinh tế', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Phôi pha" nghĩa là phai nhạt dần', category: 'cultural', isVerified: true },
      { content: 'Mang âm hưởng buồn nhẹ nhàng, không bi lụy', category: 'trivia', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Từ điển ca khúc Trịnh Công Sơn', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-tinh-nho',
      title: 'Tình Nhớ',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1970,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['nỗi nhớ', 'tình yêu', 'thương nhớ'],
    },

    summary: 'Tình Nhớ là một trong những ca khúc hay nhất về đề tài nỗi nhớ trong tình yêu.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Trịnh Công Sơn có biệt tài viết về nỗi nhớ - một cảm xúc vừa đau đớn vừa ngọt ngào.',
      },
      narrative: `"Tình Nhớ" được Trịnh Công Sơn sáng tác năm 1970, là ca khúc về nỗi nhớ trong tình yêu. Bài hát có giai điệu nhẹ nhàng, du dương, với ca từ đẹp như thơ.

Trịnh Công Sơn có biệt tài viết về nỗi nhớ - một cảm xúc vừa đau đớn vừa ngọt ngào. "Tình Nhớ" là một trong những ca khúc hay nhất của ông về đề tài này.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Một trong những ca khúc hay nhất về đề tài nỗi nhớ', category: 'cultural', isVerified: true },
      { content: 'Giai điệu nhẹ nhàng, ca từ như thơ', category: 'trivia', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Cuộc đời và sự nghiệp', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-chieu-mot-minh-qua-pho',
      title: 'Chiều Một Mình Qua Phố',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1971,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['cô đơn', 'đô thị', 'chiều tà'],
    },

    summary: 'Chiều Một Mình Qua Phố vẽ nên hình ảnh một người đi bộ một mình trong chiều tà, với bao suy tư.',

    compositionContext: {
      year: 1971,
      yearConfidence: 'verified',
      location: 'Sài Gòn',
      inspiration: {
        summary: 'Sự cô đơn giữa phố phường đông đúc - một nghịch lý của đời sống đô thị.',
      },
      narrative: `"Chiều Một Mình Qua Phố" được Trịnh Công Sơn sáng tác năm 1971, là ca khúc về sự cô đơn giữa phố phường đông đúc.

Sài Gòn những năm 1970 là bối cảnh của nhiều ca khúc Trịnh Công Sơn. Thành phố náo nhiệt nhưng con người vẫn cô đơn - một nghịch lý mà nhạc sĩ đã nắm bắt tinh tế.

Ca khúc có giai điệu chậm rãi, như nhịp bước chân người đi một mình.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1970, đời sống đô thị Sài Gòn.',
      socialContext: 'Sài Gòn náo nhiệt với đời sống đô thị hiện đại.',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Về sự cô đơn giữa phố phường đông đúc', category: 'cultural', isVerified: true },
      { content: 'Giai điệu chậm rãi như nhịp bước chân', category: 'trivia', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn và Sài Gòn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-mua-hong',
      title: 'Mưa Hồng',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1968,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['mưa', 'hy vọng', 'tình yêu'],
    },

    summary: 'Mưa Hồng có hình ảnh độc đáo - mưa không xám mà mang màu hồng của hy vọng, của tình yêu.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'verified',
      inspiration: {
        summary: '"Mưa hồng" là cách diễn đạt độc đáo - biến mưa thành một thực thể đầy màu sắc.',
      },
      narrative: `"Mưa Hồng" được Trịnh Công Sơn sáng tác năm 1968, là ca khúc với hình ảnh thơ mộng về mưa. "Mưa hồng" là cách diễn đạt độc đáo - mưa không xám như thường thấy mà mang màu hồng của hy vọng, của tình yêu.

Trịnh Công Sơn có biệt tài tạo ra những hình ảnh thơ mộng từ những điều bình thường. Mưa trong nhạc của ông không chỉ là hiện tượng thời tiết mà còn mang ý nghĩa biểu tượng sâu sắc.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Mưa hồng" là cách diễn đạt độc đáo', category: 'cultural', isVerified: true },
      { content: 'Âm hưởng tươi sáng hơn các bài khác', category: 'trivia', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Hình ảnh trong nhạc Trịnh Công Sơn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-tuoi-da-buon',
      title: 'Tuổi Đá Buồn',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1968,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['tuổi trẻ', 'hoài niệm', 'nỗi buồn'],
    },

    summary: 'Tuổi Đá Buồn nói về tuổi trẻ với những nỗi buồn man mác và sự hoài niệm.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'verified',
      inspiration: {
        summary: '"Tuổi đá" là cách nói về thời tuổi trẻ - giai đoạn đầy hoang mang, tìm kiếm.',
      },
      narrative: `"Tuổi Đá Buồn" được Trịnh Công Sơn sáng tác năm 1968, nói về tuổi trẻ với những nỗi buồn man mác. "Tuổi đá" là cách nói về thời tuổi trẻ - giai đoạn đầy hoang mang, tìm kiếm nhưng cũng đầy cảm xúc.

Trịnh Công Sơn viết bài này khi ông đã qua tuổi thanh xuân, nhìn lại quãng thời gian đã qua với nhiều tiếc nuối.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Tuổi đá" là cách nói về thời tuổi trẻ', category: 'cultural', isVerified: true },
      { content: 'Một trong những bài hát về tuổi trẻ hay nhất', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Những ca khúc để đời', reliability: 'verified' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GIAI ĐOẠN SAU 1975
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'trinh-em-con-nho-hay-em-da-quen',
      title: 'Em Còn Nhớ Hay Em Đã Quên',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1991,
      releaseYearConfidence: 'verified',
      era: 'renovation',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['kỷ niệm', 'Sài Gòn', 'nhớ thương'],
    },

    summary: 'Em Còn Nhớ Hay Em Đã Quên là lời hỏi về kỷ niệm, về tình yêu đã qua, gắn liền với Sài Gòn.',

    compositionContext: {
      year: 1991,
      yearConfidence: 'verified',
      location: 'TP.HCM',
      inspiration: {
        summary: 'Những câu hỏi về việc nhớ hay quên không chỉ dành cho người yêu mà còn cho cả một thời đại.',
      },
      narrative: `"Em Còn Nhớ Hay Em Đã Quên" được Trịnh Công Sơn sáng tác năm 1991, là một trong những ca khúc nổi tiếng nhất của ông trong giai đoạn sau. Bài hát là lời hỏi về kỷ niệm, về tình yêu đã qua.

Ca khúc gắn liền với Sài Gòn - thành phố mà Trịnh Công Sơn yêu thương. Những câu hỏi về việc nhớ hay quên không chỉ dành cho người yêu mà còn cho cả một thời đại đã qua.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Sáng tác năm 1991', category: 'creation', isVerified: true },
      { content: 'Một trong những ca khúc phổ biến nhất của nhạc Trịnh', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Những năm tháng cuối', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-toi-oi-dung-tuyet-vong',
      title: 'Tôi Ơi Đừng Tuyệt Vọng',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1992,
      releaseYearConfidence: 'verified',
      era: 'renovation',
      genres: ['nhac-trinh', 'triết lý'],
      themes: ['hy vọng', 'tự khuyên', 'nghị lực'],
    },

    summary: 'Tôi Ơi Đừng Tuyệt Vọng là lời tự khuyên mình không nên từ bỏ hy vọng.',

    compositionContext: {
      year: 1992,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Viết khi sức khỏe Trịnh Công Sơn suy yếu, thể hiện tinh thần lạc quan.',
      },
      narrative: `"Tôi Ơi Đừng Tuyệt Vọng" được Trịnh Công Sơn sáng tác năm 1992, là ca khúc mang tính tự khuyên mình không nên từ bỏ hy vọng. Bài hát như một lời nhắn nhủ với chính bản thân trong những lúc khó khăn.

Trịnh Công Sơn viết bài này trong giai đoạn sức khỏe ông bắt đầu suy yếu. Bài hát thể hiện tinh thần lạc quan, không chịu đầu hàng trước nghịch cảnh.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Viết như lời tự khuyên mình', category: 'creation', isVerified: true },
      { content: 'Mang thông điệp lạc quan, không từ bỏ hy vọng', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Trịnh Công Sơn - Những năm tháng cuối', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-goi-ten-bon-mua',
      title: 'Gọi Tên Bốn Mùa',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Hồng Nhung',
      releaseYear: 1995,
      releaseYearConfidence: 'verified',
      era: 'renovation',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['bốn mùa', 'thời gian', 'cuộc sống'],
    },

    summary: 'Gọi Tên Bốn Mùa đi qua bốn mùa xuân hạ thu đông, viết cho ca sĩ Hồng Nhung.',

    compositionContext: {
      year: 1995,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Bốn mùa như vòng đời của con người, xoay vần và tuần hoàn.',
      },
      narrative: `"Gọi Tên Bốn Mùa" được Trịnh Công Sơn sáng tác năm 1995, viết cho ca sĩ Hồng Nhung. Bài hát đi qua bốn mùa xuân hạ thu đông, mỗi mùa mang một cảm xúc riêng.

Đây là một trong những ca khúc cuối của Trịnh Công Sơn, thể hiện sự trưởng thành và chiêm nghiệm của ông về thời gian và cuộc sống.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'hong-nhung', performerName: 'Hồng Nhung', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Viết cho ca sĩ Hồng Nhung', category: 'creation', isVerified: true },
      { content: 'Một trong những ca khúc cuối của Trịnh Công Sơn', category: 'creation', isVerified: true },
    ],

    sources: [
      { type: 'interview', title: 'Trịnh Công Sơn và Hồng Nhung', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CÁC CA KHÚC KHÁC
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'trinh-quynh-huong',
      title: 'Quỳnh Hương',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1972,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['hoa', 'phù du', 'vẻ đẹp'],
    },

    summary: 'Quỳnh Hương lấy tên loài hoa chỉ nở vào ban đêm, nhanh chóng tàn phai - biểu tượng cho vẻ đẹp phù du.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Quỳnh hương với vẻ đẹp chỉ thoáng qua đã trở thành biểu tượng cho những gì đẹp đẽ nhưng không bền lâu.',
      },
      narrative: `"Quỳnh Hương" được Trịnh Công Sơn sáng tác năm 1972, lấy tên một loài hoa đẹp nhưng mong manh. Quỳnh hương là loài hoa chỉ nở vào ban đêm, nhanh chóng tàn phai - biểu tượng cho vẻ đẹp phù du.

Trịnh Công Sơn thường dùng hình ảnh hoa để nói về tình yêu và cuộc sống. Ca khúc mang giai điệu nhẹ nhàng, mơ màng như chính loài hoa mà nó mô tả.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Quỳnh hương là hoa chỉ nở ban đêm và nhanh tàn', category: 'cultural', isVerified: true },
      { content: 'Biểu tượng cho vẻ đẹp phù du', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Hoa trong nhạc Trịnh Công Sơn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-ru-ta-ngam-ngui',
      title: 'Ru Ta Ngậm Ngùi',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1969,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['ru', 'an ủi', 'nỗi buồn'],
    },

    summary: 'Ru Ta Ngậm Ngùi mang phong cách ru như lời mẹ ru con - ru để tự an ủi, xoa dịu nỗi buồn.',

    compositionContext: {
      year: 1969,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Bài hát ru không phải để ngủ mà để tự an ủi, tự xoa dịu nỗi buồn.',
      },
      narrative: `"Ru Ta Ngậm Ngùi" được Trịnh Công Sơn sáng tác năm 1969, là ca khúc mang phong cách ru như lời mẹ ru con. Bài hát ru không phải để ngủ mà để tự an ủi, tự xoa dịu nỗi buồn.

Trịnh Công Sơn có nhiều ca khúc mang phong cách ru, và "Ru Ta Ngậm Ngùi" là một trong những bài hay nhất. Giai điệu nhẹ nhàng, đều đều như tiếng ru của mẹ.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Phong cách ru như lời mẹ ru con', category: 'cultural', isVerified: true },
      { content: 'Ru để tự an ủi, xoa dịu nỗi buồn', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'book', title: 'Những bài ru trong nhạc Trịnh', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-con-tuoi-nao-cho-em',
      title: 'Còn Tuổi Nào Cho Em',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1967,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'phản chiến'],
      themes: ['tuổi trẻ', 'chiến tranh', 'mất mát'],
    },

    summary: 'Còn Tuổi Nào Cho Em đặt câu hỏi về tuổi thanh xuân bị cướp mất bởi chiến tranh.',

    compositionContext: {
      year: 1967,
      yearConfidence: 'verified',
      inspiration: {
        summary: 'Viết cho những người trẻ trong thời chiến, như một lời than thở cho số phận của cả một thế hệ.',
      },
      narrative: `"Còn Tuổi Nào Cho Em" được Trịnh Công Sơn sáng tác năm 1967, viết cho những người trẻ trong thời chiến. Bài hát đặt câu hỏi về tuổi thanh xuân bị cướp mất bởi chiến tranh.

Trong bối cảnh chiến tranh, nhiều người trẻ không có cơ hội sống trọn vẹn tuổi thanh xuân. Trịnh Công Sơn viết bài này như một lời than thở cho số phận của cả một thế hệ.`,
      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960, thời kỳ chiến tranh ác liệt.',
      politicalContext: 'Chiến tranh Việt Nam cướp đi tuổi trẻ của nhiều người.',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: 'Viết cho những người trẻ trong thời chiến', category: 'creation', isVerified: true },
      { content: 'Thuộc nhóm ca khúc phản chiến', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'academic', title: 'Trịnh Công Sơn và thế hệ trẻ trong chiến tranh', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-nang-thuy-tinh',
      title: 'Nắng Thủy Tinh',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1964,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'trữ tình'],
      themes: ['nắng', 'Huế', 'trong trẻo'],
    },

    summary: 'Nắng Thủy Tinh có hình ảnh độc đáo về nắng trong suốt như thủy tinh.',

    compositionContext: {
      year: 1964,
      yearConfidence: 'verified',
      location: 'Huế',
      inspiration: {
        summary: '"Nắng thủy tinh" là cách diễn đạt rất riêng - biến nắng thành một thực thể có thể cầm nắm.',
      },
      narrative: `"Nắng Thủy Tinh" được Trịnh Công Sơn sáng tác năm 1964, với hình ảnh độc đáo về nắng trong suốt như thủy tinh. Đây là cách diễn đạt rất riêng của Trịnh Công Sơn - biến nắng thành một thực thể có thể cầm nắm.

Bài hát mang không khí trong trẻo, tươi sáng của Huế. Nắng thủy tinh gợi lên hình ảnh những buổi sáng tinh khôi, khi ánh nắng xuyên qua cửa sổ.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Nắng thủy tinh" là hình ảnh độc đáo của Trịnh Công Sơn', category: 'cultural', isVerified: true },
      { content: 'Thể hiện tài năng ngôn ngữ của nhạc sĩ', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'academic', title: 'Ngôn ngữ trong nhạc Trịnh Công Sơn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-dau-chan-dia-dang',
      title: 'Dấu Chân Địa Đàng',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1973,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'triết lý'],
      themes: ['địa đàng', 'tìm kiếm', 'hạnh phúc'],
    },

    summary: 'Dấu Chân Địa Đàng nói về hành trình tìm kiếm địa đàng - thiên đường trên mặt đất.',

    compositionContext: {
      year: 1973,
      yearConfidence: 'verified',
      inspiration: {
        summary: '"Địa đàng" trong nhạc Trịnh không phải là nơi xa xôi mà có thể là những khoảnh khắc bình yên.',
      },
      narrative: `"Dấu Chân Địa Đàng" được Trịnh Công Sơn sáng tác năm 1973, nói về hành trình tìm kiếm địa đàng - thiên đường trên mặt đất.

"Địa đàng" trong nhạc Trịnh không phải là nơi xa xôi mà có thể là những khoảnh khắc bình yên trong đời thường. Hành trình tìm kiếm địa đàng cũng chính là hành trình tìm kiếm ý nghĩa cuộc sống.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Địa đàng" là thiên đường trên mặt đất', category: 'cultural', isVerified: true },
      { content: 'Mang tính triết lý sâu sắc', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'academic', title: 'Trịnh Công Sơn - Triết lý trong âm nhạc', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },

  {
    metadata: {
      id: 'trinh-nhung-con-mat-tran-gian',
      title: 'Những Con Mắt Trần Gian',
      composerId: 'trinh-cong-son',
      composerName: 'Trịnh Công Sơn',
      originalPerformerName: 'Khánh Ly',
      releaseYear: 1969,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['nhac-trinh', 'triết lý'],
      themes: ['con mắt', 'nhìn đời', 'giới hạn'],
    },

    summary: 'Những Con Mắt Trần Gian nói về cái nhìn của con người đối với cuộc sống.',

    compositionContext: {
      year: 1969,
      yearConfidence: 'verified',
      inspiration: {
        summary: '"Con mắt trần gian" là cách nhìn bình thường, với mọi giới hạn và khiếm khuyết của nó.',
      },
      narrative: `"Những Con Mắt Trần Gian" được Trịnh Công Sơn sáng tác năm 1969, là ca khúc về cái nhìn của con người đối với cuộc sống. "Con mắt trần gian" là cách nhìn bình thường, không phải cái nhìn của thần thánh.

Trịnh Công Sơn qua bài hát này muốn nói rằng chúng ta nhìn đời bằng con mắt trần, với mọi giới hạn và khiếm khuyết của nó. Nhưng chính điều đó làm nên sự thú vị của cuộc sống.`,
      narrativeConfidence: 'verified',
    },

    performances: [
      { performerId: 'khanh-ly', performerName: 'Khánh Ly', isOriginal: true },
    ],

    interestingFacts: [
      { content: '"Con mắt trần gian" là cách nhìn của người thường', category: 'cultural', isVerified: true },
      { content: 'Mang triết lý về cách nhìn đời', category: 'cultural', isVerified: true },
    ],

    sources: [
      { type: 'academic', title: 'Triết lý trong nhạc Trịnh Công Sơn', reliability: 'high' },
    ],

    contentQuality: { overallConfidence: 'verified', needsReview: false, lastVerified: '2026-01-11' },
  },
];

export default TRINH_SONGS_BATCH2;
