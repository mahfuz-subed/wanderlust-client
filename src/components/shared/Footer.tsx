"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Input } from "@/components/ui/input";

type FooterLink = { label: string; href: string };

const BRAND = {
  name: "Wanderlast",
  tagline: "Your gateway to extraordinary travel experiences around the world.",
};

const NEWSLETTER = {
  title: "Newsletter",
  description: "Subscribe for exclusive travel deals and inspiration.",
  placeholder: "Enter email",
};

const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Profile", href: "/profile" },
];

const SUPPORT_LINKS: FooterLink[] = [
  { label: "Help Center", href: "/help" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const CONTACT = {
  phone: { label: "786 901 1622", href: "tel:+7869011622" },
  email: { label: "info@wanderland.com", href: "mailto:info@wanderland.com" },
};

// lucide-react no longer ships brand icons, so these are small inline SVGs.
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

const SOCIALS = [
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
];

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm uppercase tracking-wide text-neutral-300">
      {children}
    </h3>
  );
}

const linkClass = "text-sm text-neutral-400 transition-colors hover:text-white";

export default function Footer() {
  const [email, setEmail] = React.useState("");

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: send `email` to your newsletter endpoint
    setEmail("");
  }

  return (
    <footer className="bg-[#0A0A0A] px-4 pb-8 pt-16 text-white sm:px-6 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="inline-block text-6xl font-bold leading-none tracking-tight sm:text-7xl lg:text-[96px]"
          >
            {BRAND.name}
          </Link>
          <p className="mt-3 text-sm text-neutral-400 sm:text-base">
            {BRAND.tagline}
          </p>
        </div>

        {/* Columns */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.9fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <ColumnHeading>{NEWSLETTER.title}</ColumnHeading>
            <p className="mt-2 text-xs text-neutral-400">
              {NEWSLETTER.description}
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-3 flex h-11 w-full max-w-[250px] items-center bg-white/10 pr-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <Input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={NEWSLETTER.placeholder}
                className="h-full flex-1 rounded-none border-0 bg-transparent px-3 text-sm text-white shadow-none placeholder:text-neutral-400 focus-visible:ring-0 dark:bg-transparent"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex size-8 items-center justify-center text-white transition-opacity hover:opacity-70"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </form>
          </div>

          <nav aria-label="Quick links">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <ColumnHeading>Support</ColumnHeading>
            <ul className="mt-4 space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={CONTACT.phone.href} className={linkClass}>
                  {CONTACT.phone.label}
                </a>
              </li>
              <li>
                <a href={CONTACT.email.href} className={linkClass}>
                  {CONTACT.email.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white transition-opacity hover:opacity-70"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
