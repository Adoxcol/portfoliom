import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Pause,
  Play,
  RotateCcw,
  Scissors,
  TerminalSquare,
  WifiOff,
  Zap,
} from "lucide-react";
import type { AppId } from "../lib/desktop";

interface Preset {
  id: string;
  name: string;
  sizeGb: number;
  mode: string;
  sha256: string;
  baseSpeed: number;
}

const presets: Preset[] = [
  {
    id: "iso",
    name: "ubuntu-24.04-desktop-amd64.iso",
    sizeGb: 5.7,
    mode: "HTTP Range · Dynamic split",
    sha256: "a4acfda10b18da50e2ec50ccaf860d7f",
    baseSpeed: 48.6,
  },
  {
    id: "hls",
    name: "Mountain-Lake-Sunset-2160p.mp4",
    sizeGb: 2.0,
    mode: "HLS .m3u8 · ffmpeg mux",
    sha256: "9e8c7f12b4031c88e42f9a10d651be04",
    baseSpeed: 36.4,
  },
  {
    id: "weights",
    name: "llama-3-8b-instruct-q4_k_m.gguf",
    sizeGb: 4.7,
    mode: "Per-conn cap · Auto 32x",
    sha256: "3d91fe88c21077ab49ef02c1b448d9a2",
    baseSpeed: 54.2,
  },
];

const installTabs = [
  {
    id: "script",
    label: "Linux / macOS",
    cmd: "curl -fsSL https://velo.adoxcol.com/install.sh | sh",
    note: "Verifies SHA-256 and installs veloctl to ~/.local/bin",
  },
  {
    id: "brew",
    label: "Homebrew",
    cmd: "brew install adoxcol/tap/veloctl",
    note: "Available on macOS (Apple Silicon & Intel) and Linux",
  },
  {
    id: "scoop",
    label: "Windows (Scoop)",
    cmd: "scoop bucket add adoxcol https://github.com/Adoxcol/scoop-bucket; scoop install veloctl",
    note: "Or use Velo-Setup.exe for the full desktop app + browser extension",
  },
  {
    id: "go",
    label: "Go 1.27+",
    cmd: "go install github.com/Adoxcol/velo/cmd/veloctl@latest",
    note: "Build standalone veloctl directly from source",
  },
];

function createInitialSegments(count: number): number[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = ((i * 37 + 13) % 45) + 12;
    return Math.min(82, seed);
  });
}

