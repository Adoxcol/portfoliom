import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  FlaskConical,
  Folder,
  Github,
  Globe,
  Headphones,
  Mail,
  Maximize2,
  Minus,
  Moon,
  Music2,
  Search,
  Settings2,
  Sparkles,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { profile, hunts, sideQuests, examPhases } from "./data/content";
import "./index.css";

type AppId = "work" | "studio" | "about" | "lab" | "contact";
const apps = [
  { id: "work" as const, name: "Selected work", icon: Folder, color: "blue" },
  { id: "studio" as const, name: "Studio", icon: Music2, color: "green" },
  { id: "about" as const, name: "About me", icon: UserRound, color: "peach" },
  { id: "lab" as const, name: "The lab", icon: FlaskConical, color: "purple" },
  { id: "contact" as const, name: "Get in touch", icon: Mail, color: "yellow" },
];
const shots = [
  { file: "darkmode", label: "Your library, your way" },
  { file: "playback-mode", label: "An immersive listening space" },
  { file: "equalizer", label: "Dial in your sound" },
];
const images: Record<number, string> = {
  1: "gov",
  2: "dhi",
  3: "degree",
  4: "EvergreenConstruction",
  5: "wellness",
  6: "guido",
};

export default function App() {
  const [active, setActive] = useState<AppId>("work");
  const [opened, setOpened] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [dark, setDark] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [shot, setShot] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!copyStatus) return;
    const timer = setTimeout(() => setCopyStatus(""), 3000);
    return () => clearTimeout(timer);
  }, [copyStatus]);
  function open(id: AppId) {
    setActive(id);
    setOpened(true);
    setSelected(null);
    setQuery("");
  }
  const project = hunts.find((hunt) => hunt.id === selected);
  const results = hunts.filter((hunt) =>
    `${hunt.name} ${hunt.techStack.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const showStudio = "studio flutter music desktop riverpod dart".includes(
    query.toLowerCase(),
  );
  return (
    <div className={`os ${dark ? "night" : ""}`}>
      <header className="menu-bar">
        <button
          className="brand"
          onClick={() => open("work")}
          aria-label="Mahmood OS home"
        >
          <b>m.</b> mahmood<span>OS</span>
        </button>
        <span className="menu-context">A little window into my world</span>
        <div className="system-status">
          <i className="online-dot" />
          <span className="status-label">Based in Dhaka</span>
          <button
            onClick={() => setDark(!dark)}
            aria-label={`Switch to ${dark ? "light" : "dark"} appearance`}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <time>
            {clock.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
        </div>
      </header>
      <main className="desktop">
        <div className="wallpaper-type" aria-hidden="true">
          make things
          <br />
          that matter.
        </div>
        <nav className="desktop-shortcuts" aria-label="Desktop apps">
          {apps.slice(0, 3).map((app) => (
            <button key={app.id} onClick={() => open(app.id)}>
              <span className={`app-icon ${app.color}`}>
                <app.icon size={27} strokeWidth={1.7} />
              </span>
              <span>{app.name}</span>
            </button>
          ))}
        </nav>
        <aside className="welcome-note">
          <div className="note-top">
            <span className="eyebrow">HELLO, INTERNET</span>
            <Sparkles size={17} />
          </div>
          <h1>I'm Mahmood.</h1>
          <p>
            Engineer by trade.
            <br />
            Curious by default.
          </p>
          <p className="note-detail">
            I build full-stack products, intelligent systems, and things for the
            love of it.
          </p>
          <div className="note-footer">
            <i className="online-dot" /> Currently building at
            <br />
            <strong>Remote Integrity ↗</strong>
          </div>
          <span className="note-signature">make yourself at home</span>
        </aside>
        {opened ? (
          <section
            className={`app-window ${expanded ? "expanded" : ""}`}
            aria-label={apps.find((app) => app.id === active)?.name}
          >
            <div className="window-bar">
              <div className="traffic-lights">
                <button
                  className="close"
                  aria-label="Close window"
                  onClick={() => setOpened(false)}
                >
                  <X size={10} />
                </button>
                <button
                  className="minimize"
                  aria-label="Minimize window"
                  onClick={() => setOpened(false)}
                >
                  <Minus size={10} />
                </button>
                <button
                  className="maximize"
                  aria-label={expanded ? "Restore window" : "Maximize window"}
                  onClick={() => setExpanded(!expanded)}
                >
                  <Maximize2 size={9} />
                </button>
              </div>
              <div className="window-title">
                <Folder size={13} />{" "}
                {apps.find((app) => app.id === active)?.name}
                <span>— mahmood</span>
              </div>
              <span className="window-hint">PERSONAL SPACE / 01</span>
            </div>
            <div className="window-layout">
              <nav className="sidebar" aria-label="Window navigation">
                <span className="eyebrow sidebar-heading">YOUR EXPLORER</span>
                {apps.map((app) => (
                  <button
                    className={active === app.id ? "active" : ""}
                    aria-current={active === app.id ? "page" : undefined}
                    key={app.id}
                    onClick={() => open(app.id)}
                  >
                    <app.icon size={17} />
                    {app.name}
                    {app.id === "studio" && <i className="new-dot" />}
                  </button>
                ))}
                <div className="sidebar-bottom">
                  <Code2 size={20} />
                  <p>
                    Thoughtfully built.
                    <br />
                    Always evolving.
                  </p>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Find me on GitHub <ArrowUpRight size={13} />
                  </a>
                </div>
              </nav>
              <div className="window-content" key={`${active}-${selected}`}>
                {active === "work" && !project && (
                  <>
                    <div className="content-heading">
                      <div>
                        <span className="eyebrow">A FEW THINGS I'VE MADE</span>
                        <h2>
                          Selected work<span> / 07</span>
                        </h2>
                      </div>
                      <span className="badge">2025 — NOW</span>
                    </div>
                    <p className="intro">
                      From an idea in a notebook to something you can actually
                      use.
                    </p>
                    <label className="search-box">
                      <Search size={16} />
                      <input
                        aria-label="Search projects"
                        placeholder="Find a project or technology..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                      <span>⌕</span>
                    </label>
                    {showStudio && (
                      <button
                        className="studio-feature"
                        onClick={() => open("studio")}
                      >
                        <div className="feature-copy">
                          <span className="eyebrow">● FEATURED PROJECT</span>
                          <div className="studio-wordmark">
                            <Music2 size={29} />
                            <h3>Studio</h3>
                          </div>
                          <p>
                            A space for your music.
                            <br />
                            Built to feel like yours.
                          </p>
                          <div className="feature-tags">
                            DESKTOP APP · OPEN SOURCE
                          </div>
                          <span className="feature-link">
                            Step inside Studio <ArrowUpRight size={17} />
                          </span>
                        </div>
                        <div className="feature-art">
                          <div className="record">
                            <span>
                              studio<small>SIDE A · PLAY IT YOUR WAY</small>
                            </span>
                          </div>
                          <img
                            src="/images/studio/darkmode.png"
                            alt="Studio's desktop music library interface"
                          />
                        </div>
                      </button>
                    )}
                    <div className="section-label">
                      <span>THE PROJECT FILES</span>
                      <span>
                        {results.length + (showStudio ? 1 : 0)} items ↓
                      </span>
                    </div>
                    <div className="project-grid">
                      {results.map((hunt) => (
                        <button
                          className="project-card"
                          key={hunt.id}
                          onClick={() => setSelected(hunt.id)}
                        >
                          <div className={`project-image project-${hunt.id}`}>
                            <img
                              loading="lazy"
                              src={`/images/${images[hunt.id]}.png`}
                              alt={`${hunt.name} preview`}
                            />
                            <span>
                              <ArrowUpRight size={18} />
                            </span>
                          </div>
                          <div className="project-card-title">
                            <h3>{hunt.name}</h3>
                            <span>0{hunt.id}</span>
                          </div>
                          <p>
                            {hunt.category === "AI"
                              ? "AI exploration"
                              : hunt.category === "EXTENSION"
                                ? "Browser extension"
                                : "Web application"}{" "}
                            / {hunt.techStack.slice(0, 2).join(", ")}
                          </p>
                        </button>
                      ))}
                    </div>
                    {!results.length && !showStudio && (
                      <p className="intro">
                        No projects match “{query}”. Try React, AI, or Studio.
                      </p>
                    )}
                  </>
                )}
                {active === "work" && project && (
                  <>
                    <button
                      className="back-link"
                      onClick={() => setSelected(null)}
                    >
                      <ChevronLeft size={16} /> All projects
                    </button>
                    <span className="eyebrow">
                      PROJECT FILE / 0{project.id}
                    </span>
                    <h2>{project.name}</h2>
                    <p className="intro">{project.longSummary}</p>
                    <div className="tags">
                      {project.techStack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="detail-block">
                      <h3>The challenge</h3>
                      <p>{project.objective}</p>
                      <h3>My contribution</h3>
                      <p>{project.role}</p>
                      <h3>What it involved</h3>
                      <ul>
                        {project.obstacles.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <h3>The result</h3>
                      <p>{project.reward}</p>
                    </div>
                    <div className="action-row">
                      {project.liveUrl && (
                        <a
                          className="primary-button"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit project <ArrowUpRight size={16} />
                        </a>
                      )}
                      {project.githubUrl &&
                        project.githubUrl !== "https://github.com" && (
                          <a
                            className="secondary-button"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Github size={16} /> Source code
                          </a>
                        )}
                    </div>
                  </>
                )}
                {active === "studio" && (
                  <>
                    <span className="eyebrow">
                      PERSONAL PROJECT / OPEN SOURCE
                    </span>
                    <div className="content-heading">
                      <h2 className="studio-title">
                        <Music2 size={32} /> Studio
                      </h2>
                      <span className="badge">DESKTOP MUSIC PLAYER</span>
                    </div>
                    <p className="studio-tagline">
                      Your music. Your space.
                      <br />
                      <em>Your way.</em>
                    </p>
                    <p className="intro">
                      A fast, customizable music player I’m building for people
                      who care about their collection. Local libraries meet
                      self-hosted streaming, in a workspace that feels like
                      home.
                    </p>
                    <div className="action-row">
                      <a
                        className="primary-button"
                        href="https://studio.adoxcol.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Explore Studio <ArrowUpRight size={16} />
                      </a>
                      <a
                        className="secondary-button"
                        href="https://github.com/Adoxcol/studio"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={16} /> Source code
                      </a>
                      <a
                        className="text-link"
                        href="https://github.com/Adoxcol/studio/releases/latest"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Downloads ↗
                      </a>
                    </div>
                    <div className="screenshot-viewer">
                      <img
                        src={`/images/studio/${shots[shot].file}.png`}
                        alt={`Studio: ${shots[shot].label}`}
                      />
                      <div className="screenshot-caption">
                        <span>{shots[shot].label}</span>
                        <div>
                          <button
                            aria-label="Previous screenshot"
                            onClick={() => setShot((shot + 2) % 3)}
                          >
                            <ChevronLeft size={17} />
                          </button>
                          <span>{shot + 1} / 3</span>
                          <button
                            aria-label="Next screenshot"
                            onClick={() => setShot((shot + 1) % 3)}
                          >
                            <ChevronRight size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="studio-features">
                      {[
                        {
                          icon: Headphones,
                          title: "Collection first",
                          text: "Local folders, smart playlists, metadata editing, and lossless playback.",
                        },
                        {
                          icon: Globe,
                          title: "Your own streaming",
                          text: "Connect your Navidrome or OpenSubsonic server and bring your collection along.",
                        },
                        {
                          icon: Settings2,
                          title: "Make it yours",
                          text: "Dockable panels, album-driven colors, a 10-band EQ, and immersive playback layouts.",
                        },
                      ].map((item) => (
                        <article key={item.title}>
                          <item.icon size={23} />
                          <h3>{item.title}</h3>
                          <p>{item.text}</p>
                        </article>
                      ))}
                    </div>
                    <div className="engineering-note">
                      <span className="eyebrow">UNDER THE HOOD</span>
                      <h3>A real desktop app, from library to playback.</h3>
                      <p>
                        Built with Flutter and Riverpod, a drift / SQLite
                        library, and a libmpv-backed media_kit audio engine. The
                        project brings together cross-platform UI, persistent
                        data, audio processing, and desktop integration.
                      </p>
                      <div className="tags">
                        {[
                          "Flutter",
                          "Dart",
                          "Riverpod",
                          "SQLite",
                          "libmpv",
                        ].map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {active === "about" && (
                  <>
                    <span className="eyebrow">
                      THE PERSON BEHIND THE WINDOWS
                    </span>
                    <h2>Curiosity is the common thread.</h2>
                    <p className="intro">
                      I'm Mahmood, a full-stack AI developer based in Dhaka. I
                      like building useful software and getting deep into how
                      things work.
                    </p>
                    <div className="about-callout">
                      <Code2 size={28} />
                      <p>
                        Web platforms. Intelligent systems.
                        <br />
                        <strong>A music player that feels like mine.</strong>
                      </p>
                    </div>
                    <p className="intro">
                      My work spans React and Next.js interfaces, backend
                      services, LLM integrations, and cloud infrastructure.
                      Outside of that, I explore music, creative tools, and the
                      small ideas that turn into side projects.
                    </p>
                    <div className="section-label">THE JOURNEY SO FAR</div>
                    <div className="timeline">
                      {[...examPhases].reverse().map((phase) => (
                        <article key={phase.code}>
                          <span className="eyebrow">{phase.period}</span>
                          <h3>{phase.title}</h3>
                          <strong>{phase.organization}</strong>
                          <p>{phase.summary}</p>
                        </article>
                      ))}
                    </div>
                    <div className="tags">
                      {[
                        ...profile.stack.frontend,
                        ...profile.stack.core,
                        "Flutter",
                        "AWS",
                      ].map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </>
                )}
                {active === "lab" && (
                  <>
                    <span className="eyebrow">SMALL IDEAS, ROOM TO GROW</span>
                    <h2>
                      The lab<span> / ongoing</span>
                    </h2>
                    <p className="intro">
                      Experiments at the intersection of music, AI, and everyday
                      curiosity. Some useful. Some just worth trying.
                    </p>
                    <div className="lab-grid">
                      {sideQuests.map((quest) => (
                        <article key={quest.id}>
                          <FlaskConical className="lab-symbol" size={25} />
                          <span className="badge">{quest.status}</span>
                          <h3>{quest.title}</h3>
                          <p>{quest.summary}</p>
                          <div className="tags">
                            {quest.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                          <details>
                            <summary>Why I’m making it</summary>
                            <p>{quest.motive}</p>
                          </details>
                        </article>
                      ))}
                    </div>
                  </>
                )}
                {active === "contact" && (
                  <>
                    <span className="eyebrow">
                      GOOD THINGS START WITH A HELLO
                    </span>
                    <h2>
                      Let's make
                      <br />
                      something matter.
                    </h2>
                    <p className="intro">
                      Have a project in mind, an interesting problem, or a music
                      recommendation? My inbox is open.
                    </p>
                    <a
                      className="contact-email"
                      href={`mailto:${profile.social.email}`}
                    >
                      {profile.social.email}
                      <ArrowUpRight size={22} />
                    </a>
                    <div className="action-row">
                      <a
                        className="primary-button"
                        href={`mailto:${profile.social.email}`}
                      >
                        <Mail size={17} /> Write an email
                      </a>
                      <button
                        className="secondary-button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              profile.social.email,
                            );
                            setCopyStatus("Copied!");
                          } catch {
                            setCopyStatus(
                              "Copy unavailable. Please select the address above.",
                            );
                          }
                        }}
                      >
                        {copyStatus === "Copied!" ? (
                          <Check size={16} />
                        ) : (
                          <Mail size={16} />
                        )}
                        Copy address
                      </button>
                    </div>
                    <p aria-live="polite" className="intro">
                      {copyStatus}
                    </p>
                    <div className="contact-links">
                      <a
                        href={profile.social.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github size={20} /> GitHub <ArrowUpRight size={16} />
                      </a>
                      <a
                        href={profile.social.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <UserRound size={20} /> LinkedIn{" "}
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                    <div className="contact-note">
                      Sent from Dhaka, Bangladesh.
                      <br />
                      <span>Built for connections everywhere.</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <footer className="window-status">
              <span>
                <i className="online-dot" /> All systems curious
              </span>
              <span>Built with intention, by Mahmood ✳</span>
            </footer>
          </section>
        ) : (
          <button className="reopen" onClick={() => open(active)}>
            <Folder size={26} />
            <span>Your desktop, a little quieter.</span>
            <strong>
              Reopen {apps.find((app) => app.id === active)?.name} ↗
            </strong>
          </button>
        )}
        <div className="desktop-caption">
          <span>PERSONAL OPERATING SYSTEM</span>
          <span>Designed to be explored.</span>
        </div>
      </main>
      <nav className="dock" aria-label="App dock">
        {apps.map((app) => (
          <button
            key={app.id}
            aria-label={`Open ${app.name}`}
            aria-pressed={opened && active === app.id}
            onClick={() => open(app.id)}
          >
            <span className="dock-tooltip">{app.name}</span>
            <span className={`app-icon ${app.color}`}>
              <app.icon size={25} strokeWidth={1.7} />
            </span>
            <i
              className={`dock-indicator ${opened && active === app.id ? "visible" : ""}`}
            />
          </button>
        ))}
        <span className="dock-divider" />
        <a
          href={profile.social.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
        >
          <span className="dock-tooltip">GitHub</span>
          <span className="app-icon graphite">
            <Github size={25} />
          </span>
        </a>
      </nav>
    </div>
  );
}
