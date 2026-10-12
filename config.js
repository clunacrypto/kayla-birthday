// ✏️ Everything personal lives in this file. Edit freely; the rest of the site reads from here.
const CONFIG = Object.freeze({
  herName: 'Kayla',
  fromName: 'Carsen',
  age: 22,
  metOn: '2026-03-23',

  // Lock screen: angel numbers ✨
  passcode: '777',
  passcodeHint: 'You are the luckiest',

  // Paste Spotify track or YouTube links here
  songs: [
    'https://youtu.be/-lLvtydTM78', // Perfect Two (the version she loved)
  ],

  songNote: "Your middle school favorite, the one you played over and over again in your grandma's car. Now every time I hear it, I think of you, and I can't stop smiling.",

  // First 3 = hero collage, the rest get pinned to the "All About Kayla" board
  photos: [
    { src: 'photos/us-cafe.jpg', caption: 'Us ♡', pos: '56% 40%' },
    { src: 'photos/mirror.jpg', caption: 'My princess' },
    { src: 'photos/bakery.jpg', caption: 'Exploring together', pos: '88% 45%' },
    { src: 'photos/little-valentine.jpg', caption: 'A valentine since day one' },
    { src: 'photos/us-silly.jpg', caption: 'Us being normal' },
    { src: 'photos/little-kayla.jpg', caption: 'Little princess' },
    { src: 'photos/plankton.jpg', caption: 'Her favorite meme', fit: 'square' },
  ],
  constellationPhoto: null,
  minecraftSkin: 'photos/skin.png',
  reactions: { no: 'photos/chihuahua.jpg', yes: 'photos/flug.png' },

  letter: [
    'Happy birthday, princess.',
    "I can't be there to tell you happy birthday in person, so I built you this instead.",
    "Ever since March 23rd, you've made every day my favorite day. You're the prettiest, smartest, funniest, most whimsical person that will ever exist, and you have the most beautiful soul. You light up every room, even the ones I only get to see through a phone screen.",
    "I love your laugh, your smile, your eyes, your nose, your hair, your perfect press-ons, the way you smell like a whole bakery (I'm so lucky I get reminded every time I smell the hoodie), every one of the seven moles on your face (yes, I remember), and the list goes on.",
    "The distance is temporary. What we have isn't.",
    'Happy 22nd, Kayla. I love you so much.',
  ],

  // Her 7 moles, mapped like a constellation (x/y on a 200×240 face)
  moles: [
    { x: 52, y: 126, note: 'Left cheek: a kiss goes here.' },
    { x: 150, y: 122, note: 'Right cheek: and here.' },
    { x: 89, y: 142, note: 'The twins, part 1: perfectly symmetrical.' },
    { x: 111, y: 142, note: 'The twins, part 2: like you planned it.' },
    { x: 105, y: 160, note: 'Upper lip: honestly distracting.' },
    { x: 96, y: 184, note: 'Bottom lip: also distracting.' },
    { x: 100, y: 212, note: 'Chin: the finishing touch.' },
  ],

  loveNotes: [
    'I love your laugh', 'My princess', "You're so pretty", 'Most beautiful soul', 'Smartest girl I know',
    'Smells like a bakery', 'Me + you', 'My favorite person', 'So proud of you',
    'My ladybug', 'Cutest girl alive',
  ],

  coupons: [
    { icon: '🧋', text: 'One iced coffee with extra milk and extra sugar, on me.' },
    { icon: '🧀', text: 'One charcuterie date night (you build, I eat).' },
    { icon: '⛏️', text: 'One Minecraft night where we build our dream house together.' },
    { icon: '🧟', text: 'One Leon S. Kennedy impression, on demand.' },
    { icon: '🍨', text: "One ube ice cream run. Hopefully it doesn't melt." },
    { icon: '👽', text: 'Unlimited Flug reaction pics, forever.' },
  ],

  freezeriaOrder: [
    { item: 'Ube ice cream', mod: 'Extra scoop' },
    { item: 'Iced coffee', mod: 'Lots of milk + lots of sugar' },
    { item: 'Ghirardelli Triple Chocolate Brownie', mod: 'Fresh out of the oven' },
    { item: 'A bowl of sinigang', mod: 'Extra sour' },
    { item: 'Fruity Pebbles', mod: 'Big bowl, lots of milk' },
    { item: 'A bowl of sopas', mod: 'Just like home' },
    { item: 'Charcuterie board', mod: 'Made by the chef herself' },
  ],

  // Tarot gift: she pulls one at random. All upright, all good omens.
  tarot: [
    { name: 'The Star', numeral: 'XVII', icon: '⭐', reading: 'Hope, healing, and wishes coming true. 22 is your year of manifesting.' },
    { name: 'The Sun', numeral: 'XIX', icon: '☀️', reading: 'Pure joy and warmth. You are literally the sunshine card.' },
    { name: 'The Lovers', numeral: 'VI', icon: '💞', reading: "A deep, chosen connection. Distance can't touch this one." },
    { name: 'Ten of Cups', numeral: 'X', icon: '🏡', reading: 'Happily ever after. The future version of us, together.' },
    { name: 'The World', numeral: 'XXI', icon: '🌍', reading: 'Everything coming full circle. A whole new chapter starts today.' },
    { name: 'Wheel of Fortune', numeral: 'X', icon: '🎡', reading: 'Luck is turning your way. The 777 energy is real.' },
  ],

  achievements: [
    { icon: '🎂', title: 'Level 22 Reached' },
    { icon: '👑', title: 'Princess Status: Permanent' },
    { icon: '🐞', title: 'Found Your Ladybug (Mar 23, 2026)' },
    { icon: '🔮', title: 'Angel Number Manifester' },
    { icon: '🎨', title: 'Master Skin Artist' },
  ],

  lore: [
    { icon: '🌀', title: 'The Dryer Incident', text: 'Little Kayla hid in the dryer. Someone turned it on. Chocolate powder EVERYWHERE.', color: 'yellow' },
    { icon: '💛', title: "Grandma's Pillowcase", text: 'Yellow, handmade by Grandma, and the comfiest thing in the world.', color: 'yellow' },
    { icon: '🧁', title: 'Smells Like a Bakery', text: 'Marshmallow musk, marshmallow fluff, praline and pistachio, cream velvet. A walking dessert.', color: 'pink' },
    { icon: '📖', title: 'Princess Peepers', text: 'Her favorite book. A princess who stays herself. Sounds like someone I know.', color: 'pink' },
    { icon: '🧟', title: 'Resident Evil', text: 'Leon Kennedy and Ada Wong supremacy. Undebatable.', color: 'blue' },
    { icon: '🩷', title: 'Saiki K.', text: 'Comfort anime of choice. Yare yare.', color: 'pink' },
    { icon: '💅', title: 'Nails: Always Done', text: 'Press-ons on point, every single time.', color: 'blue' },
    { icon: '👟', title: 'Skechers', text: "The best employee they've ever had.", color: 'yellow' },
    { icon: '👽', title: 'Flug', text: 'The official reaction-pic alien of this relationship.', color: 'blue' },
    { icon: '🔮', title: 'Angel Numbers', text: '777, 222, 999... She manifests it, and it happens. She is learning tarot too. A witch, but cute.', color: 'blue' },
    { icon: '✨', title: 'ENFP', text: 'Main character energy. She makes everyone feel loved.', color: 'pink' },
  ],
});
