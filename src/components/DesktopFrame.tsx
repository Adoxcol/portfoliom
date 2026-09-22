import { useRef, type PointerEvent, type ReactNode } from "react";
import { Maximize2, Minus, X } from "lucide-react";
import {
  apps,
  clampRect,
  type Bounds,
  type DesktopWindow,
  type Rect,
} from "../lib/desktop";
import PixelIcon from "./PixelIcon";
interface Props {
  win: DesktopWindow;
  bounds: Bounds;
  focused: boolean;
  layer: number;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRect: (rect: Rect) => void;
  children: ReactNode;
}
export default function DesktopFrame({
  win,
  bounds,
  focused,
  layer,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onRect,
  children,
}: Props) {
  const gesture = useRef<{
    x: number;
    y: number;
    rect: Rect;
    mode: "move" | "resize";
  } | null>(null);
  function begin(event: PointerEvent<HTMLElement>, mode: "move" | "resize") {
    if (
      event.button !== 0 ||
      win.maximized ||
      window.innerWidth <= 800 ||
      (mode === "move" && (event.target as HTMLElement).closest("button"))
    )
      return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      rect: win.rect,
      mode,
    };
  }
  function move(event: PointerEvent<HTMLElement>) {
    const current = gesture.current;
    if (!current) return;
    const dx = event.clientX - current.x,
      dy = event.clientY - current.y;
    const next =
      current.mode === "move"
        ? { ...current.rect, x: current.rect.x + dx, y: current.rect.y + dy }
        : {
            ...current.rect,
            width: Math.min(
              bounds.width - current.rect.x,
              current.rect.width + dx,
            ),
            height: Math.min(
              bounds.height - current.rect.y,
              current.rect.height + dy,
            ),
          };
    onRect(clampRect(next, bounds));
  }
  function end() {
    gesture.current = null;
  }
  const title = apps.find((app) => app.id === win.id)?.file;
  return (
    <section
      className={`app-window managed-window ${win.maximized ? "window-maximized" : ""} ${focused ? "window-focused" : ""}`}
      aria-label={title}
      hidden={win.minimized}
      data-app={win.id}
      onPointerDownCapture={onFocus}
      onFocusCapture={onFocus}
      style={{
        left: win.maximized ? 0 : win.rect.x,
        top: win.maximized ? 0 : win.rect.y,
        width: win.maximized ? bounds.width : win.rect.width,
        height: win.maximized ? bounds.height : win.rect.height,
        zIndex: layer,
      }}
    >
      <div
        className="window-bar"
        onPointerDown={(event) => begin(event, "move")}
        onPointerMove={move}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
        onDoubleClick={(event) => {
          if (!(event.target as HTMLElement).closest("button")) onMaximize();
        }}
      >
        <div className="window-title">
          <PixelIcon kind={win.id} size={17} />
          <span className="managed-title">{title}</span>
        </div>
        <div className="window-controls">
          <button aria-label={`Minimize ${title}`} onClick={onMinimize}>
            <Minus size={12} />
          </button>
          <button
            aria-label={`${win.maximized ? "Restore" : "Maximize"} ${title}`}
            onClick={onMaximize}
          >
            <Maximize2 size={11} />
          </button>
          <button aria-label={`Close ${title}`} onClick={onClose}>
            <X size={12} />
          </button>
        </div>
      </div>
      <div className="managed-content">{children}</div>
      <footer className="window-status">
        <span>
          {win.id === "readme" ? "README.txt — Read only" : "Ready"} · Mahmood
          Personal Edition
        </span>
        {!win.maximized && (
          <button
            className="resize-handle"
            aria-label={`Resize ${title}`}
            title="Drag to resize, or use arrow keys"
            onPointerDown={(event) => begin(event, "resize")}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
            onLostPointerCapture={end}
            onKeyDown={(event) => {
              const steps: Record<string, [number, number]> = {
                ArrowRight: [20, 0],
                ArrowLeft: [-20, 0],
                ArrowDown: [0, 20],
                ArrowUp: [0, -20],
              };
              const step = steps[event.key];
              if (step) {
                event.preventDefault();
                onRect(
                  clampRect(
                    {
                      ...win.rect,
                      width: win.rect.width + step[0],
                      height: win.rect.height + step[1],
                    },
                    bounds,
                  ),
                );
              }
            }}
          >
            ◢
          </button>
        )}
      </footer>
    </section>
  );
}
