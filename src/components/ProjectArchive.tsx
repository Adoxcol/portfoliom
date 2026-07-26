import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  category: string;
  techStack: string[];
  status: 'DEPLOYED' | 'EXPERIMENTAL' | 'ARCHIVED';
  description: string;
  longDescription: string;
  features: string[];
  imageUrl: string;
  problem: string;
  role: string;
  challenges: string[];
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Government Hospital Website',
    category: 'FULL-STACK',
    techStack: ['Javascript', 'React', 'Node.js', 'Express', 'PayloadCMS'],
    status: 'DEPLOYED',
    description: 'Official hospital website built to publish services, departments, and patient-facing information.',
    longDescription: 'A full-stack website for a government hospital designed to present medical services, department information, notices, and institutional content in a clear, accessible format. Built with React on the frontend and a Node.js, Express, and PayloadCMS backend for manageable content updates.',
    features: [
      'CMS-driven content management with PayloadCMS',
      'Department and service information pages',
      'Responsive public-facing interface',
      'Structured content updates for hospital administrators'
    ],
    imageUrl: '/images/gov.png',
    problem: 'The hospital needed a public-facing site that could present services, department information, and institutional updates clearly for patients and visitors.',
    role: 'Built the frontend and integrated a CMS-driven content workflow across the full-stack setup.',
    challenges: [
      'Keeping content updates manageable for non-technical administrators',
      'Presenting a large amount of institutional information without making the site feel dense',
      'Making the experience work reliably across devices for public access'
    ],
    outcome: 'Delivered a structured and maintainable hospital website that makes service information and updates easier to publish and easier to consume.',
    githubUrl: 'https://github.com/BinduLogic/government-hospital-website',
    liveUrl: 'https://nicvd-website.bgdtup.easypanel.host/en'
  },
  {
    id: 2,
    name: 'DHI E-Learning Platform',
    category: 'FULL-STACK',
    techStack: ['AWS', 'Prisma', 'Node.js', 'Express', 'PostgreSQL'],
    status: 'DEPLOYED',
    description: 'E-learning platform for managing online courses, learners, and training workflows.',
    longDescription: 'A full-stack e-learning platform built to support digital education workflows with structured course delivery, backend data management, and scalable infrastructure. The system uses Node.js, Express, Prisma, and PostgreSQL, with AWS services supporting deployment and operational reliability.',
    features: [
      'Course and learner management flows',
      'PostgreSQL data layer with Prisma ORM',
      'Backend APIs for platform operations',
      'AWS-backed deployment and hosting'
    ],
    imageUrl: '/images/dhi.png',
    problem: 'The platform needed a scalable foundation for managing digital learning workflows, course content, and learner operations.',
    role: 'Worked across backend and infrastructure-oriented parts of the system using Node.js, Express, Prisma, PostgreSQL, and AWS-backed delivery.',
    challenges: [
      'Supporting multiple moving parts in an education workflow',
      'Keeping the data layer reliable as platform features expanded',
      'Balancing application logic with deployment and hosting concerns'
    ],
    outcome: 'Helped shape a more production-ready e-learning platform with stronger backend organization and infrastructure support.',
    githubUrl: 'https://github.com/BinduLogic/dhi-e-learning'
  },
  {
    id: 3,
    name: 'DegreePlan',
    category: 'FULL-STACK',
    techStack: ['Node.js', 'Next.js', 'React', 'WebSocket','Supabase'],
    status: 'DEPLOYED',
    description: 'Academic planning platform for mapping courses, tracking progress, and organizing degree requirements.',
    longDescription: 'DegreePlan is a student-focused planning tool that helps organize academic progress through a clearer view of courses, requirements, and roadmap decisions. Built with Next.js, React, Node.js, WebSockets, and Supabase, it supports a responsive planning experience with real-time interactions.',
    features: [
      'Degree roadmap and course planning interface',
      'WebSocket-based real-time updates',
      'Supabase-backed data and sync flows',
      'Responsive experience for student use'
    ],
    imageUrl: '/images/degree.png',
    problem: 'Students needed a simpler way to plan courses, understand requirements, and keep track of academic progress in one place.',
    role: 'Built the planning experience with full-stack coordination across Next.js, React, Node.js, WebSockets, and Supabase.',
    challenges: [
      'Turning degree requirements into something easier to visualize',
      'Keeping updates responsive enough to feel interactive',
      'Balancing roadmap clarity with practical feature scope'
    ],
    outcome: 'Created a student-focused planning tool that makes roadmap decisions and course tracking more intuitive.',
    githubUrl: 'https://github.com/Adoxcol/UniPlan_Final_1',
    liveUrl: 'https://uni-plan-final-1.vercel.app/'
  },
  {
    id: 4,
    name: 'Evergreen Construction',
    category: 'FULL-STACK',
    techStack: ['React', 'JavaScript', 'HTML', 'TailwindCSS'],
    status: 'DEPLOYED',
    description: 'Landing website for a construction company brand presence.',
    longDescription: 'A polished landing website built for Evergreen Construction to present the company\'s services, strengthen its online presence, and give potential clients a clear path to learn more and get in touch.',
    features: [
      'Modern company landing page layout',
      'Service-focused content sections',
      'Responsive design for desktop and mobile'
    ],
    imageUrl: '/images/EvergreenConstruction.png',
    problem: 'The company needed a cleaner digital presence to communicate services, build trust, and give visitors a clear landing experience.',
    role: 'Designed and built the landing-page experience with a focus on presentation, clarity, and responsiveness.',
    challenges: [
      'Keeping the site visually polished while staying straightforward',
      'Structuring service content so it felt credible and easy to scan',
      'Making the page work well on both desktop and mobile layouts'
    ],
    outcome: 'Delivered a stronger brand-facing web presence that presents the company more professionally online.',
    liveUrl: 'https://evergreen-alpha-eight.vercel.app/'
  },
  {
    id: 5,
    name: 'Mental Wellness Companion',
    category: 'AI',
    techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    status: 'ARCHIVED',
    description: 'AI-assisted wellness concept focused on supportive interactions and mental health awareness.',
    longDescription: 'A mental wellness companion concept exploring how AI-driven interfaces can support reflective check-ins, calming interactions, and a more approachable digital wellness experience. The project was built with Next.js, React, TypeScript, and TailwindCSS as a thoughtful product exploration.',
    features: [
      'Supportive wellness-oriented user flows',
      'Clean and approachable interface design',
      'AI-inspired interaction patterns',
      'Archived product exploration for future iteration'
    ],
    imageUrl: '/images/wellness.png',
    problem: 'I wanted to explore whether an AI-assisted interface could make digital wellness experiences feel more supportive and less clinical.',
    role: 'Built the product concept, interface direction, and core interaction flow as an AI-driven exploratory project.',
    challenges: [
      'Handling a sensitive subject area with the right tone',
      'Keeping the experience calm and approachable instead of overly technical',
      'Balancing ambition with the scope of an exploratory side project'
    ],
    outcome: 'Produced an archived but meaningful concept that explored how AI could support reflective and emotionally aware user flows.',
    githubUrl: 'https://github.com/Adoxcol/mentalwellness'
  },
  {
    id: 6,
    name: 'Guido Extension',
    category: 'Extension',
    techStack: ['Javascript', 'Firebase', 'Firebase Functions', 'Gitlab'],
    status: 'DEPLOYED',
    description: 'Workflow Capture Extension',
    longDescription: 'A workflow capture extension for major browsers that allows users to capture and share their browser tabs with others.',
    features: [
      'Capture and share browser tabs with others',
      'Real-time collaboration on shared tabs',
      'Customizable tab sharing permissions'
    ],
    imageUrl: '/images/guido.png',
    problem: 'Browser-based workflows often lose context quickly, especially when sharing what someone should look at or follow.',
    role: 'Worked on an extension experience focused on workflow capture and context-sharing inside the browser.',
    challenges: [
      'Making tab-sharing feel lightweight instead of disruptive',
      'Keeping captured context useful in collaborative situations',
      'Designing permissions and sharing behavior clearly'
    ],
    outcome: 'Created an extension concept that helps turn browser activity into something easier to capture, share, and collaborate around.',
    githubUrl: 'https://github.com'
  }
];

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DEPLOYED':
        return 'text-neon-lime border-neon-lime';
      case 'EXPERIMENTAL':
        return 'text-tactical-cyan border-tactical-cyan';
      case 'ARCHIVED':
        return 'text-muted-gray border-muted-gray';
      default:
        return 'text-soft-white border-soft-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI':
        return 'bg-tactical-magenta text-tactical-black';
      case 'DEVOPS':
        return 'bg-tactical-cyan text-tactical-black';
      case 'FULL-STACK':
        return 'bg-neon-lime text-tactical-black';
      case 'BACKEND':
        return 'bg-soft-white text-tactical-black';
      default:
        return 'bg-muted-gray text-soft-white';
    }
  };

  return (
    <motion.div
      className="group relative bg-tactical-black border border-muted-gray/20 hover:border-neon-lime/50 transition-all duration-300 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Scanning Overlay */}
      <div className={`absolute inset-0 bg-neon-lime/5 pointer-events-none transition-transform duration-700 ease-in-out transform ${isHovered ? 'translate-y-0' : '-translate-y-full'}`} />

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden border-b border-muted-gray/20">
        <img 
          src={project.imageUrl} 
          alt={project.name}
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 font-mono border ${getStatusColor(project.status)} bg-tactical-black/80 backdrop-blur-sm`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 relative z-10">
        <div className="flex justify-between items-start">
          <span className={`text-xs px-2 py-0.5 font-bold ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
          <span className="text-muted-gray text-xs font-mono">ID: {project.id.toString().padStart(3, '0')}</span>
        </div>

        <div>
          <h3 className="text-xl text-soft-white font-bold mb-2 group-hover:text-neon-lime transition-colors">
            {project.name}
          </h3>
          <p className="text-muted-gray text-sm line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs text-tactical-cyan font-mono border border-tactical-cyan/30 px-1.5 py-0.5">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Hover Indicator */}
        <div className={`absolute bottom-0 left-0 h-1 bg-neon-lime transition-all duration-300 ${isHovered ? 'w-full' : 'w-0'}`} />
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-tactical-black/88 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-tactical-black border border-neon-lime/20 w-full max-w-[1500px] h-[94vh] max-h-[94vh] overflow-hidden relative shadow-[0_0_42px_rgba(180,240,0,0.08)] custom-scrollbar"
      >
        <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-neon-lime/80 to-transparent" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-muted-gray hover:text-neon-lime border border-muted-gray/20 bg-tactical-black/70 backdrop-blur-sm hover:border-neon-lime/60 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid h-full grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(430px,0.85fr)]">
          {/* Image Section */}
          <div className="relative min-h-[360px] xl:min-h-full border-b xl:border-b-0 xl:border-r border-muted-gray/20 overflow-hidden">
            <img 
              src={project.imageUrl} 
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(180,240,0,0.18),transparent_28%),linear-gradient(180deg,rgba(10,10,10,0.12),rgba(10,10,10,0.72))]" />
            <div className="absolute left-6 top-6 z-10 flex flex-wrap items-center gap-3">
              <span className="border border-muted-gray/25 bg-tactical-black/55 px-3 py-1 tactical-mono text-[11px] text-soft-white/80 backdrop-blur-sm">
                CASE_{project.id.toString().padStart(3, '0')}
              </span>
              <span className={`text-xs px-2 py-1 font-mono border inline-block ${project.status === 'DEPLOYED' ? 'text-neon-lime border-neon-lime' : 'text-tactical-cyan border-tactical-cyan'} bg-tactical-black/60 backdrop-blur-sm`}>
                {project.status}
              </span>
              <span className="text-xs px-2 py-1 font-bold bg-tactical-black/65 text-soft-white border border-muted-gray/20 backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 z-10 p-6 md:p-8 xl:p-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold text-soft-white mt-2 leading-[0.95]">
                  {project.name}
                </h2>
                <p className="mt-4 max-w-xl text-sm md:text-base text-soft-white/78 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-soft-white font-mono border border-soft-white/15 bg-tactical-black/45 px-2.5 py-1 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="min-h-0 overflow-y-auto p-6 md:p-8 xl:p-10 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-neon-lime font-mono text-sm">/// CASE_STUDY</span>
                <div className="h-px flex-grow bg-neon-lime/30" />
              </div>
              <p className="text-soft-white/80 leading-relaxed text-sm md:text-base">
                {project.longDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="border border-muted-gray/20 bg-tactical-card/40 p-5">
                <div className="tactical-label text-tactical-cyan mb-2">PROBLEM</div>
                <p className="text-sm text-soft-white/80 leading-relaxed">{project.problem}</p>
              </div>
              <div className="border border-muted-gray/20 bg-tactical-card/40 p-5">
                <div className="tactical-label text-tactical-magenta mb-2">ROLE</div>
                <p className="text-sm text-soft-white/80 leading-relaxed">{project.role}</p>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-tactical-cyan font-bold mb-3 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> KEY_FEATURES
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-gray">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-neon-lime/50 rotate-45" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-tactical-cyan font-bold mb-3 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> CHALLENGES
              </h4>
              <ul className="space-y-2">
                {project.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3 text-sm text-muted-gray">
                    <span className="w-1.5 h-1.5 mt-1.5 bg-tactical-magenta/60 rotate-45" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-tactical-cyan font-bold mb-3 flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> TECH_STACK
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs text-soft-white font-mono border border-muted-gray/30 bg-muted-gray/10 px-2 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-muted-gray/20 pt-6">
              <div className="tactical-label text-neon-lime mb-2">OUTCOME</div>
              <p className="text-sm text-soft-white/80 leading-relaxed">{project.outcome}</p>
            </div>

            {/* Links */}
            <div className="pt-6 flex flex-wrap gap-4 border-t border-muted-gray/20">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted-gray/10 border border-muted-gray/30 text-soft-white hover:bg-muted-gray/20 hover:border-soft-white transition-all group"
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW_SOURCE</span>
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-neon-lime/10 border border-neon-lime/30 text-neon-lime hover:bg-neon-lime/20 hover:border-neon-lime transition-all group"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>LIVE_DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectArchive = () => {
  const [filter, setFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['ALL', 'AI', 'DEVOPS', 'FULL-STACK', 'BACKEND'];

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-tactical-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="tactical-heading text-4xl md:text-5xl text-soft-white mb-4">
              PROJECT_ARCHIVE
            </h2>
            <div className="w-24 h-1 bg-neon-lime" />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`
                  px-4 py-2 text-sm font-mono border transition-all duration-300
                  ${filter === cat 
                    ? 'border-neon-lime text-neon-lime bg-neon-lime/10' 
                    : 'border-muted-gray/30 text-muted-gray hover:border-soft-white hover:text-soft-white'}
                `}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='wait'>
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectArchive;
