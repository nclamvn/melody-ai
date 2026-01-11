# ═══════════════════════════════════════════════════════════════════════════════
#                    🏆 MELODY AI — COMMERCIAL GRADE SYSTEM
#                         COMPLETE IMPLEMENTATION GUIDE
#                              Version 3.0 — Production
# ═══════════════════════════════════════════════════════════════════════════════

---

## 📋 TỔNG QUAN HỆ THỐNG

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MELODY AI CONTENT ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │   CLIENT    │────▶│   API       │────▶│  SERVICES   │                   │
│  │   REQUEST   │     │   LAYER     │     │             │                   │
│  └─────────────┘     └─────────────┘     └──────┬──────┘                   │
│                                                 │                           │
│                      ┌──────────────────────────┼──────────────────────────┐│
│                      │                          ▼                          ││
│                      │    ┌─────────────────────────────────────────┐     ││
│                      │    │           CONTENT PIPELINE              │     ││
│                      │    ├─────────────────────────────────────────┤     ││
│                      │    │                                         │     ││
│                      │    │  1. LOCAL DATABASE (Fastest, Verified)  │     ││
│                      │    │     └── 100+ Vietnamese songs           │     ││
│                      │    │     └── Verified by experts             │     ││
│                      │    │     └── Confidence: VERIFIED            │     ││
│                      │    │                    │                    │     ││
│                      │    │                    ▼                    │     ││
│                      │    │  2. WEB SEARCH (Wikipedia + News)       │     ││
│                      │    │     └── Real-time data                  │     ││
│                      │    │     └── Multi-language support          │     ││
│                      │    │     └── Confidence: HIGH/MEDIUM         │     ││
│                      │    │                    │                    │     ││
│                      │    │                    ▼                    │     ││
│                      │    │  3. AI SYNTHESIS (GPT-4)                │     ││
│                      │    │     └── Enhanced prompts                │     ││
│                      │    │     └── Source attribution              │     ││
│                      │    │     └── Confidence: MEDIUM/LOW          │     ││
│                      │    │                    │                    │     ││
│                      │    │                    ▼                    │     ││
│                      │    │  4. FALLBACK (With disclaimer)          │     ││
│                      │    │     └── Request contribution            │     ││
│                      │    │     └── Confidence: UNKNOWN             │     ││
│                      │    │                                         │     ││
│                      │    └─────────────────────────────────────────┘     ││
│                      │                                                     ││
│                      └─────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    USER CONTRIBUTION SYSTEM                          │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                     │   │
│  │  [User] ──▶ [Submit] ──▶ [Validate] ──▶ [Queue] ──▶ [Moderate]    │   │
│  │                                              │           │          │   │
│  │                                              ▼           ▼          │   │
│  │                                         [Community]  [Expert]       │   │
│  │                                          [Voting]    [Review]       │   │
│  │                                              │           │          │   │
│  │                                              └─────┬─────┘          │   │
│  │                                                    ▼                │   │
│  │                                            [Approve/Reject]         │   │
│  │                                                    │                │   │
│  │                                                    ▼                │   │
│  │                                           [Merge to Database]       │   │
│  │                                                    │                │   │
│  │                                                    ▼                │   │
│  │                                          [Update Reputation]        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 COMPLETE FILE STRUCTURE

```
melody-ai/
├── lib/
│   ├── database/
│   │   ├── types.ts                    ← Type definitions
│   │   ├── songDatabase.ts             ← Main database service
│   │   ├── songs/
│   │   │   ├── prewar.ts               ← Nhạc tiền chiến (15+ songs)
│   │   │   ├── bolero.ts               ← Bolero/Nhạc vàng (30+ songs)
│   │   │   ├── trinh.ts                ← Nhạc Trịnh (20+ songs)
│   │   │   ├── redMusic.ts             ← Nhạc đỏ (15+ songs)
│   │   │   ├── modern.ts               ← Nhạc đương đại (15+ songs)
│   │   │   └── vpop.ts                 ← V-pop (10+ songs)
│   │   └── authors/
│   │       └── authorDatabase.ts       ← 50+ verified authors
│   │
│   ├── services/
│   │   └── webSearchService.ts         ← Wikipedia + News API
│   │
│   ├── contribution/
│   │   ├── types.ts                    ← Contribution types
│   │   ├── contributionService.ts      ← Main service
│   │   ├── moderationService.ts        ← Moderation queue
│   │   ├── reputationService.ts        ← User reputation
│   │   └── auditService.ts             ← Change tracking
│   │
│   └── prompts/
│       └── songStoryPrompt.ts          ← Enhanced AI prompts
│
├── app/
│   └── api/
│       ├── song-story/
│       │   └── route.ts                ← Main content API
│       └── contributions/
│           ├── route.ts                ← Submit contribution
│           ├── [id]/
│           │   ├── route.ts            ← Get/update
│           │   ├── vote/route.ts       ← Voting
│           │   └── approve/route.ts    ← Moderation
│           └── pending/route.ts        ← Queue
│
└── components/
    └── contribution/
        ├── ContributionForm.tsx        ← Submit form
        ├── ContributionList.tsx        ← List view
        └── ContributionReview.tsx      ← Moderator panel
```

