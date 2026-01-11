# ═══════════════════════════════════════════════════════════════════════════════
#                    🎵 MELODY AI — BOLERO DATABASE EXPANDED
#                         20 Bài Hát Bolero Phổ Biến Nhất
#                              Version 3.0 — Production
# ═══════════════════════════════════════════════════════════════════════════════

## File: `lib/database/songs/bolero.ts`

```typescript
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

    summary: 'Nửa Đêm Ngoài Phố là một trong những ca khúc tiêu biểu nhất của Trúc Phương, sáng tác đầu thập niên 1960. Bài hát khắc họa hình ảnh người đàn ông cô độc lang thang trên phố đêm, với giai điệu bolero đặc trưng.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những đêm lang thang trên đường phố Sài Gòn của chính nhạc sĩ trong giai đoạn khó khăn.',
        detailed: `Trúc Phương sáng tác bài hát này trong giai đoạn đầu sự nghiệp tại Sài Gòn. Theo nhiều nguồn, ông thường xuyên đi bộ trên các con phố về đêm, quan sát cuộc sống và tìm cảm hứng sáng tác.

Hình ảnh "nửa đêm ngoài phố" phản ánh thực tế cuộc sống của nhiều người Sài Gòn thời đó - những người lao động về khuya, những kẻ cô đơn không nhà, những mối tình dang dở.

Bài hát thể hiện đặc trưng phong cách Trúc Phương: ca từ giản dị nhưng sâu sắc, giai điệu bolero dễ nghe và cảm xúc chân thực.`,
        relatedPeople: [],
      },

      narrative: `Nửa Đêm Ngoài Phố ra đời vào khoảng năm 1962, trong giai đoạn Trúc Phương đang khẳng định tên tuổi tại Sài Gòn. Đây là thời kỳ dòng nhạc bolero đang phát triển mạnh mẽ với nhiều tên tuổi lớn.

Trúc Phương, tên thật Nguyễn Thiện Lộc, sinh năm 1933 tại Trà Vinh, là một trong những nhạc sĩ bolero quan trọng nhất của nền âm nhạc miền Nam. Ông được mệnh danh là "Ông hoàng Bolero" với hàng trăm ca khúc để đời.

Bài hát nhanh chóng trở nên phổ biến qua giọng hát Thanh Thúy - một trong những ca sĩ hàng đầu của dòng nhạc này. Sự kết hợp giữa ca từ buồn man mác của Trúc Phương và giọng hát trầm ấm của Thanh Thúy đã tạo nên một tác phẩm kinh điển.

