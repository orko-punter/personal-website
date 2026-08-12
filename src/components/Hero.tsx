"use client";

import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Mail, PenLine, User } from "lucide-react";
import { profile, support } from "@/data/profile";
import { navLinks } from "@/data/nav";
import { Avatar } from "@/components/Avatar";
import { SupportButton } from "@/components/SupportButton";
import { MagnifyGroup, MagnifyItem } from "@/components/Magnify";

const icons = {
  About: User,
  Experience: Briefcase,
  Projects: FolderGit2,
  Writing: PenLine,
  Contact: Mail,
} as const;

// Second glow color for the orbit ring's conic gradient — the site's
// --accent already covers hero-glow-a, this just adds a purple counterpoint.
const heroStyle = {
  "--hero-glow-b": "#a855f7",
  "--radius": "clamp(130px, 24vw, 190px)",
} as React.CSSProperties;

export function Hero() {
  const angleStep = 360 / navLinks.length;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background"
      style={heroStyle}
    >
      {/* Starfield + nebula glow background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(1px 1px at 75% 15%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 60% 70%, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 15% 80%, rgba(255,255,255,0.45), transparent), radial-gradient(1.5px 1.5px at 90% 55%, rgba(255,255,255,0.3), transparent)",
          backgroundSize: "180px 180px",
        }}
      />
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[var(--hero-glow-b)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[var(--accent)] opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-6 pt-24 pb-28 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-accent"
        >
          Hi, I&apos;m
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 text-4xl sm:text-5xl font-semibold tracking-tight text-foreground"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 inline-block rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accent"
        >
          {profile.credential}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2 text-lg text-foreground/60"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mt-16"
          style={{
            width: "calc(var(--radius) * 2 + 110px)",
            height: "calc(var(--radius) * 2 + 110px)",
          }}
        >
          <MagnifyGroup className="absolute inset-0">
            {/* Connector lines from center to each node */}
            {navLinks.map((link, i) => {
              const angle = -90 + i * angleStep;
              return (
                <div
                  key={`line-${link.href}`}
                  className="absolute left-1/2 top-1/2 h-px origin-left"
                  style={{
                    width: "var(--radius)",
                    transform: `rotate(${angle}deg)`,
                    background:
                      "linear-gradient(to right, var(--accent), transparent)",
                    opacity: 0.5,
                  }}
                />
              );
            })}

            {/* Center: glowing ring + avatar */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="absolute -inset-3 rounded-full blur-md"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--accent), var(--hero-glow-b), var(--accent))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative rounded-full ring-8 ring-background">
                <Avatar
                  src={profile.avatar}
                  name={profile.name}
                  shape="circle"
                  size={140}
                  focalPoint="50% 16%"
                />
              </div>
            </div>

            {/* Orbiting nav nodes — magnify toward the cursor, dock-style */}
            {navLinks.map((link, i) => {
              const angle = -90 + i * angleStep;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad);
              const y = Math.sin(rad);
              const Icon = icons[link.label];
              return (
                <div
                  key={link.href}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                  style={{
                    left: `calc(50% + ${x} * var(--radius))`,
                    top: `calc(50% + ${y} * var(--radius))`,
                  }}
                >
                  <MagnifyItem range={100} maxScale={1.3} liftPx={6}>
                    <a
                      href={link.href}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70 backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-foreground"
                      style={{ boxShadow: "0 0 20px -6px var(--accent)" }}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </MagnifyItem>
                  <span className="font-mono text-xs text-foreground/50 transition-colors group-hover:text-foreground">
                    {link.label}
                  </span>
                </div>
              );
            })}
          </MagnifyGroup>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-16 max-w-xl leading-relaxed text-foreground/80"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/60 transition-colors hover:border-accent hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <SupportButton {...support} />
        </motion.div>
      </div>
    </section>
  );
}
