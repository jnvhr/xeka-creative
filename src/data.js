// All site content lives here. To add an edit, add one entry to `projects`.
// shape: 'tall' (9:16 short), 'sq' (square thumbnail) or 'wide' (16:9 video).
// Use `yt` (YouTube video id) or `ig` (Instagram post URL) so the edit can play in place.

const yt = (id, variant) => `https://i.ytimg.com/vi/${id}/${variant}.jpg`;

export const projects = [
  { title: 'Mahito (Shoko Remake)', short: 'Mahito', category: 'Music sync edit', year: '2025', software: 'After Effects', description: 'Transitions, masking and VFX with CRT effects, synced to music.', yt: 'M_tSvfBcIBU', link: 'https://www.youtube.com/shorts/M_tSvfBcIBU', img: yt('M_tSvfBcIBU', 'oar2'), shape: 'sq', vertical: true },
  { title: 'Animation Practice (Shoko Remake)', short: 'Animation Practice', category: '2D animation', year: '2025', software: 'After Effects, Photopea', description: 'Manga character animation using the puppet tool and layering.', yt: 'wbIOHrKOjIY', link: 'https://www.youtube.com/shorts/wbIOHrKOjIY', img: yt('wbIOHrKOjIY', 'oar2'), shape: 'tall', vertical: true },
  { title: 'Grimes', short: 'Grimes', category: 'Motion tracking', year: '2026', software: 'After Effects', description: 'Mask tracking and rotoscoping for a perspective shift.', yt: '1GWAjpbPnUU', link: 'https://www.youtube.com/shorts/1GWAjpbPnUU', img: yt('1GWAjpbPnUU', 'oar2'), shape: 'tall', vertical: true },
  { title: 'POV: When a Cat is Hungry', short: 'When a Cat is Hungry', category: 'Stylized edit', year: '2026', software: 'After Effects', description: 'Backrooms inspired look with creative color correction.', yt: 'pveHhpRJWvc', link: 'https://www.youtube.com/shorts/pveHhpRJWvc', img: yt('pveHhpRJWvc', 'oar2'), shape: 'sq', vertical: true },
  { title: 'Car Edit', short: 'Car Edit', category: '3D tracking', year: '2025', software: 'After Effects', description: '3D camera text tracking with speed ramps and rotoscoping.', ig: 'https://www.instagram.com/p/DSyPwAFE1uQ/', link: 'https://www.instagram.com/p/DSyPwAFE1uQ/', img: 'https://i.imgur.com/UZahD9j.jpeg', shape: 'tall', vertical: true },
  { title: 'Freeze Frame', short: 'Freeze Frame', category: 'Creative edit', year: '2025', software: 'After Effects', description: 'Time manipulation with morph transitions synced to the beat.', ig: 'https://www.instagram.com/p/DS6PxV7CRH0/', link: 'https://www.instagram.com/p/DS6PxV7CRH0/', img: 'https://i.imgur.com/ZBmcgFN.jpeg', shape: 'tall', vertical: true },
  { title: 'Wuthering Waves: Saving Pulls', short: 'Saving Pulls', category: 'Gaming content', year: '2025', software: 'DaVinci Resolve Studio', description: 'Gameplay with background music and clean transitions.', yt: 'mjafBBZ97sw', link: 'https://www.youtube.com/watch?v=mjafBBZ97sw', img: yt('mjafBBZ97sw', 'maxresdefault'), shape: 'wide' },
  { title: 'Intro', short: 'Intro', category: 'Gaming content', year: '2025', software: 'DaVinci Resolve Studio', description: 'Gameplay introduction.', yt: '-QKYhcdNLCY', link: 'https://www.youtube.com/watch?v=-QKYhcdNLCY', img: yt('-QKYhcdNLCY', 'maxresdefault'), shape: 'wide' },
  { title: 'Fashion', short: 'Fashion', category: 'Creative edit', year: '2026', software: 'After Effects', description: 'Jenna Ortega, Rouge Dior.', yt: '2iBaMAr69Y4', link: 'https://www.youtube.com/shorts/2iBaMAr69Y4', img: yt('2iBaMAr69Y4', 'oar2'), shape: 'tall', vertical: true },
];

// Index of the newest edit: the hero's "Play latest edit" button opens it.
export const latest = 8;

// Billing order is the skill level: the first group is printed largest.
export const toolkit = [
  { label: 'Main tool', items: ['After Effects'] },
  { label: 'In regular use', items: ['DaVinci Resolve Studio', 'Premiere Pro', 'Photoshop'] },
  { label: 'Building up', items: ['Color grading', 'Motion graphics'] },
  { label: 'Next up, not offered yet', items: ['TouchDesigner', 'Live2D Cubism', 'Sound design', 'VFX compositing'] },
];

export const techniques = ['Music sync', 'Masking', 'Motion tracking', '2D animation', 'VFX', 'Gaming edits'];

export const stats = [
  ['9', 'edits on the wall'],
  ['5.4K+', 'views'],
  ['2+', 'years editing'],
];

export const contact = {
  email: 'p.a.jlsarmiento@gmail.com',
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/xeka.ae/' },
    { name: 'YouTube', href: 'https://www.youtube.com/@xx3kae' },
    { name: 'Facebook', href: 'https://www.facebook.com/janvherlucas.sarmiento' },
  ],
};

// Where things hang on the wall. Positions are in vw so the hero keeps its composition at any width.
// Hero posters: project, left, top, width (vw), tilt (deg), how far it runs ahead of the scroll (vh), pointer depth (px), twist (deg)
export const heroPosters = [
  [8, 55.5, 18.2, 20.8, -2.2, -34, 26, -4],
  [2, 80.8, 16.4, 16.4, -3.2, -12, 14, 3],
  [1, 41.4, 41.4, 12.2, 5, -20, 18, 5],
  [5, 78.3, 41, 14.9, 3, -52, 34, -6],
];
// Far plane behind the hero: older posters faded into the wall. project, left, top, width (vw), tilt (deg)
export const heroOlds = [[6, 47, 30, 19, -4], [7, 70, 47, 17, 5], [0, 86, 8, 12, 8], [3, 28, 51, 11, -7]];
// Far plane behind the contact flyer. project, left (%), top (%), width (vw), tilt (deg)
export const contactOlds = [[1, 4, 12, 13, -6], [7, 79, 7, 16, 5], [5, 85, 54, 11, -4]];
// The work wall: three columns of [project, tilt].
export const wall = [
  [[0, -2], [4, 3], [7, -1.5]],
  [[8, 2], [3, -3], [6, 1.5]],
  [[2, -2.5], [1, 2], [5, -3]],
];
