import { ReactNode } from "react";
import { buildGlossaryRegex, getGlossaryTip } from "../constants/glossary";

interface TermProps {
  children: ReactNode;
  tip: string;
}

export function Term({ children, tip }: TermProps) {
  return (
    <span className="relative inline group/term cursor-help underline decoration-[#FF4A22] decoration-dotted underline-offset-2">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-max max-w-[min(280px,90vw)] px-2.5 py-2 bg-black border border-[#FF4A22] text-[10px] sm:text-[11px] text-zinc-100 font-sans normal-case font-medium leading-snug opacity-0 invisible group-hover/term:opacity-100 group-hover/term:visible transition-opacity duration-150 z-[200] text-left shadow-[4px_4px_0_#FF4A22]"
      >
        {tip}
      </span>
    </span>
  );
}

interface GlossaryTextProps {
  text: string;
  className?: string;
}

export default function GlossaryText({ text, className }: GlossaryTextProps) {
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
        return part;
      })}
    </span>
  );
}
