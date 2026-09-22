import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
const tracks = [
  {
    file: "after-hours",
    title: "After Hours",
    mood: "Slow keys / warm light",
    color: "#aac799",
  },
  {
    file: "soft-circuits",
    title: "Soft Circuits",
    mood: "Little arpeggios / soft edges",
    color: "#a9c6d5",
  },
  {
    file: "home-directory",
    title: "Home Directory",
    mood: "A familiar place / an open window",
    color: "#d4bba0",
  },
];
const time = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
export default function ListeningRoom() {
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(32);
  const [volume, setVolume] = useState(0.35);
  const [error, setError] = useState("");
  const [repeat, setRepeat] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{
    context: AudioContext;
    analyser: AnalyserNode;
    source: MediaElementAudioSourceNode;
  } | null>(null);
  const autoPlay = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    const element = audio.current;
    return () => {
      element?.pause();
      engine.current?.source.disconnect();
      void engine.current?.context.close();
    };
  }, []);
  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    function draw() {
      const analyser = engine.current?.analyser;
      const ctx = canvas.current?.getContext("2d");
      if (analyser && ctx) {
        const values = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(values);
        ctx.clearRect(0, 0, 480, 90);
        ctx.fillStyle = tracks[track].color;
        for (let i = 0; i < 32; i++) {
          const value = values[Math.floor((i * values.length) / 40)] / 255;
          const height = Math.max(2, value * 85);
          ctx.fillRect(i * 15, 90 - height, 10, height);
        }
      }
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, [playing, track]);
  async function play() {
    const element = audio.current;
    if (!element) return;
    setError("");
    try {
      if (!engine.current) {
        const context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 256;
        const source = context.createMediaElementSource(element);
        source.connect(analyser);
        analyser.connect(context.destination);
        engine.current = { context, analyser, source };
      }
      await engine.current.context.resume();
      if (mounted.current) await element.play();
    } catch {
      setError(
        "Playback could not start. Press Play to retry, or check your browser’s audio settings.",
      );
    }
  }
  function select(index: number) {
    const element = audio.current;
    autoPlay.current = playing;
    element?.pause();
    setTrack((index + tracks.length) % tracks.length);
    setPosition(0);
    setError("");
  }
  return (
    <div className="window-content listening-room">
      <span className="eyebrow">STUDIO / A LITTLE LISTENING ROOM</span>
      <h2>Put something on.</h2>
      <p className="intro">
        Three original synthesized sketches, made for this desktop. A browser
        listening demo — the full Studio app is a separate download.
      </p>
      <audio
        ref={audio}
        src={`/audio/${tracks[track].file}.wav`}
        preload="metadata"
        loop={repeat}
        onLoadedMetadata={() => {
          setDuration(audio.current?.duration || 32);
          if (autoPlay.current) {
            autoPlay.current = false;
            void play();
          }
        }}
        onTimeUpdate={() => setPosition(audio.current?.currentTime || 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setPosition(duration);
        }}
        onError={() => {
          setPlaying(false);
          setError(
            "This audio file could not be loaded. Please reload the preview and try again.",
          );
        }}
      />
      <div className="listening-deck">
        <div className={`demo-vinyl ${playing ? "spinning" : ""}`}>
          <div style={{ background: tracks[track].color }}>
            <span>STUDIO</span>
            <b>{String(track + 1).padStart(2, "0")}</b>
            <i />
          </div>
        </div>
        <div className="listening-info">
          <span className="eyebrow">ORIGINAL DESKTOP SESSIONS</span>
          <h3>{tracks[track].title}</h3>
          <p>{tracks[track].mood}</p>
          <canvas ref={canvas} width="480" height="90" aria-hidden="true" />
          <span className="audio-format">
            PCM / 22.05 kHz / Original synthesis
          </span>
        </div>
      </div>
      <div className="seek-row">
        <time>{time(position)}</time>
        <input
          aria-label="Playback position"
          type="range"
          min="0"
          max={duration}
          step=".1"
          value={position}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (audio.current) audio.current.currentTime = next;
            setPosition(next);
          }}
        />
        <time>{time(duration)}</time>
      </div>
      <div className="audio-controls">
        <button aria-label="Previous track" onClick={() => select(track - 1)}>
          <SkipBack size={19} />
        </button>
        <button
          className="play-button"
          aria-label={playing ? "Pause audio" : "Play audio"}
          onClick={() => {
            if (playing) audio.current?.pause();
            else void play();
          }}
        >
          {playing ? <Pause size={20} /> : <Play size={20} />}{" "}
          {playing ? "Pause" : "Play"}
        </button>
        <button aria-label="Next track" onClick={() => select(track + 1)}>
          <SkipForward size={19} />
        </button>
        <button aria-pressed={repeat} onClick={() => setRepeat(!repeat)}>
          Repeat {repeat ? "on" : "off"}
        </button>
        <label className="volume-control">
          <Volume2 size={16} />
          <input
            aria-label="Volume"
            type="range"
            min="0"
            max="1"
            step=".01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
          <span>{Math.round(volume * 100)}%</span>
        </label>
      </div>
      <p role="status" className="audio-status">
        {error ||
          (playing
            ? "Playing. Audio continues when minimized; closing this app stops it."
            : "Press Play to listen. Audio never starts on its own.")}
      </p>
      <div className="track-list">
        {tracks.map((item, index) => (
          <button
            key={item.file}
            className={index === track ? "selected-track" : ""}
            aria-pressed={index === track}
            onClick={() => {
              if (index !== track) select(index);
            }}
          >
            <span>0{index + 1}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.mood}</small>
            </span>
            <span>0:32</span>
          </button>
        ))}
      </div>
      <a
        className="secondary-button"
        href="https://studio.adoxcol.com"
        target="_blank"
        rel="noreferrer"
      >
        Explore the full Studio player ↗
      </a>
    </div>
  );
}
