"use client";

import { Calendar, Coffee, Mail, Phone } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, MediumIcon, TwitterIcon } from "@/components/icons";
import { profile, socials, support, followLinks } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

const icons = {
  mail: Mail,
  phone: Phone,
  calendar: Calendar,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  medium: MediumIcon,
};

function IconLink({ label, href, icon }: { label: string; href: string; icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#0b0b0a]"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

export function Contact() {
  const [primary, ...secondary] = socials;

  return (
    <section id="contact" className="scroll-mt-20 px-3 sm:px-6 pb-10">
      <Reveal>
        <div className="band stage mx-auto max-w-6xl overflow-hidden rounded-[30px] sm:rounded-[40px] px-6 py-20 sm:py-24 text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="display mt-5 text-[clamp(44px,7.4vw,100px)] leading-[.95] tracking-[-0.05em]">
            Let&apos;s <em>talk</em>.<br />I reply <em>quickly</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[17.5px] text-white/70">
            Strategy problems, product ideas, MBA questions or a good restaurant in London: pick whichever is easiest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a className="pill light lg" href={primary.href} target="_blank" rel="noopener noreferrer">
              <Calendar className="h-4 w-4" /> {primary.label}
            </a>
            <a className="pill line lg" href={support.href} target="_blank" rel="noopener noreferrer">
              <Coffee className="h-4 w-4" /> {support.label}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px]">
            {secondary.map((s) => {
              const Icon = icons[s.icon];
              return (
                <li key={s.label}>
                  <a href={s.href} className="inline-flex min-h-11 items-center gap-2 text-white/75 underline-offset-4 hover:text-white hover:underline">
                    <Icon className="h-4 w-4" /> {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex items-center justify-center gap-3">
            {followLinks.map((link) => <IconLink key={link.label} {...link} />)}
          </div>
        </div>
      </Reveal>
      <footer className="mx-auto mt-8 max-w-6xl px-3 text-[13px] text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </footer>
    </section>
  );
}
