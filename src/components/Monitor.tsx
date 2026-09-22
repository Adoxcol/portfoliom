import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

export default function Monitor({
  children,
  intensity,
  onIntensityChange,
}: {
  children: ReactNode;
  intensity: number;
  onIntensityChange: (value: number) => void;
}) {
  const [booting, setBooting] = useState(() => {
    try {
      return !sessionStorage.getItem("mahmood-booted");
    } catch {
      return true;
    }
  });
  const effects = intensity > 0;
  const [powered, setPowered] = useState(true);
  const powerRef = useRef<HTMLButtonElement>(null);
  function finishBoot() {
    setBooting(false);
    try {
      sessionStorage.setItem("mahmood-booted", "yes");
    } catch {
      /* Storage is optional. */
    }
  }
  useEffect(() => {
    if (!booting || !powered) return;
    const timer = setTimeout(finishBoot, 2400);
    return () => clearTimeout(timer);
  }, [booting, powered]);
  return (
    <div
      className={`computer ${effects ? "crt-on" : ""}`}
      style={{ "--crt-strength": intensity / 100 } as CSSProperties}
    >
      <div className="machine-top">
        <span>PERSONAL COMPUTER / MT–98</span>
        <span>EST. DHAKA, BANGLADESH</span>
      </div>
      <div className="monitor-case">
        <div className="monitor-glass">
          {powered ? (
            booting ? (
              <div className="boot-screen">
                <span>MAHMOOD SYSTEMS © 1998–2026</span>
                <p>BIOS v2.0 · PERSONAL EDITION</p>
                <div className="boot-logo">
                  m<span>OS</span>
                </div>
                <p>
                  Memory check ................ OK
                  <br />
                  Creative drive .............. READY
                  <br />
                  Loading a few good ideas ...
                </p>
                <div className="boot-progress">
                  <i />
                </div>
                <button autoFocus onClick={finishBoot}>
                  Skip startup [ ENTER ]
                </button>
              </div>
            ) : (
              children
            )
          ) : (
            <div className="power-off">
              <p>It is now safe to take a break.</p>
              <button
                onClick={() => {
                  setPowered(true);
                  setBooting(true);
                }}
              >
                Power on
              </button>
            </div>
          )}
        </div>
        <div className="monitor-chin">
          <span className="hardware-brand">
            mahmood<span>PERSONAL SYSTEMS</span>
          </span>
          <div className="monitor-controls">
            <span className="model-label">COLOR DISPLAY · 98</span>
            <button
              aria-label={
                effects ? "Disable CRT effects" : "Enable CRT effects"
              }
              aria-pressed={effects}
              onClick={() => onIntensityChange(effects ? 0 : 35)}
            >
              CRT
            </button>
            <i className={powered ? "power-led on" : "power-led"} />
            <button
              ref={powerRef}
              className="power-button"
              aria-label={powered ? "Power off monitor" : "Power on monitor"}
              onClick={() => {
                setPowered(!powered);
                if (!powered) setBooting(true);
              }}
            >
              ⏻
            </button>
          </div>
        </div>
      </div>
      <div className="monitor-stand" />
      <div className="desk-caption">
        <span>NO FLOPPY DISK REQUIRED.</span>
        <span>Built with curiosity. Best explored.</span>
      </div>
    </div>
  );
}
