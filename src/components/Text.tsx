import { ReactNode } from "react";

interface TextProps {
  size?: "sm" | "base" | "lg" | "xl";
  dimmed?: boolean;
  children: ReactNode;
  className?: string;
  mono?: boolean;
  id?: string;
}

export default function Text({
  size = "base",
  dimmed = false,
  children,
  className = "",
  mono = false,
  id,
}: TextProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-xs md:text-sm leading-normal";
      case "base":
        return "text-sm md:text-base leading-relaxed";
      case "lg":
        return "text-base md:text-lg lg:text-xl leading-relaxed";
      case "xl":
        return "text-lg md:text-xl lg:text-2xl leading-relaxed font-semibold";
    }
  };

  const colorClass = dimmed ? "text-zinc-400" : "text-white";
  const fontClass = mono ? "font-mono font-medium" : "font-sans font-normal";

  return (
    <p
      id={id || `text-${size}-${Math.random().toString(36).substring(2, 6)}`}
      className={`${getSizeClass()} ${colorClass} ${fontClass} ${className}`}
    >
      {children}
    </p>
  );
}
