export const FRIDAY_LINEUP = [
  { id: 'f1', name: 'LCD Soundsystem', time: '11:00 PM', stage: 'Main Stage', weights: { feels: 2, dolab: 1 } },
  { id: 'f2', name: 'Peggy Gou', time: '9:30 PM', stage: 'Sahara', weights: { sahara: 3 } },
  { id: 'f3', name: 'Justice', time: '8:15 PM', stage: 'Outdoor Theatre', weights: { feels: 2, sahara: 1 } },
  { id: 'f4', name: 'Deftones', time: '7:00 PM', stage: 'Main Stage', weights: { campground: 2 } },
  { id: 'f5', name: 'Bicep', time: '6:30 PM', stage: 'Mojave', weights: { sahara: 2, dolab: 1 } },
  { id: 'f6', name: 'Jungle', time: '5:00 PM', stage: 'Outdoor Theatre', weights: { feels: 2, influencer: 1 } },
  { id: 'f7', name: "L'Impératrice", time: '4:15 PM', stage: 'Gobi', weights: { dolab: 2, feels: 1 } },
  { id: 'f8', name: 'Clown Core', time: '3:00 PM', stage: 'Sonora', weights: { dolab: 3 } },
  { id: 'f9', name: 'Neil Frances', time: '2:00 PM', stage: 'Mojave', weights: { dolab: 2, campground: 1 } },
];

export const ARTIST_RECOMMENDATIONS = {
  sahara: [
    { name: 'Peggy Gou', stage: 'Sahara', day: 'Friday' },
    { name: 'Bicep', stage: 'Mojave', day: 'Friday' },
    { name: 'Nia Archives', stage: 'Sahara', day: 'Saturday' },
  ],
  feels: [
    { name: 'Jungle', stage: 'Outdoor Theatre', day: 'Friday' },
    { name: "L'Impératrice", stage: 'Gobi', day: 'Friday' },
    { name: 'LCD Soundsystem', stage: 'Main Stage', day: 'Friday' },
  ],
  dolab: [
    { name: 'Clown Core', stage: 'Sonora', day: 'Friday' },
    { name: 'Neil Frances', stage: 'Mojave', day: 'Friday' },
    { name: "L'Impératrice", stage: 'Gobi', day: 'Friday' },
  ],
  influencer: [
    { name: 'Jungle', stage: 'Outdoor Theatre', day: 'Friday' },
    { name: 'Sabrina Carpenter', stage: 'Main Stage', day: 'Saturday' },
    { name: 'Peggy Gou', stage: 'Sahara', day: 'Friday' },
  ],
  campground: [
    { name: 'Deftones', stage: 'Main Stage', day: 'Friday' },
    { name: 'Neil Frances', stage: 'Mojave', day: 'Friday' },
    { name: 'Clown Core', stage: 'Sonora', day: 'Friday' },
  ],
  scientist: [
    { name: 'LCD Soundsystem', stage: 'Main Stage', day: 'Friday' },
    { name: 'Justice', stage: 'Outdoor Theatre', day: 'Friday' },
    { name: 'Bicep', stage: 'Mojave', day: 'Friday' },
  ],
};
