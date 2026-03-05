import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalContact = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const terminalRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    updateCommand();
  };

  const updateCommand = () => {
    const parts = [];
    if (formData.name) parts.push(`--name="${formData.name}"`);
    if (formData.email) parts.push(`--email="${formData.email}"`);
    if (formData.message) parts.push(`--message="${formData.message}"`);
    setCommand(`initiate_contact ${parts.join(' ')}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setOutput(prev => [...prev, 'ERROR: All fields are required', '']);
      return;
    }

    setIsSubmitted(true);
    setOutput(prev => [
      ...prev,
      `> ${command}`,
      '',
      'PROCESSING TRANSMISSION...',
      'VALIDATING CREDENTIALS...',
      'ESTABLISHING SECURE CONNECTION...',
      '',
      '✓ TRANSMISSION RECEIVED',
      '✓ MESSAGE QUEUED FOR RESPONSE',
      '',
      'ESTIMATED RESPONSE TIME: 24-48 HOURS',
      'STATUS: AWAITING ACKNOWLEDGMENT',
      ''
    ]);

    // Reset after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setCommand('');
      setIsSubmitted(false);
    }, 3000);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <section id="contact" className="py-32 bg-tactical-section">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="tactical-heading text-4xl md:text-6xl text-soft-white mb-4">
            OPEN COMMUNICATION CHANNEL
          </h2>
          <div className="w-24 h-px bg-neon-lime mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Terminal window */}
          <motion.div
            className="bg-tactical-section tactical-border relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Terminal header */}
            <div className="bg-tactical-card tactical-border-b px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-tactical-magenta rounded-full"></div>
                <div className="w-3 h-3 bg-tactical-cyan rounded-full"></div>
                <div className="w-3 h-3 bg-neon-lime rounded-full"></div>
              </div>
              <div className="tactical-mono text-xs text-muted-gray">
                SECURE TERMINAL v2.1.0
              </div>
            </div>

            {/* Terminal content */}
            <div className="p-6">
              {/* Terminal output */}
              <div 
                ref={terminalRef}
                className="tactical-mono text-sm text-tactical-cyan mb-6 h-48 overflow-y-auto font-mono"
              >
                <div className="text-tactical-cyan">SYSTEM: READY</div>
                <div className="text-tactical-cyan">CONNECTION: SECURE</div>
                <div className="text-tactical-cyan">PROTOCOL: ENCRYPTED</div>
                <div className="text-muted-gray">{'_'}</div>
                
                {output.map((line, index) => (
                  <div 
                    key={index} 
                    className={`${
                      line.includes('ERROR') ? 'text-tactical-magenta' :
                      line.includes('✓') ? 'text-neon-lime' :
                      line.includes('>') ? 'text-soft-white' :
                      'text-tactical-cyan'
                    }`}
                  >
                    {line || <span className="text-muted-gray">{'_'}</span>}
                  </div>
                ))}

                {/* Blinking cursor */}
                {!isSubmitted && (
                  <motion.span
                    className="text-tactical-cyan"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ▊
                  </motion.span>
                )}
              </div>

              {/* Command input form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="tactical-mono text-neon-lime font-bold">&gt;</span>
                  <span className="tactical-mono text-soft-white">initiate_contact</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-4">
                  <div>
                    <label className="tactical-label text-muted-gray text-xs block mb-1">
                      --name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-tactical-card tactical-border px-3 py-2 tactical-mono text-sm text-soft-white focus:border-tactical-cyan focus:outline-none transition-colors duration-200"
                      placeholder="your_name"
                      disabled={isSubmitted}
                    />
                  </div>

                  <div>
                    <label className="tactical-label text-muted-gray text-xs block mb-1">
                      --email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-tactical-card tactical-border px-3 py-2 tactical-mono text-sm text-soft-white focus:border-tactical-cyan focus:outline-none transition-colors duration-200"
                      placeholder="your_email"
                      disabled={isSubmitted}
                    />
                  </div>

                  <div>
                    <label className="tactical-label text-muted-gray text-xs block mb-1">
                      --message
                    </label>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="w-full bg-tactical-card tactical-border px-3 py-2 tactical-mono text-sm text-soft-white focus:border-tactical-cyan focus:outline-none transition-colors duration-200"
                      placeholder="your_message"
                      disabled={isSubmitted}
                    />
                  </div>
                </div>

                {/* Command preview */}
                <div className="mt-4 p-3 bg-tactical-card tactical-border">
                  <div className="tactical-mono text-xs text-muted-gray mb-1">COMMAND:</div>
                  <div className="tactical-mono text-sm text-soft-white break-all">
                    {command || 'initiate_contact --name="" --email="" --message=""'}
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="w-full bg-transparent tactical-border border-2 border-neon-lime px-6 py-3 tactical-heading text-neon-lime hover:bg-neon-lime hover:text-tactical-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  [ TRANSMIT ]
                </motion.button>
              </form>

              {/* System messages */}
              {isSubmitted && (
                <motion.div
                  className="mt-4 p-4 bg-tactical-card tactical-border border-neon-lime"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 bg-neon-lime rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <span className="tactical-mono text-sm text-neon-lime">
                      TRANSMISSION IN PROGRESS...
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Security notice */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 tactical-mono text-xs text-muted-gray">
              <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></div>
              <span>SECURE CONNECTION ESTABLISHED</span>
              <span>•</span>
              <span>ENCRYPTION: AES-256</span>
              <span>•</span>
              <span>PROTOCOL: TLS 1.3</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalContact;
