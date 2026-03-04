import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  category: string;
  techStack: string[];
  status: 'DEPLOYED' | 'EXPERIMENTAL' | 'ARCHIVED';
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'LLM Knowledge Retrieval System',
    category: 'AI',
    techStack: ['Python', 'OpenAI', 'Pinecone', 'FastAPI'],
    status: 'DEPLOYED',
    description: 'Advanced RAG system for enterprise knowledge management',
    imageUrl: 'https://placehold.co/600x400/1a1a1a/00F0FF?text=LLM+SYSTEM'
  },
  {
    id: 2,
    name: 'AWS CI/CD Deployment Engine',
    category: 'DEVOPS',
    techStack: ['AWS', 'Terraform', 'Jenkins', 'Docker'],
    status: 'DEPLOYED',
    description: 'Automated deployment pipeline for microservices',
    imageUrl: 'https://placehold.co/600x400/1a1a1a/B4F000?text=CI/CD+ENGINE'
  },
  {
    id: 3,
    name: 'Real-time Log Analyzer',
    category: 'FULL-STACK',
    techStack: ['Node.js', 'Elasticsearch', 'React', 'WebSocket'],
    status: 'EXPERIMENTAL',
    description: 'Real-time log processing and visualization system',
    imageUrl: 'https://placehold.co/600x400/1a1a1a/FF2E88?text=LOG+ANALYZER'
  },
  {
    id: 4,
    name: 'Kubernetes Monitoring Dashboard',
    category: 'DEVOPS',
    techStack: ['Kubernetes', 'Prometheus', 'Grafana', 'Go'],
    status: 'DEPLOYED',
    description: 'Comprehensive K8s cluster monitoring solution',
    imageUrl: 'https://placehold.co/600x400/1a1a1a/00F0FF?text=K8S+DASHBOARD'
  },
  {
    id: 5,
    name: 'AI Resume Analyzer',
    category: 'AI',
    techStack: ['Python', 'spaCy', 'BERT', 'FastAPI'],
    status: 'ARCHIVED',
    description: 'NLP-powered resume screening and matching system',
    imageUrl: 'https://placehold.co/600x400/1a1a1a/B4F000?text=AI+ANALYZER'
  },
  {
    id: 6,
    name: 'Distributed Task Queue System',
    category: 'BACKEND',
    techStack: ['C#', 'RabbitMQ', 'Redis', 'PostgreSQL'],
    status: 'DEPLOYED',
    description: 'High-performance distributed task processing system',
    imageUrl: 'https://placehold.co/600x400/1a1a1a/FF2E88?text=TASK+QUEUE'
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
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
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="bg-tactical-card tactical-border overflow-hidden relative">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
          />
          
          {/* Image overlay text */}
          <div className="absolute top-2 right-2 tactical-mono text-xs text-muted-gray bg-tactical-black bg-opacity-80 px-2 py-1">
            IMAGE DATA UNAVAILABLE
          </div>

          {/* Category badge */}
          <div className={`absolute top-2 left-2 tactical-label px-2 py-1 text-xs ${getCategoryColor(project.category)}`}>
            {project.category}
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-tactical-black bg-opacity-90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center space-y-3 px-4">
              <div className="tactical-mono text-sm text-soft-white">
                {project.description}
              </div>
              <div className="tactical-label text-xs text-muted-gray">
                CLICK FOR DETAILS
              </div>
            </div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="tactical-heading text-xl text-soft-white group-hover:text-neon-lime transition-colors duration-300">
              {project.name}
            </h3>
            
            <div className="flex items-center gap-3">
              <div className={`tactical-label text-xs px-2 py-1 border ${getStatusColor(project.status)}`}>
                {project.status}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <div className="tactical-label text-muted-gray text-xs">TECH STACK</div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="tactical-mono text-xs text-soft-white bg-tactical-section px-2 py-1 tactical-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Neon border glow on hover */}
        <motion.div
          className="absolute inset-0 border-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered 
              ? '0 0 20px rgba(180, 240, 0, 0.3), inset 0 0 20px rgba(180, 240, 0, 0.1)' 
              : '0 0 0px rgba(180, 240, 0, 0)'
          }}
          transition={{ duration: 0.3 }}
          style={{ borderColor: '#B4F000' }}
        />
      </div>
    </motion.div>
  );
};

const ProjectArchive = () => {
  return (
    <section id="projects" className="py-32 bg-tactical-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="tactical-heading text-4xl md:text-6xl text-soft-white mb-4">
            PROJECT ARCHIVE
          </h2>
          <div className="w-24 h-px bg-neon-lime"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* Archive stats */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 tactical-mono text-sm text-muted-gray">
            <span>TOTAL ARCHIVES: {projects.length}</span>
            <span>•</span>
            <span>DEPLOYED: {projects.filter(p => p.status === 'DEPLOYED').length}</span>
            <span>•</span>
            <span>EXPERIMENTAL: {projects.filter(p => p.status === 'EXPERIMENTAL').length}</span>
            <span>•</span>
            <span>ARCHIVED: {projects.filter(p => p.status === 'ARCHIVED').length}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectArchive;