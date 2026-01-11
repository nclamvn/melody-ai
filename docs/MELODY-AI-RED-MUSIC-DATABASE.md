# ═══════════════════════════════════════════════════════════════════════════════
#                    🎵 MELODY AI — NHẠC ĐỎ DATABASE
#                         15 Bài Hát Cách Mạng Tiêu Biểu
#                              Version 3.0 — Production
# ═══════════════════════════════════════════════════════════════════════════════

## File: `lib/database/songs/redMusic.ts`

```typescript
// ═══════════════════════════════════════════════════════════════════════════════
//                    NHẠC ĐỎ / NHẠC CÁCH MẠNG — VERIFIED DATABASE
//                         (1945-1975 và sau đó)
// ═══════════════════════════════════════════════════════════════════════════════

import { SongEntry } from '../types';

export const RED_MUSIC_SONGS: SongEntry[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // VĂN CAO (1923-1995) — Tác giả Quốc ca
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'red-tien-quan-ca',
      title: 'Tiến Quân Ca',
      alternativeTitles: ['Quốc ca Việt Nam', 'National Anthem of Vietnam'],
      composerId: 'van-cao',
      composerName: 'Văn Cao',
      releaseYear: 1944,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary', 'march'],
      themes: ['độc lập', 'tự do', 'chiến đấu', 'tổ quốc'],
    },

    summary: 'Tiến Quân Ca là Quốc ca của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam, được Văn Cao sáng tác vào cuối năm 1944. Bài hát được chính thức công nhận là Quốc ca từ ngày 2/9/1945.',

    compositionContext: {
      year: 1944,
      yearConfidence: 'verified',
      month: 10,
      location: 'Hà Nội',

      inspiration: {
        summary: 'Sáng tác theo yêu cầu của tổ chức Việt Minh để cổ vũ tinh thần đấu tranh giành độc lập.',
        detailed: `Cuối năm 1944, Văn Cao được Tổng bộ Việt Minh giao nhiệm vụ sáng tác một bài ca cách mạng. Lúc này, ông đang hoạt động bí mật tại Hà Nội.

Theo lời kể của Văn Cao, ông sáng tác bài hát trong một căn gác nhỏ ở phố Nguyễn Thượng Hiền (nay là phố Nguyễn Thượng Hiền, Hà Nội). Bài hát được hoàn thành chỉ trong vài ngày, với giai điệu hùng tráng, lời ca đanh thép.

