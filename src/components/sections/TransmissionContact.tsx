import { useState } from 'react';
import { motion } from 'framer-motion';
import { contact } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';

const TransmissionContact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('ALL FIELDS REQUIRED FOR TRANSMISSION');
      return;
    }
    setError('');
    setIsSubmitted(true);

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Transmission from ${formData.name}`
    )}&body=${encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`;

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="snap-scene min-h-screen flex items-center py-24 bg-section relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-[36rem] h-[36rem] aura-field pointer-events-none opacity-50" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="doc-label text-gold mb-2">OPEN A TRANSMISSION</div>
          <h2 className="doc-heading text-3xl md:text-5xl text-bone">Request Contact</h2>
          <ChainDivider className="mt-4 w-32 mx-auto" tone="scarlet" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto license-border bg-card p-6 md:p-8 space-y-5"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="doc-label text-muted block mb-1">NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={isSubmitted}
                className="w-full bg-ink license-border px-3 py-2 doc-mono text-sm text-bone focus:border-ember focus:outline-none transition-colors"
                placeholder="your_name"
              />
            </div>
            <div>
              <label className="doc-label text-muted block mb-1">EMAIL</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={isSubmitted}
                className="w-full bg-ink license-border px-3 py-2 doc-mono text-sm text-bone focus:border-ember focus:outline-none transition-colors"
                placeholder="your_email"
              />
            </div>
          </div>

          <div>
            <label className="doc-label text-muted block mb-1">MESSAGE</label>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              disabled={isSubmitted}
              rows={4}
              className="w-full bg-ink license-border px-3 py-2 doc-mono text-sm text-bone focus:border-ember focus:outline-none transition-colors resize-none"
              placeholder="your_message"
            />
          </div>

          {error && <div className="doc-mono text-xs text-ember">{error}</div>}

          <motion.button
            type="submit"
            disabled={isSubmitted}
            className="w-full border-2 border-ember px-6 py-3 doc-heading text-ember hover:bg-ember hover:text-ink hover:scarlet-glow transition-all duration-300 disabled:opacity-50"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitted ? 'TRANSMITTING...' : '[ TRANSMIT ]'}
          </motion.button>

          <div className="flex items-center justify-center gap-2 doc-mono text-xs text-muted pt-2">
            <div className="w-2 h-2 bg-ember rounded-full animate-pulse" />
            <span>SECURE CHANNEL // {contact.email}</span>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default TransmissionContact;
