import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Destination } from "@/components/destinations/DestinationCard";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";

const FeaturedDestinations = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`,
  );
  const data = await res.json();
  console.log("data", data);

  // Make sure we have an array before using it
  const destinations: Destination[] = Array.isArray(data) ? data : [];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-light sm:text-4xl lg:text-5xl">
            Featured Destinations
          </h2>
          <p className="text-sm text-muted-foreground">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 border border-[#0A9CC4] px-5 py-3 text-xs uppercase tracking-wide text-[#0A9CC4] hover:bg-[#0A9CC4]/5"
        >
          All Destinations
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Carousel */}
      {destinations.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          No featured destinations found.
        </p>
      ) : (
        <FeaturedCarousel destinations={destinations} />
      )}
    </section>
  );
};

export default FeaturedDestinations;
