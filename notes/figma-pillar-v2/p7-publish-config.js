// Publish config for Topical Pillar P7 /types-of-personal-goals (2026-11-05): everything the page data doesn't hold.
// Read by export-html.js (HTML mockup) and export-handoff-p7.js (content/pillars/types-of-personal-goals.md), so both use one
// link map, one media map and one set of SEO values. Links were checked 2026-11-05: every internal route returns 200, every DOI
// resolves at doi.org (302 to the publisher), and the CFPB page returns 200. Every study is a ✓ entry in the behavior-science KB.
const fs = require('fs');
const path = require('path');

function loadData() {
  const src = fs.readFileSync(path.join(__dirname, 'p7-types-of-personal-goals-v2.4.js'), 'utf8');
  let D;
  new Function('build', src.replace('return await build(D);', 'D.grid = GRID; D.shapes = SHAPES; build(D);'))(d => { D = d; });
  return D;
}

const DOI = d => `https://doi.org/${d}`;
module.exports = {
  loadData,
  slug: 'types-of-personal-goals',
  figma: { node: '151:472', url: 'https://www.figma.com/design/l27WIk0vje0syTYWN2iZee?node-id=151-472' },
  // Inline anchors ([[...]] in the data) → URL, with the KB entry each citation comes from.
  LINKS: {
    'a review of 27 sport studies': [DOI('10.1080/1750984X.2022.2116723'), 'KB #7 Williamson et al. 2022'],
    'a review of 20 studies on habit formation': [DOI('10.3390/healthcare12232488'), 'KB #11 Singh et al. 2024'],
    'free 10-question financial well-being check': ['https://www.consumerfinance.gov/consumer-tools/financial-well-being/', 'CFPB tool'],
    'the self-improvement guide': ['/self-improvement'],
    'learning goals when you lack the skills': [DOI('10.1037/mot0000127'), 'KB #6 Locke & Latham 2019'],
    'open goals': [DOI('10.1080/17437199.2025.2467695'), 'KB #3 Swann et al. 2025'],
    'early evidence from a small study': [DOI('10.1016/j.psychsport.2020.101661'), 'KB #4 Hawkins et al. 2020'],
    'The life planning guide': ['/life-planning'],
    'the goal setting guide': ['/goal-setting'],
    'a 30-day accountability sprint': ['/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint'],
    'A personal life audit': ['/personal-life-audit'],
    'a study of 512 real goals': [DOI('10.1093/intqhc/mzae009'), 'KB #8 Stewart et al. 2024'],
    'a large review of 141 studies': [DOI('10.1037/ccp0000260'), 'KB #1 Epton et al. 2017'],
    'the personal accountability guide': ['/personal-accountability'],
    'how to run accountability check-ins that change behavior': ['/blog/how-to-run-accountability-check-ins-that-actually-change-behavior'],
  },
  // Path cards and cluster items (page titles) → route.
  PAGES: {
    'Goal setting': '/goal-setting',
    'Personal life audit': '/personal-life-audit',
    'Life planning': '/life-planning',
    'How it works': '/how-it-works',
    'From good intentions to shipped work: a 30-day accountability sprint': '/blog/from-good-intentions-to-shipped-work-a-30-day-accountability-sprint',
    'How to run accountability check-ins that actually change behavior': '/blog/how-to-run-accountability-check-ins-that-actually-change-behavior',
    'Goal setting: how to set goals you will actually keep': '/goal-setting',
  },
  // Media slots. files are the 2x crops in docs/brand/assets/site-imagery/out/ (desktop, mobile).
  MEDIA: {
    hero: { files: ['p7-hero-desktop.jpg', 'p7-hero-mobile.jpg'], d: [460, 400], m: [335, 230], name: 'types-of-personal-goals-hero-calendar', alt: 'A person at a table marking dates on a paper month calendar.', tag: ['Family · This year', 'Plan our family trip, two hours a month.'], load: 'Eager, `priority` (LCP image)' },
    '4.3': { files: ['p7-p41-desktop.jpg', 'p7-p41-mobile.jpg'], d: [360, 320], m: [335, 210], name: 'types-of-personal-goals-fitness-gym', alt: 'A person walking into a gym in the evening, carrying training shoes.', load: 'Lazy' },
    '4.5': { files: ['p7-p45-desktop.jpg', 'p7-p45-mobile.jpg'], d: [360, 320], m: [335, 210], name: 'types-of-personal-goals-personal-book-summary', alt: 'Hands writing a short summary on an index card resting on a finished novel.', load: 'Lazy' },
    '4.6': { files: ['p7-p46-ui-desktop.png', 'p7-p46-ui-mobile.png'], d: [900, 524], m: [335, 378], name: 'types-of-personal-goals-week-board', alt: 'A sample week in Accountability Guild: one goal marked by day, one counted with no target, and one tracked at the cycle report.', load: 'Lazy', ui: true },
    '4.9a': { files: ['p7-p410a-desktop.jpg', 'p7-p410a-mobile.jpg'], d: [286, 180], m: [260, 150], name: 'types-of-personal-goals-on-your-own', alt: 'A person at a kitchen counter ticking a weekly grid in a notebook with a pencil.', load: 'Lazy' },
    '4.9b': { files: ['p7-p410b-desktop.jpg', 'p7-p410b-mobile.jpg'], d: [286, 180], m: [260, 150], name: 'types-of-personal-goals-with-a-partner', alt: 'Two people at a café table, one showing the other a phone.', load: 'Lazy' },
    '4.9c': { files: ['p7-p410c-desktop.jpg', 'p7-p410c-mobile.jpg'], d: [286, 180], m: [260, 150], name: 'types-of-personal-goals-with-a-group', alt: 'A group at a community-room table with notes and printed sheets.', load: 'Lazy' },
  },
  UI_CAPTION: 'Illustrative: sample data in the Accountability Guild app.',
  // SEO (final pass 2026-11-05). The site template appends " | Accountability Guild" (23 chars) to the page title.
  SEO: {
    title: 'Types of Personal Goals With Examples',
    description: 'Personal goals sort by life area, shape, and time frame. See examples for faith, family, fitness, work, and personal goals, and how to choose what to commit to.',
    canonical: 'https://accountabilityguild.com/types-of-personal-goals',
    datePublished: '2026-04-15',
    liveTitle: 'Types of Personal Goals: Choose the Right Goals for Every Life Area | Accountability Guild',
    liveDescription: 'Learn how to choose goal categories that match your current season and convert them into practical short-term and long-term plans.',
  },
};
