# Mahmood OS

A personal portfolio inside a 1990s CRT desktop. Built with React, TypeScript, Vite, and Tailwind CSS.

## Desktop

- Independent app windows: open together, focus, move by their title bars, resize from the lower-right corner, maximize, minimize, and close.
- Each running app has a taskbar button. Clicking its active button minimizes it; clicking another restores and focuses that app. Show Desktop minimizes every window.
- On mobile, one focused app fills the display; use the scrollable taskbar to switch. Other apps retain their content and state.
- Original pixel-art desktop icons for My Projects, Studio.exe, My Computer, Experiments, Contact.txt, README.txt, and Display Settings.
- Right-click the desktop or use the always-visible Display Properties button to customize four wallpapers, three title-bar accents, dark app interiors, and CRT intensity.
- Preferences persist in this browser's local storage. If storage is unavailable, settings still work for the current visit.
- Brief skippable startup screen, monitor power controls, and reduced-motion support.

## Portfolio content

My Projects provides searchable projects and case studies. Studio.exe showcases the real desktop music player with a screenshot gallery, technical details, website, source, and downloads. My Computer shows the developer profile and professional timeline. Experiments contains personal projects, Contact.txt provides email/social links, and README.txt introduces the person behind the portfolio.

Studio remains a showcase of the native app, with a separate Listening Room browser demo. The demo includes three original synthesized 32-second tracks, play/pause, seeking, volume, repeat, track selection, a live spectrum, and reduced-motion support. It never autoplays on first open. Closing its window stops the audio.

Command.com supports help, whoami, projects, ls, open, cat readme.txt, date, and clear, plus command history and completion. It is a portfolio command interface and never executes system commands.

Minesweeper.exe includes a 9×9 board with 10 mines, a safe first reveal, flood fill, flags, chording, timer, win/loss handling, saved best time, and keyboard/touch controls.

## Development

```sh
npm install
npm run dev -- --port 5198
npm run build
npm run lint
```

With Node 22.18+ (native TypeScript stripping):

```sh
node --test tests/*.test.mjs
```

Window geometry, taskbar transitions, and saved-preference validation are tested without a browser. Browser interaction testing is separate.

## Editing

- `src/App.tsx`: desktop, menus, app coordination, README, and preferences.
- `src/lib/desktop.ts`: window transitions, geometry, and preference validation.
- `src/components/DesktopFrame.tsx`: window controls, dragging, and resizing.
- `src/components/PortfolioContent.tsx`: each portfolio app's independent contents and state.
- `src/components/PixelIcon.tsx`: original SVG pixel icons.
- `src/components/DisplayProperties.tsx`: appearance settings.
- `src/components/Monitor.tsx`: physical monitor, startup, power, and CRT effects.
- `src/data/content.ts`: professional and project content.
- `src/index.css`: responsive visual styling.
- `public/images/studio/`: screenshots copied from Studio's project documentation.

## Original demo audio

The WAV files in public/audio contain original procedural compositions with no samples. Regenerate them with node scripts/generate-demo-audio.mjs. Audio file integrity and non-silent PCM data are included in the test suite.
