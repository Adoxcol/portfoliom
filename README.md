# Mahmood OS

A personal portfolio presented as a small desktop operating system, built with React, TypeScript, Vite, and Tailwind CSS.

## Experience

- Selected work: searchable project explorer and project details.
- Studio: featured desktop music player, real screenshot gallery, engineering overview, website, source, and release links.
- About: profile and professional timeline.
- Lab: ongoing personal experiments.
- Contact: email, clipboard copy, and social links.
- Desktop shortcuts, app dock, minimize/close/restore/maximize controls, and light/dark appearance.
- Mobile navigation and reduced-motion support.

The portfolio uses one active content window. It is a portfolio interface, not an embedded copy of Studio; no music playback is simulated.

## Development

```sh
npm install
npm run dev -- --port 5198
```

```sh
npm run build
npm run lint
```

Content shared with the previous portfolio lives in `src/data/content.ts`. The current desktop experience is in `src/App.tsx`, with responsive styling in `src/index.css`. Studio screenshots in `public/images/studio/` were copied from the Studio project's documentation.
