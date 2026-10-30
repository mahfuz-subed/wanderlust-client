"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  image: string;
};

const SECTION = {
  title: "What Travelers Say",
  subtitle: "Real experiences from our happy travelers",
};

// Replace the image paths with your files in public/assets.
// The last two entries are placeholders so the arrows have something to scroll to.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
  {
    quote: "Placeholder testimonial text. Replace with a real traveler story.",
    name: "Traveler Name",
    location: "City, Country",
    image: "/assets/person4.png",
  },
  {
    quote: "Placeholder testimonial text. Replace with a real traveler story.",
    name: "Traveler Name",
    location: "City, Country",
    image: "/assets/person5.png",
  },
];

export default function Testimonials() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="testimonials-title"
              className="text-3xl tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl"
            >
              {SECTION.title}
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{SECTION.subtitle}</p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-neutral-300 bg-transparent sm:size-11"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-neutral-300 bg-transparent sm:size-11"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              aria-label="Next testimonial"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </header>

        <Carousel
          setApi={setApi}
          opts={{ align: "start" }}
          className="mt-8 sm:mt-10"
        >
          <CarouselContent className="-ml-5">
            {TESTIMONIALS.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full pl-5 lg:basis-1/2"
              >
                <figure className="flex h-full items-stretch justify-between gap-4 border border-neutral-200 bg-white p-3.5 sm:gap-6">
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-6">
                    <blockquote className="text-base leading-snug text-neutral-900 sm:text-lg">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <figcaption className="text-sm">
                      <span className="text-[#17A2C4]">
                        &mdash; {item.name}
                      </span>
                      <span className="block pl-5 text-xs text-neutral-600">
                        {item.location}
                      </span>
                    </figcaption>
                  </div>

                  <div className="relative aspect-[4/5] w-28 shrink-0 self-start overflow-hidden sm:w-36">
                    <Image
                      src={item.image}
                      alt={`Portrait of ${item.name}`}
                      fill
                      sizes="(min-width: 640px) 144px, 112px"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
