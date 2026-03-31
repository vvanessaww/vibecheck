const base = import.meta.env.BASE_URL;

export const HEADLINER_OPTIONS = [
  { id: 'h1', name: ['Sabrina', 'Carpenter'], gradient: 'from-pink-500 via-yellow-300 to-sky-300', image: `${base}artists/sabrina-carpenter.png`, weights: { influencer: 3, feels: 2 } },
  { id: 'h2', name: ['Justin', 'Bieber'], gradient: 'from-purple-600 via-indigo-500 to-gray-400', image: `${base}artists/justin-bieber.png`, weights: { feels: 3, quasar: 2 } },
  { id: 'h3', name: ['Karol G'], gradient: 'from-teal-400 via-emerald-500 to-yellow-200', image: `${base}artists/karol-g.png`, weights: { sahara: 2, dolab: 2 } },
];

export const THIS_OR_THAT = [
  { id: 'tt1', left: { name: 'Headliner Set', weights: { feels: 2, scientist: 1 } }, right: { name: 'Do Lab Surprise', weights: { dolab: 3 } } },
  { id: 'tt2', left: { name: 'Sahara All Night', weights: { sahara: 3 } }, right: { name: 'Outdoor Theatre Sunset', weights: { feels: 3 } } },
  { id: 'tt3', left: { name: 'Plan Every Minute', weights: { scientist: 3 } }, right: { name: 'Wander Freely', weights: { dolab: 2, quasar: 1 } } },
];

export const SWIPE_CARDS = [
  { id: 's1', text: 'Riding the rail for your favorite headliner?', yesWeights: { feels: 2, scientist: 1 }, noWeights: { dolab: 1, campground: 1 } },
  { id: 's2', text: 'Outfit changes planned for every sunset?', yesWeights: { influencer: 3 }, noWeights: { campground: 1, scientist: 1 } },
  { id: 's5', text: 'Front row for the surprise guest set?', yesWeights: { dolab: 2, quasar: 1 }, noWeights: { influencer: 1, campground: 1 } },
  { id: 's6', text: 'Staying until the very last act plays?', yesWeights: { sahara: 2, campground: 2 }, noWeights: { scientist: 1 } },
];

export const GENRE_SLIDERS = [
  { id: 'g1', left: { label: 'Lover Girl Ballads', persona: 'feels' }, right: { label: 'Weird & Experimental', persona: 'dolab' } },
  { id: 'g2', left: { label: 'Mosh Pit Energy', persona: 'campground' }, right: { label: 'Main Stage Pop', persona: 'influencer' } },
  { id: 'g3', left: { label: 'Exploring the Campgrounds', persona: 'campground' }, right: { label: 'Pics at the Pop-Ups', persona: 'quasar' } },
];

export const VIBE_CHECK_QUESTIONS = [
  {
    id: 'v1',
    question: "What's your base camp?",
    options: [
      { label: 'Camping', emoji: '🏕️', weights: { campground: 3 } },
      { label: 'Hotel', emoji: '🏨', weights: { influencer: 2, scientist: 1 } },
      { label: 'Airbnb', emoji: '🏠', weights: { feels: 1, dolab: 1 } },
      { label: 'Day Trip', emoji: '🚗', weights: { scientist: 2 } },
    ],
  },
  {
    id: 'v2',
    question: 'Your outfit energy?',
    options: [
      { label: 'Y2K 4ever', emoji: '💿', weights: { influencer: 3 } },
      { label: 'Boho Vibes', emoji: '🌸', weights: { feels: 2, dolab: 1 } },
      { label: 'Rave Bae', emoji: '⚡', weights: { sahara: 3 } },
      { label: 'Comfort First', emoji: '👟', weights: { scientist: 2, campground: 1 } },
    ],
  },
  {
    id: 'v4',
    question: 'How many years have you gone to Coachella? (including this one)',
    options: [
      { label: 'First one!', emoji: '🐣', weights: { quasar: 3 } },
      { label: '2-3', emoji: '✌️', weights: { feels: 1, influencer: 1 } },
      { label: '4-6', emoji: '🔥', weights: { scientist: 2, sahara: 1 } },
      { label: 'Lost count', emoji: '💀', weights: { campground: 2, dolab: 1 } },
    ],
  },
];

export const HOT_TAKES = [
  { id: 'ht1', text: 'The Yuma tent is the most underrated stage', agreeWeights: { scientist: 3 }, disagreeWeights: { sahara: 2, influencer: 1 } },
  { id: 'ht2', text: 'Camping is the only way to do Coachella', agreeWeights: { campground: 3 }, disagreeWeights: { influencer: 2 } },
  { id: 'ht4', text: 'Outfit changes planned for every sunset?', agreeWeights: { influencer: 2, quasar: 1 }, disagreeWeights: { campground: 1, scientist: 1 } },
  { id: 'ht6', text: 'Staying until the very last act plays?', agreeWeights: { sahara: 2, campground: 2 }, disagreeWeights: { scientist: 1 } },
  { id: 'ht7', text: "You don't need to know the lineup to have the best time", agreeWeights: { quasar: 3, dolab: 1 }, disagreeWeights: { scientist: 2 } },
];