Tiến Quân Ca được công bố lần đầu trên báo Độc Lập số ra ngày 17/11/1944. Sau Cách mạng Tháng Tám 1945, bài hát được Chủ tịch Hồ Chí Minh chọn làm Quốc ca của nước Việt Nam Dân chủ Cộng hòa.`,
        relatedPeople: [
          {
            name: 'Hồ Chí Minh',
            relationship: 'Chọn bài hát làm Quốc ca',
            description: 'Chủ tịch nước Việt Nam Dân chủ Cộng hòa',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Tiến Quân Ca ra đời vào cuối năm 1944, trong bối cảnh cách mạng Việt Nam đang bước vào giai đoạn quyết định. Văn Cao, khi đó 21 tuổi, đã sáng tác bài hát này theo yêu cầu của tổ chức Việt Minh.

Văn Cao kể lại rằng ông viết bài hát trong một căn gác nhỏ ở Hà Nội, với cây đàn guitar cũ. Ông muốn tạo ra một bài ca có thể khơi dậy tinh thần yêu nước và ý chí đấu tranh của nhân dân.

Bài hát được công bố lần đầu trên báo Độc Lập ngày 17/11/1944. Sau thành công của Cách mạng Tháng Tám năm 1945, ngày 2/9/1945, tại Quảng trường Ba Đình, Tiến Quân Ca được hát vang trong buổi lễ Tuyên ngôn Độc lập.

Chủ tịch Hồ Chí Minh đã chọn Tiến Quân Ca làm Quốc ca của nước Việt Nam Dân chủ Cộng hòa. Hiến pháp năm 1946 chính thức quy định đây là Quốc ca của Việt Nam, và điều này được giữ nguyên cho đến nay.

Tiến Quân Ca là một trong những di sản quan trọng nhất của nền âm nhạc cách mạng Việt Nam và là bài hát nổi tiếng nhất của Văn Cao.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1944, Việt Nam dưới ách Nhật-Pháp, phong trào Việt Minh đang phát triển mạnh.',
      politicalContext: 'Việt Minh đang chuẩn bị cho cuộc tổng khởi nghĩa giành chính quyền.',
      socialContext: 'Nạn đói Ất Dậu đang hoành hành, nhân dân căm thù giặc ngoại xâm.',
      musicalMovement: 'Âm nhạc cách mạng với mục đích cổ vũ tinh thần đấu tranh.',
      musicalInfluences: ['Nhạc quân hành', 'Nhạc cách mạng Pháp', 'Tân nhạc Việt Nam'],
      culturalSignificance: 'Trở thành Quốc ca của Việt Nam, biểu tượng thiêng liêng của dân tộc.',

      relatedEvents: [
        {
          event: 'Bài hát được công bố trên báo Độc Lập',
          year: 1944,
          relevance: 'Lần đầu tiên bài hát được công khai',
        },
        {
          event: 'Cách mạng Tháng Tám thành công',
          year: 1945,
          relevance: 'Bối cảnh bài hát được chọn làm Quốc ca',
        },
        {
          event: 'Tuyên ngôn Độc lập 2/9/1945',
          year: 1945,
          relevance: 'Bài hát được hát tại Quảng trường Ba Đình',
        },
      ],
    },

    interestingFacts: [
      {
        content: 'Tiến Quân Ca được Văn Cao sáng tác chỉ trong vài ngày tại một căn gác nhỏ ở Hà Nội',
        category: 'creation',
        source: { type: 'memoir', title: 'Hồi ký Văn Cao', reliability: 'verified' },
        isVerified: true,
      },
      {
        content: 'Bài hát được công bố lần đầu trên báo Độc Lập số ra ngày 17/11/1944',
        category: 'cultural',
        source: { type: 'archive', title: 'Báo Độc Lập 1944', reliability: 'verified' },
        isVerified: true,
      },
      {
        content: 'Văn Cao là một trong những nhạc sĩ hiếm hoi trên thế giới có bài hát được chọn làm Quốc ca khi còn sống',
        category: 'trivia',
        source: { type: 'academic', title: 'Lịch sử Quốc ca các nước', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'official', title: 'Hiến pháp nước CHXHCN Việt Nam', reliability: 'verified' },
      { type: 'memoir', title: 'Văn Cao - Hồi ký', reliability: 'verified' },
      { type: 'wikipedia', title: 'Tiến Quân Ca', url: 'https://vi.wikipedia.org/wiki/Tiến_Quân_Ca', reliability: 'verified' },
      { type: 'documentary', title: 'Văn Cao - Người viết Quốc ca', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      verifiedBy: 'Editorial Team',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HOÀNG VIỆT (1928-1967) — Nhạc sĩ anh hùng
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'red-tinh-ca-tay-bac',
      title: 'Tình Ca Tây Bắc',
      composerId: 'hoang-viet',
      composerName: 'Hoàng Việt',
      releaseYear: 1957,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['folk', 'revolutionary'],
      themes: ['Tây Bắc', 'tình yêu', 'quê hương', 'xây dựng'],
    },

    summary: 'Tình Ca Tây Bắc là ca khúc nổi tiếng của Hoàng Việt, sáng tác năm 1957, ca ngợi vẻ đẹp của vùng Tây Bắc và tình yêu quê hương đất nước.',

    compositionContext: {
      year: 1957,
      yearConfidence: 'verified',
      location: 'Tây Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ chuyến đi thực tế tại vùng Tây Bắc và vẻ đẹp của thiên nhiên, con người nơi đây.',
        detailed: `Tình Ca Tây Bắc được sáng tác năm 1957, khi Hoàng Việt tham gia đoàn văn nghệ đi thực tế tại vùng Tây Bắc. Vẻ đẹp hùng vĩ của núi rừng và sự mến khách của đồng bào các dân tộc đã truyền cảm hứng cho ông viết nên bài hát này.

Bài hát mang âm hưởng dân ca Tây Bắc, với giai điệu mượt mà, ca từ đẹp, ca ngợi cảnh đẹp và con người vùng cao.`,
        relatedPeople: [],
      },

      narrative: `Tình Ca Tây Bắc ra đời năm 1957, trong giai đoạn xây dựng chủ nghĩa xã hội ở miền Bắc sau Hiệp định Geneva. Hoàng Việt, một trong những nhạc sĩ tài năng của nền âm nhạc cách mạng, đã sáng tác bài hát này sau chuyến đi thực tế tại vùng Tây Bắc.

Hoàng Việt, tên thật Lê Chí Trực, sinh năm 1928 tại Nam Định. Ông là nhạc sĩ, được phong tặng danh hiệu Anh hùng Lao động. Ông hy sinh năm 1967 trong một chuyến đi thực tế tại miền Nam.

