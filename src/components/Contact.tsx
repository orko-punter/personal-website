import { Calendar, Mail, Phone } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, MediumIcon, TwitterIcon } from "@/components/icons";
import { profile, socials, followLinks } from "@/data/profile";
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

function SocialButton({
  label,
  href,
  icon,
  primary,
}: {
  label: string;
  href: string;
  icon: keyof typeof icons;
  primary?: boolean;
}) {
  const Icon = icons[icon];
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={
        primary
          ? "flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm text-background hover:opacity-90 transition-opacity"
          : "flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-accent hover:border-accent/50 transition-colors"
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-16 scroll-mt-20">
      <Reveal>
        <h2 className="text-sm font-mono text-accent mb-6">04. Contact</h2>
        <p className="text-foreground/90 max-w-lg leading-relaxed">
          Want to get in touch? Reach out on any of these — I try to reply quickly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {socials.map((social) => (
            <SocialButton key={social.label} {...social} primary={social.icon === "calendar"} />
          ))}
        </div>

        <p className="mt-10 text-foreground/90 max-w-lg leading-relaxed">
          Or follow along on:
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {followLinks.map((link) => (
            <SocialButton key={link.label} {...link} />
          ))}
        </div>
      </Reveal>
      <footer className="mt-20 text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </footer>
    </section>
  );
}
