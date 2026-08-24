// Real professional content, reframed in Hunter Association terms.
// Edit here — components are presentational and read from this file.

export const profile = {
  name: 'Mahmood Tauhidul',
  title: 'Full Stack AI Developer',
  company: 'RemoteIntegrity',
  location: 'Dhaka, BD',
  licenseNumber: 'HA-2025-0016',
  status: 'ACTIVE',
  specializations: ['Full Stack', 'AI Systems', 'SQA'],
  yearsActive: '1+',
  huntsCleared: 16,
  bio: [
    'Full-stack engineer specializing in scalable web platforms and headless CMS architectures. Currently working at RemoteIntegrity and building high-performance applications using Next.js, React, TypeScript, and Golang with a focus on maintainable systems, strong type safety, and modern full-stack development practices.',
    'Expertise in AI and computer vision systems, including CNN-based classification models, real-time inference pipelines, and data-driven applications. Developing intelligent systems that combine machine learning, automation, and real-time processing to solve complex problems.',
    'Cloud-focused developer working with AWS infrastructure, containerized services, and modern deployment workflows. Engineering reliable systems with scalable APIs, optimized databases, and performant architectures designed for production environments.',
  ],
  mission:
    'Design and implement cutting-edge systems that bridge artificial intelligence with robust infrastructure, creating scalable solutions for complex technological challenges.',
  stack: {
    core: ['Node.js', 'Golang', 'Python', 'C#'],
    frontend: ['React', 'TypeScript', 'Next.js'],
    cloud: ['AWS', 'Azure', 'GCP', 'Vercel'],
    languages: ['JavaScript', 'Golang', 'Python', 'C#', 'SQL'],
  },
  social: {
    github: 'https://github.com/Adoxcol',
    linkedin: 'https://www.linkedin.com/in/mahfuzur-rahman-60084326b/',
    email: 'mahfuzurrrahmannn@gmail.com',
  },
};

export interface NenAbility {
  name: string;
  mastery: number;
  category: 'AI' | 'DevOps' | 'Backend';
}

export const nenAbilities: NenAbility[] = [
  { name: 'LLM Integration', mastery: 95, category: 'AI' },
  { name: 'RAG Systems', mastery: 90, category: 'AI' },
  { name: 'Prompt Engineering', mastery: 85, category: 'AI' },
  { name: 'Embeddings', mastery: 88, category: 'AI' },
  { name: 'Vector Databases', mastery: 82, category: 'AI' },
  { name: 'Docker', mastery: 92, category: 'DevOps' },
  { name: 'AWS', mastery: 90, category: 'DevOps' },
  { name: 'Firebase', mastery: 85, category: 'DevOps' },
  { name: 'CI/CD', mastery: 88, category: 'DevOps' },
  { name: 'Version Control', mastery: 80, category: 'DevOps' },
  { name: 'Node.js', mastery: 95, category: 'Backend' },
  { name: 'Golang', mastery: 84, category: 'Backend' },
  { name: 'C#', mastery: 88, category: 'Backend' },
  { name: 'Python', mastery: 85, category: 'Backend' },
  { name: 'REST APIs', mastery: 92, category: 'Backend' },
  { name: 'Microservices', mastery: 87, category: 'Backend' },
];