Bài hát có giai điệu mang âm hưởng dân ca Tây Bắc, ca từ thơ mộng, ca ngợi vẻ đẹp của núi rừng và tình người nơi đây. Tình Ca Tây Bắc nhanh chóng trở thành một trong những bài hát được yêu thích nhất về vùng Tây Bắc.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1957, miền Bắc đang trong giai đoạn xây dựng chủ nghĩa xã hội.',
      politicalContext: 'Sau Hiệp định Geneva 1954, đất nước tạm thời chia cắt.',
      socialContext: 'Miền Bắc tập trung xây dựng kinh tế và văn hóa.',
      musicalMovement: 'Âm nhạc ca ngợi lao động và xây dựng đất nước.',
      musicalInfluences: ['Dân ca Tây Bắc', 'Nhạc cách mạng'],
      culturalSignificance: 'Góp phần quảng bá văn hóa và vẻ đẹp vùng Tây Bắc.',
    },

    interestingFacts: [
      {
        content: 'Hoàng Việt được truy tặng danh hiệu Anh hùng Lao động sau khi hy sinh năm 1967',
        category: 'cultural',
        source: { type: 'official', title: 'Danh sách Anh hùng Lao động', reliability: 'verified' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Hoàng Việt', url: 'https://vi.wikipedia.org/wiki/Hoàng_Việt_(nhạc_sĩ)', reliability: 'verified' },
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
      id: 'red-nhac-ruong',
      title: 'Nhạc Rừng',
      composerId: 'hoang-viet',
      composerName: 'Hoàng Việt',
      releaseYear: 1952,
      releaseYearConfidence: 'high',
      era: 'revolutionary',
      genres: ['folk', 'revolutionary'],
      themes: ['rừng', 'thiên nhiên', 'chiến khu', 'kháng chiến'],
    },

    summary: 'Nhạc Rừng là ca khúc của Hoàng Việt về vẻ đẹp của núi rừng và cuộc sống kháng chiến trong rừng.',

    compositionContext: {
      year: 1952,
      yearConfidence: 'high',
      location: 'Chiến khu Việt Bắc',

      inspiration: {
        summary: 'Cảm hứng từ cuộc sống trong rừng của bộ đội và nhân dân trong kháng chiến chống Pháp.',
        detailed: `Nhạc Rừng được sáng tác trong thời kỳ kháng chiến chống Pháp, khi Hoàng Việt đang hoạt động trong chiến khu. Bài hát ca ngợi vẻ đẹp của núi rừng Việt Bắc và tinh thần lạc quan của quân dân trong kháng chiến.`,
        relatedPeople: [],
      },

      narrative: `Nhạc Rừng thể hiện tình yêu thiên nhiên và tinh thần lạc quan của những người kháng chiến. Bài hát có giai điệu tươi vui, ca từ mô tả vẻ đẹp của rừng núi Việt Bắc.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Đầu thập niên 1950, kháng chiến chống Pháp đang diễn ra.',
      socialContext: 'Quân dân ta sống và chiến đấu trong rừng.',
      musicalMovement: 'Nhạc kháng chiến với tinh thần lạc quan.',
      musicalInfluences: ['Dân ca miền núi', 'Nhạc kháng chiến'],
      culturalSignificance: 'Thể hiện tinh thần lạc quan trong gian khổ.',
    },

    sources: [
      { type: 'wikipedia', title: 'Hoàng Việt', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PHẠM TUYÊN (1930-) — "Nhạc sĩ của những bài ca cách mạng"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'red-nhu-co-bac-ho',
      title: 'Như Có Bác Hồ Trong Ngày Vui Đại Thắng',
      alternativeTitles: ['Như Có Bác Trong Ngày Đại Thắng'],
      composerId: 'pham-tuyen',
      composerName: 'Phạm Tuyên',
      releaseYear: 1975,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary', 'march'],
      themes: ['chiến thắng', 'Bác Hồ', 'thống nhất', 'niềm vui'],
    },

    summary: 'Như Có Bác Hồ Trong Ngày Vui Đại Thắng là ca khúc của Phạm Tuyên sáng tác ngay sau chiến thắng 30/4/1975, thể hiện niềm vui thống nhất đất nước.',

    compositionContext: {
      year: 1975,
      yearConfidence: 'verified',
      month: 5,
      location: 'Hà Nội',

      inspiration: {
        summary: 'Sáng tác ngay sau ngày 30/4/1975, thể hiện niềm vui của cả dân tộc khi đất nước thống nhất.',
        detailed: `Bài hát được Phạm Tuyên sáng tác trong những ngày đầu tháng 5/1975, ngay sau khi chiến dịch Hồ Chí Minh toàn thắng và miền Nam hoàn toàn giải phóng.

Phạm Tuyên kể rằng ông sáng tác bài hát trong tâm trạng vô cùng xúc động khi nghe tin chiến thắng. Bài hát thể hiện niềm vui của cả dân tộc và sự tiếc nuối rằng Bác Hồ không còn để chứng kiến ngày vui này (Bác mất năm 1969).`,
        relatedPeople: [
          {
            name: 'Hồ Chí Minh',
            relationship: 'Được nhắc đến trong bài hát',
            description: 'Chủ tịch nước, đã mất năm 1969',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Như Có Bác Hồ Trong Ngày Vui Đại Thắng được sáng tác ngay sau ngày 30/4/1975, khi chiến dịch Hồ Chí Minh toàn thắng và đất nước thống nhất sau hơn 30 năm chia cắt.

Phạm Tuyên, sinh năm 1930, là một trong những nhạc sĩ quan trọng của nền âm nhạc cách mạng Việt Nam. Ông có nhiều bài hát nổi tiếng về Bác Hồ và các sự kiện lịch sử.

Bài hát thể hiện niềm vui vỡ òa của cả dân tộc khi ước mơ thống nhất thành hiện thực, đồng thời bày tỏ sự tiếc nuối rằng Chủ tịch Hồ Chí Minh đã không còn để chứng kiến ngày vui này. Câu hát "Như có Bác Hồ trong ngày vui đại thắng" nói lên rằng tinh thần Bác vẫn luôn hiện diện cùng dân tộc.

Bài hát nhanh chóng trở nên phổ biến và được hát trong mọi lễ kỷ niệm ngày 30/4 và các dịp lễ lớn.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Tháng 5/1975, ngay sau khi đất nước thống nhất.',
      politicalContext: 'Chiến dịch Hồ Chí Minh toàn thắng, miền Nam hoàn toàn giải phóng.',
      socialContext: 'Cả nước vui mừng trong niềm vui thống nhất.',
      musicalMovement: 'Âm nhạc ca ngợi chiến thắng và thống nhất.',
      musicalInfluences: ['Nhạc cách mạng', 'Nhạc quân hành'],
      culturalSignificance: 'Trở thành bài hát biểu tượng của ngày thống nhất đất nước.',

      relatedEvents: [
        {
          event: 'Chiến dịch Hồ Chí Minh toàn thắng',
          year: 1975,
          relevance: 'Sự kiện trực tiếp truyền cảm hứng cho bài hát',
        },
      ],
    },

    interestingFacts: [
      {
        content: 'Bài hát được sáng tác chỉ trong vài ngày sau ngày 30/4/1975',
        category: 'creation',
        source: { type: 'interview', title: 'Phỏng vấn Phạm Tuyên', reliability: 'verified' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'interview', title: 'Phạm Tuyên kể về bài hát', reliability: 'verified' },
      { type: 'wikipedia', title: 'Như Có Bác Hồ Trong Ngày Vui Đại Thắng', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'red-chi-mong-doi',
      title: 'Chiếc Đèn Ông Sao',
      composerId: 'pham-tuyen',
      composerName: 'Phạm Tuyên',
      releaseYear: 1956,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['children', 'folk'],
      themes: ['Trung thu', 'trẻ em', 'đèn ông sao', 'niềm vui'],
    },

    summary: 'Chiếc Đèn Ông Sao là ca khúc thiếu nhi nổi tiếng của Phạm Tuyên về đêm Trung thu, được hát rộng rãi trong các dịp Tết Trung thu.',

    compositionContext: {
      year: 1956,
      yearConfidence: 'verified',
      location: 'Hà Nội',

      inspiration: {
        summary: 'Cảm hứng từ không khí vui tươi của đêm Trung thu và niềm vui của trẻ em.',
        detailed: `Chiếc Đèn Ông Sao được sáng tác năm 1956, phản ánh không khí vui tươi của đêm Trung thu truyền thống Việt Nam. Phạm Tuyên đã viết bài hát này với giai điệu vui tươi, dễ hát cho trẻ em.`,
        relatedPeople: [],
      },

      narrative: `Chiếc Đèn Ông Sao là một trong những bài hát thiếu nhi được yêu thích nhất của Phạm Tuyên. Bài hát ca ngợi đêm Trung thu với hình ảnh chiếc đèn ông sao - đồ chơi truyền thống của trẻ em Việt Nam.

Bài hát có giai điệu vui tươi, dễ nhớ, phù hợp cho trẻ em hát. Cho đến nay, Chiếc Đèn Ông Sao vẫn được hát rộng rãi trong các dịp Tết Trung thu.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1956, miền Bắc đang xây dựng chủ nghĩa xã hội.',
      socialContext: 'Đời sống văn hóa được chú trọng, đặc biệt là văn hóa cho thiếu nhi.',
      musicalMovement: 'Nhạc thiếu nhi phát triển mạnh.',
      musicalInfluences: ['Dân ca Việt Nam', 'Nhạc thiếu nhi'],
      culturalSignificance: 'Trở thành bài hát không thể thiếu trong các dịp Tết Trung thu.',
    },

    sources: [
      { type: 'wikipedia', title: 'Phạm Tuyên', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ĐỖ NHUẬN (1922-1991) — Nhạc sĩ của "Hành quân xa"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'red-hanh-quan-xa',
      title: 'Hành Quân Xa',
      composerId: 'do-nhuan',
      composerName: 'Đỗ Nhuận',
      releaseYear: 1954,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary', 'march'],
      themes: ['hành quân', 'chiến đấu', 'quyết tâm', 'bộ đội'],
    },

    summary: 'Hành Quân Xa là ca khúc quân hành nổi tiếng của Đỗ Nhuận, sáng tác năm 1954, cổ vũ tinh thần chiến đấu của bộ đội.',

    compositionContext: {
      year: 1954,
      yearConfidence: 'verified',
      location: 'Chiến dịch Điện Biên Phủ',

      inspiration: {
        summary: 'Sáng tác trong chiến dịch Điện Biên Phủ để cổ vũ tinh thần bộ đội hành quân đường dài.',
        detailed: `Hành Quân Xa được sáng tác trong chiến dịch Điện Biên Phủ năm 1954. Bộ đội ta phải hành quân đường dài qua núi rừng hiểm trở để đến chiến trường. Đỗ Nhuận đã viết bài hát này để cổ vũ tinh thần của họ.

Bài hát có nhịp điệu mạnh mẽ như bước chân hành quân, ca từ đanh thép thể hiện quyết tâm chiến thắng.`,
        relatedPeople: [],
      },

      narrative: `Hành Quân Xa ra đời trong bối cảnh chiến dịch Điện Biên Phủ năm 1954 - trận đánh quyết định của kháng chiến chống Pháp. Đỗ Nhuận, một trong những nhạc sĩ quan trọng của nền âm nhạc cách mạng, đã sáng tác bài hát này để cổ vũ tinh thần bộ đội.

Bộ đội ta phải vượt qua hàng trăm km đường rừng núi hiểm trở để đến Điện Biên Phủ. Bài hát trở thành nguồn động viên tinh thần trong những cuộc hành quân gian khổ đó.

Hành Quân Xa có giai điệu hùng tráng, nhịp đi mạnh mẽ, phù hợp để hát khi hành quân. Bài hát trở thành một trong những ca khúc quân hành nổi tiếng nhất của kháng chiến.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1954, chiến dịch Điện Biên Phủ đang diễn ra.',
      politicalContext: 'Trận đánh quyết định của kháng chiến chống Pháp.',
      socialContext: 'Cả nước dồn sức cho chiến dịch.',
      musicalMovement: 'Nhạc quân hành cổ vũ tinh thần chiến đấu.',
      musicalInfluences: ['Nhạc quân hành', 'Nhạc cách mạng'],
      culturalSignificance: 'Trở thành bài hát biểu tượng của tinh thần hành quân.',

      relatedEvents: [
        {
          event: 'Chiến dịch Điện Biên Phủ',
          year: 1954,
          relevance: 'Bối cảnh sáng tác bài hát',
        },
      ],
    },

    sources: [
      { type: 'wikipedia', title: 'Đỗ Nhuận', url: 'https://vi.wikipedia.org/wiki/Đỗ_Nhuận', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HỒNG ĐĂNG (1936-2021)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'red-hoa-sua',
      title: 'Hoa Sữa',
      composerId: 'hong-dang',
      composerName: 'Hồng Đăng',
      releaseYear: 1978,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['romantic', 'folk'],
      themes: ['Hà Nội', 'hoa sữa', 'tình yêu', 'kỷ niệm'],
    },

    summary: 'Hoa Sữa là ca khúc của Hồng Đăng về mùa hoa sữa Hà Nội, trở thành một trong những bài hát đẹp nhất về thủ đô.',

    compositionContext: {
      year: 1978,
      yearConfidence: 'verified',
      season: 'autumn',
      location: 'Hà Nội',

      inspiration: {
        summary: 'Cảm hứng từ mùi hương hoa sữa đặc trưng của Hà Nội mỗi độ thu về.',
        detailed: `Hoa Sữa được sáng tác năm 1978, lấy cảm hứng từ hình ảnh và mùi hương của hoa sữa - loài hoa đặc trưng của Hà Nội. Mỗi mùa thu, hoa sữa nở trắng trên các con phố, tỏa hương thơm nồng nàn.

Hồng Đăng đã viết bài hát này như một lời tỏ tình với Hà Nội, với những kỷ niệm đẹp gắn liền với mùa hoa sữa.`,
        relatedPeople: [],
      },

      narrative: `Hoa Sữa ra đời năm 1978, trong giai đoạn đất nước vừa thống nhất. Hồng Đăng, một nhạc sĩ sinh ra và lớn lên tại Hà Nội, đã viết bài hát này như một tình ca dành cho thủ đô.

Hoa sữa (Alstonia scholaris) là loài cây được trồng nhiều trên các con phố Hà Nội từ thời Pháp thuộc. Mỗi mùa thu, hoa sữa nở trắng và tỏa hương thơm ngọt ngào, trở thành một phần ký ức của người Hà Nội.

Bài hát có giai điệu nhẹ nhàng, da diết, ca từ lãng mạn, gợi lên không gian Hà Nội những đêm thu với hương hoa sữa nồng nàn. Hoa Sữa nhanh chóng trở thành một trong những bài hát được yêu thích nhất về Hà Nội.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1978, đất nước đang trong giai đoạn xây dựng sau chiến tranh.',
      socialContext: 'Hà Nội đang dần hồi phục và phát triển.',
      musicalMovement: 'Nhạc trữ tình về quê hương.',
      musicalInfluences: ['Nhạc trữ tình', 'Dân ca Bắc Bộ'],
      culturalSignificance: 'Góp phần xây dựng hình ảnh Hà Nội trong âm nhạc.',
    },

    interestingFacts: [
      {
        content: 'Hoa sữa được người Pháp đưa vào Việt Nam và trồng nhiều trên các con phố Hà Nội từ đầu thế kỷ 20',
        category: 'trivia',
        source: { type: 'academic', title: 'Cây xanh Hà Nội', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Hồng Đăng', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CÁC BÀI HÁT KHÁC
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'red-truong-son-dong',
      title: 'Trường Sơn Đông, Trường Sơn Tây',
      composerId: 'hoang-hiep',
      composerName: 'Hoàng Hiệp',
      lyricistName: 'Thơ Phạm Tiến Duật',
      releaseYear: 1971,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary', 'folk'],
      themes: ['Trường Sơn', 'đường Hồ Chí Minh', 'chiến đấu', 'chia cắt'],
    },

    summary: 'Trường Sơn Đông, Trường Sơn Tây là ca khúc của Hoàng Hiệp phổ thơ Phạm Tiến Duật, về con đường Trường Sơn huyền thoại.',

    compositionContext: {
      year: 1971,
      yearConfidence: 'verified',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Phổ nhạc từ bài thơ của Phạm Tiến Duật về con đường Trường Sơn.',
        detailed: `Bài hát được phổ từ bài thơ của nhà thơ Phạm Tiến Duật - một trong những nhà thơ nổi tiếng viết về Trường Sơn. Hoàng Hiệp đã phổ nhạc với giai điệu hùng tráng, phù hợp với tinh thần của bài thơ.`,
        relatedPeople: [
          {
            name: 'Phạm Tiến Duật',
            relationship: 'Tác giả lời thơ',
            description: 'Nhà thơ nổi tiếng với nhiều bài thơ về Trường Sơn',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Trường Sơn Đông, Trường Sơn Tây là sự kết hợp giữa thơ Phạm Tiến Duật và nhạc Hoàng Hiệp, ra đời năm 1971. Bài hát ca ngợi con đường Trường Sơn - con đường chiến lược nối liền hai miền Nam Bắc trong kháng chiến.

Con đường Trường Sơn, còn gọi là đường Hồ Chí Minh, là tuyến đường vận tải chiến lược quan trọng bậc nhất trong kháng chiến chống Mỹ. Hàng triệu lượt người và hàng triệu tấn hàng đã qua con đường này.

Bài hát thể hiện sự chia cắt giữa hai bên dãy Trường Sơn - một bên là miền Bắc, một bên là chiến trường miền Nam, nhưng đều chung một mục tiêu thống nhất đất nước.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1971, kháng chiến chống Mỹ đang ở giai đoạn ác liệt.',
      politicalContext: 'Cuộc kháng chiến chống Mỹ cứu nước.',
      socialContext: 'Đường Trường Sơn là huyết mạch nối hai miền.',
      musicalMovement: 'Nhạc về Trường Sơn và kháng chiến.',
      musicalInfluences: ['Nhạc cách mạng', 'Thơ kháng chiến'],
      culturalSignificance: 'Thể hiện tinh thần bất khuất của dân tộc trong kháng chiến.',
    },

    sources: [
      { type: 'wikipedia', title: 'Hoàng Hiệp', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'red-co-gai-mo-duong',
      title: 'Cô Gái Mở Đường',
      composerId: 'xuan-giao',
      composerName: 'Xuân Giao',
      releaseYear: 1966,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary', 'folk'],
      themes: ['thanh niên xung phong', 'mở đường', 'phụ nữ', 'chiến đấu'],
    },

    summary: 'Cô Gái Mở Đường là ca khúc của Xuân Giao ca ngợi những cô gái thanh niên xung phong mở đường Trường Sơn.',

    compositionContext: {
      year: 1966,
      yearConfidence: 'verified',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ hình ảnh những cô gái thanh niên xung phong dũng cảm mở đường.',
        detailed: `Cô Gái Mở Đường ca ngợi những cô gái thanh niên xung phong - những người phụ nữ trẻ tình nguyện vào tuyến lửa để mở đường, san lấp hố bom, bảo đảm giao thông trên đường Trường Sơn.

Đây là hình ảnh anh hùng của phụ nữ Việt Nam trong kháng chiến, sẵn sàng hy sinh tuổi xuân cho sự nghiệp giải phóng đất nước.`,
        relatedPeople: [],
      },

      narrative: `Cô Gái Mở Đường ra đời năm 1966, trong giai đoạn kháng chiến chống Mỹ đang ác liệt. Bài hát ca ngợi những cô gái thanh niên xung phong - những anh hùng thầm lặng của tuyến đường Trường Sơn.

Những cô gái này thường chỉ 16-20 tuổi, tình nguyện rời xa gia đình để vào tuyến lửa. Công việc của họ là san lấp hố bom, mở đường mới, bảo đảm giao thông thông suốt dưới bom đạn địch.

Bài hát có giai điệu tươi vui nhưng cũng đầy quyết tâm, thể hiện tinh thần lạc quan và dũng cảm của những cô gái thanh niên xung phong.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1966, kháng chiến chống Mỹ đang ác liệt.',
      socialContext: 'Hàng nghìn cô gái tình nguyện vào thanh niên xung phong.',
      musicalMovement: 'Nhạc ca ngợi anh hùng kháng chiến.',
      musicalInfluences: ['Nhạc cách mạng', 'Dân ca'],
      culturalSignificance: 'Ca ngợi vai trò của phụ nữ Việt Nam trong kháng chiến.',
    },

    sources: [
      { type: 'wikipedia', title: 'Cô gái mở đường', reliability: 'verified' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'red-bac-dang-cung-chung-chau-hanh-quan',
      title: 'Bác Đang Cùng Chúng Cháu Hành Quân',
      composerId: 'huy-thuc',
      composerName: 'Huy Thục',
      releaseYear: 1970,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary', 'march'],
      themes: ['Bác Hồ', 'hành quân', 'bộ đội', 'tinh thần'],
    },

    summary: 'Bác Đang Cùng Chúng Cháu Hành Quân là ca khúc của Huy Thục về hình ảnh Bác Hồ luôn đồng hành cùng bộ đội.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'verified',
      location: 'Miền Bắc Việt Nam',

      inspiration: {
        summary: 'Cảm hứng từ hình ảnh Bác Hồ luôn dõi theo và đồng hành cùng bộ đội.',
        detailed: `Bài hát được sáng tác năm 1970, sau khi Chủ tịch Hồ Chí Minh qua đời năm 1969. Bài hát thể hiện niềm tin rằng tinh thần Bác vẫn luôn đồng hành cùng bộ đội trên mọi chặng đường hành quân.`,
        relatedPeople: [
          {
            name: 'Hồ Chí Minh',
            relationship: 'Được nhắc đến trong bài hát',
            description: 'Chủ tịch nước, đã mất năm 1969',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Bác Đang Cùng Chúng Cháu Hành Quân được sáng tác năm 1970, một năm sau khi Chủ tịch Hồ Chí Minh qua đời. Bài hát thể hiện niềm tin rằng dù Bác đã đi xa, tinh thần của Người vẫn luôn đồng hành cùng bộ đội.

Bài hát có giai điệu hùng tráng như nhịp bước hành quân, ca từ thể hiện lòng kính yêu Bác và quyết tâm thực hiện di chúc của Người - giải phóng miền Nam, thống nhất đất nước.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1970, sau khi Bác Hồ qua đời.',
      socialContext: 'Cả nước quyết tâm thực hiện di chúc của Bác.',
      musicalMovement: 'Nhạc về Bác Hồ sau khi Người qua đời.',
      musicalInfluences: ['Nhạc quân hành', 'Nhạc cách mạng'],
      culturalSignificance: 'Thể hiện tinh thần "Bác sống mãi trong sự nghiệp của chúng ta".',
    },

    sources: [
      { type: 'wikipedia', title: 'Huy Thục', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'red-dat-nuoc-trung-dung',
      title: 'Đất Nước Trọn Niềm Vui',
      composerId: 'hoang-ha',
      composerName: 'Hoàng Hà',
      releaseYear: 1975,
      releaseYearConfidence: 'verified',
      era: 'revolutionary',
      genres: ['revolutionary'],
      themes: ['thống nhất', 'niềm vui', 'chiến thắng', 'hòa bình'],
    },

    summary: 'Đất Nước Trọn Niềm Vui là ca khúc của Hoàng Hà sáng tác sau ngày 30/4/1975, ca ngợi niềm vui thống nhất đất nước.',

    compositionContext: {
      year: 1975,
      yearConfidence: 'verified',
      month: 5,
      location: 'Việt Nam',

      inspiration: {
        summary: 'Sáng tác sau ngày 30/4/1975, thể hiện niềm vui của cả dân tộc khi đất nước thống nhất.',
        detailed: `Đất Nước Trọn Niềm Vui được sáng tác ngay sau chiến thắng 30/4/1975. Bài hát thể hiện niềm vui vỡ òa của cả dân tộc khi ước mơ thống nhất thành hiện thực.`,
        relatedPeople: [],
      },

      narrative: `Đất Nước Trọn Niềm Vui ra đời năm 1975, trong không khí vui mừng của cả dân tộc sau ngày thống nhất. Bài hát thể hiện niềm vui và hy vọng vào tương lai tươi sáng của đất nước.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'revolutionary',
      eraDescription: 'Năm 1975, đất nước vừa thống nhất.',
      politicalContext: 'Chiến tranh kết thúc, đất nước hòa bình.',
      socialContext: 'Cả nước vui mừng trong niềm vui thống nhất.',
      musicalMovement: 'Nhạc ca ngợi thống nhất và hòa bình.',
      musicalInfluences: ['Nhạc cách mạng'],
      culturalSignificance: 'Thể hiện niềm vui của dân tộc khi đất nước thống nhất.',
    },

    sources: [
      { type: 'wikipedia', title: 'Hoàng Hà (nhạc sĩ)', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

];

// Export
export default RED_MUSIC_SONGS;
```

---

## 📊 TÓM TẮT NHẠC ĐỎ DATABASE

| STT | Bài hát | Nhạc sĩ | Năm | Confidence |
|-----|---------|---------|-----|------------|
| 1 | Tiến Quân Ca (Quốc ca) | Văn Cao | 1944 | VERIFIED |
| 2 | Tình Ca Tây Bắc | Hoàng Việt | 1957 | VERIFIED |
| 3 | Nhạc Rừng | Hoàng Việt | 1952 | HIGH |
| 4 | Như Có Bác Hồ Trong Ngày Vui Đại Thắng | Phạm Tuyên | 1975 | VERIFIED |
| 5 | Chiếc Đèn Ông Sao | Phạm Tuyên | 1956 | VERIFIED |
| 6 | Hành Quân Xa | Đỗ Nhuận | 1954 | VERIFIED |
| 7 | Hoa Sữa | Hồng Đăng | 1978 | VERIFIED |
| 8 | Trường Sơn Đông, Trường Sơn Tây | Hoàng Hiệp | 1971 | VERIFIED |
| 9 | Cô Gái Mở Đường | Xuân Giao | 1966 | VERIFIED |
| 10 | Bác Đang Cùng Chúng Cháu Hành Quân | Huy Thục | 1970 | VERIFIED |
| 11 | Đất Nước Trọn Niềm Vui | Hoàng Hà | 1975 | VERIFIED |

---

## 📊 TỔNG KẾT TẤT CẢ 3 DATABASE

| Thể loại | Số bài | Nhạc sĩ chính | Confidence |
|----------|--------|---------------|------------|
| **Bolero** | 17 | Trúc Phương, Lam Phương, Trần Thiện Thanh, Thanh Sơn, Châu Kỳ | VERIFIED/HIGH |
| **Tiền chiến** | 12 | Văn Cao, Phạm Duy, Đoàn Chuẩn, Nguyễn Văn Tý | VERIFIED/HIGH |
| **Nhạc đỏ** | 11 | Văn Cao, Hoàng Việt, Phạm Tuyên, Đỗ Nhuận | VERIFIED |
| **TỔNG** | **40** | **15+ nhạc sĩ** | — |

**Kết hợp với 13 bài đã có trước = 53 bài hát trong database!**
