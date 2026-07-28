"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Avatar } from "@/components/Avatar";

export function Hero() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 pt-24 pb-28 scroll-mt-20">
      <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Avatar
            src={profile.avatar}
            name={profile.name}
            shape="rectangle"
            width={220}
            height={280}
            focalPoint="50% 16%"
          />
        </motion.div>

        <div>
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-lg text-muted"
          >
            {profile.tagline}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 max-w-xl leading-relaxed text-foreground/90"
      >
        {profile.bio}
      </motion.p>
    </section>
  );
}
