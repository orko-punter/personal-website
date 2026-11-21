"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { profile, socials, stats, palette } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { writing } from "@/data/writing";
import { Avatar } from "@/components/Avatar";

const recent = [...writing].sort((a, b) => (a.date < b.date ? 1 : -1));
const tone = (i: number) => palette[i % palette.length];
const shortName = (c: string) => (c === "Boston Consulting Group" ? "BCG" : c.replace(/ Technologies$/, ""));

// "*word*" → italic serif accent
function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") ? <em key={i} className="serif">{part.slice(1, -1)}</em> : <span key={i}>{part}</span>
      )}
    </>
  );
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  // Renders the final number (so it reads right without JS or with Reduce Motion), then counts up once it scrolls into view.
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${prefix}${n.toLocaleString("en-GB")}${suffix}`;
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    el.textContent = fmt(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);
  return <span ref={ref} className="tabular-nums">{fmt(to)}</span>;
}

// Adds .in to every .rv inside the home page once it scrolls into view
function useScrollIn(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>(".rv") ?? [];
    if (reduced()) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [root]);
}

// The bio sharpens word by word as it scrolls through the screen
function Story() {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    const ws = Array.from(p.querySelectorAll("span"));
    if (reduced()) { ws.forEach((w) => w.classList.add("on")); return; }
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = p.getBoundingClientRect(), vh = window.innerHeight;
      const k = Math.round(Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.25))) * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < k));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    window.addEventListener("scroll", onScroll, { passive: true });
    paint();
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <p ref={ref} className="reveal display text-[clamp(30px,4.4vw,58px)] leading-[1.1] tracking-[-0.04em] max-w-[1050px]">
      {profile.bio.split(" ").map((w, i) => <span key={i}>{w} </span>)}
    </p>
  );
}

// A slowly turning ring of the latest essays
function Ring() {
  const ring = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const items = recent.slice(0, 12);
  useEffect(() => {
    const el = ring.current;
    if (!el) return;
    const fit = () => {
      const n = items.length, w = el.offsetWidth;
      el.style.setProperty("--r", `${Math.round((w + 22) / (2 * Math.tan(Math.PI / n)))}px`);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [items.length]);
  return (
    <>
      <div className={`ring-stage mt-14 -mx-5 sm:-mx-6${paused ? " paused" : ""}`}>
        <div className="ring" ref={ring} style={{ "--n": items.length } as React.CSSProperties}>
          {items.map((p, i) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="ring-card"
              style={{ "--i": i, "--tint": tone(i).tint } as React.CSSProperties}
            >
              <span className="text-[12px] font-semibold uppercase tracking-[.08em]" style={{ color: `color-mix(in srgb, ${tone(i).ink} 70%, #111)` }}>
                {p.tags[0] ?? "Essay"}
              </span>
              <b>{p.title}</b>
              <span className="mt-auto text-[13px] text-[#3a3a36]">{p.readTime}</span>
            </Link>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={`${paused ? "Play" : "Pause"} the carousel`}
        className="ring-toggle mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 min-h-11 text-[13px] font-medium text-white/75 hover:text-white hover:border-white/50"
      >
        {paused ? <Play size={12} /> : <Pause size={12} />} {paused ? "Play" : "Pause"}
      </button>
    </>
  );
}

