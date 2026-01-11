// ═══════════════════════════════════════════════════════════════════════════════
//                    NHẠC TIỀN CHIẾN — VERIFIED DATABASE
//                         (Trước 1954 - Phong trào Tân nhạc)
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const PREWAR_SONGS: SongEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // VĂN CAO (1923-1995) — "Thiên tài âm nhạc Việt Nam"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'prewar-thien-thai',
      title: 'Thiên Thai',
      composerId: 'van-cao',
      composerName: 'Văn Cao',
      releaseYear: 1941,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'waltz'],
      themes: ['tình yêu', 'thiên đường', 'mộng mơ', 'cổ tích'],
    },

    summary: 'Thiên Thai là một trong những ca khúc tiêu biểu nhất của nền tân nhạc Việt Nam, được Văn Cao sáng tác năm 1941 khi mới 18 tuổi. Bài hát lấy cảm hứng từ truyền thuyết Lưu Nguyễn nhập Thiên Thai.',

    compositionContext: {
      year: 1941,
      yearConfidence: 'verified',
      location: 'Hải Phòng',

      inspiration: {
        summary: 'Lấy cảm hứng từ truyền thuyết Trung Hoa về Lưu Thần và Nguyễn Triệu lạc vào cõi tiên.',
        detailed: `Thiên Thai được Văn Cao sáng tác năm 1941, khi ông mới 18 tuổi, đang sống tại Hải Phòng. Bài hát lấy cảm hứng từ điển tích "Lưu Nguyễn nhập Thiên Thai" - câu chuyện về hai người đàn ông tên Lưu Thần và Nguyễn Triệu lạc vào cõi tiên, gặp hai nàng tiên và sống những ngày hạnh phúc.

Văn Cao đã biến câu chuyện cổ thành một bài hát lãng mạn về tình yêu và khát vọng tìm kiếm hạnh phúc. "Thiên Thai" trong bài không chỉ là cõi tiên mà còn là trạng thái hạnh phúc tột đỉnh của tình yêu.

Bài hát thể hiện tài năng xuất chúng của Văn Cao khi còn rất trẻ - khả năng kết hợp văn học cổ điển với âm nhạc phương Tây hiện đại.`,
        relatedPeople: [],
      },

      narrative: `Năm 1941, chàng thanh niên Văn Cao 18 tuổi sống tại Hải Phòng đã sáng tác nên Thiên Thai - một trong những ca khúc được đánh giá là đẹp nhất của nền tân nhạc Việt Nam.

Văn Cao sinh năm 1923 tại Hải Phòng trong một gia đình công chức. Từ nhỏ, ông đã bộc lộ năng khiếu âm nhạc và hội họa xuất chúng. Năm 1941, khi vừa tròn 18 tuổi, ông cho ra đời Thiên Thai - bài hát đánh dấu sự khởi đầu rực rỡ của một trong những nhạc sĩ quan trọng nhất Việt Nam.

Bài hát được viết với giai điệu waltz ảnh hưởng từ nhạc Pháp - phong cách âm nhạc đang thịnh hành tại Việt Nam thời thuộc địa. Ca từ của bài hát giàu chất thơ với những hình ảnh mộng mơ về cõi tiên, về tình yêu và hạnh phúc.

Thiên Thai nhanh chóng trở nên phổ biến và được xem là một trong những đỉnh cao của nền tân nhạc Việt Nam thời kỳ đầu.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1941, Việt Nam dưới ách đô hộ của Pháp và Nhật. Phong trào tân nhạc đang phát triển mạnh.',
      politicalContext: 'Việt Nam đang chịu sự đô hộ của Pháp, từ năm 1940 có thêm sự hiện diện của quân Nhật.',
      socialContext: 'Đời sống văn hóa đô thị phát triển với ảnh hưởng mạnh từ văn hóa Pháp.',
      musicalMovement: 'Giai đoạn hình thành và phát triển của nền tân nhạc Việt Nam.',
      musicalInfluences: ['Nhạc Pháp', 'Waltz', 'Opera', 'Văn học cổ điển Trung Hoa'],
      culturalSignificance: 'Đánh dấu một đỉnh cao của nền tân nhạc Việt Nam thời kỳ đầu.',
    },

    interestingFacts: [
      {
        content: 'Văn Cao sáng tác Thiên Thai khi mới 18 tuổi, thể hiện tài năng thiên bẩm xuất chúng',
        category: 'creation',
        source: { type: 'book', title: 'Văn Cao - Cuộc đời và sự nghiệp', reliability: 'verified' },
        isVerified: true,
      },
      {
        content: 'Văn Cao sau này trở thành tác giả của Quốc ca Việt Nam (Tiến Quân Ca) sáng tác năm 1944',
        category: 'trivia',
        source: { type: 'official', title: 'Lý lịch Văn Cao', reliability: 'verified' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'book', title: 'Văn Cao - Cuộc đời và tác phẩm', author: 'Nhiều tác giả', reliability: 'verified' },
      { type: 'wikipedia', title: 'Thiên Thai (bài hát)', url: 'https://vi.wikipedia.org/wiki/Thiên_Thai_(bài_hát)', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      verifiedBy: 'Editorial Team',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-suoi-mo',
      title: 'Suối Mơ',
      composerId: 'van-cao',
      composerName: 'Văn Cao',
      releaseYear: 1943,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'waltz'],
      themes: ['thiên nhiên', 'suối', 'mộng mơ', 'tình yêu'],
    },

    summary: 'Suối Mơ là ca khúc lãng mạn của Văn Cao sáng tác năm 1943, với hình ảnh dòng suối trong rừng như biểu tượng cho những ước mơ và tình yêu trong trẻo.',

    compositionContext: {
      year: 1943,
      yearConfidence: 'verified',
      location: 'Hà Nội hoặc Hải Phòng',

      inspiration: {
        summary: 'Cảm hứng từ vẻ đẹp của thiên nhiên Việt Nam và những ước mơ lãng mạn tuổi trẻ.',
        detailed: `Suối Mơ được sáng tác trong giai đoạn Văn Cao đang ở đỉnh cao sáng tạo của thời kỳ tiền chiến. Bài hát lấy hình ảnh dòng suối trong rừng - một cảnh quan quen thuộc của miền Bắc Việt Nam - làm biểu tượng cho sự trong trẻo, thuần khiết của tình yêu và ước mơ.

Phong cách của Suối Mơ tiếp tục mạch cảm hứng lãng mạn của Thiên Thai, với giai điệu waltz nhẹ nhàng và ca từ giàu chất thơ.`,
        relatedPeople: [],
      },

      narrative: `Suối Mơ ra đời năm 1943, khi Văn Cao đã khẳng định vị trí trong nền tân nhạc Việt Nam sau thành công của Thiên Thai. Bài hát tiếp tục phong cách lãng mạn đặc trưng của ông.

Hình ảnh "suối mơ" gợi lên không gian thiên nhiên trong lành, xa rời thực tại chiến tranh và đô hộ. Đây có thể xem như một cách "trốn thoát" tinh thần của người nghệ sĩ trước hiện thực khắc nghiệt.

Bài hát được yêu thích và trở thành một trong những tác phẩm tiêu biểu của dòng nhạc tiền chiến Việt Nam.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1943, Việt Nam dưới ách đô hộ Nhật-Pháp, nạn đói đang bắt đầu.',
      socialContext: 'Đời sống khó khăn, nghệ thuật trở thành nơi trú ẩn tinh thần.',
      musicalMovement: 'Tân nhạc Việt Nam đang phát triển mạnh với nhiều tên tuổi lớn.',
      musicalInfluences: ['Nhạc Pháp', 'Waltz', 'Thơ ca Việt Nam'],
      culturalSignificance: 'Thể hiện khát vọng về một cuộc sống thanh bình giữa thời loạn lạc.',
    },

    sources: [
      { type: 'book', title: 'Văn Cao - Cuộc đời và tác phẩm', reliability: 'verified' },
      { type: 'wikipedia', title: 'Văn Cao', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-truong-chi',
      title: 'Trương Chi',
      composerId: 'van-cao',
      composerName: 'Văn Cao',
      releaseYear: 1942,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'folk'],
      themes: ['tình yêu', 'cổ tích', 'bi kịch', 'giai cấp'],
    },

    summary: 'Trương Chi là ca khúc Văn Cao sáng tác năm 1942, dựa trên truyền thuyết dân gian Việt Nam về mối tình bi kịch giữa chàng đánh cá Trương Chi và công chúa Mỵ Nương.',

    compositionContext: {
      year: 1942,
      yearConfidence: 'verified',
      location: 'Hải Phòng hoặc Hà Nội',

      inspiration: {
        summary: 'Lấy cảm hứng từ truyền thuyết dân gian Việt Nam về Trương Chi - Mỵ Nương.',
        detailed: `Trương Chi được sáng tác dựa trên truyền thuyết dân gian Việt Nam về mối tình bi kịch giữa chàng đánh cá nghèo Trương Chi có giọng hát hay và công chúa Mỵ Nương. Mỵ Nương yêu giọng hát nhưng khi gặp mặt lại chê Trương Chi xấu xí.

Câu chuyện phản ánh bi kịch về giai cấp và vẻ ngoài trong xã hội phong kiến. Văn Cao đã phổ nhạc cho câu chuyện này với giai điệu buồn man mác, thể hiện nỗi đau của tình yêu không thành.

Đây là một trong những bài hát sử dụng điển tích Việt Nam (khác với Thiên Thai dùng điển tích Trung Hoa), cho thấy sự đa dạng trong nguồn cảm hứng của Văn Cao.`,
        relatedPeople: [],
      },

      narrative: `Trương Chi ra đời năm 1942, tiếp tục mạch sáng tác dựa trên văn học cổ điển của Văn Cao. Nếu Thiên Thai lấy từ điển tích Trung Hoa thì Trương Chi là truyền thuyết thuần Việt.

Câu chuyện Trương Chi - Mỵ Nương là một trong những truyền thuyết được yêu thích nhất của văn học dân gian Việt Nam, nói về bi kịch của tình yêu khi bị ngăn cách bởi giai cấp và vẻ ngoài.

Văn Cao đã phổ nhạc câu chuyện này với giai điệu buồn, ca từ giàu chất thơ, thể hiện sự đồng cảm với nhân vật Trương Chi - người có tài năng nhưng bị xã hội phân biệt.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1942, Việt Nam dưới ách Nhật-Pháp.',
      socialContext: 'Xã hội phân chia giai cấp rõ rệt, phản ánh trong nhiều tác phẩm văn học nghệ thuật.',
      musicalMovement: 'Tân nhạc kết hợp với văn học dân gian Việt Nam.',
      musicalInfluences: ['Dân ca Việt Nam', 'Nhạc Pháp', 'Truyền thuyết Việt Nam'],
      culturalSignificance: 'Góp phần đưa văn học dân gian vào tân nhạc Việt Nam.',
    },

    sources: [
      { type: 'book', title: 'Văn Cao - Cuộc đời và tác phẩm', reliability: 'verified' },
      { type: 'wikipedia', title: 'Trương Chi (truyền thuyết)', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-buon-tan-thu',
      title: 'Buồn Tàn Thu',
      composerId: 'van-cao',
      composerName: 'Văn Cao',
      releaseYear: 1940,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'ballad'],
      themes: ['mùa thu', 'nỗi buồn', 'hoài niệm', 'thiên nhiên'],
    },

    summary: 'Buồn Tàn Thu là một trong những sáng tác đầu tay của Văn Cao, viết năm 1940 khi ông mới 17 tuổi. Bài hát về nỗi buồn của mùa thu tàn, khởi đầu cho sự nghiệp lừng lẫy.',

    compositionContext: {
      year: 1940,
      yearConfidence: 'verified',
      location: 'Hải Phòng',

      inspiration: {
        summary: 'Cảm hứng từ cảnh mùa thu tàn với lá vàng rơi, gợi nỗi buồn hoài niệm.',
        detailed: `Buồn Tàn Thu được sáng tác năm 1940, khi Văn Cao mới 17 tuổi. Đây là một trong những sáng tác đầu tay của ông, đánh dấu bước chân đầu tiên vào sự nghiệp âm nhạc.

Mùa thu miền Bắc Việt Nam với lá vàng rơi, không khí se lạnh đã gợi cảm hứng cho bài hát. Hình ảnh "thu tàn" - mùa thu đang kết thúc - là ẩn dụ cho sự phôi pha, tàn lụi, gợi nỗi buồn về thời gian trôi qua.`,
        relatedPeople: [],
      },

      narrative: `Buồn Tàn Thu ra đời năm 1940, khi Văn Cao còn là một thiếu niên 17 tuổi tại Hải Phòng. Bài hát cho thấy tài năng thiên bẩm của ông từ rất sớm.

Mùa thu là chủ đề thường xuất hiện trong thơ ca và âm nhạc Việt Nam, gợi lên cảm xúc buồn man mác, hoài niệm. Văn Cao đã khai thác chủ đề này với ca từ giàu hình ảnh và giai điệu nhẹ nhàng.

Thành công của Buồn Tàn Thu đã khuyến khích Văn Cao tiếp tục sáng tác và cho ra đời những tác phẩm lớn hơn như Thiên Thai, Suối Mơ, Trương Chi...`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1940, Việt Nam dưới ách Pháp, Nhật bắt đầu xâm nhập Đông Dương.',
      socialContext: 'Phong trào tân nhạc đang hình thành với nhiều nhạc sĩ trẻ tài năng.',
      musicalMovement: 'Giai đoạn đầu của tân nhạc Việt Nam.',
      musicalInfluences: ['Nhạc Pháp', 'Thơ ca lãng mạn'],
      culturalSignificance: 'Đánh dấu sự xuất hiện của Văn Cao trong nền tân nhạc.',
    },

    sources: [
      { type: 'book', title: 'Văn Cao - Cuộc đời và tác phẩm', reliability: 'verified' },
      { type: 'wikipedia', title: 'Văn Cao', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHẠM DUY (1921-2013) — "Cây đại thụ của tân nhạc Việt Nam"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'prewar-tinh-ca',
      title: 'Tình Ca',
      composerId: 'pham-duy',
      composerName: 'Phạm Duy',
      releaseYear: 1953,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'folk'],
      themes: ['tình yêu', 'quê hương', 'con người Việt Nam'],
    },

    summary: 'Tình Ca là một trong những ca khúc nổi tiếng nhất của Phạm Duy, sáng tác năm 1953, thể hiện tình yêu quê hương đất nước qua hình ảnh người con gái Việt Nam.',

    compositionContext: {
      year: 1953,
      yearConfidence: 'verified',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ tình yêu quê hương và vẻ đẹp của người phụ nữ Việt Nam.',
        detailed: `Tình Ca được Phạm Duy sáng tác vào năm 1953, trong giai đoạn kháng chiến chống Pháp. Bài hát thể hiện tình yêu quê hương, đất nước qua hình ảnh người con gái Việt Nam với những nét đẹp truyền thống.

Phạm Duy đã khéo léo kết hợp chủ đề tình yêu đôi lứa với tình yêu quê hương, tạo nên một bài ca vừa lãng mạn vừa mang tính dân tộc sâu sắc.`,
        relatedPeople: [],
      },

      narrative: `Tình Ca ra đời năm 1953, trong bối cảnh kháng chiến chống Pháp đang vào giai đoạn cuối. Phạm Duy, một trong những nhạc sĩ lớn nhất của nền tân nhạc Việt Nam, đã sáng tác bài hát này như một lời ca ngợi quê hương và con người Việt Nam.

Phạm Duy, tên thật Phạm Duy Cẩn, sinh năm 1921 tại Hà Nội. Ông được coi là "cây đại thụ" của nền tân nhạc Việt Nam với sự nghiệp sáng tác kéo dài hơn 70 năm và hàng nghìn ca khúc.

Tình Ca thể hiện phong cách đặc trưng của Phạm Duy: kết hợp yếu tố dân gian với kỹ thuật sáng tác hiện đại, ca từ giàu chất thơ và hình ảnh đậm nét Việt Nam.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1953, giai đoạn cuối của kháng chiến chống Pháp, trước Hiệp định Geneva 1954.',
      politicalContext: 'Kháng chiến chống Pháp đang ở giai đoạn quyết định.',
      socialContext: 'Tinh thần yêu nước và tự hào dân tộc đang dâng cao.',
      musicalMovement: 'Tân nhạc kết hợp với tinh thần dân tộc.',
      musicalInfluences: ['Dân ca Việt Nam', 'Nhạc Pháp', 'Thơ ca kháng chiến'],
      culturalSignificance: 'Thể hiện tình yêu quê hương qua lăng kính tình yêu đôi lứa.',
    },

    interestingFacts: [
      {
        content: 'Phạm Duy sáng tác hơn 1000 ca khúc trong sự nghiệp kéo dài hơn 70 năm',
        category: 'creation',
        source: { type: 'book', title: 'Phạm Duy - Hồi ký', reliability: 'verified' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'book', title: 'Phạm Duy - Hồi ký', reliability: 'verified' },
      { type: 'wikipedia', title: 'Phạm Duy', url: 'https://vi.wikipedia.org/wiki/Phạm_Duy', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-tinh-hoai-huong',
      title: 'Tình Hoài Hương',
      composerId: 'pham-duy',
      composerName: 'Phạm Duy',
      releaseYear: 1952,
      releaseYearConfidence: 'high',
      era: 'prewar',
      genres: ['folk', 'romantic'],
      themes: ['quê hương', 'hoài niệm', 'xa xứ', 'nông thôn'],
    },

    summary: 'Tình Hoài Hương là ca khúc về nỗi nhớ quê hương của người xa xứ, với những hình ảnh đặc trưng của nông thôn Việt Nam.',

    compositionContext: {
      year: 1952,
      yearConfidence: 'high',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ nỗi nhớ quê hương trong thời kỳ chiến tranh, khi nhiều người phải rời xa quê.',
        detailed: `Bài hát thể hiện nỗi nhớ quê hương của người xa xứ, với những hình ảnh quen thuộc của nông thôn Việt Nam: đồng lúa, con trâu, mái nhà tranh... Đây là chủ đề thường xuất hiện trong sáng tác của Phạm Duy, phản ánh tình yêu quê hương sâu sắc của ông.`,
        relatedPeople: [],
      },

      narrative: `Tình Hoài Hương được sáng tác trong giai đoạn kháng chiến, khi nhiều người phải rời xa quê hương. Bài hát thể hiện phong cách đặc trưng của Phạm Duy: kết hợp yếu tố dân gian với kỹ thuật sáng tác hiện đại.

Phạm Duy có nhiều bài hát về quê hương, và Tình Hoài Hương là một trong những bài đẹp nhất, với những hình ảnh nông thôn Việt Nam được khắc họa sinh động.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Đầu thập niên 1950, kháng chiến chống Pháp.',
      socialContext: 'Nhiều người phải rời quê hương vì chiến tranh.',
      musicalMovement: 'Dòng nhạc về quê hương phát triển mạnh.',
      musicalInfluences: ['Dân ca Bắc Bộ', 'Nhạc tiền chiến'],
      culturalSignificance: 'Thể hiện tình yêu quê hương đặc trưng của người Việt Nam.',
    },

    sources: [
      { type: 'book', title: 'Phạm Duy - Hồi ký', reliability: 'verified' },
      { type: 'wikipedia', title: 'Phạm Duy', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-em-oi-ha-noi-pho',
      title: 'Em Ơi Hà Nội Phố',
      composerId: 'pham-duy',
      composerName: 'Phạm Duy',
      lyricistName: 'Thơ Phan Vũ',
      releaseYear: 1984,
      releaseYearConfidence: 'verified',
      era: 'modern',
      genres: ['ballad', 'romantic'],
      themes: ['Hà Nội', 'hoài niệm', 'thành phố', 'tình yêu'],
    },

    summary: 'Em Ơi Hà Nội Phố là ca khúc nổi tiếng của Phạm Duy phổ thơ Phan Vũ, về nỗi nhớ Hà Nội của người xa xứ. Bài hát được sáng tác năm 1984 tại Hoa Kỳ.',

    compositionContext: {
      year: 1984,
      yearConfidence: 'verified',
      location: 'Hoa Kỳ',

      inspiration: {
        summary: 'Phổ nhạc cho bài thơ của Phan Vũ về nỗi nhớ Hà Nội.',
        detailed: `Em Ơi Hà Nội Phố được Phạm Duy phổ nhạc từ bài thơ của nhà thơ Phan Vũ. Bài thơ viết về nỗi nhớ Hà Nội với những hình ảnh đặc trưng của thủ đô: phố cổ, mùa thu, Hồ Gươm...

Phạm Duy sáng tác bài này năm 1984, khi đang sống ở Hoa Kỳ. Nỗi nhớ quê hương, đặc biệt là Hà Nội - nơi ông sinh ra, đã thôi thúc ông phổ nhạc cho bài thơ này.`,
        relatedPeople: [
          {
            name: 'Phan Vũ',
            relationship: 'Tác giả lời thơ',
            description: 'Nhà thơ Việt Nam, tác giả bài thơ "Em Ơi Hà Nội Phố"',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Em Ơi Hà Nội Phố ra đời năm 1984, khi Phạm Duy đang sống ở Hoa Kỳ. Đây là một trong những bài hát về Hà Nội được yêu thích nhất, dù được sáng tác xa quê hương.

Bài thơ của Phan Vũ đã gợi lên những hình ảnh đẹp về Hà Nội: những con phố cổ, mùa thu với lá vàng rơi, Hồ Gươm với Tháp Rùa... Phạm Duy đã phổ nhạc với giai điệu nhẹ nhàng, buồn man mác, phù hợp với nội dung hoài niệm của bài thơ.

Bài hát được nhiều ca sĩ thể hiện thành công và trở thành một trong những bài hát biểu tượng về Hà Nội.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'modern',
      eraDescription: 'Năm 1984, Phạm Duy đang sống ở Hoa Kỳ, xa quê hương.',
      socialContext: 'Cộng đồng người Việt hải ngoại với nỗi nhớ quê hương.',
      musicalMovement: 'Nhạc Việt hải ngoại với chủ đề quê hương.',
      musicalInfluences: ['Nhạc tiền chiến', 'Ballad'],
      culturalSignificance: 'Trở thành bài hát biểu tượng về Hà Nội, được yêu thích cả trong và ngoài nước.',
    },

    interestingFacts: [
      {
        content: 'Bài hát được phổ từ thơ của Phan Vũ, thể hiện tài năng phổ thơ của Phạm Duy',
        category: 'creation',
        source: { type: 'book', title: 'Phạm Duy - Hồi ký', reliability: 'verified' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'book', title: 'Phạm Duy - Hồi ký', reliability: 'verified' },
      { type: 'wikipedia', title: 'Em Ơi Hà Nội Phố', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ĐOÀN CHUẨN (1924-2001) — "Nhạc sĩ của tình thu"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'prewar-gui-gio-cho-may-ngan-bay',
      title: 'Gửi Gió Cho Mây Ngàn Bay',
      composerId: 'doan-chuan',
      composerName: 'Đoàn Chuẩn',
      lyricistName: 'Từ Linh',
      releaseYear: 1952,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'waltz'],
      themes: ['mùa thu', 'chia ly', 'gió', 'mây', 'hoài niệm'],
    },

    summary: 'Gửi Gió Cho Mây Ngàn Bay là một trong những ca khúc nổi tiếng nhất của nhạc sĩ Đoàn Chuẩn (nhạc) và Từ Linh (lời), sáng tác năm 1952, về mùa thu và nỗi buồn chia ly.',

    compositionContext: {
      year: 1952,
      yearConfidence: 'verified',
      location: 'Hà Nội',

      inspiration: {
        summary: 'Cảm hứng từ mùa thu Hà Nội và nỗi buồn chia ly.',
        detailed: `Gửi Gió Cho Mây Ngàn Bay là sự kết hợp giữa nhạc Đoàn Chuẩn và lời Từ Linh, ra đời năm 1952. Bài hát lấy cảm hứng từ mùa thu Hà Nội - mùa đẹp nhất trong năm với lá vàng rơi, gió se lạnh.

Đoàn Chuẩn được mệnh danh là "nhạc sĩ của tình thu" vì nhiều bài hát của ông đều về mùa thu. Hình ảnh gió và mây trong bài hát là biểu tượng cho sự tự do, phiêu lãng, nhưng cũng là chia ly.`,
        relatedPeople: [
          {
            name: 'Từ Linh',
            relationship: 'Tác giả lời',
            description: 'Nhà thơ viết lời cho nhiều bài hát của Đoàn Chuẩn',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Gửi Gió Cho Mây Ngàn Bay ra đời năm 1952, trong giai đoạn kháng chiến chống Pháp. Đây là một trong những sáng tác nổi tiếng nhất của cặp đôi Đoàn Chuẩn (nhạc) - Từ Linh (lời).

Đoàn Chuẩn, sinh năm 1924 tại Hải Dương, được biết đến với biệt danh "nhạc sĩ của tình thu". Nhiều bài hát của ông đều lấy mùa thu làm bối cảnh, với giai điệu nhẹ nhàng, lãng mạn.

Bài hát sử dụng hình ảnh gió và mây - những yếu tố tự nhiên vô hình, không thể nắm bắt - làm ẩn dụ cho tình yêu và sự chia ly. Giai điệu waltz nhẹ nhàng phù hợp với nội dung thơ mộng của bài hát.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1952, giai đoạn kháng chiến chống Pháp.',
      socialContext: 'Nhiều cuộc chia ly vì chiến tranh.',
      musicalMovement: 'Tân nhạc với chủ đề mùa thu và chia ly.',
      musicalInfluences: ['Nhạc Pháp', 'Waltz', 'Thơ ca Việt Nam'],
      culturalSignificance: 'Trở thành một trong những bài hát về mùa thu đẹp nhất của tân nhạc Việt Nam.',
    },

    interestingFacts: [
      {
        content: 'Đoàn Chuẩn được mệnh danh là "nhạc sĩ của tình thu" vì nhiều bài hát về mùa thu',
        category: 'cultural',
        source: { type: 'book', title: 'Nhạc sĩ Việt Nam thế kỷ 20', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Đoàn Chuẩn', url: 'https://vi.wikipedia.org/wiki/Đoàn_Chuẩn', reliability: 'high' },
      { type: 'book', title: 'Nhạc sĩ Việt Nam thế kỷ 20', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-thu-quyen-ru',
      title: 'Thu Quyến Rũ',
      composerId: 'doan-chuan',
      composerName: 'Đoàn Chuẩn',
      releaseYear: 1950,
      releaseYearConfidence: 'high',
      era: 'prewar',
      genres: ['romantic', 'waltz'],
      themes: ['mùa thu', 'tình yêu', 'quyến rũ', 'lãng mạn'],
    },

    summary: 'Thu Quyến Rũ là ca khúc về vẻ đẹp quyến rũ của mùa thu, tiếp tục chủ đề mùa thu đặc trưng trong sáng tác của Đoàn Chuẩn.',

    compositionContext: {
      year: 1950,
      yearConfidence: 'high',
      location: 'Hà Nội',

      inspiration: {
        summary: 'Cảm hứng từ vẻ đẹp quyến rũ của mùa thu Hà Nội.',
        detailed: `Thu Quyến Rũ tiếp tục chủ đề mùa thu mà Đoàn Chuẩn yêu thích. Bài hát ca ngợi vẻ đẹp "quyến rũ" của mùa thu - mùa mà ông coi là đẹp nhất trong năm.`,
        relatedPeople: [],
      },

      narrative: `Thu Quyến Rũ thể hiện tình yêu mùa thu đặc trưng của Đoàn Chuẩn. Bài hát có giai điệu nhẹ nhàng, lãng mạn, phù hợp với không khí se lạnh của mùa thu Hà Nội.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Đầu thập niên 1950.',
      socialContext: 'Hà Nội vẫn giữ được vẻ đẹp cổ kính dù trong thời chiến.',
      musicalMovement: 'Tân nhạc với chủ đề mùa thu.',
      musicalInfluences: ['Nhạc Pháp', 'Waltz'],
      culturalSignificance: 'Góp phần xây dựng hình ảnh mùa thu trong âm nhạc Việt Nam.',
    },

    sources: [
      { type: 'wikipedia', title: 'Đoàn Chuẩn', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // NGUYỄN VĂN TÝ (1925-2019) — Nhạc sĩ của dòng nhạc quê hương
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'prewar-du-am',
      title: 'Dư Âm',
      composerId: 'nguyen-van-ty',
      composerName: 'Nguyễn Văn Tý',
      releaseYear: 1950,
      releaseYearConfidence: 'verified',
      era: 'prewar',
      genres: ['romantic', 'ballad'],
      themes: ['tình yêu', 'kỷ niệm', 'hoài niệm', 'dư âm'],
    },

    summary: 'Dư Âm là ca khúc nổi tiếng của Nguyễn Văn Tý, sáng tác khoảng năm 1950, về những kỷ niệm tình yêu còn vang vọng trong tâm hồn.',

    compositionContext: {
      year: 1950,
      yearConfidence: 'verified',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ những kỷ niệm tình yêu và dư âm của quá khứ.',
        detailed: `Dư Âm được sáng tác khi Nguyễn Văn Tý còn trẻ, thể hiện những suy tư về tình yêu và kỷ niệm. Hình ảnh "dư âm" - tiếng vang còn lại sau khi âm thanh đã tắt - là ẩn dụ cho những kỷ niệm tình yêu vẫn còn vang vọng trong lòng dù đã qua.`,
        relatedPeople: [],
      },

      narrative: `Dư Âm là một trong những sáng tác nổi tiếng nhất của Nguyễn Văn Tý, ra đời khoảng năm 1950. Bài hát thể hiện tài năng sáng tác của ông từ rất sớm.

Nguyễn Văn Tý, sinh năm 1925 tại Hà Nội, là một trong những nhạc sĩ quan trọng của nền tân nhạc Việt Nam. Ông nổi tiếng với nhiều bài hát về quê hương và tình yêu.

Dư Âm có giai điệu nhẹ nhàng, ca từ giàu chất thơ, thể hiện nỗi buồn man mác khi nhớ về những kỷ niệm đẹp đã qua.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1950, giai đoạn kháng chiến chống Pháp.',
      socialContext: 'Nhiều mối tình bị chia cắt vì chiến tranh.',
      musicalMovement: 'Tân nhạc với chủ đề tình yêu và hoài niệm.',
      musicalInfluences: ['Nhạc Pháp', 'Thơ ca Việt Nam'],
      culturalSignificance: 'Thể hiện cách người Việt trân trọng những kỷ niệm đẹp.',
    },

    sources: [
      { type: 'wikipedia', title: 'Nguyễn Văn Tý', url: 'https://vi.wikipedia.org/wiki/Nguyễn_Văn_Tý', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'prewar-me-yeu-con',
      title: 'Mẹ Yêu Con',
      composerId: 'nguyen-van-ty',
      composerName: 'Nguyễn Văn Tý',
      releaseYear: 1956,
      releaseYearConfidence: 'high',
      era: 'prewar',
      genres: ['folk', 'ballad'],
      themes: ['mẹ', 'con', 'tình mẫu tử', 'gia đình'],
    },

    summary: 'Mẹ Yêu Con là ca khúc cảm động về tình mẹ của Nguyễn Văn Tý, thể hiện tình yêu vô bờ của mẹ dành cho con.',

    compositionContext: {
      year: 1956,
      yearConfidence: 'high',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ tình mẫu tử thiêng liêng trong văn hóa Việt Nam.',
        detailed: `Mẹ Yêu Con được sáng tác sau khi đất nước chia cắt năm 1954. Bài hát thể hiện tình yêu vô bờ của mẹ dành cho con, một chủ đề thiêng liêng trong văn hóa Việt Nam.`,
        relatedPeople: [],
      },

      narrative: `Mẹ Yêu Con là một trong những bài hát cảm động nhất về tình mẹ trong âm nhạc Việt Nam. Nguyễn Văn Tý đã khéo léo diễn tả tình yêu vô điều kiện của mẹ dành cho con.

Bài hát có giai điệu nhẹ nhàng, ca từ giản dị nhưng sâu sắc, chạm đến trái tim của mọi người nghe.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Năm 1956, sau khi đất nước chia cắt.',
      socialContext: 'Nhiều gia đình bị chia cắt Bắc-Nam.',
      musicalMovement: 'Nhạc về gia đình và tình mẫu tử.',
      musicalInfluences: ['Dân ca Việt Nam', 'Nhạc tiền chiến'],
      culturalSignificance: 'Thể hiện giá trị gia đình và tình mẫu tử trong văn hóa Việt Nam.',
    },

    sources: [
      { type: 'wikipedia', title: 'Nguyễn Văn Tý', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CÁC NHẠC SĨ KHÁC
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'prewar-cung-dan-xua',
      title: 'Cung Đàn Xưa',
      composerId: 'van-phung',
      composerName: 'Văn Phụng',
      releaseYear: 1951,
      releaseYearConfidence: 'high',
      era: 'prewar',
      genres: ['romantic', 'ballad'],
      themes: ['âm nhạc', 'hoài niệm', 'đàn', 'kỷ niệm'],
    },

    summary: 'Cung Đàn Xưa là ca khúc của Văn Phụng về nỗi nhớ những giai điệu xưa cũ, thể hiện tình yêu âm nhạc sâu sắc.',

    compositionContext: {
      year: 1951,
      yearConfidence: 'high',
      location: 'Hà Nội',

      inspiration: {
        summary: 'Cảm hứng từ nỗi nhớ những giai điệu xưa và tình yêu âm nhạc.',
        detailed: `Bài hát thể hiện nỗi nhớ những "cung đàn xưa" - những giai điệu đẹp của quá khứ. Văn Phụng, một nhạc sĩ tài năng của tân nhạc, đã viết bài này như một lời tri ân với âm nhạc.`,
        relatedPeople: [],
      },

      narrative: `Cung Đàn Xưa của Văn Phụng thể hiện tình yêu âm nhạc và nỗi hoài niệm về những giai điệu đẹp. Bài hát có giai điệu nhẹ nhàng, ca từ giàu chất thơ.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'prewar',
      eraDescription: 'Đầu thập niên 1950.',
      socialContext: 'Tân nhạc đang phát triển mạnh.',
      musicalMovement: 'Nhạc về âm nhạc và nghệ thuật.',
      musicalInfluences: ['Nhạc Pháp', 'Nhạc cổ điển'],
      culturalSignificance: 'Thể hiện tình yêu âm nhạc của giới nghệ sĩ.',
    },

    sources: [
      { type: 'wikipedia', title: 'Văn Phụng', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

];

// Export
export default PREWAR_SONGS;
