import { FRIDAY_LINEUP, SATURDAY_LINEUP, SUNDAY_LINEUP } from './lineup';

const ALL_ARTISTS = [...FRIDAY_LINEUP, ...SATURDAY_LINEUP, ...SUNDAY_LINEUP];

function getArtistById(id) {
  return ALL_ARTISTS.find((a) => a.id === id);
}

/**
 * Flatten dayPicks (array of 3 arrays) into a single set of artist IDs.
 */
function flattenPicks(dayPicks) {
  if (!dayPicks || !Array.isArray(dayPicks)) return new Set();
  return new Set(dayPicks.flat());
}

/**
 * Calculate Coachella Chemistry between two players.
 * Returns { score, mutualArtists, blurb }
 */
export function calculateChemistry(myData, challengerData) {
  const myPicks = flattenPicks(myData.dayPicks);
  const theirPicks = flattenPicks(challengerData.dayPicks);

  // Find mutual artists
  const mutualIds = [...myPicks].filter((id) => theirPicks.has(id));
  const mutualArtists = mutualIds
    .map(getArtistById)
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Chemistry score: mutual picks (0-60) + persona compat (0-25) + base (15)
  // Use average of both pick counts as denominator for fairness
  const avgPicks = (myPicks.size + theirPicks.size) / 2 || 1;
  const pickScore = Math.min((mutualIds.length / avgPicks) * 60, 60);

  const personaScore = getPersonaCompatibility(myData.personaId, challengerData.personaId) * 25;

  // Floor of 15 — you're both at Coachella, that's already chemistry
  const raw = 15 + pickScore + personaScore;
  const score = Math.min(Math.round(raw), 99);

  const blurb = getCompatibilityBlurb(myData.personaId, challengerData.personaId);

  return { score, mutualArtists, blurb };
}

/**
 * Persona compatibility: 0-1 scale.
 * Same persona = 1.0, compatible = 0.7, neutral = 0.4, opposite = 0.2
 */
const COMPAT_MATRIX = {
  sahara: { sahara: 1.0, feels: 0.3, dolab: 0.8, influencer: 0.5, campground: 0.6, scientist: 0.2, quasar: 0.7 },
  feels: { sahara: 0.3, feels: 1.0, dolab: 0.4, influencer: 0.6, campground: 0.5, scientist: 0.4, quasar: 0.5 },
  dolab: { sahara: 0.8, dolab: 1.0, feels: 0.4, influencer: 0.2, campground: 0.7, scientist: 0.3, quasar: 0.8 },
  influencer: { sahara: 0.5, feels: 0.6, dolab: 0.2, influencer: 1.0, campground: 0.3, scientist: 0.5, quasar: 0.6 },
  campground: { sahara: 0.6, feels: 0.5, dolab: 0.7, influencer: 0.3, campground: 1.0, scientist: 0.4, quasar: 0.7 },
  scientist: { sahara: 0.2, feels: 0.4, dolab: 0.3, influencer: 0.5, campground: 0.4, scientist: 1.0, quasar: 0.5 },
  quasar: { sahara: 0.7, feels: 0.5, dolab: 0.8, influencer: 0.6, campground: 0.7, scientist: 0.5, quasar: 1.0 },
};

function getPersonaCompatibility(a, b) {
  return COMPAT_MATRIX[a]?.[b] ?? 0.4;
}

/**
 * Fun blurb for each persona pairing.
 */
const BLURBS = {
  'sahara+sahara': "You'll both be lost in the Sahara until 3AM and neither of you will want to leave",
  'sahara+feels': "One of you is crying at Outdoor Theatre while the other is fist-pumping in Sahara — meet at the Ferris wheel?",
  'sahara+dolab': "Chaos duo — you'll both skip headliners and end up at some secret set nobody else knows about",
  'sahara+influencer': "One's there for the bass, one's there for the 'gram — but you'll both look good doing it",
  'sahara+campground': "The after-party alliance — you'll close down both the tent AND the campground",
  'sahara+scientist': "They planned the route, you ignored it — somehow you still ended up at the same stage",
  'sahara+quasar': "You're about to give this rookie the best worst decisions of their first Coachella",
  'feels+feels': "Bring tissues — you're both going to cry during the sunset set and it's going to be beautiful",
  'feels+dolab': "Emotional range: vibing to ambient beats at Do Lab then sobbing at Outdoor Theatre 20 minutes later",
  'feels+influencer': "They'll get the photo, you'll get the feelings — together you'll get the perfect IG story",
  'feels+campground': "Late night campground heart-to-hearts after an emotional set? This is the duo that bonds for life",
  'feels+scientist': "They have the schedule, you have the emotional radar — together you'll never miss a magical moment",
  'feels+quasar': "You're about to show this first-timer what it means to truly FEEL Coachella",
  'dolab+dolab': "Two Do Lab Rats? You'll discover 20 new artists and remember maybe 3 of their names",
  'dolab+influencer': "Honestly? Chaotic. One wants the surprise set, one wants the trending set. Good luck",
  'dolab+campground': "The off-grid alliance — you'll find the secret stages AND the secret after-parties",
  'dolab+scientist': "They want to optimize, you want to wander — expect creative tension and accidental discoveries",
  'dolab+quasar': "You're the perfect Coachella mentor — 'forget the poster, follow the vibes'",
  'influencer+influencer': "3 outfit changes each, 6 photo walls total, zero sets watched — but the content will be fire",
  'influencer+campground': "Opposite energy but weirdly complementary — they know the spots, you know the angles",
  'influencer+scientist': "The planner meets the poster child — efficient AND aesthetic. Unstoppable duo",
  'influencer+quasar': "You're going to make their first Coachella the most documented weekend of their life",
  'campground+campground': "The campground legends — everyone at your site is having the best weekend because of you two",
  'campground+scientist': "One runs the campground vibes, one runs the schedule — the group needs both of you",
  'campground+quasar': "You're going to adopt this first-timer and show them the real festival happens back at camp",
  'scientist+scientist': "Two spreadsheets, zero conflicts, maximum efficiency. You were made for this",
  'scientist+quasar': "They have no plan, you have THE plan — this is going to be the most organized first Coachella ever",
  'quasar+quasar': "Two first-timers? Everything will be chaos and everything will be the best thing you've ever seen",
};

function getCompatibilityBlurb(a, b) {
  const key1 = `${a}+${b}`;
  const key2 = `${b}+${a}`;
  return BLURBS[key1] || BLURBS[key2] || "Different vibes, same festival — you'll make it work";
}

/**
 * Score-range messages shown on the CompareScreen.
 */
export function getScoreMessage(score, name1, name2) {
  if (score >= 90) {
    return `${name1} and ${name2} are basically the same person. Just share a wristband at this point`;
  }
  if (score >= 75) {
    return `${name1} and ${name2} are going to be inseparable all weekend — same stages, same energy, same sunburn`;
  }
  if (score >= 60) {
    return `${name1} and ${name2} have serious overlap — you'll keep running into each other whether you plan to or not`;
  }
  if (score >= 45) {
    return `${name1} and ${name2} will split up for a few hours and have the best recap conversations after`;
  }
  if (score >= 30) {
    return `${name1} and ${name2} are on different wavelengths but that's what makes the group chat interesting`;
  }
  if (score >= 15) {
    return `${name1} and ${name2} probably won't see each other during the festival... but opposites attract?`;
  }
  return `${name1} and ${name2} are attending two completely different festivals on the same polo field`;
}
