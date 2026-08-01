"use client";

import { createContext, useContext, useRef, type ElementType, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

const PointerContext = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);

// Mac-dock-style magnification: items scale up the closer the cursor gets to
// their center, and spring back down as it moves away or leaves the group.
export function MagnifyGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const x = useMotionValue(Infinity);
  const y = useMotionValue(Infinity);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <PointerContext.Provider value={{ x, y }}>
      <MotionTag
        className={className}
        onMouseMove={(e: React.MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
        }}
        onMouseLeave={() => {
          x.set(Infinity);
          y.set(Infinity);
        }}
      >
        {children}
      </MotionTag>
    </PointerContext.Provider>
  );
}

export function MagnifyItem({
  children,
  range = 120,
  maxScale = 1.35,
  liftPx = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  range?: number;
  maxScale?: number;
  liftPx?: number;
  className?: string;
  as?: ElementType;
}) {
  const ctx = useContext(PointerContext);
  const ref = useRef<HTMLDivElement>(null);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (!ctx) {
    throw new Error("MagnifyItem must be used inside a MagnifyGroup");
  }

  const distance = useTransform([ctx.x, ctx.y], (latest) => {
    const [latestX, latestY] = latest as [number, number];
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !Number.isFinite(latestX)) return Infinity;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.hypot(latestX - cx, latestY - cy);
  });

  const targetScale = useTransform(distance, [0, range], [maxScale, 1], { clamp: true });
  const scale = useSpring(targetScale, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useTransform(scale, [1, maxScale], [0, -liftPx]);

  return (
    <MotionTag ref={ref} style={{ scale, y }} className={className}>
      {children}
    </MotionTag>
  );
}