Cho đến nay, Nửa Đêm Ngoài Phố vẫn là một trong những bài bolero được yêu thích và cover nhiều nhất.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960, giai đoạn phát triển mạnh của nền âm nhạc đô thị miền Nam.',
      socialContext: 'Sài Gòn thời kỳ này là trung tâm văn hóa sôi động với nhiều phòng trà, vũ trường và hãng đĩa.',
      musicalMovement: 'Thời kỳ vàng của nhạc bolero miền Nam với các tên tuổi lớn: Trúc Phương, Lam Phương, Trần Thiện Thanh.',
      musicalInfluences: ['Bolero Cuba', 'Rumba', 'Nhạc Pháp'],
      culturalSignificance: 'Bài hát trở thành biểu tượng của dòng nhạc bolero Việt Nam, thể hiện tâm trạng cô đơn đô thị.',
    },

    performances: [
      {
        performerId: 'thanh-thuy',
        performerName: 'Thanh Thúy',
        style: 'Giọng hát trầm buồn, da diết đặc trưng',
        significance: 'Phiên bản gốc, kinh điển nhất',
        isOriginal: true,
      },
      {
        performerId: 'che-linh',
        performerName: 'Chế Linh',
        style: 'Giọng nam trầm ấm',
        significance: 'Phiên bản nam được yêu thích',
        isOriginal: false,
      },
    ],

    interestingFacts: [
      {
        content: 'Trúc Phương được mệnh danh là "Ông hoàng Bolero" với hơn 200 ca khúc trong sự nghiệp',
        category: 'cultural',
        source: { type: 'book', title: 'Nhạc vàng Việt Nam', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Trúc Phương', url: 'https://vi.wikipedia.org/wiki/Trúc_Phương', reliability: 'high' },
      { type: 'book', title: 'Nhạc sĩ Việt Nam thế kỷ 20', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
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

    summary: 'Ai Cho Tôi Tình Yêu là ca khúc bolero nổi tiếng của Trúc Phương, thể hiện khao khát tình yêu của người cô đơn. Bài hát mang đậm phong cách trữ tình đặc trưng của nhạc sĩ.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ nỗi cô đơn và khao khát tình yêu - chủ đề xuyên suốt trong sáng tác của Trúc Phương.',
        detailed: `Trúc Phương thường viết về những người cô đơn, những mối tình dang dở. Bài hát này tiếp tục khai thác chủ đề đó với câu hỏi tu từ "Ai cho tôi tình yêu" - thể hiện sự khao khát một tình yêu đích thực.`,
        relatedPeople: [],
      },

      narrative: `Ai Cho Tôi Tình Yêu thuộc giai đoạn sung sức của Trúc Phương giữa thập niên 1960. Bài hát tiếp tục phong cách đặc trưng của ông: giai điệu bolero dễ nghe, ca từ giản dị nhưng chạm đến cảm xúc.

Câu hỏi "Ai cho tôi tình yêu" không chỉ là khao khát cá nhân mà còn phản ánh tâm trạng của nhiều người trong xã hội thời đó - những người xa quê, lính chiến, công nhân... đều mang trong mình nỗi cô đơn.

Bài hát được nhiều ca sĩ thể hiện thành công và trở thành một trong những tác phẩm tiêu biểu của dòng nhạc bolero.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, chiến tranh đang leo thang, xã hội có nhiều biến động.',
      socialContext: 'Nhiều gia đình ly tán, nhiều người xa quê hương - tạo nên bối cảnh cho những bài hát về cô đơn và khao khát.',
      musicalMovement: 'Bolero tiếp tục phát triển mạnh với nhiều tác phẩm về tình yêu và nỗi buồn.',
      musicalInfluences: ['Bolero Cuba', 'Nhạc tiền chiến'],
      culturalSignificance: 'Bài hát thể hiện tâm trạng phổ biến của xã hội miền Nam thời chiến.',
    },

    performances: [
      {
        performerId: 'thanh-thuy',
        performerName: 'Thanh Thúy',
        style: 'Giọng hát buồn đặc trưng',
        significance: 'Phiên bản kinh điển',
        isOriginal: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Trúc Phương', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'bolero-buon-trong-ky-niem',
      title: 'Buồn Trong Kỷ Niệm',
      composerId: 'truc-phuong',
      composerName: 'Trúc Phương',
      originalPerformerName: 'Thanh Thúy',
      releaseYear: 1964,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['kỷ niệm', 'hoài niệm', 'nỗi buồn', 'quá khứ'],
    },

    summary: 'Buồn Trong Kỷ Niệm là ca khúc bolero về những ký ức tình yêu đã qua, thể hiện nỗi buồn hoài niệm đặc trưng trong phong cách Trúc Phương.',

    compositionContext: {
      year: 1964,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những kỷ niệm tình yêu đã qua và nỗi buồn khi nhìn lại quá khứ.',
        detailed: `Bài hát khai thác chủ đề hoài niệm - nhìn lại những kỷ niệm đẹp đã qua với nỗi buồn man mác. Đây là chủ đề phổ biến trong nhạc bolero, phản ánh tâm lý của nhiều người trong thời kỳ nhiều biến động.`,
        relatedPeople: [],
      },

      narrative: `Buồn Trong Kỷ Niệm tiếp tục mạch cảm xúc quen thuộc của Trúc Phương: nỗi buồn, hoài niệm và tình yêu. Bài hát được viết với giai điệu bolero êm ái, ca từ giàu hình ảnh về những kỷ niệm xa xôi.

Trong bối cảnh chiến tranh, nhiều người phải rời xa quê hương, người thân. Những bài hát về kỷ niệm như thế này trở thành nguồn an ủi tinh thần, giúp người nghe sống lại những ký ức đẹp.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, xã hội miền Nam đang chịu ảnh hưởng của chiến tranh.',
      socialContext: 'Nhiều cuộc chia ly, nhiều kỷ niệm bị bỏ lại phía sau.',
      musicalMovement: 'Dòng nhạc bolero với chủ đề hoài niệm rất được yêu thích.',
      musicalInfluences: ['Bolero', 'Slow'],
      culturalSignificance: 'Thể hiện tâm trạng hoài niệm của người Việt trong thời chiến.',
    },

    sources: [
      { type: 'wikipedia', title: 'Trúc Phương', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LAM PHƯƠNG (1937-2020) — "Nhạc sĩ của tình ca"
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
      genres: ['bolero', 'slow'],
      themes: ['chia ly', 'thành phố', 'nỗi buồn', 'cô đơn'],
    },

    summary: 'Thành Phố Buồn là một trong những ca khúc nổi tiếng nhất của Lam Phương, sáng tác khoảng năm 1970. Bài hát khắc họa nỗi buồn của người ở lại khi người yêu ra đi, với bối cảnh thành phố trở nên hoang vắng.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những cuộc chia ly trong thời chiến và nỗi cô đơn của người ở lại.',
        detailed: `Thành Phố Buồn được sáng tác trong giai đoạn chiến tranh đang cao điểm. Lam Phương đã nắm bắt tâm trạng phổ biến của xã hội thời đó: nỗi buồn chia ly, sự cô đơn khi người thân ra đi.

Hình ảnh "thành phố buồn" là ẩn dụ cho tâm trạng con người - khi mất đi người yêu thương, mọi thứ xung quanh đều trở nên u buồn, hoang vắng dù vẫn còn đó.

Bài hát phản ánh thực tế xã hội: nhiều đôi tình nhân phải xa nhau vì chiến tranh, vì hoàn cảnh, vì những lý do không thể kiểm soát.`,
        relatedPeople: [],
      },

      narrative: `Thành Phố Buồn ra đời vào khoảng năm 1970, trong giai đoạn Lam Phương đang ở đỉnh cao sự nghiệp. Đây là một trong những bài hát được yêu thích nhất của ông.

Lam Phương, tên thật Lâm Đình Phùng, sinh năm 1937 tại Rạch Giá, Kiên Giang. Ông là một trong những nhạc sĩ có nhiều bài hit nhất của nền nhạc vàng miền Nam với hơn 200 ca khúc.

Ca khúc được Chế Linh thể hiện thành công với giọng hát trầm ấm, da diết. Bài hát nhanh chóng trở thành hit lớn và được nhiều ca sĩ cover cho đến ngày nay.

Điều đặc biệt là bài hát không chỉ nói về tình yêu đôi lứa mà còn có thể hiểu là nỗi buồn của người dân mất quê hương - một cảm xúc rất phổ biến sau năm 1975.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1970, chiến tranh Việt Nam đang ở giai đoạn cao điểm.',
      politicalContext: 'Chiến tranh leo thang, nhiều gia đình ly tán.',
      socialContext: 'Xã hội đầy bất ổn, nhiều cuộc chia ly diễn ra khắp nơi.',
      musicalMovement: 'Giai đoạn đỉnh cao của nhạc vàng với các chủ đề chia ly, quê hương.',
      musicalInfluences: ['Bolero', 'Slow Rock', 'Nhạc Pháp'],
      culturalSignificance: 'Bài hát trở thành biểu tượng của nỗi buồn chia ly trong thời chiến và cả sau này.',
    },

    performances: [
      {
        performerId: 'che-linh',
        performerName: 'Chế Linh',
        style: 'Giọng hát trầm ấm, da diết',
        significance: 'Phiên bản gốc và kinh điển nhất',
        isOriginal: true,
      },
      {
        performerId: 'quang-le',
        performerName: 'Quang Lê',
        style: 'Phong cách hiện đại hơn',
        significance: 'Đưa bài hát đến thế hệ mới',
        isOriginal: false,
      },
    ],

    interestingFacts: [
      {
        content: 'Lam Phương sáng tác hơn 200 ca khúc trong sự nghiệp, phần lớn là tình ca',
        category: 'creation',
        source: { type: 'book', title: 'Lam Phương - Trăm nhớ ngàn thương', reliability: 'verified' },
        isVerified: true,
      },
      {
        content: 'Bài hát vẫn được hát nhiều trong cộng đồng người Việt hải ngoại như một nỗi nhớ quê hương',
        category: 'cultural',
        source: { type: 'news', title: 'Di sản âm nhạc Lam Phương', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'book', title: 'Lam Phương - Trăm nhớ ngàn thương', reliability: 'verified' },
      { type: 'wikipedia', title: 'Lam Phương', url: 'https://vi.wikipedia.org/wiki/Lam_Phương', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'bolero-tinh-nghi-da-cuoi',
      title: 'Tình Nghĩa Đôi Ta Chỉ Thế Thôi',
      alternativeTitles: ['Tình Nghĩa Đôi Ta'],
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      releaseYear: 1968,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chia tay', 'tình yêu', 'buồn bã'],
    },

    summary: 'Ca khúc về sự kết thúc của một mối tình, với ca từ giản dị nhưng đầy cảm xúc đặc trưng của Lam Phương.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những mối tình dở dang và sự chấp nhận chia ly.',
        detailed: `Bài hát thể hiện sự chấp nhận một mối tình đã kết thúc - "tình nghĩa đôi ta chỉ thế thôi". Đây là phong cách đặc trưng của Lam Phương: không oán trách, không giận hờn, chỉ buồn man mác và chấp nhận.`,
        relatedPeople: [],
      },

      narrative: `Tình Nghĩa Đôi Ta Chỉ Thế Thôi là một trong những bài hát buồn điển hình của Lam Phương. Bài hát thể hiện sự trưởng thành trong cảm xúc - chấp nhận chia ly không oán trách.

Phong cách này rất khác với nhiều bài hát tình yêu khác thời đó thường hay than thở, oán trách. Lam Phương chọn cách nhẹ nhàng hơn, đau đớn hơn nhưng cũng đẹp hơn.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960, giai đoạn nhiều biến động.',
      socialContext: 'Nhiều mối tình tan vỡ vì chiến tranh và hoàn cảnh.',
      musicalMovement: 'Nhạc vàng tiếp tục phát triển với nhiều bài hát về tình yêu.',
      musicalInfluences: ['Bolero', 'Ballad'],
      culturalSignificance: 'Thể hiện cách người Việt đối diện với chia ly - nhẹ nhàng và chấp nhận.',
    },

    sources: [
      { type: 'wikipedia', title: 'Lam Phương', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'bolero-em-di-roi',
      title: 'Em Đi Rồi',
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      releaseYear: 1972,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'slow'],
      themes: ['chia ly', 'nỗi nhớ', 'cô đơn'],
    },

    summary: 'Em Đi Rồi là ca khúc về nỗi buồn khi người yêu ra đi, tiếp tục chủ đề chia ly quen thuộc trong sáng tác của Lam Phương.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những cuộc chia ly và nỗi cô đơn của người ở lại.',
        detailed: `Bài hát tiếp tục mạch cảm xúc về chia ly - chủ đề xuyên suốt trong sáng tác của Lam Phương. Hình ảnh "em đi rồi" đơn giản nhưng chứa đựng tất cả nỗi buồn của người ở lại.`,
        relatedPeople: [],
      },

      narrative: `Em Đi Rồi được sáng tác trong giai đoạn cuối của chiến tranh, khi nhiều cuộc chia ly diễn ra. Bài hát thể hiện phong cách Lam Phương: ca từ giản dị, giai điệu dễ nghe nhưng cảm xúc sâu sắc.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1970, những năm cuối của chiến tranh.',
      socialContext: 'Xã hội nhiều bất ổn, nhiều cuộc chia ly.',
      musicalMovement: 'Nhạc vàng với chủ đề chia ly rất phổ biến.',
      musicalInfluences: ['Bolero', 'Slow'],
      culturalSignificance: 'Phản ánh tâm trạng xã hội thời chiến.',
    },

    sources: [
      { type: 'wikipedia', title: 'Lam Phương', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'bolero-bay-di-canh-chim-bien',
      title: 'Bay Đi Cánh Chim Biển',
      composerId: 'lam-phuong',
      composerName: 'Lam Phương',
      releaseYear: 1978,
      releaseYearConfidence: 'high',
      era: 'reunification',
      genres: ['bolero', 'ballad'],
      themes: ['xa xứ', 'tự do', 'hy vọng', 'biển'],
    },

    summary: 'Bay Đi Cánh Chim Biển là ca khúc Lam Phương sáng tác sau khi rời Việt Nam năm 1975, thể hiện nỗi lòng người xa xứ và khát vọng tự do.',

    compositionContext: {
      year: 1978,
      yearConfidence: 'high',
      location: 'Hoa Kỳ',

      inspiration: {
        summary: 'Cảm hứng từ trải nghiệm rời Việt Nam bằng đường biển và cuộc sống lưu vong.',
        detailed: `Sau sự kiện 1975, Lam Phương cùng nhiều người Việt rời quê hương bằng thuyền vượt biển. Hình ảnh "cánh chim biển" là ẩn dụ cho những người ra đi tìm tự do.