export default function VeloSimulator({
  open,
}: {
  open: (id: AppId) => void;
}) {
  const [presetIdx, setPresetIdx] = useState(0);
  const [connCount, setConnCount] = useState<1 | 8 | 16 | 32>(16);
  const [segments, setSegments] = useState<number[]>(() =>
    createInitialSegments(16),
  );
  const [stolenIdx, setStolenIdx] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [networkDrop, setNetworkDrop] = useState(false);
  const [eventLog, setEventLog] = useState(
    "Ready — 16 HTTP Range connections prepared. Press Start to simulate parallel transfer.",
  );
  const [history, setHistory] = useState<number[]>([
    24, 28, 31, 35, 33, 41, 44, 46, 48, 47, 49, 48.6,
  ]);
  const [installTab, setInstallTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preset = presets[presetIdx];
  const avgProgress =
    segments.reduce((sum, val) => sum + val, 0) / segments.length;
  const completed = avgProgress >= 99.9;

  const currentSpeed = networkDrop
    ? 0
    : completed
      ? 0
      : running
        ? Number(
            (
              (connCount === 1
                ? preset.baseSpeed * 0.07
                : connCount === 8
                  ? preset.baseSpeed * 0.62
                  : connCount === 16
                    ? preset.baseSpeed
                    : preset.baseSpeed * 1.32) *
              (0.95 + ((segments[0] ?? 50) % 9) * 0.01)
            ).toFixed(1),
          )
        : 0;

  useEffect(() => {
    return () => {
      if (dropTimer.current) clearTimeout(dropTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!running || networkDrop || completed) return;
    const timer = setInterval(() => {
      setSegments((prev) => {
        const next = prev.map((val, idx) => {
          if (val >= 100) return 100;
          const factor =
            connCount === 1
              ? 1.1
              : 2.2 + ((idx * 19 + 7) % 5) * (connCount >= 16 ? 0.65 : 0.4);
          return Math.min(100, Number((val + factor).toFixed(1)));
        });

        // Dynamic work-stealing: if a segment just finished and another has > 28% remaining, split/boost it
        const finishedIdx = next.findIndex(
          (val, idx) => val >= 100 && prev[idx] < 100,
        );
        if (finishedIdx !== -1 && next.length > 1) {
          let slowestIdx = -1;
          let lowestVal = 100;
          next.forEach((val, idx) => {
            if (val < lowestVal) {
              lowestVal = val;
              slowestIdx = idx;
            }
          });
          if (slowestIdx !== -1 && lowestVal < 82) {
            const boost = (100 - lowestVal) * 0.38;
            next[slowestIdx] = Math.min(
              99,
              Number((lowestVal + boost).toFixed(1)),
            );
            setStolenIdx(slowestIdx);
            setEventLog(
              `Seg #${String(finishedIdx + 1).padStart(2, "0")} finished → stole 50% of remaining bytes from Seg #${String(slowestIdx + 1).padStart(2, "0")}`,
            );
          }
        }

        if (next.every((v) => v >= 100)) {
          setRunning(false);
          setEventLog(
            `All ${next.length} parts merged · SHA-256 (${preset.sha256.slice(0, 12)}…) verified.`,
          );
        }
        return next;
      });

      setHistory((prev) => {
        const base =
          connCount === 1
            ? preset.baseSpeed * 0.07
            : connCount === 8
              ? preset.baseSpeed * 0.62
              : connCount === 16
                ? preset.baseSpeed
                : preset.baseSpeed * 1.32;
        const jitter = (Math.random() - 0.45) * 3.2;
        return [...prev.slice(1), Math.max(0.8, Number((base + jitter).toFixed(1)))];
      });
    }, 260);
    return () => clearInterval(timer);
  }, [running, networkDrop, completed, connCount, preset]);

  function selectConnections(count: 1 | 8 | 16 | 32) {
    setConnCount(count);
    setSegments(createInitialSegments(count));
    setStolenIdx(null);
    setEventLog(
      count === 1
        ? "1× single browser stream — capped per-connection throughput."
        : `${count}× parallel HTTP Range segments initialized.`,
    );
  }

  function selectPreset(index: number) {
    setPresetIdx(index);
    setSegments(createInitialSegments(connCount));
    setStolenIdx(null);
    setEventLog(
      `Loaded ${presets[index].name} (${presets[index].sizeGb.toFixed(1)} GB · ${presets[index].mode}).`,
    );
  }

  function triggerWorkSteal() {
    setSegments((prev) => {
      if (prev.every((v) => v >= 100)) return prev;
      const next = [...prev];
      let slowestIdx = 0;
      next.forEach((v, i) => {
        if (v < next[slowestIdx]) slowestIdx = i;
      });
      const oldVal = next[slowestIdx];
      const newVal = Math.min(98, Number((oldVal + (100 - oldVal) * 0.5).toFixed(1)));
      next[slowestIdx] = newVal;
      setStolenIdx(slowestIdx);
      setEventLog(
        `Work-stealing split: free worker took half of Seg #${String(slowestIdx + 1).padStart(2, "0")} (${Math.round(oldVal)}% → ${Math.round(newVal)}%).`,
      );
      return next;
    });
  }

  function simulateDrop() {
    if (networkDrop || completed) return;
    const wasRunning = running;
    setNetworkDrop(true);
    setEventLog(
      "Wi-Fi dropped — holding byte offsets on disk and waiting for interface…",
    );
    if (dropTimer.current) clearTimeout(dropTimer.current);
    dropTimer.current = setTimeout(() => {
      setNetworkDrop(false);
      setRunning(wasRunning || true);
      setEventLog(
        "Connection restored — resumed all segments from exact byte offsets with zero data loss.",
      );
    }, 1500);
  }

  function resetSim() {
    setRunning(false);
    setNetworkDrop(false);
    setStolenIdx(null);
    setSegments(createInitialSegments(connCount));
    setEventLog(
      `Reset ${preset.name} — ${connCount} parallel connections ready.`,
    );
  }

  const downloadedGb = ((preset.sizeGb * avgProgress) / 100).toFixed(2);
  const sparkPoints = history
    .map((val, idx) => {
      const x = (idx / (history.length - 1)) * 140;
      const y = 30 - Math.min(27, (val / 75) * 26);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <section
      className="velo-sim-card"
      aria-label="Interactive Velo parallel download simulator"
    >
      <div className="velo-sim-header">
        <div>
          <span className="eyebrow">
            INTERACTIVE ENGINE DEMO / TRY WORK-STEALING IN REAL TIME
          </span>
          <h3>
            <Zap size={18} /> Parallel Segmented Engine
          </h3>
        </div>
        <div className="velo-conn-pills" role="group" aria-label="Connection count">
          {([1, 8, 16, 32] as const).map((count) => (
            <button
              key={count}
              type="button"
              className={connCount === count ? "active" : ""}
              aria-pressed={connCount === count}
              onClick={() => selectConnections(count)}
            >
              {count === 1 ? "1× Browser" : `${count}× Parts`}
            </button>
          ))}
        </div>
      </div>

      <div className="velo-preset-bar" role="tablist" aria-label="Sample payloads">
        {presets.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={presetIdx === idx}
            className={presetIdx === idx ? "active" : ""}
            onClick={() => selectPreset(idx)}
          >
            <strong>{item.name}</strong>
            <span>
              {item.sizeGb.toFixed(1)} GB · {item.mode}
            </span>
          </button>
        ))}
      </div>

      <div className="velo-transfer-stage">
        <div className="velo-transfer-top">
          <div>
            <div className="velo-file-title">{preset.name}</div>
            <div className="velo-file-meta">
              <span>
                {downloadedGb} GB / {preset.sizeGb.toFixed(1)} GB (
                {Math.round(avgProgress)}%)
              </span>
              <span>
                {networkDrop
                  ? "WAITING FOR NETWORK…"
                  : completed
                    ? "COMPLETE"
                    : running
                      ? `${currentSpeed} MB/s`
                      : "PAUSED"}
              </span>
              <i>{connCount} connections</i>
            </div>
          </div>
          <div className="velo-spark-box">
            <small>
              {completed
                ? "Verified"
                : networkDrop
                  ? "Offline"
                  : running
                    ? `${currentSpeed} MB/s`
                    : "Idle"}
            </small>
            <svg viewBox="0 0 140 32" aria-hidden="true">
              <polyline
                fill="none"
                stroke={networkDrop ? "#f59e0b" : "#22c55e"}
                strokeWidth="2.2"
                points={sparkPoints}
              />
            </svg>
          </div>
        </div>

        <div
          className={`velo-segments-grid cols-${connCount}`}
          aria-label={`${connCount} download segments`}
        >
          {segments.map((pct, idx) => (
            <div
              key={idx}
              className={`velo-seg-cell ${pct >= 100 ? "done" : ""} ${stolenIdx === idx ? "stolen" : ""}`}
              title={`Segment #${idx + 1}: ${Math.round(pct)}%`}
            >
              <i style={{ width: `${pct}%` }} />
            </div>
          ))}
        </div>

        <div className="velo-sim-controls">
          <button
            type="button"
            className="velo-sim-btn primary"
            onClick={() => {
              if (completed) {
                setSegments(createInitialSegments(connCount));
                setRunning(true);
                setEventLog("Restarted parallel transfer.");
              } else {
                setRunning((r) => !r);
                setEventLog(
                  running
                    ? "Paused (state saved to disk — safe to close or resume anytime)."
                    : `Downloading across ${connCount} parallel connections…`,
                );
              }
            }}
          >
            {running ? <Pause size={14} /> : <Play size={14} />}
            {completed ? "Run Again" : running ? "Pause (Ctrl+C)" : "Start Transfer"}
          </button>
          <button
            type="button"
            className="velo-sim-btn"
            onClick={triggerWorkSteal}
            disabled={completed}
          >
            <Scissors size={14} /> Split Slowest Part
          </button>
          <button
            type="button"
            className="velo-sim-btn"
            onClick={simulateDrop}
            disabled={completed || networkDrop}
          >
            <WifiOff size={14} /> Drop Wi-Fi
          </button>
          <button type="button" className="velo-sim-btn" onClick={resetSim}>
            <RotateCcw size={14} /> Reset
          </button>
          {completed && (
            <span className="velo-verified-pill">
              <Check size={13} /> SHA-256 Verified
            </span>
          )}
        </div>

        <p className="velo-sim-log" role="status" aria-live="polite">
          <span>ENGINE LOG //</span> {eventLog}
        </p>
      </div>

      <div className="velo-cli-workbench">
        <div className="velo-cli-top">
          <span>
            <TerminalSquare size={15} /> <strong>veloctl</strong> — Linux, macOS
            &amp; Windows CLI
          </span>
          <div className="velo-cli-tabs">
            {installTabs.map((tab, idx) => (
              <button
                key={tab.id}
                type="button"
                className={installTab === idx ? "active" : ""}
                onClick={() => {
                  setInstallTab(idx);
                  setCopied(false);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="velo-cli-code">
          <code>$ {installTabs[installTab].cmd}</code>
          <button
            type="button"
            aria-label="Copy install command"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  installTabs[installTab].cmd,
                );
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
              } catch {
                setCopied(false);
              }
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <div className="velo-cli-foot">
          <span>{installTabs[installTab].note}</span>
          <button
            type="button"
            className="inline-link"
            onClick={() => open("terminal")}
          >
            Try veloctl in Command.com ↗
          </button>
        </div>
      </div>
    </section>
  );
}
