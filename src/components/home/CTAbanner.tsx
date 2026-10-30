import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const CTA = {
  image: "/assets/CTA.png", // replace with your file name in public/assets
  imageAlt: "Aerial view of an airplane flying over a tropical island",
  title: "Ready To Start Your Journey?",
  subtitle: "Join thousands of travelers who have discovered the world with us",
  button: { label: "Book Your Trip Today", href: "/destinations" },
};

export default function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[280px] items-center justify-center overflow-hidden px-4 py-16 text-center text-white sm:min-h-[340px] sm:py-20"
    >
      <Image
        src={CTA.image}
        alt={CTA.imageAlt}
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Dark overlay, heavier at the edges and bottom like the design */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />

      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <h2
          id="cta-title"
          className="text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl"
        >
          {CTA.title}
        </h2>
        <p className="mt-3 text-sm text-white/90 sm:text-base">
          {CTA.subtitle}
        </p>

        <Button
          size="lg"
          nativeButton={false}
          render={<Link href={CTA.button.href} />}
          className="mt-8 h-11 rounded-none bg-white px-6 text-sm uppercase text-neutral-900 hover:bg-white/90"
        >
          {CTA.button.label}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
