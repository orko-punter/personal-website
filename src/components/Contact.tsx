"use client";

import { Calendar, Mail, Phone } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, MediumIcon, TwitterIcon } from "@/components/icons";
import { profile, socials, support, followLinks } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { SupportButton } from "@/components/SupportButton";
import { MagnifyGroup, MagnifyItem } from "@/components/Magnify";

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

function PrimaryButton({ label, href, icon }: { label: string; href: string; icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

function ContactLink({ label, href, icon }: { label: string; href: string; icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
    >
      <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      {label}
    </a>
  );
}

function IconLink({ label, href, icon }: { label: string; href: string; icon: keyof typeof icons }) {
  const Icon = icons[icon];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

export function Contact() {
  const [primary, ...secondary] = socials;

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <h2 className="text-sm font-mono text-accent mb-6">Contact</h2>
        <p className="text-foreground/90 max-w-lg leading-relaxed">
          Want to get in touch? Reach out on any of these — I try to reply quickly.
        </p>

        <div className="mt-6">
          <SupportButton {...support} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <PrimaryButton {...primary} />
          {secondary.map((social) => (
            <ContactLink key={social.label} {...social} />
          ))}
        </div>

        <div className="mt-16 flex items-center gap-3">
          <span className="text-xs font-mono text-muted">Follow —</span>
          <MagnifyGroup className="flex items-center gap-3">
            {followLinks.map((link) => (
              <MagnifyItem key={link.label} range={80} maxScale={1.25} liftPx={4}>
                <IconLink {...link} />
              </MagnifyItem>
            ))}
          </MagnifyGroup>
        </div>
      </Reveal>
      <footer className="mt-20 text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </footer>
    </section>
  );
}
