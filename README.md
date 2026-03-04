# Tactical Developer Portfolio

A production-ready futuristic developer portfolio inspired by the 2025 Bungie Marathon aesthetic. This portfolio is designed to feel like a classified tactical interface rather than a traditional portfolio website.

## 🎯 Features

- **Tactical Interface Design**: Brutalist sci-fi aesthetic with industrial grid layouts
- **Custom Cursor**: Animated crosshair cursor with glow effects and tracking
- **Loading Screen**: System initialization with progress indicators
- **Tactical Background**: Animated grid with scanlines and system coordinates
- **Responsive Design**: Mobile-optimized with accessibility features
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Terminal Contact**: Fake command-line interface for contact form
- **Social Integration**: GitHub, LinkedIn, and email contact links

## 🎨 Design System

### Color Palette
- **Background**: `#0A0A0A` (primary), `#111111` (section), `#161616` (cards)
- **Accent Colors**: Neon Lime (`#B4F000`), Magenta (`#FF2E88`), Cyan (`#00F0FF`)
- **Text**: Soft White (`#EAEAEA`), Muted Gray (`#666666`)

### Typography
- **Headings**: Space Grotesk (bold, condensed, all caps)
- **Body**: IBM Plex Mono (monospace, technical feel)
- **UI Labels**: Tiny uppercase mono text

## 🚀 Sections

1. **Hero Section**: Tactical status panel with system information and social links
2. **About Section**: System profile with diagnostics and mission objectives
3. **Project Archive**: 6 tactical project cards with hover effects
4. **Skills Matrix**: Categorized skill display with proficiency indicators
5. **System Metrics**: Animated counters with system statistics
6. **Terminal Contact**: Command-line style contact interface

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom utilities
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 🎯 Project Structure

```
src/
├── components/          # React components
│   ├── CustomCursor.tsx     # Animated crosshair cursor
│   ├── TacticalBackground.tsx # Grid and scanline background
│   ├── LoadingScreen.tsx    # System initialization screen
│   ├── HeroSection.tsx      # Main hero with status panel and social links
│   ├── AboutSection.tsx     # System profile and diagnostics
│   ├── ProjectArchive.tsx   # Project cards with hover effects
│   ├── SkillsMatrix.tsx     # Skill categorization and proficiency
│   ├── SystemMetrics.tsx    # Animated counters and stats
│   └── TerminalContact.tsx  # Command-line contact form
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── index.css           # Global styles and utilities
```

## 🎨 Customization

### Personal Information
- **Name**: Mahmood Tauhidul
- **Specializations**: Full Stack, AI Systems, SQA
- **GitHub**: https://github.com/Adoxcol
- **LinkedIn**: https://www.linkedin.com/in/mahfuzur-rahman-60084326b/
- **Email**: mahmood.tauhidul@example.com

### Colors
Edit the color palette in `tailwind.config.js`:

```javascript
colors: {
  'tactical-black': '#0A0A0A',
  'tactical-section': '#111111',
  'tactical-card': '#161616',
  'neon-lime': '#B4F000',
  'tactical-magenta': '#FF2E88',
  'tactical-cyan': '#00F0FF',
  'soft-white': '#EAEAEA',
  'muted-gray': '#666666',
}
```

### Content
Update the content in each component:
- **Hero**: Edit name and title in `HeroSection.tsx`
- **About**: Modify system profile data in `AboutSection.tsx`
- **Projects**: Update project data in `ProjectArchive.tsx`
- **Skills**: Adjust skill levels in `SkillsMatrix.tsx`
- **Metrics**: Change metric values in `SystemMetrics.tsx`

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-optimized layouts
- Touch-friendly interactions
- Reduced motion support
- High contrast mode compatibility
- Print-friendly styles

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Reduced motion preferences
- High contrast mode support

## 🔧 Performance

- Optimized images with placeholders
- Lazy loading for components
- Efficient animations with Framer Motion
- Minimal bundle size
- Fast loading times

## 🚀 Deployment

The portfolio is ready for deployment on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or collaboration opportunities, please use the terminal contact form on the live portfolio or connect via:
- GitHub: https://github.com/Adoxcol
- LinkedIn: https://www.linkedin.com/in/mahfuzur-rahman-60084326b/
- Email: mahmood.tauhidul@example.com