---

## 🎯 CONFIDENCE LEVELS

| Level | Meaning | Source Requirements |
|-------|---------|---------------------|
| **VERIFIED** | Đã xác minh từ nhiều nguồn | Book + Interview + Documentary |
| **HIGH** | Nguồn đáng tin cậy | Book/Academic + News/Wikipedia |
| **MEDIUM** | Một nguồn hoặc cần kiểm chứng | Wikipedia only or single source |
| **LOW** | Thông tin chưa xác minh | Personal knowledge, oral |
| **UNKNOWN** | Không có thông tin | No sources available |

---

## 📊 DATABASE COVERAGE

| Era | Songs | Authors | Confidence |
|-----|-------|---------|------------|
| Tiền chiến (pre-1954) | 15+ | 10+ | VERIFIED |
| Bolero/Nhạc vàng | 30+ | 15+ | VERIFIED |
| Nhạc Trịnh | 20+ | 1 | VERIFIED |
| Nhạc đỏ | 15+ | 10+ | HIGH |
| Đương đại (1975-2000) | 15+ | 10+ | HIGH |
| V-pop (2000+) | 10+ | 5+ | MEDIUM |
| **TOTAL** | **100+** | **50+** | — |

---

## 🔐 REPUTATION SYSTEM

### Roles & Thresholds

| Role | Points | Privileges |
|------|--------|------------|
| User | 0+ | Submit contributions |
| Contributor | 50+ | Faster review queue |
| Trusted | 200+ | Auto-approve simple edits |
| Expert | 500+ | Review other contributions |
| Moderator | Manual | Full moderation access |
| Admin | Manual | System administration |

### Points Earned

| Action | Points |
|--------|--------|
| Contribution approved | +10 to +40 |
| Contribution merged | +20 |
| Community upvotes (5+) | +5 |
| Quality sources bonus | +5 per source |
| Contribution rejected | -10 (if inaccurate) |

### Badges

- 🏅 Người Đóng Góp Đầu Tiên
- 🎖️ Siêng Năng (10+ contributions)
- ✅ Chính Xác (90%+ approval rate)
- 📚 Bậc Thầy Nguồn
- 🎵 Chuyên Gia Bolero
- 🎹 Chuyên Gia Nhạc Trịnh
- 📜 Sử Gia Tiền Chiến

---

## 🚀 DEPLOYMENT CHECKLIST

### Phase 1: Database Setup
- [ ] Create database schema (PostgreSQL/MongoDB)
- [ ] Import verified song data
- [ ] Import author data
- [ ] Set up indexes for search

### Phase 2: API Integration
- [ ] Deploy Song Story API
- [ ] Configure OpenAI API key
- [ ] Set up Wikipedia API caching
- [ ] Rate limiting configuration

### Phase 3: Contribution System
- [ ] Deploy contribution APIs
- [ ] Set up moderation queue
- [ ] Configure email notifications
- [ ] Create admin dashboard

### Phase 4: Quality Assurance
- [ ] Test all 100+ songs
- [ ] Verify source links
- [ ] Test contribution workflow
- [ ] Load testing

### Phase 5: Launch
- [ ] Soft launch with beta users
- [ ] Monitor error rates
- [ ] Gather feedback
- [ ] Full public launch

---

## 📈 METRICS TO TRACK

### Content Quality
- Confidence level distribution
- Source quality scores
- User feedback ratings

### Contribution System
- Submissions per day/week
- Approval rate
- Average review time
- Top contributors

### User Engagement
- Story views per song
- Time spent reading
- Share rate
- Return visits

---

## 🔧 MAINTENANCE

### Weekly Tasks
- Review pending contributions
- Update trending songs data
- Check broken source links

### Monthly Tasks
- Verify random sample of entries
- Update reputation leaderboard
- Review flagged content

### Quarterly Tasks
- Add new song entries
- Audit historical accuracy
- Update AI prompts if needed

---

## 📞 SUPPORT

### For Users
- FAQ page for contribution guidelines
- Example contributions
- Contact form for questions

### For Moderators
- Moderation guidelines document
- Decision templates
- Escalation process

### For Developers
- API documentation
- Database schema
- Deployment guide

---

# ═══════════════════════════════════════════════════════════════════════════════
#                         END OF IMPLEMENTATION GUIDE
# ═══════════════════════════════════════════════════════════════════════════════
