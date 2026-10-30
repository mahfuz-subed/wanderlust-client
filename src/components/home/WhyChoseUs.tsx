import type { LucideIcon } from "lucide-react";
import { Headset, Map, ShieldCheck } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const SECTION = {
  title: "Why Choose Wanderlust",
  subtitle: "Your trusted partner for exceptional travel experiences",
};

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-title"
      className="bg-[#EBFAFD] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <h2
            id="why-choose-us-title"
            className="text-3xl tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl"
          >
            {SECTION.title}
          </h2>
          <p className="mt-3 text-sm text-neutral-600 sm:text-base">
            {SECTION.subtitle}
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 md:grid-cols-3 md:gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] lg:p-7"
            >
              <Icon
                className="size-8 text-[#17A2C4]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className="mt-5 text-xl text-neutral-900 lg:text-2xl">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