export function Hero() {
  const root = useRef<HTMLDivElement>(null);
  useScrollIn(root);
  const call = socials[0];
  const cards = [
    { n: experience.length, t: "Places I've *worked*", d: experience.map((e) => shortName(e.company)).join(" · "), href: "/experience", wide: true },
    { n: projects.length, t: "Things I've *built*", d: projects.map((p) => p.title).join(" · "), href: "/projects" },
    { n: writing.length, t: "Essays & *letters*", d: "Travel, identity, work and food", href: "/blog" },
    { n: profile.tags.length, t: "What I *love*", d: profile.tags.join(" · "), href: "/#contact", wide: true },
  ];

  return (
    <div ref={root}>
      <section className="stage relative overflow-hidden text-center px-5 sm:px-6 pt-16 sm:pt-20 pb-8">
        <div aria-hidden className="pointer-events-none absolute left-1/2 -bottom-[520px] h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-white/[.07]" />
        <div className="lineup mx-auto w-fit">
          <Avatar src={profile.avatar} name={profile.name} shape="circle" size={88} focalPoint="50% 16%" />
        </div>
        <p className="eyebrow lineup mt-6" style={{ animationDelay: ".08s" }}>{profile.credential} · {profile.location}</p>
        <h1 className="display mx-auto mt-5 max-w-[1150px] text-[clamp(46px,8.4vw,116px)] leading-[.96] tracking-[-0.05em]">
          <span className="lineup block" style={{ animationDelay: ".12s" }}>Hi, I&apos;m Anish.</span>
          <span className="lineup block" style={{ animationDelay: ".26s" }}>I do <em>strategy</em> &amp; <em>product</em></span>
        </h1>
        <p className="lineup mx-auto mt-6 max-w-[580px] text-[18px] leading-relaxed text-white/70" style={{ animationDelay: ".36s" }}>
          Ex-BCG and Goldman Sachs. I&apos;ve redesigned logistics networks, built internal products and written {writing.length} essays along the way.
        </p>
        <div className="lineup mt-8 flex flex-wrap justify-center gap-3" style={{ animationDelay: ".44s" }}>
          <a className="pill light lg" href={call.href} target="_blank" rel="noopener noreferrer">{call.label} <ArrowRight size={18} /></a>
          <Link className="pill line lg" href="/experience">See my work</Link>
        </div>
        <Ring />
      </section>

      <section className="stage px-5 sm:px-6 pt-14 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
          {[...stats.map((s) => ({ ...s })), { value: writing.length, prefix: "", suffix: "", label: "essays, stories and letters on *Medium*" }].map((s) => (
            <div key={s.label} className="rv">
              <b className="block font-serif italic font-normal text-[clamp(64px,8.5vw,124px)] leading-[.9] text-[var(--hl)]">
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </b>
              <span className="mt-3 block max-w-[18ch] font-display text-[19px] leading-snug tracking-[-0.02em] text-white/70 [&_em]:text-white">
                <Accent text={s.label} />
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-20 px-5 sm:px-6 pt-28 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-6">About</p>
          <Story />
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="display rv mb-8 text-[clamp(38px,5.6vw,72px)]">Find your way <em>around</em></h2>
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c, i) => (
              <Link
                key={c.href}
                href={c.href}
                className={`bcard rv ${c.wide ? "md:col-span-2" : ""}`}
                style={{ "--tint": tone(i).tint, "--ink-c": tone(i).ink, transitionDelay: `${(i % 3) * 0.06}s` } as React.CSSProperties}
              >
                <span className="font-serif italic text-[88px] leading-[.85]">{c.n}</span>
                <span className="display mt-3 text-[28px] leading-[1.05] tracking-[-0.035em] [&_em]:text-[#111]"><Accent text={c.t} /></span>
                <span className="mt-2 mb-5 max-w-[44ch] text-[14.5px] text-[#3a3a36]">{c.d}</span>
                <span className="go">Open <ArrowRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="rv mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(38px,5.6vw,72px)]">Fresh <em>writing</em></h2>
            <Link className="pill" href="/blog">All {writing.length} pieces <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-3">
            {recent.slice(0, 4).map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="lift rv group flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-[20px] border border-border bg-surface px-5 py-4 sm:px-6 sm:py-5">
                <span className="rounded-full px-2.5 py-1 text-[12px] font-semibold" style={{ background: tone(i).tint, color: `color-mix(in srgb, ${tone(i).ink} 55%, #111)` }}>
                  {p.tags[0] ?? "Essay"}
                </span>
                <span className="font-display text-[19px] font-semibold tracking-[-0.025em] flex-1 min-w-[12ch]">{p.title}</span>
                <span className="text-[13.5px] text-muted">{new Date(p.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })} · {p.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
