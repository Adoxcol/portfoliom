// Portfolio content.
// Edit here — components are presentational and read from this file.

export const profile = {
  name: 'Mahmood Tauhidul',
  title: 'Full-Stack AI Developer',
  company: 'Guided Doing',
  location: 'Dhaka, BD',
  specializations: ['Full Stack', 'AI Systems', 'SQA'],
  yearsActive: '1+',
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
    name: 'UniPlan',
    category: 'FULL-STACK',
    rank: 'A-Rank',
    status: 'CLEARED',
    techStack: ['Node.js', 'Next.js', 'React', 'WebSocket', 'Supabase'],
    summary: 'Academic planning platform for mapping courses, tracking progress, and organizing degree requirements.',
    longSummary:
      'UniPlan (2024, academic full-stack project) is a student-focused planning tool that helps organize academic progress through a clearer view of courses, requirements, and roadmap decisions. Built with Next.js, React, Node.js, WebSockets, and Supabase, it supports a responsive planning experience with real-time interactions.',
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
    techStack: ['JavaScript', 'C++', 'Swift', 'Firebase Functions', 'GCP'],
    summary: 'Workflow capture browser extension built at Guided Doing, with Windows and macOS companion apps.',
    longSummary: 'A workflow capture extension for major browsers that lets users capture and share their browser tabs with others. Built at Guided Doing together with Windows/macOS companion desktop applications using C++ and Swift integrations, backed by Firebase Cloud Functions and GCP-based CI/CD.',
    objective: 'Browser-based workflows often lose context quickly, especially when sharing what someone should look at or follow.',
    role: 'Software Engineer at Guided Doing: owned the project from requirements and architecture through implementation, testing, deployment and maintenance.',
    obstacles: [
      'Making tab-sharing feel lightweight instead of disruptive',
      'Keeping captured context useful in collaborative situations',
      'Designing permissions and sharing behavior clearly',
    ],
    reward: 'Delivered an extension that turns browser activity into something easier to capture, share, and collaborate around.',
  },
];

export interface SideQuest {
  id: number;
  title: string;
  status: 'ACTIVE' | 'R&D' | 'ITERATING' | 'ACADEMIC';
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
    status: 'ACADEMIC',
    classification: 'FIT_VISION',
    summary: 'A 2023 academic microprocessor project: an ESP32-CAM prototype using YOLOv3 and OpenCV for camera calibration, perspective correction and physical measurement (about 2 mm reported accuracy), with a Flask interface for calibration and review.',
    motive: 'This came from the idea that sizing should feel more measurable and less like trial-and-error, especially for fast personal fit checks.',
    tags: ['ESP32-CAM', 'YOLOv3', 'OpenCV', 'Flask'],
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
    period: '2025 // MAR – SEP',
    title: 'Software Engineer Intern',
    organization: 'BinduLogic Limited',
    status: 'LAUNCHED',
    summary: 'Contributed to frontend and backend development with TypeScript, JavaScript, React, Next.js and Node.js, taking part in code reviews and technical discussions.',
    impact: [],
  },
  {
    code: 'PHASE_02',
    period: '2025 // SEP – 2026 MAR',
    title: 'Full Stack Developer',
    organization: 'BinduLogic Limited',
    status: 'PROMOTED',
    summary: 'Built hospital portals and healthcare platforms with Next.js, React, TypeScript, Payload CMS and PostgreSQL, including English/Bengali localization, live preview and cross-collection search. Integrated AWS S3/CloudFront and supported migrations, role-based access and accessibility.',
    impact: [],
  },
  {
    code: 'PHASE_03',
    period: 'Since 2026 // MAR',
    title: 'Software Engineer',
    organization: 'Guided Doing (Remote, Germany)',
    status: 'ACTIVE',
    summary: 'Own projects from requirements to maintenance: a workflow-capture browser extension with Windows/macOS companion apps (C++ and Swift), and a multi-academy learning management system with a Go backend, React frontend and AI integrations. Manage GCP, CI/CD and multi-environment deployments.',
    impact: [],
  },
];

export const education = {
  degree: 'B.Sc. in Computer Science & Engineering',
  school: 'Independent University, Bangladesh',
  period: '2020 – 2025',
  note: 'Minor in Marketing',
};

export const researchManuscripts = {
  note: 'Submitted for publication; acceptance and publication are not claimed.',
  titles: [
    'IoT-Based Body Size Measurement System',
    'Deep Learning for Fabric Classification',
    'Textile Fabric Dataset for Machine Learning',
    'GSM Prediction Using Convolutional Neural Networks',
  ],
};

export const openSource = {
  contributions: [
    'GraphBit (Rust async testing/CI)',
    'Infinitibit Document Parser (Python)',
    'OpenNotebook (testing/docs)',
    'OpenCut (testing/docs)',
  ],
  training: ['CS50: Introduction to Computer Science (Harvard)', 'Networking Basics (Cisco Networking Academy)'],
};

export const contact = {
  email: profile.social.email,
  github: profile.social.github,
  linkedin: profile.social.linkedin,
};
