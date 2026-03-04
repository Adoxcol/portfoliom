import { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // AI Skills
  { name: 'LLM Integration', level: 95, category: 'AI' },
  { name: 'RAG Systems', level: 90, category: 'AI' },
  { name: 'Prompt Engineering', level: 85, category: 'AI' },
  { name: 'Embeddings', level: 88, category: 'AI' },
  { name: 'Vector Databases', level: 82, category: 'AI' },
  
  // DevOps Skills
  { name: 'AWS', level: 92, category: 'DevOps' },
  { name: 'Docker', level: 90, category: 'DevOps' },
  { name: 'Kubernetes', level: 85, category: 'DevOps' },
  { name: 'CI/CD', level: 88, category: 'DevOps' },
  { name: 'Terraform', level: 80, category: 'DevOps' },
  
  // Backend Skills
  { name: 'Node.js', level: 95, category: 'Backend' },
  { name: 'C#', level: 88, category: 'Backend' },
  { name: 'Python', level: 85, category: 'Backend' },
  { name: 'REST APIs', level: 92, category: 'Backend' },
  { name: 'Microservices', level: 87, category: 'Backend' },
];

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI':
        return 'text-tactical-magenta border-tactical-magenta';
      case 'DevOps':
        return 'text-tactical-cyan border-tactical-cyan';
      case 'Backend':
        return 'text-neon-lime border-neon-lime';
      default:
        return 'text-soft-white border-soft-white';
    }
  };

  const getProgressColor = (category: string) => {
    switch (category) {
      case 'AI':
        return 'bg-tactical-magenta';
      case 'DevOps':
        return 'bg-tactical-cyan';
      case 'Backend':
        return 'bg-neon-lime';
      default:
        return 'bg-soft-white';
    }
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="bg-tactical-card tactical-border p-6 h-full flex flex-col justify-between relative overflow-hidden">
        {/* Skill name and category */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="tactical-mono text-lg text-soft-white group-hover:text-neon-lime transition-colors duration-300">
              {skill.name}
            </h3>
            <span className={`tactical-label text-xs px-2 py-1 border ${getCategoryColor(skill.category)}`}>
              {skill.category}
            </span>
          </div>
          
          <div className="tactical-mono text-2xl font-bold text-neon-lime">
            {skill.level}%
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-tactical-section h-px relative">
            <motion.div
              className={`absolute inset-y-0 left-0 ${getProgressColor(skill.category)}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
            
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-y-0 left-0 ${getProgressColor(skill.category)} blur-sm`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Hover effect - neon underline sweep */}
        <motion.div
          className={`absolute bottom-0 left-0 h-px ${getProgressColor(skill.category)}`}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.1 : 0,
            boxShadow: isHovered 
              ? `0 0 20px ${getProgressColor(skill.category).includes('magenta') ? 'rgba(255, 46, 136, 0.3)' : 
                   getProgressColor(skill.category).includes('cyan') ? 'rgba(0, 240, 255, 0.3)' : 
                   'rgba(180, 240, 0, 0.3)'}` 
              : 'none'
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const SkillsMatrix = () => {
  const categories = ['AI', 'DevOps', 'Backend'];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

  return (
    <section id="skills" className="py-32 bg-tactical-section">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="tactical-heading text-4xl md:text-6xl text-soft-white mb-4">
            CAPABILITY MATRIX
          </h2>
          <div className="w-24 h-px bg-neon-lime"></div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="mb-12 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`tactical-label px-4 py-2 border transition-all duration-300 ${
              selectedCategory === null 
                ? 'bg-neon-lime text-tactical-black border-neon-lime' 
                : 'bg-transparent text-neon-lime border-neon-lime hover:bg-neon-lime hover:text-tactical-black'
            }`}
          >
            ALL SYSTEMS
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`tactical-label px-4 py-2 border transition-all duration-300 ${
                selectedCategory === category 
                  ? category === 'AI' 
                    ? 'bg-tactical-magenta text-tactical-black border-tactical-magenta'
                    : category === 'DevOps'
                    ? 'bg-tactical-cyan text-tactical-black border-tactical-cyan'
                    : 'bg-neon-lime text-tactical-black border-neon-lime'
                  : category === 'AI'
                  ? 'bg-transparent text-tactical-magenta border-tactical-magenta hover:bg-tactical-magenta hover:text-tactical-black'
                  : category === 'DevOps'
                  ? 'bg-transparent text-tactical-cyan border-tactical-cyan hover:bg-tactical-cyan hover:text-tactical-black'
                  : 'bg-transparent text-neon-lime border-neon-lime hover:bg-neon-lime hover:text-tactical-black'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>

        {/* Matrix stats */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-6 tactical-mono text-sm text-muted-gray">
            <span>TOTAL CAPABILITIES: {skills.length}</span>
            <span>•</span>
            <span>AI SYSTEMS: {skills.filter(s => s.category === 'AI').length}</span>
            <span>•</span>
            <span>DEVOPS: {skills.filter(s => s.category === 'DevOps').length}</span>
            <span>•</span>
            <span>BACKEND: {skills.filter(s => s.category === 'Backend').length}</span>
          </div>
        </motion.div>

        {/* Average proficiency */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-tactical-card tactical-border p-6">
            <div className="tactical-label text-tactical-cyan mb-2">OVERALL PROFICIENCY</div>
            <div className="tactical-mono text-4xl text-neon-lime font-bold">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMatrix;