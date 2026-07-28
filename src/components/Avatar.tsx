"use client";

import { useEffect, useRef, useState } from "react";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 112,
  width,
  height,
  focalPoint = "center 20%",
  shape = "circle",
}: {
  src: string;
  name: string;
  size?: number;
  width?: number;
  height?: number;
  focalPoint?: string;
  shape?: "circle" | "rectangle";
}) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const w = width ?? size;
  const h = height ?? size;
  const shapeClass = shape === "circle" ? "rounded-full" : "rounded-2xl";

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  if (errored) {
    return (
      <div
        style={{ width: w, height: h, fontSize: Math.min(w, h) / 3 }}
        className={`flex shrink-0 items-center justify-center border border-border bg-surface font-mono text-accent ${shapeClass}`}
      >
        {initialsOf(name)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={name}
      width={w}
      height={h}
      onError={() => setErrored(true)}
      style={{ width: w, height: h, objectPosition: focalPoint }}
      className={`shrink-0 border border-border object-cover ${shapeClass}`}
    />
  );
}
