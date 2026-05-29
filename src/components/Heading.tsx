import { ReactNode } from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Heading({
  level = 2,
  children,
  className = "",
  id,
}: HeadingProps) {
  const getWeightClass = () => {
    switch (level) {
      case 1:
        return "text-[44px] sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none font-display text-white";
      case 2:
        return "text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none font-display text-white";
      case 3:
        return "text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-snug font-display text-white";
      case 4:
        return "text-md sm:text-lg md:text-xl font-bold uppercase tracking-normal leading-normal font-sans text-white";
    }
  };

  return (
    <h2
      id={id || `heading-${level}-${Math.random().toString(36).substring(2, 6)}`}
      className={`${getWeightClass()} ${className}`}
    >
      {children}
    </h2>
  );
}
