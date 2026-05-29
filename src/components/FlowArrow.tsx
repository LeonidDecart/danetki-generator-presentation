interface FlowArrowProps {
  direction?: "horizontal" | "vertical";
}

export default function FlowArrow({ direction = "horizontal" }: FlowArrowProps) {
  if (direction === "vertical") {
    return (
      <div className="lg:hidden flex justify-center py-0.5">
        <span className="font-mono text-xl font-black text-[#FF4A22]">↓</span>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center justify-center px-1 shrink-0">
      <span className="font-mono text-2xl font-black text-[#FF4A22]">→</span>
    </div>
  );
}
