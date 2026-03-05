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
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Goverment Hospital Website',
    category: 'FULL-STACK',
    techStack: ['Javascript', 'React', 'Node.js', 'Express', 'PayloadCMS'],
    status: 'DEPLOYED',
    description: 'Advanced RAG system for enterprise knowledge management',
    longDescription: 'A scalable Retrieval-Augmented Generation (RAG) system designed to process and query vast amounts of enterprise documentation. Leveraging OpenAI\'s embeddings and Pinecone vector database, it delivers context-aware answers with high accuracy.',
    features: [
      'Semantic search across millions of documents',
      'Context-aware answer generation',
      'Real-time document indexing pipeline',
      'Role-based access control for knowledge bases'
    ],
    imageUrl: '/images/gov.png',
    githubUrl: 'https://github.com/BinduLogic/government-hospital-website',
    liveUrl: 'https://nicvd-website.bgdtup.easypanel.host/en'
  },
  {
    id: 2,
    name: 'DHI E-Learning Platform',
    category: 'FULL-STACK',
    techStack: ['AWS', 'Prisma', 'Node.js', 'Express', 'PostgreSQL'],
    status: 'DEPLOYED',
    description: 'Automated deployment pipeline for microservices',
    longDescription: 'A fully automated infrastructure-as-code solution for deploying microservices to AWS ECS. It handles build, test, and deployment phases with zero-downtime updates using Blue/Green deployment strategies.',
    features: [
      'Infrastructure provisioning via Terraform',
      'Automated container builds with Docker',
      'Blue/Green deployment strategy',
      'Integrated security scanning and compliance checks'
    ],
    imageUrl: '/images/dhi.png',
    githubUrl: 'https://github.com/BinduLogic/dhi-e-learning'
  },
  {
    id: 3,
    name: 'DegreePlan',
    category: 'FULL-STACK',
    techStack: ['Node.js', 'Next.js', 'React', 'WebSocket','Supabase'],
    status: 'DEPLOYED',
    description: 'Real-time log processing and visualization system',
    longDescription: 'A high-throughput log analysis platform that ingests, processes, and visualizes system logs in real-time. Built with the ELK stack and a React frontend, it provides instant insights into system health and anomalies.',
    features: [
      'WebSocket-based real-time updates',
      'Customizable dashboard with drag-and-drop widgets',
      'Anomaly detection alerts',
      'High-performance log ingestion pipeline'
    ],
    imageUrl: '/images/degree.png',
    githubUrl: 'https://github.com/Adoxcol/UniPlan_Final_1',
    liveUrl: 'https://uni-plan-final-1.vercel.app/'
  },
  {
    id: 4,
    name: 'Visual Novel Game',
    category: 'FULL-STACK',
    techStack: ['React', 'JavaScript', 'HTML', 'TailwindCSS'],
    status: 'EXPERIMENTAL',
    description: 'Comprehensive K8s cluster monitoring solution',
    longDescription: 'A centralized observability platform for Kubernetes clusters, integrating Prometheus for metrics collection and Grafana for visualization. It includes custom exporters written in Go for specific application metrics.',
    features: [
      'Auto-discovery of new pods and services',
      'Custom metric exporters in Go',
      'AlertManager integration for critical incidents',
      'Resource usage optimization recommendations'
    ],
    imageUrl: '/images/novel.png',
    githubUrl: 'https://github.com/Adoxcol/flowervisualnovel',
    liveUrl: 'https://adoxcol.github.io/flowervisualnovel/'
  },
  {
    id: 5,
    name: 'Mental Wellness Companion',
    category: 'AI',
    techStack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'],
    status: 'ARCHIVED',
    description: 'NLP-powered resume screening and matching system',
    longDescription: 'An intelligent recruitment tool that uses Natural Language Processing (NLP) to parse resumes and match them against job descriptions. It utilizes BERT models for semantic understanding of candidate skills and experiences.',
    features: [
      'PDF and Word document parsing',
      'Entity extraction (Skills, Education, Experience)',
      'Semantic matching score calculation',
      'Bias detection and mitigation algorithms'
    ],
    imageUrl: '/images/wellness.png',
    githubUrl: 'https://github.com/Adoxcol/mentalwellness'
  },
  {
    id: 6,
    name: 'Fabric Analyzer',
    category: 'BACKEND',
    techStack: ['C#', 'RabbitMQ', 'Redis', 'PostgreSQL'],
    status: 'DEPLOYED',
    description: 'High-performance distributed task processing system',
    longDescription: 'A robust background job processing system designed for high concurrency and fault tolerance. It uses RabbitMQ for message brokering and Redis for state management, ensuring reliable execution of critical business tasks.',
    features: [
      'Priority queue management',
      'Automatic retries and dead-letter handling',
      'Horizontal scaling capabilities',
      'Real-time processing metrics'
    ],
    imageUrl: 'https://placehold.co/600x400/1a1a1a/FF2E88?text=TASK+QUEUE',
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-tactical-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-tactical-black border border-neon-lime/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-[0_0_30px_rgba(180,240,0,0.1)] custom-scrollbar"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-muted-gray hover:text-neon-lime border border-transparent hover:border-neon-lime transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-64 md:h-full min-h-[300px] border-b md:border-b-0 md:border-r border-muted-gray/20">
            <img 
              src={project.imageUrl} 
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tactical-black to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 z-10">
              <span className={`text-xs px-2 py-1 font-mono border mb-2 inline-block ${project.status === 'DEPLOYED' ? 'text-neon-lime border-neon-lime' : 'text-tactical-cyan border-tactical-cyan'}`}>
                {project.status}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-soft-white mt-2">{project.name}</h2>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-neon-lime font-mono text-sm">/// PROJECT_DETAILS</span>
                <div className="h-px flex-grow bg-neon-lime/30" />
              </div>
              <p className="text-soft-white/80 leading-relaxed text-sm md:text-base">
                {project.longDescription}
              </p>
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
