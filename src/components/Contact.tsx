import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon, TwitterIcon } from "@/components/icons";
import { profile, socials } from "@/data/profile";
import { Reveal } from "@/components/Reveal";

const icons = {
  mail: Mail,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  medium: MediumIcon,
};

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-16 scroll-mt-20">
      <Reveal>
        <h2 className="text-sm font-mono text-accent mb-6">04. Contact</h2>
        <p className="text-foreground/90 max-w-lg leading-relaxed">
          Want to get in touch? Reach out on any of these — I try to reply quickly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {socials.map((social) => {
            const Icon = icons[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-accent hover:border-accent/50 transition-colors"
              >
                <Icon className="h-4 w-4" />
                {social.label}
              </a>
            );
          })}
        </div>
      </Reveal>
      <footer className="mt-20 text-xs text-muted">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </footer>
    </section>
  );
}
