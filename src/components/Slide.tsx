import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SlideProps {
  children: ReactNode;
  isActive: boolean;
  slideIndex: number;
  direction: number; // -1 for previous, 1 for next
  id?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "80px" : "-80px",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "tween", duration: 0.25, ease: "easeOut" },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "80px" : "-80px",
    opacity: 0,
    transition: {
      x: { type: "tween", duration: 0.2, ease: "easeIn" },
      opacity: { duration: 0.15 },
    },
  }),
};

export default function Slide({
  children,
  isActive,
  slideIndex,
  direction,
  id,
}: SlideProps) {
  const generatedId = id || `slide-container-${slideIndex}`;

  return (
    <AnimatePresence mode="popLayout" custom={direction}>
      {isActive && (
        <motion.div
          id={generatedId}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full min-h-[65vh] flex flex-col justify-center relative z-10 rounded-none overflow-visible"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
