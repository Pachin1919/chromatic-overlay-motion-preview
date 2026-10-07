import { asset } from "@/lib/asset";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "./language-context";

type Mode = "compare" | "chromatic" | "silver";

export function RevealArtwork({
  className = "",
  showControls = true,
  mode: controlledMode,
  onModeChange,
  label,
}: {
  className?: string;
  showControls?: boolean;
  mode?: Mode;
  onModeChange?: (mode: Mode) => void;
  label?: string;
}) {
  const { language, t } = useLanguage();
  const frameRef = useRef<HTMLDivElement>(null);
  const chromaticRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0.66, y: 0.46, active: false });
  const visibleRef = useRef(true);
  const [localMode, setLocalMode] = useState<Mode>("compare");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const mode = controlledMode ?? localMode;

  const setMode = (next: Mode) => {
    setLocalMode(next);
    onModeChange?.(next);
  };

  useEffect(() => {
    const frame = frameRef.current;
    const layer = chromaticRef.current;
    if (!frame || !layer || mode !== "compare") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMedia = () => setReduced(media.matches);
    applyMedia();
    media.addEventListener("change", applyMedia);

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = Boolean(entry?.isIntersecting);
      if (visibleRef.current && rafRef.current === null) rafRef.current = requestAnimationFrame(paint);
    }, { threshold: 0.05 });
    observer.observe(frame);

    const paint = (now: number) => {
      rafRef.current = null;
      if (!visibleRef.current || document.visibilityState === "hidden") return;
      const pointer = pointerRef.current;
      const x = pointer.active || paused || media.matches ? pointer.x : 0.66 + Math.sin(now * 0.00018) * 0.055;
      const y = pointer.active || paused || media.matches ? pointer.y : 0.46 + Math.cos(now * 0.00014) * 0.06;
      layer.style.setProperty("--reveal-x", `${x * 100}%`);
      layer.style.setProperty("--reveal-y", `${y * 100}%`);
      if (!paused && !media.matches) rafRef.current = requestAnimationFrame(paint);
    };

    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible" && visibleRef.current && rafRef.current === null) {
        rafRef.current = requestAnimationFrame(paint);
      }
    };
    document.addEventListener("visibilitychange", resumeWhenVisible);
    rafRef.current = requestAnimationFrame(paint);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      observer.disconnect();
      media.removeEventListener("change", applyMedia);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
    };
  }, [mode, paused]);

  const updatePointer = (clientX: number, clientY: number) => {
    const frame = frameRef.current;
    if (!frame || mode !== "compare" || paused) return;
    const rect = frame.getBoundingClientRect();
    pointerRef.current = {
      x: Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)),
      y: Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)),
      active: true,
    };
    const layer = chromaticRef.current;
    layer?.style.setProperty("--reveal-x", `${pointerRef.current.x * 100}%`);
    layer?.style.setProperty("--reveal-y", `${pointerRef.current.y * 100}%`);
  };

  return (
    <div className={`reveal-shell ${className}`}>
      <div
        ref={frameRef}
        className={`reveal-artwork mode-${mode}`}
        role="img"
        aria-label={label ?? (language === "zh" ? "色彩与银调叠合的流动构图" : "Current One composition with aligned chromatic and silver readings")}
        tabIndex={0}
        onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          updatePointer(event.clientX, event.clientY);
        }}
        onPointerLeave={() => { pointerRef.current.active = false; }}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 0.1 : 0.035;
          if (event.key === "ArrowLeft") pointerRef.current.x -= step;
          else if (event.key === "ArrowRight") pointerRef.current.x += step;
          else if (event.key === "ArrowUp") pointerRef.current.y -= step;
          else if (event.key === "ArrowDown") pointerRef.current.y += step;
          else return;
          event.preventDefault();
          pointerRef.current.x = Math.min(1, Math.max(0, pointerRef.current.x));
          pointerRef.current.y = Math.min(1, Math.max(0, pointerRef.current.y));
          pointerRef.current.active = true;
          chromaticRef.current?.style.setProperty("--reveal-x", `${pointerRef.current.x * 100}%`);
          chromaticRef.current?.style.setProperty("--reveal-y", `${pointerRef.current.y * 100}%`);
        }}
      >
        <img className="silver-layer" src={asset("/assets/chroma/silver-current.png")} alt="" draggable={false} />
        <img ref={chromaticRef} className="chromatic-layer" src={asset("/assets/chroma/chromatic-current.png")} alt="" draggable={false} />
        <span className="reveal-shade" aria-hidden="true" />
      </div>
      {showControls && mode === "compare" && (
        <Button variant="artwork" size="sm" className="pause-control" disabled={reduced} aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          {reduced ? t.common.reduced : paused ? t.common.resume : t.common.pause}
        </Button>
      )}
      {!showControls && <span className="sr-only">{mode}</span>}
    </div>
  );
}