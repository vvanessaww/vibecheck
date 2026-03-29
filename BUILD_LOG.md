# Vibecheck: Build Log

**From zero to production in 2 days (March 27-28, 2026)**
109 commits, 40 source files, ~13,000 lines of code

---

## Phase 1: Scaffolding & Data Layer

Set up the project foundation:

- Vite + React + Tailwind CSS + Framer Motion
- Phone-frame layout system (Header, Footer, Divider components)
- 7 festival persona definitions (Sahara, Outdoor Theatre, Do Lab, Main Stage, Campground, Mojave, Quasar)
- Full 2026 Coachella lineup data across Friday/Saturday/Sunday with per-artist persona weights
- Quiz state machine hook (`useQuiz`) managing screen flow, scoring, and answer tracking
- Scoring engine that tallies weights across all rounds and picks the winning persona

## Phase 2: Quiz Screens (7 rounds)

Built each quiz screen with unique interaction patterns:

1. **Headliner Showdown** — horizontal scroll carousel with snap-to-center, artist photos, arrow navigation. Pick your most anticipated headliner (Sabrina Carpenter / Justin Bieber / Karol G)
2. **This or That** — two stacked cards with VS divider. Losing card slides toward the winner and fades out. 3 rounds of festival dilemmas (Sahara All Night vs Outdoor Theatre Sunset, etc.)
3. **Genre Spectrum** — gradient sliders between opposing vibes (Lover Girl Ballads vs Heavy Hitting House, Mosh Pit Energy vs Main Stage Pop, Weird & Wonderful vs Perfectly Curated)
4. **Vibe Check** — 2x2 emoji card grid for festival lifestyle questions (base camp, outfit energy, how many years attending)
5. **Hot Takes** — swipeable agree/disagree cards with green/red swipe animations (The Sahara is overrated, Camping is the only way, etc.)
6. **Day Draft** — scrollable lineup list for each of the 3 days. Pick your must-see artists from the real 2026 lineup. No limit on picks.
7. **Loading Screen** — vinyl record spin animation while persona is calculated

## Phase 3: Results & Sharing

- **Result Screen** — stage name with glow animation, persona title, subtitle quote, traits, and artist recommendations spread across all 3 days
- **Share Card** — 9:16 IG story format card drawn directly on Canvas API for reliable PNG export across all browsers. Includes teal-to-dark gradient, stars, mountain silhouette, persona details, and branding
- **Export** — native share sheet on mobile (saves to camera roll, shares to IG), direct PNG download on desktop
- **Challenge a Friend** — copies a short URL with your player ID so friends can take the quiz and compare

## Phase 4: Squad Chemistry (2-Player Mode)

- **Challenge URLs** — `?c=<uuid>` links that encode your results in Supabase
- **Chemistry scoring** — calculates compatibility from shared artist picks (60%), persona compatibility matrix (25%), and a base floor (15%)
- **CompareScreen** — animated side-by-side persona comparison with circular score gauge, mutual sets display, and score-range messages (7 tiers from "basically the same person" to "are you sure you're going to the same festival?")
- **Chain sharing** — when the recipient shares, they become the challenger for the next person

## Phase 5: Backend & Persistence

- **Supabase integration** — `players` table stores quiz results, `challenges` table links pairs, `screen_events` table tracks funnel drop-off
- **Session persistence** — `sessionStorage` saves quiz state so refreshing or accidentally going back doesn't lose progress
- **Screen tracking** — every screen transition logged with a session UUID for drop-off analysis
- **Graceful degradation** — app works fully offline if Supabase is unavailable

## Phase 6: Visual Design & Polish

- **Illustrated footer** — SVG palm trees, Spectra rainbow tower, Ferris wheel (animated spin), Sahara tent, Main Stage, desert plants, ground flowers, stage tents with flags
- **Day/night sky** — gradient background with stars, moon, and atmospheric depth
- **Ambient audio** — Web Audio API generates a festival bass thump (~128 BPM sub-bass pulse). Starts on first tap, mute toggle in top-right corner. Required flattening the AudioContext creation into the synchronous tap handler for iOS Safari compatibility
- **Animations throughout** — fade-ins, slide transitions, scale effects, glow pulses, hover states on every interactive element
- **Mobile-first** — locked viewport (no scroll bounce), safe-area-inset support, touch-optimized tap targets

## Phase 7: Production Hardening

- **Vercel deployment** with `base: '/vibecheck/'` for subpath hosting at vanessazwang.com/vibecheck
- **SPA routing** via vercel.json rewrites so challenge URLs work on refresh
- **OG meta tags** — og:image, twitter:card for social sharing previews
- **Error boundary** — catches React crashes with a friendly restart screen
- **Clipboard fallback** — textarea execCommand for non-HTTPS contexts
- **Image export journey** — tried html2canvas (failed on CSS), html-to-image (blank renders), landed on direct Canvas drawing for 100% reliability
- Fixed pointer-events layering so footer links (x, github, linkedin) are clickable through the main content area
- Base-URL-aware asset paths so headliner images load from the /vibecheck/ subpath

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Audio | Web Audio API |
| Database | Supabase (PostgreSQL + RLS) |
| Image Export | Canvas API |
| Hosting | Vercel |
| Fonts | Oswald, Inter, Caveat |

## Key Decisions

- **No auth** — viral quiz needs zero friction. Supabase anon key with RLS is sufficient
- **Canvas-drawn share card** — DOM-to-image libraries can't handle modern CSS reliably. Drawing directly on canvas is ugly code but works everywhere
- **SessionStorage over localStorage** — quiz state should reset between visits, not persist forever
- **Web Audio API over audio files** — zero network requests, instant playback, no CORS issues, tiny footprint
- **Unlimited day draft picks** — originally capped at 5, removed the limit to reduce friction and let people express their full lineup preferences
