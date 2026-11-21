"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { palette } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  return (
    <section className="mx-auto max-w-5xl px-5 sm:px-6 pt-16 pb-24">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h1 className="display mt-4 text-[clamp(42px,6.4vw,84px)]">Things I&apos;ve <em>built</em></h1>
        <p className="mt-5 max-w-[60ch] text-[17px] text-muted">Internal products that replaced expensive vendor software and paid for themselves.</p>
      </Reveal>
      <div className={`mt-12 grid gap-4 ${projects.length > 1 ? "md:grid-cols-2" : ""}`}>
        {projects.map((project, i) => {
          const c = palette[i % palette.length];
          return (
            <Reveal key={project.title} delay={i * 0.05}>
              <article className="bcard h-full" style={{ "--tint": c.tint, "--ink-c": c.ink } as React.CSSProperties}>
                <div className="flex w-full items-start justify-between gap-3">
                  <h2 className="display text-[clamp(32px,4.4vw,52px)]">{project.title}</h2>
                  <div className="flex shrink-0 gap-2">
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111] text-white">
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {project.href && (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live link`} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111] text-white">
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="relative z-[1] mt-4 max-w-[70ch] text-[16px] leading-relaxed text-[#2b2b28]">{project.description}</p>
                <div className="relative z-[1] mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/70 px-3 py-1 text-[13px] font-semibold text-[#111]">{tag}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
