import { ReactNode, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buildGlossaryRegex, getGlossaryTip } from "../constants/glossary";

interface TermProps {
  children: ReactNode;
  tip: string;
}

export function Term({ children, tip }: TermProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, placeAbove: false });

  const updatePosition = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < 120 && rect.top > 120;
    setPos({
      x: rect.left + rect.width / 2,
      y: placeAbove ? rect.top - 8 : rect.bottom + 8,
      placeAbove,
    });
  }, []);

  const show = () => {
    updatePosition();
    setOpen(true);
  };

  const hide = () => setOpen(false);

  const tooltip =
    open &&
    createPortal(
      <span
        role="tooltip"
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          transform: pos.placeAbove ? "translate(-50%, -100%)" : "translate(-50%, 0)",
          zIndex: 9999,
        }}
        className="pointer-events-none block w-max max-w-[min(260px,calc(100vw-24px))] px-2.5 py-2 bg-black border border-[#FF4A22] text-[10px] sm:text-[11px] text-zinc-100 font-sans normal-case font-medium leading-relaxed whitespace-normal break-words text-left shadow-[4px_4px_0_#FF4A22]"
      >
        {tip}
      </span>,
      document.body,
    );

  return (
    <>
      <span
        ref={anchorRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="cursor-help underline decoration-[#FF4A22] decoration-dotted underline-offset-2"
      >
        {children}
      </span>
      {tooltip}
    </>
  );
}

interface GlossaryTextProps {
  text: string;
  className?: string;
  /** Отключить подсказки для чистых цифр и меток без терминов */
  annotate?: boolean;
}

export default function GlossaryText({ text, className, annotate = true }: GlossaryTextProps) {
  if (!annotate) {
    return <span className={className}>{text}</span>;
  }

  const regex = buildGlossaryRegex();
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const tip = getGlossaryTip(part);
        if (tip) {
          return (
            <Term key={`${part}-${index}`} tip={tip}>
              {part}
            </Term>
          );
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </span>
  );
}
