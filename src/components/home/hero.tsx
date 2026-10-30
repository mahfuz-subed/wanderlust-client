import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HERO = {
  image: "/assets/Banner.png", // replace with your file name in public/assets
  imageAlt: "Turquoise bay surrounded by green hills and seaside villas",
  title: ["Discover Your", "Next Adventure"],
  subtitle:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
  primaryCta: { label: "Explore Now", href: "/destinations" },
  secondaryCta: { label: "View Destination", href: "/destinations" },
};

type SearchField = {
  name: string;
  label: string;
  placeholder: string;
};

const SEARCH_FIELDS: SearchField[] = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { name: "duration", label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { name: "budget", label: "Budget", placeholder: "$0-$3000" },
  { name: "people", label: "People", placeholder: "5-10" },
];

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden text-white">
      {/* Background image + dark overlay */}
      <Image
        src={HERO.image}
        alt={HERO.imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />

      {/* Headline block (top padding clears the floating navbar) */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:pt-32">
        <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
          {HERO.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-[34rem] text-sm leading-relaxed text-white/90 sm:text-base">
          {HERO.subtitle}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={HERO.primaryCta.href} />}
            className="w-full rounded-none bg-[#17A2C4] px-8 text-sm uppercase hover:bg-[#1390ae] sm:w-auto"
          >
            {HERO.primaryCta.label}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href={HERO.secondaryCta.href} />}
            className="w-full rounded-none bg-white/25 px-8 text-sm uppercase text-white backdrop-blur-sm hover:bg-white/35 sm:w-auto"
          >
            {HERO.secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <form
        action="/destinations"
        method="GET"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_minmax(0,0.9fr)]"
        role="search"
        aria-label="Search destinations"
      >
        {SEARCH_FIELDS.map((field) => (
          <label
            key={field.name}
            className="flex cursor-text flex-col justify-center gap-0.5 border-b border-white/30 bg-white/30 px-5 py-4 backdrop-blur-md transition-colors focus-within:bg-white/40 sm:border-r lg:border-b-0 lg:last:border-r-0"
          >
            <span className="text-base font-medium">{field.label}</span>
            <Input
              name={field.name}
              placeholder={field.placeholder}
              className="h-auto rounded-none border-0 bg-transparent p-0 text-xs text-white shadow-none placeholder:text-white/85 focus-visible:ring-0 dark:bg-transparent"
            />
          </label>
        ))}

        <Button
          type="submit"
          className="h-auto min-h-16 rounded-none bg-[#17A2C4] py-4 text-base font-medium hover:bg-[#1390ae] sm:col-span-2 lg:col-span-1"
        >
          Search
        </Button>
      </form>
    </section>
  );
}
