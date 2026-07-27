"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-20 scroll-mt-20">
      <Reveal>
        <h2 className="text-sm font-mono text-accent mb-10">03. Projects</h2>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="h-full rounded-xl border border-border bg-surface p-5 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-foreground">{project.title}</h3>
                <div className="flex gap-2 shrink-0">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live link`}
                      className="text-muted hover:text-accent transition-colors"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-muted leading-relaxed">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-accent/80">
                    #{tag.replace(/\s+/g, "").toLowerCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
