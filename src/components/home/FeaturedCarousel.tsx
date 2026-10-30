"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import FeaturedDestinationCard, {
  FeaturedDestination,
} from "@/components/home/FeaturedDestinationCard";

export default function FeaturedCarousel({
  destinations,
}: {
  destinations: FeaturedDestination[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} opts={{ align: "start", containScroll: false }}>
        <CarouselContent className="-ml-6">
          {destinations.map((destination) => (
            <CarouselItem
              key={destination._id}
              className="basis-[85%] pl-6 sm:basis-1/2 lg:basis-[30%]"
            >
              <FeaturedDestinationCard destination={destination} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center gap-6">
        <p className="text-lg">
          {current}/{destinations.length}
        </p>

        <div className="h-px flex-1 bg-border" />

        <div className="flex gap-3">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={current === 1}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border text-muted-foreground hover:bg-muted disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={current === destinations.length}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border text-muted-foreground hover:bg-muted disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
