export const HEADLINER_OPTIONS = [
  { id: 'h1', name: ['Sabrina', 'Carpenter'], gradient: 'from-pink-500 via-yellow-300 to-sky-300', weights: { influencer: 3, feels: 2 } },
  { id: 'h2', name: ['Justin', 'Bieber'], gradient: 'from-purple-600 via-indigo-500 to-gray-400', weights: { feels: 3, campground: 1 } },
  { id: 'h3', name: ['Karol G'], gradient: 'from-teal-400 via-emerald-500 to-yellow-200', weights: { sahara: 2, dolab: 2 } },
];

export const THIS_OR_THAT = [
  { id: 'tt1', left: { name: 'Headliner Set', weights: { feels: 2, scientist: 1 } }, right: { name: 'Do Lab Surprise', weights: { dolab: 3 } } },
  { id: 'tt2', left: { name: 'Sahara All Night', weights: { sahara: 3 } }, right: { name: 'Outdoor Theatre Sunset', weights: { feels: 3 } } },
  { id: 'tt3', left: { name: 'Plan Every Minute', weights: { scientist: 3 } }, right: { name: 'Wander Freely', weights: { dolab: 2, campground: 1 } } },
];

export const SWIPE_CARDS = [
  { id: 's1', text: 'Riding the rail for your favorite headliner?', yesWeights: { feels: 2, scientist: 1 }, noWeights: { dolab: 1, campground: 1 } },
  { id: 's2', text: 'Outfit changes planned for every sunset?', yesWeights: { influencer: 3 }, noWeights: { campground: 1, scientist: 1 } },
  { id: 's3', text: 'Barefoot dancing in the art installations?', yesWeights: { dolab: 2, feels: 1 }, noWeights: { scientist: 1, influencer: 1 } },
  { id: 's4', text: 'Midnight spicy pie is a non-negotiable?', yesWeights: { campground: 2, sahara: 1 }, noWeights: { influencer: 1 } },
  { id: 's5', text: 'Front row for the surprise guest set?', yesWeights: { dolab: 2, sahara: 1 }, noWeights: { influencer: 1, campground: 1 } },
  { id: 's6', text: 'Staying until the very last act plays?', yesWeights: { sahara: 2, campground: 2 }, noWeights: { scientist: 1 } },
];

export const GENRE_SLIDERS = [
  { id: 'g1', left: { label: 'Hip-Hop', persona: 'campground' }, right: { label: 'House', persona: 'sahara' } },
  { id: 'g2', left: { label: 'Indie', persona: 'feels' }, right: { label: 'EDM', persona: 'sahara' } },
  { id: 'g3', left: { label: 'Pop', persona: 'influencer' }, right: { label: 'Experimental', persona: 'dolab' } },
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
      { label: 'Y2K', emoji: '💿', weights: { influencer: 3 } },
      { label: 'Boho', emoji: '🌸', weights: { feels: 2, dolab: 1 } },
      { label: 'Rave', emoji: '⚡', weights: { sahara: 3 } },
      { label: 'Comfort', emoji: '👟', weights: { scientist: 2, campground: 1 } },
    ],
  },
  {
    id: 'v3',
    question: 'When do you arrive?',
    options: [
      { label: 'Gates Open', emoji: '🏃', weights: { scientist: 3 } },
      { label: 'Golden Hour', emoji: '🌅', weights: { feels: 2, influencer: 1 } },
      { label: 'Headliners Only', emoji: '🌙', weights: { sahara: 1, campground: 1 } },
      { label: 'Whenever', emoji: '🤷', weights: { dolab: 2, campground: 1 } },
    ],
  },
];

export const HOT_TAKES = [
  { id: 'ht1', text: 'The Sahara tent is overrated', agreeWeights: { dolab: 2, feels: 1 }, disagreeWeights: { sahara: 3 } },
  { id: 'ht2', text: 'Sunday headliner is always the weakest', agreeWeights: { scientist: 1, campground: 1 }, disagreeWeights: { feels: 2 } },
  { id: 'ht3', text: 'Spicy Pie is mid', agreeWeights: { influencer: 1, scientist: 1 }, disagreeWeights: { campground: 2, sahara: 1 } },
  { id: 'ht4', text: 'The Do Lab is the real main stage', agreeWeights: { dolab: 3 }, disagreeWeights: { feels: 1, influencer: 1 } },
  { id: 'ht5', text: 'Camping is the only way to do Coachella', agreeWeights: { campground: 3 }, disagreeWeights: { influencer: 2 } },
];