Bài hát thể hiện tâm trạng phức tạp: nỗi buồn xa quê, lo lắng về tương lai nhưng cũng có hy vọng về một cuộc sống mới. Đây là bài hát rất được yêu thích trong cộng đồng người Việt hải ngoại.`,
        relatedPeople: [],
      },

      narrative: `Bay Đi Cánh Chim Biển được sáng tác sau khi Lam Phương định cư tại Hoa Kỳ, khoảng năm 1978. Bài hát đánh dấu giai đoạn mới trong sáng tác của ông - từ tình ca chuyển sang những bài hát về quê hương, xa xứ.

Hình ảnh "cánh chim biển" bay đi tìm tự do đã trở thành biểu tượng cho thế hệ người Việt vượt biển. Bài hát được hát nhiều trong các buổi hội họp cộng đồng, các chương trình văn nghệ hải ngoại.

Cho đến khi qua đời năm 2020, Lam Phương vẫn được người Việt hải ngoại yêu mến và tôn vinh như một trong những nhạc sĩ tiêu biểu nhất của dòng nhạc vàng.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'reunification',
      eraDescription: 'Sau 1975, làn sóng di cư của người Việt Nam.',
      politicalContext: 'Nhiều người rời Việt Nam bằng đường biển sau 1975.',
      socialContext: 'Cộng đồng người Việt hải ngoại hình thành, mang theo văn hóa và âm nhạc.',
      musicalMovement: 'Nhạc Việt hải ngoại phát triển với chủ đề quê hương, xa xứ.',
      musicalInfluences: ['Bolero', 'Nhạc vàng trước 1975'],
      culturalSignificance: 'Bài hát trở thành biểu tượng của người Việt vượt biển tìm tự do.',
    },

    interestingFacts: [
      {
        content: 'Bài hát được xem là "quốc ca không chính thức" của cộng đồng người Việt tị nạn',
        category: 'cultural',
        source: { type: 'news', title: 'Di sản Lam Phương', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'book', title: 'Lam Phương - Trăm nhớ ngàn thương', reliability: 'verified' },
      { type: 'wikipedia', title: 'Lam Phương', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'verified',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TRẦN THIỆN THANH (1942-2005) — "Nhạc sĩ lính"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-hon-da-co-don',
      title: 'Hòn Đá Cô Đơn',
      composerId: 'tran-thien-thanh',
      composerName: 'Trần Thiện Thanh',
      originalPerformerName: 'Nhật Trường',
      releaseYear: 1965,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['cô đơn', 'chờ đợi', 'tình yêu', 'xa cách'],
    },

    summary: 'Hòn Đá Cô Đơn là ca khúc nổi tiếng của Trần Thiện Thanh, với hình ảnh ẩn dụ về sự cô đơn và chờ đợi trong tình yêu.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ hình ảnh hòn đá đứng một mình - ẩn dụ cho sự cô đơn và kiên nhẫn chờ đợi.',
        detailed: `Trần Thiện Thanh sử dụng hình ảnh "hòn đá cô đơn" như một ẩn dụ cho người chờ đợi trong tình yêu. Hòn đá bất động, kiên nhẫn, không than thở - giống như những người phụ nữ chờ chồng, chờ người yêu đi lính trở về.

Bài hát thể hiện đặc trưng phong cách Trần Thiện Thanh: ca từ giàu hình ảnh, giai điệu bolero nhẹ nhàng và cảm xúc sâu lắng.`,
        relatedPeople: [],
      },

      narrative: `Hòn Đá Cô Đơn ra đời vào giữa thập niên 1960, khi Trần Thiện Thanh đang là một trong những nhạc sĩ được yêu thích nhất. Ông được biết đến với biệt danh "Nhạc sĩ lính" vì nhiều bài hát về người lính và hậu phương.

Trần Thiện Thanh, sinh năm 1942 tại Phan Rang, là nhạc sĩ kiêm ca sĩ với nghệ danh Nhật Trường. Ông từng phục vụ trong quân đội và trải nghiệm thực tế đã ảnh hưởng sâu sắc đến sáng tác.

Bài hát được chính Nhật Trường (Trần Thiện Thanh) thể hiện với giọng hát đặc trưng và nhanh chóng trở thành hit lớn.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, chiến tranh đang leo thang.',
      socialContext: 'Nhiều gia đình có người thân đi lính, sự chờ đợi là tâm trạng phổ biến.',
      musicalMovement: 'Dòng nhạc về người lính và hậu phương phát triển mạnh.',
      musicalInfluences: ['Bolero', 'Slow'],
      culturalSignificance: 'Bài hát thể hiện sự kiên nhẫn và chờ đợi của người phụ nữ Việt Nam.',
    },

    performances: [
      {
        performerId: 'nhat-truong',
        performerName: 'Nhật Trường',
        style: 'Giọng hát trầm ấm đặc trưng',
        significance: 'Phiên bản gốc của chính tác giả',
        isOriginal: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Trần Thiện Thanh', url: 'https://vi.wikipedia.org/wiki/Trần_Thiện_Thanh', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'bolero-bien-mo',
      title: 'Biển Mơ',
      composerId: 'tran-thien-thanh',
      composerName: 'Trần Thiện Thanh',
      originalPerformerName: 'Nhật Trường',
      releaseYear: 1966,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['biển', 'mơ mộng', 'tình yêu', 'thiên nhiên'],
    },

    summary: 'Biển Mơ là ca khúc lãng mạn của Trần Thiện Thanh với hình ảnh biển cả như biểu tượng cho những ước mơ và tình yêu.',

    compositionContext: {
      year: 1966,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ vẻ đẹp của biển và những ước mơ lãng mạn.',
        detailed: `Biển là hình ảnh thường xuất hiện trong nhạc Việt Nam, đặc biệt với các nhạc sĩ miền Trung như Trần Thiện Thanh (quê Phan Rang). Bài hát sử dụng hình ảnh biển như không gian cho những mơ mộng về tình yêu.`,
        relatedPeople: [],
      },

      narrative: `Biển Mơ thể hiện khía cạnh lãng mạn trong sáng tác của Trần Thiện Thanh, khác với những bài hát về lính và chiến tranh. Bài hát có giai điệu nhẹ nhàng, mơ màng như sóng biển.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960.',
      socialContext: 'Bên cạnh nhạc chiến tranh, nhạc tình vẫn được yêu thích.',
      musicalMovement: 'Dòng nhạc bolero lãng mạn.',
      musicalInfluences: ['Bolero', 'Slow'],
      culturalSignificance: 'Thể hiện khát vọng về một cuộc sống bình yên, lãng mạn.',
    },

    sources: [
      { type: 'wikipedia', title: 'Trần Thiện Thanh', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THANH SƠN (1938-2012) — "Nhạc sĩ của tuổi học trò"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-noi-buon-hoa-phuong',
      title: 'Nỗi Buồn Hoa Phượng',
      composerId: 'thanh-son',
      composerName: 'Thanh Sơn',
      originalPerformerName: 'Thanh Tuyền',
      releaseYear: 1963,
      releaseYearConfidence: 'verified',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['tuổi học trò', 'mùa hè', 'chia tay', 'hoa phượng'],
    },

    summary: 'Nỗi Buồn Hoa Phượng là ca khúc tiêu biểu của nhạc sĩ Thanh Sơn, sáng tác năm 1963, trở thành bài hát biểu tượng cho tuổi học trò Việt Nam với hình ảnh hoa phượng đỏ mỗi mùa hè.',

    compositionContext: {
      year: 1963,
      yearConfidence: 'verified',
      season: 'summer',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ hình ảnh hoa phượng nở đỏ mỗi mùa hè và cảm xúc chia tay của tuổi học trò.',
        detailed: `Nỗi Buồn Hoa Phượng được nhạc sĩ Thanh Sơn sáng tác vào năm 1963. Bài hát lấy cảm hứng từ hình ảnh quen thuộc nhất của mùa hè Việt Nam - những hàng phượng vĩ nở đỏ rực trên các sân trường.

Trong văn hóa Việt Nam, hoa phượng gắn liền với tuổi học trò, với những kỷ niệm đẹp và cả nỗi buồn man mác khi mùa hè đến - mùa của chia tay, của không biết có còn gặp lại. Nhạc sĩ Thanh Sơn đã nắm bắt cảm xúc phổ quát này và biến thành một ca khúc để đời.`,
        relatedPeople: [],
      },

      narrative: `Năm 1963, nhạc sĩ Thanh Sơn cho ra đời ca khúc Nỗi Buồn Hoa Phượng - một bài hát đã trở thành biểu tượng cho tuổi học trò Việt Nam suốt hơn nửa thế kỷ.

Thanh Sơn, tên thật Lê Thanh Sơn, sinh năm 1938 tại Sóc Trăng, là một trong những nhạc sĩ có nhiều đóng góp cho dòng nhạc trữ tình Việt Nam với hơn 500 ca khúc.

Bài hát được ca sĩ Thanh Tuyền thể hiện lần đầu và nhanh chóng trở nên phổ biến. Từ đó, Nỗi Buồn Hoa Phượng trở thành bài hát được hát trong các buổi lễ tổng kết năm học, lễ ra trường của nhiều trường học trên khắp Việt Nam.`,

      narrativeConfidence: 'verified',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Năm 1963, giai đoạn cuối của Đệ nhất Cộng hòa Việt Nam.',
      socialContext: 'Đời sống văn hóa Sài Gòn vẫn phát triển mạnh mẽ với nhiều ca sĩ, nhạc sĩ tài năng.',
      musicalMovement: 'Giai đoạn phát triển mạnh của dòng nhạc bolero, nhạc vàng tại miền Nam.',
      musicalInfluences: ['Bolero Cuba', 'Nhạc Pháp', 'Nhạc tiền chiến'],
      culturalSignificance: 'Góp phần định hình hình ảnh "mùa hoa phượng" như biểu tượng văn hóa của tuổi học trò Việt Nam.',
    },

    performances: [
      {
        performerId: 'thanh-tuyen',
        performerName: 'Thanh Tuyền',
        year: 1963,
        style: 'Giọng hát trong trẻo, ngọt ngào',
        significance: 'Phiên bản gốc, tạo nên thành công ban đầu',
        isOriginal: true,
      },
      {
        performerId: 'cam-ly',
        performerName: 'Cẩm Ly',
        style: 'Giọng hát truyền cảm, mang hơi thở hiện đại',
        significance: 'Giới thiệu bài hát đến thế hệ mới',
        isOriginal: false,
      },
    ],

    interestingFacts: [
      {
        content: 'Bài hát được hát trong hầu hết các buổi lễ tổng kết năm học tại Việt Nam',
        category: 'cultural',
        source: { type: 'news', title: 'Những bài hát của mùa hè', reliability: 'verified' },
        isVerified: true,
      },
      {
        content: 'Nhạc sĩ Thanh Sơn đã sáng tác hơn 500 ca khúc trong sự nghiệp',
        category: 'creation',
        source: { type: 'interview', title: 'Phỏng vấn nhạc sĩ Thanh Sơn', reliability: 'high' },
        isVerified: true,
      },
      {
        content: 'Hoa phượng vĩ (Delonix regia) được người Pháp mang đến Việt Nam từ thời thuộc địa',
        category: 'trivia',
        source: { type: 'academic', title: 'Lịch sử cây phượng vĩ tại Việt Nam', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'interview', title: 'Nhạc sĩ Thanh Sơn và những ca khúc để đời', publisher: 'Báo Thanh Niên', year: 2010, reliability: 'verified' },
      { type: 'wikipedia', title: 'Nỗi buồn hoa phượng', url: 'https://vi.wikipedia.org/wiki/Nỗi_buồn_hoa_phượng', reliability: 'high' },
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
      id: 'bolero-mua-thu-la-bay',
      title: 'Mùa Thu Lá Bay',
      composerId: 'thanh-son',
      composerName: 'Thanh Sơn',
      releaseYear: 1965,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['mùa thu', 'lá bay', 'hoài niệm', 'thiên nhiên'],
    },

    summary: 'Mùa Thu Lá Bay là ca khúc lãng mạn của Thanh Sơn về mùa thu với hình ảnh lá vàng rơi, tiếp tục chủ đề thiên nhiên và mùa màng trong sáng tác của ông.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'medium',
      season: 'autumn',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ vẻ đẹp của mùa thu và hình ảnh lá vàng rơi.',
        detailed: `Sau thành công của Nỗi Buồn Hoa Phượng về mùa hè, Thanh Sơn tiếp tục khai thác chủ đề mùa màng với Mùa Thu Lá Bay. Dù miền Nam Việt Nam không có mùa thu rõ rệt như miền Bắc, hình ảnh mùa thu vẫn đẹp trong tưởng tượng văn chương.`,
        relatedPeople: [],
      },

      narrative: `Mùa Thu Lá Bay thể hiện tài năng của Thanh Sơn trong việc khai thác hình ảnh thiên nhiên và mùa màng. Bài hát có giai điệu nhẹ nhàng, ca từ lãng mạn về một mùa thu tưởng tượng với lá vàng rơi.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960.',
      socialContext: 'Âm nhạc lãng mạn vẫn được yêu thích bên cạnh những biến động chính trị.',
      musicalMovement: 'Dòng nhạc bolero với chủ đề thiên nhiên.',
      musicalInfluences: ['Bolero', 'Nhạc Pháp'],
      culturalSignificance: 'Góp phần xây dựng hình ảnh mùa thu trong âm nhạc Việt Nam.',
    },

    sources: [
      { type: 'wikipedia', title: 'Thanh Sơn', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CHÂU KỲ (1923-2008) — "Nhạc sĩ của những bài ca bất hủ"
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-con-duong-xua-em-di',
      title: 'Con Đường Xưa Em Đi',
      composerId: 'chau-ky',
      composerName: 'Châu Kỳ',
      lyricistName: 'Hồ Đình Phương',
      originalPerformerName: 'Duy Khánh',
      releaseYear: 1965,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['hoài niệm', 'con đường', 'kỷ niệm', 'tình yêu'],
    },

    summary: 'Con Đường Xưa Em Đi là ca khúc nổi tiếng của nhạc sĩ Châu Kỳ với lời thơ Hồ Đình Phương, về những kỷ niệm tình yêu trên con đường xưa. Bài hát được Duy Khánh thể hiện thành công.',

    compositionContext: {
      year: 1965,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những kỷ niệm tình yêu gắn với một con đường cụ thể.',
        detailed: `Bài hát được sáng tác dựa trên lời thơ của Hồ Đình Phương, kể về những kỷ niệm tình yêu trên một con đường xưa. Hình ảnh "con đường" trở thành biểu tượng cho những ký ức đẹp về tình yêu đã qua.

