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
}: {
  src: string;
  name: string;
  size?: number;
}) {
  const [errored, setErrored] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setErrored(true);
    }
  }, [src]);

  if (errored) {
    return (
      <div
        style={{ width: size, height: size, fontSize: size / 3 }}
        className="flex shrink-0 items-center justify-center rounded-full border border-border bg-surface font-mono text-accent"
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
      width={size}
      height={size}
      onError={() => setErrored(true)}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full border border-border object-cover"
    />
  );
}
