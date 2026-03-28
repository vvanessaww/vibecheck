const PERSONAS = {
  sahara: {
    id: 'sahara',
    stage: 'Sahara',
    title: 'The Drop Chaser',
    subtitle: "Lost in the bass… but you'll probably find them in the strobe lights",
    traits: ['Glitter & Sweat', '2AM Energy', 'Unreleased Remixes', 'Strobe Light Dweller', 'Bass Face Expert', 'Sahara Native'],
    description: "Lives in the Sahara tent, knows every DJ's unreleased remix, emerges at 2am covered in glitter and sweat.",
  },
  feels: {
    id: 'feels',
    stage: 'Outdoor Theatre',
    title: 'The One in Their Feels',
    subtitle: 'Who said Coachella is just for hype?',
    traits: ['Sunset Crier', 'Golden Hour', 'Ferris Wheel Kiss', '400 Sky Photos', 'Outdoor Theatre Regular', 'Ballad Lover'],
    description: 'Always at the Outdoor Theatre for the magic hour set, has 400 photos of the same (gorgeous) sky, cries during the slow songs, will say yes to a ferris wheel kiss no matter how cheesy it might be.',
  },
  dolab: {
    id: 'dolab',
    stage: 'Do Lab',
    title: 'The Do Lab Rat',
    subtitle: 'Everyone knows the poster lineup is just a suggestion',
    traits: ['Surprise Set Hunter', 'Water Fight Veteran', '12 New Artists', 'Headliner Skipper', 'Guest Set Oracle', 'Off-Grid Explorer'],
    description: "Skips headliners for surprise Do Lab sets, knows who's bringing what guest, discovered 12 new artists and none were on the poster.",
  },
  influencer: {
    id: 'influencer',
    stage: 'Main Stage',
    title: 'The Influencer on Main',
    subtitle: 'Came for the content, stayed for the vibes',
    traits: ['3 Outfit Changes', 'Photo Wall Expert', 'Aesthetic Mapper', 'Content Creator', 'Brand Activation Regular', 'Golden Hour Selfie'],
    description: 'Three outfit changes minimum, knows every photo wall location, has the festival mapped by aesthetic (who needs set times when there are photos to be taken).',
  },
  campground: {
    id: 'campground',
    stage: 'Mojave',
    title: 'The Campground Legend',
    subtitle: 'The real festival is back at the tents',
    traits: ['4AM Still Going', 'Silent Disco Regular', 'Outside Boys Energy', 'Campsite Social Chair', 'Sunrise Set Witness', 'Neighbor Befriender'],
    description: 'Still going at 4am in the campground, knows the silent disco schedule by heart, our real-life Outside Boys.',
  },
  scientist: {
    id: 'scientist',
    stage: 'Yuma',
    title: 'The Set Time Scientist',
    subtitle: "I have a spreadsheet and I'm not afraid to use it",
    traits: ['Optimized Routes', 'Overlap Calculator', 'Portable Charger & Fan', 'Reddit Researcher', 'Schedule Spreadsheet', 'Strategic Napper'],
    description: 'Optimized walking routes between stages, calculated overlap buffers to the minute, carries a portable charger and fan for the group (just like the Yuma has AC), probably checked reddit before every set.',
  },
  quasar: {
    id: 'quasar',
    stage: 'Quasar',
    title: 'The New Kid on the Block',
    subtitle: 'First year energy, zero chill, maximum discovery',
    traits: ['First Timer Energy', 'Said Yes to Everything', 'Lost 3 Times Already', 'Overpacked', 'Group Chat MVP', 'Main Character Moment'],
    description: "Everything is new, everything is exciting, everything is the best thing they've ever seen. Asked 'wait who IS that?' at least 12 times and meant it every single time.",
  },
};

export const PERSONA_IDS = Object.keys(PERSONAS);

export function getPersona(id) {
  return PERSONAS[id] ?? PERSONAS.sahara;
}

export default PERSONAS;