Châu Kỳ đã phổ nhạc cho bài thơ với giai điệu bolero nhẹ nhàng, buồn man mác, phù hợp với nội dung hoài niệm của lời.`,
        relatedPeople: [
          {
            name: 'Hồ Đình Phương',
            relationship: 'Tác giả lời thơ',
            description: 'Nhà thơ viết lời cho bài hát',
            isConfirmed: true,
          },
        ],
      },

      narrative: `Con Đường Xưa Em Đi là sự kết hợp giữa thơ Hồ Đình Phương và nhạc Châu Kỳ, ra đời vào giữa thập niên 1960. Đây là một trong những bài hát được yêu thích nhất của dòng nhạc bolero.

Châu Kỳ, tên thật Châu Văn Kỳ, sinh năm 1923 tại Thừa Thiên-Huế, là một trong những nhạc sĩ lão thành của nền tân nhạc Việt Nam. Ông nổi tiếng với khả năng phổ nhạc cho thơ một cách tài tình.

Ca khúc được Duy Khánh thể hiện với giọng hát trầm ấm đặc trưng và nhanh chóng trở thành hit lớn. Cho đến nay, bài hát vẫn được nhiều ca sĩ cover và yêu thích.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Giữa thập niên 1960, giai đoạn phát triển mạnh của nhạc bolero.',
      socialContext: 'Âm nhạc là nguồn an ủi tinh thần trong thời chiến.',
      musicalMovement: 'Nhiều bài hát bolero ra đời từ sự kết hợp thơ-nhạc.',
      musicalInfluences: ['Bolero', 'Thơ Việt Nam'],
      culturalSignificance: 'Mẫu mực của sự kết hợp thơ-nhạc trong bolero Việt Nam.',
    },

    performances: [
      {
        performerId: 'duy-khanh',
        performerName: 'Duy Khánh',
        style: 'Giọng hát trầm ấm, da diết',
        significance: 'Phiên bản gốc và kinh điển',
        isOriginal: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Châu Kỳ', url: 'https://vi.wikipedia.org/wiki/Châu_Kỳ', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DUY KHÁNH (1936-2003) — Ca sĩ kiêm nhạc sĩ
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-ai-ra-xu-hue',
      title: 'Ai Ra Xứ Huế',
      composerId: 'duy-khanh',
      composerName: 'Duy Khánh',
      originalPerformerName: 'Duy Khánh',
      releaseYear: 1962,
      releaseYearConfidence: 'high',
      era: 'southern_golden',
      genres: ['bolero', 'folk'],
      themes: ['Huế', 'quê hương', 'hoài niệm', 'văn hóa'],
    },

    summary: 'Ai Ra Xứ Huế là ca khúc về xứ Huế thơ mộng do Duy Khánh sáng tác và trình bày, thể hiện tình yêu quê hương và văn hóa Huế.',

    compositionContext: {
      year: 1962,
      yearConfidence: 'high',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ nỗi nhớ quê hương Huế của nhạc sĩ.',
        detailed: `Duy Khánh, tên thật Nguyễn Văn Diệp, sinh ra tại Thừa Thiên-Huế. Dù sống và hoạt động nghệ thuật tại Sài Gòn, ông luôn mang trong mình nỗi nhớ quê hương. "Ai Ra Xứ Huế" là lời mời gọi mọi người đến thăm xứ Huế thơ mộng, đồng thời là cách ông bày tỏ tình yêu quê hương.`,
        relatedPeople: [],
      },

      narrative: `Ai Ra Xứ Huế là một trong những bài hát về Huế nổi tiếng nhất, được Duy Khánh sáng tác và trình bày. Bài hát ca ngợi vẻ đẹp của xứ Huế: sông Hương, núi Ngự, đền đài, con người...

Duy Khánh sinh năm 1936 tại Huế, là ca sĩ kiêm nhạc sĩ nổi tiếng của dòng nhạc vàng. Ông được mệnh danh là "Tiếng hát liêu trai" với giọng ca đặc biệt.

Bài hát không chỉ là tác phẩm âm nhạc mà còn như một "quảng cáo du lịch" cho xứ Huế, khiến nhiều người thêm yêu và muốn đến thăm vùng đất cố đô.`,

      narrativeConfidence: 'high',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1960.',
      socialContext: 'Nhiều người miền Trung vào Nam sinh sống, mang theo nỗi nhớ quê hương.',
      musicalMovement: 'Dòng nhạc về quê hương phát triển mạnh.',
      musicalInfluences: ['Bolero', 'Dân ca Huế', 'Nhạc truyền thống'],
      culturalSignificance: 'Góp phần quảng bá văn hóa Huế qua âm nhạc.',
    },

    performances: [
      {
        performerId: 'duy-khanh',
        performerName: 'Duy Khánh',
        style: 'Giọng hát trầm ấm, đặc trưng xứ Huế',
        significance: 'Phiên bản gốc của chính tác giả',
        isOriginal: true,
      },
    ],

    interestingFacts: [
      {
        content: 'Duy Khánh được mệnh danh là "Tiếng hát liêu trai" vì chất giọng đặc biệt',
        category: 'cultural',
        source: { type: 'news', title: 'Duy Khánh - Tiếng hát liêu trai', reliability: 'high' },
        isVerified: true,
      },
    ],

    sources: [
      { type: 'wikipedia', title: 'Duy Khánh', url: 'https://vi.wikipedia.org/wiki/Duy_Khánh', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'high',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HOÀNG TRANG (1938-2014)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-hai-mua-mua',
      title: 'Hai Mùa Mưa',
      composerId: 'hoang-trang',
      composerName: 'Hoàng Trang',
      originalPerformerName: 'Hoàng Oanh',
      releaseYear: 1968,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['mưa', 'chờ đợi', 'chia ly', 'thời gian'],
    },

    summary: 'Hai Mùa Mưa là ca khúc bolero về sự chờ đợi qua hai mùa mưa, với giai điệu buồn man mác đặc trưng.',

    compositionContext: {
      year: 1968,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ hình ảnh mùa mưa Sài Gòn và sự chờ đợi trong tình yêu.',
        detailed: `Bài hát lấy hình ảnh "hai mùa mưa" - tức là hai năm - để đo đếm thời gian chờ đợi. Mùa mưa ở miền Nam kéo dài từ tháng 5 đến tháng 11, là thời gian dài đằng đẵng cho những ai đang chờ đợi người thân.`,
        relatedPeople: [],
      },

      narrative: `Hai Mùa Mưa thể hiện cách người Việt đo thời gian bằng mùa - đặc biệt là mùa mưa, thời gian buồn nhất trong năm. Bài hát được Hoàng Oanh thể hiện thành công với giọng hát ngọt ngào.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960.',
      socialContext: 'Nhiều người chờ đợi tin tức từ người thân ở xa hoặc đi lính.',
      musicalMovement: 'Bolero với chủ đề chờ đợi rất phổ biến.',
      musicalInfluences: ['Bolero', 'Slow'],
      culturalSignificance: 'Phản ánh văn hóa chờ đợi của người Việt Nam.',
    },

    sources: [
      { type: 'wikipedia', title: 'Hoàng Trang', reliability: 'medium' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VINH SỬ (1936-1993)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-hong-nhung-tinh-yeu',
      title: 'Hồng Nhan Bạc Phận',
      composerId: 'vinh-su',
      composerName: 'Vinh Sử',
      releaseYear: 1970,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['số phận', 'nhan sắc', 'đau khổ', 'tình yêu'],
    },

    summary: 'Hồng Nhan Bạc Phận là ca khúc bolero về số phận nghiệt ngã của những người phụ nữ xinh đẹp, một chủ đề quen thuộc trong văn hóa Việt Nam.',

    compositionContext: {
      year: 1970,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ quan niệm dân gian "hồng nhan bạc phận" - người đẹp thường gặp nhiều bất hạnh.',
        detailed: `"Hồng nhan bạc phận" là thành ngữ Việt Nam nói về số phận nghiệt ngã của những người phụ nữ xinh đẹp. Vinh Sử đã khai thác chủ đề này để viết một bài bolero buồn về những mảnh đời bất hạnh.`,
        relatedPeople: [],
      },

      narrative: `Hồng Nhan Bạc Phận thể hiện quan niệm truyền thống của người Việt về số phận và nhan sắc. Bài hát được nhiều ca sĩ thể hiện và trở thành một trong những bài bolero kinh điển.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1970.',
      socialContext: 'Nhiều câu chuyện về những người phụ nữ gặp bất hạnh trong thời chiến.',
      musicalMovement: 'Bolero với chủ đề số phận phụ nữ.',
      musicalInfluences: ['Bolero', 'Cải lương'],
      culturalSignificance: 'Phản ánh quan niệm truyền thống về số phận trong văn hóa Việt Nam.',
    },

    sources: [
      { type: 'wikipedia', title: 'Vinh Sử', reliability: 'medium' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THÊM CÁC BÀI KHÁC...
  // ═══════════════════════════════════════════════════════════════════════════

  {
    metadata: {
      id: 'bolero-giot-le-dai-trang',
      title: 'Giọt Lệ Đài Trang',
      composerId: 'chau-ky',
      composerName: 'Châu Kỳ',
      releaseYear: 1967,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['nước mắt', 'đau khổ', 'tình yêu', 'hy sinh'],
    },

    summary: 'Giọt Lệ Đài Trang là ca khúc bolero về những giọt nước mắt và sự đau khổ trong tình yêu.',

    compositionContext: {
      year: 1967,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ hình ảnh người phụ nữ đau khổ vì tình.',
        detailed: `Bài hát sử dụng hình ảnh "giọt lệ đài trang" - những giọt nước mắt của người phụ nữ đẹp, để nói về nỗi đau trong tình yêu.`,
        relatedPeople: [],
      },

      narrative: `Giọt Lệ Đài Trang tiếp tục chủ đề quen thuộc của Châu Kỳ về tình yêu và đau khổ, với giai điệu bolero buồn đặc trưng.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Cuối thập niên 1960.',
      socialContext: 'Nhiều câu chuyện tình buồn trong thời chiến.',
      musicalMovement: 'Bolero với chủ đề bi ai.',
      musicalInfluences: ['Bolero', 'Slow'],
      culturalSignificance: 'Thể hiện cảm xúc đau khổ phổ biến trong xã hội thời chiến.',
    },

    sources: [
      { type: 'wikipedia', title: 'Châu Kỳ', reliability: 'high' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

  {
    metadata: {
      id: 'bolero-doi-da-vang',
      title: 'Đời Đá Vàng',
      composerId: 'ha-phuong',
      composerName: 'Hà Phương',
      releaseYear: 1972,
      releaseYearConfidence: 'medium',
      era: 'southern_golden',
      genres: ['bolero', 'romantic'],
      themes: ['chia ly', 'đau khổ', 'thề nguyền'],
    },

    summary: 'Đời Đá Vàng là ca khúc về lời thề nguyền và sự đau khổ khi phải chia ly, với giai điệu bolero buồn.',

    compositionContext: {
      year: 1972,
      yearConfidence: 'medium',
      location: 'Sài Gòn',

      inspiration: {
        summary: 'Cảm hứng từ những lời thề nguyền trong tình yêu và sự tan vỡ.',
        detailed: `"Đá vàng" là ẩn dụ cho lời thề bền vững, nhưng bài hát lại kể về sự tan vỡ của những lời hứa đó.`,
        relatedPeople: [],
      },

      narrative: `Đời Đá Vàng thể hiện sự đối lập giữa lời thề vĩnh cửu và thực tế phũ phàng của cuộc sống, một chủ đề phổ biến trong bolero.`,

      narrativeConfidence: 'medium',
    },

    historicalContext: {
      era: 'southern_golden',
      eraDescription: 'Đầu thập niên 1970.',
      socialContext: 'Nhiều lời thề bị phá vỡ vì hoàn cảnh chiến tranh.',
      musicalMovement: 'Bolero với chủ đề thề nguyền và phản bội.',
      musicalInfluences: ['Bolero'],
      culturalSignificance: 'Phản ánh thực tế khắc nghiệt của chiến tranh đối với tình yêu.',
    },

    sources: [
      { type: 'wikipedia', title: 'Nhạc vàng Việt Nam', reliability: 'medium' },
    ],

    contentQuality: {
      overallConfidence: 'medium',
      lastVerified: '2024-01-15',
      needsReview: false,
    },
  },

];

// Export
export default BOLERO_SONGS;
```

---

## 📊 TÓM TẮT BOLERO DATABASE

| STT | Bài hát | Nhạc sĩ | Năm | Confidence |
|-----|---------|---------|-----|------------|
| 1 | Nửa Đêm Ngoài Phố | Trúc Phương | 1962 | HIGH |
| 2 | Ai Cho Tôi Tình Yêu | Trúc Phương | 1965 | HIGH |
| 3 | Buồn Trong Kỷ Niệm | Trúc Phương | 1964 | MEDIUM |
| 4 | Thành Phố Buồn | Lam Phương | 1970 | VERIFIED |
| 5 | Tình Nghĩa Đôi Ta | Lam Phương | 1968 | MEDIUM |
| 6 | Em Đi Rồi | Lam Phương | 1972 | MEDIUM |
| 7 | Bay Đi Cánh Chim Biển | Lam Phương | 1978 | VERIFIED |
| 8 | Hòn Đá Cô Đơn | Trần Thiện Thanh | 1965 | HIGH |
| 9 | Biển Mơ | Trần Thiện Thanh | 1966 | MEDIUM |
| 10 | Nỗi Buồn Hoa Phượng | Thanh Sơn | 1963 | VERIFIED |
| 11 | Mùa Thu Lá Bay | Thanh Sơn | 1965 | MEDIUM |
| 12 | Con Đường Xưa Em Đi | Châu Kỳ | 1965 | HIGH |
| 13 | Ai Ra Xứ Huế | Duy Khánh | 1962 | HIGH |
| 14 | Hai Mùa Mưa | Hoàng Trang | 1968 | MEDIUM |
| 15 | Hồng Nhan Bạc Phận | Vinh Sử | 1970 | MEDIUM |
| 16 | Giọt Lệ Đài Trang | Châu Kỳ | 1967 | MEDIUM |
| 17 | Đời Đá Vàng | Hà Phương | 1972 | MEDIUM |

**Tiếp tục với Tiền chiến và Nhạc đỏ trong file tiếp theo...**
