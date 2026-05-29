import { ReactNode } from "react";
import { motion } from "motion/react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: string;
  id?: string;
  onClick?: () => void;
  accent?: boolean;
}

export default function BentoCard({
  children,
  className = "",
  span = "col-span-1",
  id,
  onClick,
  accent = false,
}: BentoCardProps) {
  const generatedId = id || `bento-${Math.random().toString(36).substring(2, 6)}`;

  return (
    <motion.div
      id={generatedId}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-none p-6 md:p-8 
        ${accent ? "bg-[#FF4A22] border-2 border-[#FF4A22]" : "bg-black border border-white/20"} 
        ${span} ${className} ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Absolute flat solid layout */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
