import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

export interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string; // <-- add this
  price: number;
  days: number;
  nights: number;
  imageUrl: string;
}

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  const { _id, name, country, price, days, nights, imageUrl } = destination;

  return (
    <section className="flex flex-col gap-3">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="img"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {country}
        </p>

        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="whitespace-nowrap text-lg font-medium">
            ${price}
            <span className="text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {days} Days/{nights} Nights
        </p>

        <Link
          href={`destinationDetails/${_id}`}
          className="mt-1 inline-flex w-fit items-center gap-2 text-sm uppercase text-[#0A9CC4] underline underline-offset-4 transition-all duration-300 hover:gap-3 hover:text-[#087A99]"
        >
          Book Now
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