export interface Hunt {
  id: number;
  name: string;
  category: string;
  rank: string;
  status: 'CLEARED' | 'ARCHIVED';
  techStack: string[];
  summary: string;
  longSummary: string;
  objective: string;
  role: string;
  obstacles: string[];
  reward: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const hunts: Hunt[] = [
  {
    id: 1,
    name: 'Government Hospital Website',
    category: 'FULL-STACK',
    rank: 'B-Rank',
    status: 'CLEARED',
    techStack: ['JavaScript', 'React', 'Node.js', 'Express', 'PayloadCMS'],
    summary: 'Official hospital website built to publish services, departments, and patient-facing information.',
    longSummary:
      'A full-stack website for a government hospital designed to present medical services, department information, notices, and institutional content in a clear, accessible format. Built with React on the frontend and a Node.js, Express, and PayloadCMS backend for manageable content updates.',
    objective: 'The hospital needed a public-facing site that could present services, department information, and institutional updates clearly for patients and visitors.',
    role: 'Built the frontend and integrated a CMS-driven content workflow across the full-stack setup.',
    obstacles: [
      'Keeping content updates manageable for non-technical administrators',
      'Presenting a large amount of institutional information without making the site feel dense',
      'Making the experience work reliably across devices for public access',
    ],
    reward: 'Delivered a structured and maintainable hospital website that makes service information and updates easier to publish and easier to consume.',
    githubUrl: 'https://github.com/BinduLogic/government-hospital-website',
    liveUrl: 'https://nicvd-website.bgdtup.easypanel.host/en',
  },
  {
    id: 2,
    name: 'DHI E-Learning Platform',
    category: 'FULL-STACK',
    rank: 'B-Rank',
    status: 'CLEARED',
    techStack: ['AWS', 'Prisma', 'Node.js', 'Express', 'PostgreSQL'],
    summary: 'E-learning platform for managing online courses, learners, and training workflows.',
    longSummary:
      'A full-stack e-learning platform built to support digital education workflows with structured course delivery, backend data management, and scalable infrastructure. The system uses Node.js, Express, Prisma, and PostgreSQL, with AWS services supporting deployment and operational reliability.',
    objective: 'The platform needed a scalable foundation for managing digital learning workflows, course content, and learner operations.',
    role: 'Worked across backend and infrastructure-oriented parts of the system using Node.js, Express, Prisma, PostgreSQL, and AWS-backed delivery.',
    obstacles: [
      'Supporting multiple moving parts in an education workflow',
      'Keeping the data layer reliable as platform features expanded',
      'Balancing application logic with deployment and hosting concerns',
    ],
    reward: 'Helped shape a more production-ready e-learning platform with stronger backend organization and infrastructure support.',
    githubUrl: 'https://github.com/BinduLogic/dhi-e-learning',
  },
  {
    id: 3,
    name: 'DegreePlan',
    category: 'FULL-STACK',
    rank: 'A-Rank',
    status: 'CLEARED',
    techStack: ['Node.js', 'Next.js', 'React', 'WebSocket', 'Supabase'],
    summary: 'Academic planning platform for mapping courses, tracking progress, and organizing degree requirements.',
    longSummary:
      'DegreePlan is a student-focused planning tool that helps organize academic progress through a clearer view of courses, requirements, and roadmap decisions. Built with Next.js, React, Node.js, WebSockets, and Supabase, it supports a responsive planning experience with real-time interactions.',
    objective: 'Students needed a simpler way to plan courses, understand requirements, and keep track of academic progress in one place.',
    role: 'Built the planning experience with full-stack coordination across Next.js, React, Node.js, WebSockets, and Supabase.',
    obstacles: [
      'Turning degree requirements into something easier to visualize',
      'Keeping updates responsive enough to feel interactive',
      'Balancing roadmap clarity with practical feature scope',
    ],
    reward: 'Created a student-focused planning tool that makes roadmap decisions and course tracking more intuitive.',
    githubUrl: 'https://github.com/Adoxcol/UniPlan_Final_1',
    liveUrl: 'https://uni-plan-final-1.vercel.app/',
  },
  {
    id: 4,
    name: 'Evergreen Construction',
    category: 'FULL-STACK',
    rank: 'C-Rank',
    status: 'CLEARED',
    techStack: ['React', 'JavaScript', 'HTML', 'TailwindCSS'],
    summary: 'Landing website for a construction company brand presence.',
    longSummary:
      "A polished landing website built for Evergreen Construction to present the company's services, strengthen its online presence, and give potential clients a clear path to learn more and get in touch.",
    objective: 'The company needed a cleaner digital presence to communicate services, build trust, and give visitors a clear landing experience.',
    role: 'Designed and built the landing-page experience with a focus on presentation, clarity, and responsiveness.',
    obstacles: [
      'Keeping the site visually polished while staying straightforward',
      'Structuring service content so it felt credible and easy to scan',
      'Making the page work well on both desktop and mobile layouts',
    ],
    reward: 'Delivered a stronger brand-facing web presence that presents the company more professionally online.',
    liveUrl: 'https://evergreen-alpha-eight.vercel.app/',
  },
  {
    id: 5,
    name: 'Mental Wellness Companion',
    category: 'AI',
    rank: 'B-Rank',
    status: 'ARCHIVED',
    techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    summary: 'AI-assisted wellness concept focused on supportive interactions and mental health awareness.',
    longSummary:
      'A mental wellness companion concept exploring how AI-driven interfaces can support reflective check-ins, calming interactions, and a more approachable digital wellness experience. The project was built with Next.js, React, TypeScript, and TailwindCSS as a thoughtful product exploration.',
    objective: 'I wanted to explore whether an AI-assisted interface could make digital wellness experiences feel more supportive and less clinical.',
    role: 'Built the product concept, interface direction, and core interaction flow as an AI-driven exploratory project.',
    obstacles: [
      'Handling a sensitive subject area with the right tone',
      'Keeping the experience calm and approachable instead of overly technical',
      'Balancing ambition with the scope of an exploratory side project',
    ],
    reward: 'Produced an archived but meaningful concept that explored how AI could support reflective and emotionally aware user flows.',
    githubUrl: 'https://github.com/Adoxcol/mentalwellness',
  },
  {
    id: 6,
    name: 'Guido Extension',
    category: 'EXTENSION',
    rank: 'C-Rank',
    status: 'CLEARED',
    techStack: ['JavaScript', 'Firebase', 'Firebase Functions', 'Gitlab'],
    summary: 'Workflow capture extension for major browsers.',
    longSummary: 'A workflow capture extension for major browsers that allows users to capture and share their browser tabs with others.',
    objective: 'Browser-based workflows often lose context quickly, especially when sharing what someone should look at or follow.',
    role: 'Worked on an extension experience focused on workflow capture and context-sharing inside the browser.',
    obstacles: [
      'Making tab-sharing feel lightweight instead of disruptive',
      'Keeping captured context useful in collaborative situations',
      'Designing permissions and sharing behavior clearly',
    ],
    reward: 'Created an extension concept that helps turn browser activity into something easier to capture, share, and collaborate around.',
    githubUrl: 'https://github.com',
  },
];

export interface SideQuest {
  id: number;
  title: string;
  status: 'ACTIVE' | 'R&D' | 'ITERATING';
  classification: string;
  summary: string;
  motive: string;
  tags: string[];
}

export const sideQuests: SideQuest[] = [
  {
    id: 1,
    title: 'Spotify2Nicotine',
    status: 'ACTIVE',
    classification: 'MUSIC_AUTOMATION',
    summary: 'A plugin and GUI workflow focused on collecting and downloading FLAC music for Spotify playlists in a cleaner local-library setup.',
    motive: 'I wanted a smoother way to bridge playlist discovery with high-quality local listening, instead of manually hunting tracks one by one.',
    tags: ['Plugin', 'GUI', 'FLAC', 'Spotify Playlists'],
  },
  {
    id: 2,
    title: 'Guitar Tabs Analyze Helper',
    status: 'ITERATING',
    classification: 'MUSIC_EDTECH',
    summary: 'A visual guitar practice helper that analyzes tabs, surfaces proper exercises, and makes it easier to understand what to play and how to improve.',
    motive: 'The goal was to turn raw tabs into something more teachable, with visual guidance and practice structure instead of guesswork.',
    tags: ['Tab Analysis', 'Exercises', 'Visual Helper', 'Practice'],
  },
  {
    id: 3,
    title: 'SizeLens',
    status: 'R&D',
    classification: 'FIT_VISION',
    summary: 'A measurement helper that estimates torso sizing and related clothing fit data to guide T-shirt size selection more accurately.',
    motive: 'This came from the idea that sizing should feel more measurable and less like trial-and-error, especially for fast personal fit checks.',
    tags: ['Computer Vision', 'Sizing', 'Torso Measurement', 'Fit Tech'],
  },
  {
    id: 4,
    title: 'Velour',
    status: 'ACTIVE',
    classification: 'AI_CREATIVE_TOOLS',
    summary: 'A poem formatter and background generator that uses ComfyUI and local models to analyze emotional tone and create matching poem visuals.',
    motive: 'I wanted poems to feel more alive visually, with formatting, emotional analysis, and generated backgrounds that reflect the feeling of the writing.',
    tags: ['ComfyUI', 'Local Models', 'Poetry', 'Background Generation'],
  },
];

export interface ExamPhase {
  code: string;
  period: string;
  title: string;
  organization: string;
  status: 'LAUNCHED' | 'PROMOTED' | 'ACTIVE';
  summary: string;
  impact: string[];
}

export const examPhases: ExamPhase[] = [
  {
    code: 'PHASE_01',
    period: '2025 // FEB – MAY',
    title: 'Software Engineering Intern',
    organization: 'BinduLogic LLC',
    status: 'LAUNCHED',
    summary: 'Entered the industry through an internship focused on learning delivery rhythm, working across real product requirements, and turning theory into shipped work.',
    impact: [
      'Worked inside a live software team environment',
      'Built confidence with practical development workflows',
      'Moved from learning mode into production contribution',
    ],
  },
  {
    code: 'PHASE_02',
    period: '2025 – 2026 // MAY – MAR',
    title: 'Junior Software Developer',
    organization: 'BinduLogic LLC',
    status: 'PROMOTED',
    summary: 'Transitioned from intern to junior developer after the internship period, taking on more ownership and contributing with stronger delivery expectations.',
    impact: [
      'Expanded responsibility beyond internship scope',
      'Worked more independently on implementation tasks',
      'Built momentum as a full-time engineering contributor',
    ],
  },
  {
    code: 'PHASE_03',
    period: 'Since 2026-03-27',
    title: 'Full Stack LLM Developer',
    organization: 'Remote Integrity',
    status: 'ACTIVE',
    summary: 'Joined Remote Integrity to work at the intersection of full-stack engineering and LLM-powered systems, building products where AI capabilities connect directly to real workflows.',
    impact: [
      'Shifted into AI-driven product delivery',
      'Worked on full-stack systems with LLM integration',
      'Focused on higher-leverage automation and intelligent workflows',
    ],
  },
];

export const hunterStats = {
  huntsCleared: 16,
  systemsAutomated: 11,
  apisIntegrated: 50,
  aiModelsIntegrated: 14,
  uptime: '99.9%',
  responseTime: '<50ms',
  errorRate: '0.01%',
  throughput: '10K/s',
  overallMastery: Math.round(nenAbilities.reduce((acc, a) => acc + a.mastery, 0) / nenAbilities.length),
};

export const contact = {
  email: profile.social.email,
  github: profile.social.github,
  linkedin: profile.social.linkedin,
};
