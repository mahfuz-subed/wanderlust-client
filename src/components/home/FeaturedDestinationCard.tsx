import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

export interface FeaturedDestination {
  _id: string;
  name: string;
  country?: string;
  price?: number;
  duration?: string;
  days?: number;
  nights?: number;
  rating?: number;
  imageUrl?: string;
}

export default function FeaturedDestinationCard({
  destination,
}: {
  destination: FeaturedDestination;
}) {
  const {
    _id,
    name,
    country,
    price,
    duration,
    days,
    nights,
    rating,
    imageUrl,
  } = destination;

  // Use "duration" if your API has it, otherwise build it from days and nights
  const durationText =
    duration ?? (days && nights ? `${days} Days/${nights} Nights` : "");

  return (
    <article className="flex flex-col gap-3">
      {/* Image: change h-52 to make it taller or shorter */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="featured image"
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
            className="object-cover"
          />
        )}

        {typeof rating === "number" && (
          <div className="absolute right-0 top-3 flex items-center gap-1.5 bg-white/80 px-3 py-1.5 text-sm backdrop-blur-sm">
            <span>{rating.toFixed(1)}</span>
            <Star className="h-4 w-4 fill-black text-black" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        {country && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {country}
          </p>
        )}

        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-medium">{name}</h3>
          {typeof price === "number" && (
            <p className="whitespace-nowrap text-lg font-medium">
              ${price}
              <span className="text-xs font-normal text-muted-foreground">
                /Person
              </span>
            </p>
          )}
        </div>

        {durationText && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {durationText}
          </p>
        )}

        <Link
          href={`/destinations/${_id}`}
          className="mt-1 inline-flex w-fit items-center gap-2 text-sm uppercase text-[#0A9CC4] underline underline-offset-4"
        >
          Book Now
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
