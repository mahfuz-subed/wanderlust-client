import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationActions from "@/components/destinations/DestinationActions";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Destination } from "@/components/destinations/DestinationCard";
import BookingCard from "@/components/ui/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GetTokenFromServer } from "@/lib/getTokenFromServer";

interface DestinationDetails extends Destination {
  description?: string;
  highlights?: string[];
  reviews?: number;
}

async function getDestination(id: string): Promise<DestinationDetails | null> {
  const token = GetTokenFromServer();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );

    console.log(
      "API URL:",
      `${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`,
    );
    console.log("Response status:", res.status);

    if (!res.ok) {
      console.log("Response error:", await res.text());
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Destination fetching error:", error);
    return null;
  }
}

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) notFound();

  const {
    name,
    country,
    price,
    days,
    nights,
    reviews,
    imageUrl,
    description,
    highlights,
  } = destination;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 mt-12">
      {/* Top bar */}

      <DestinationActions destination={destination} />

      {/* Hero image */}
      <div className="relative aspect-[16/7] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="img"
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="my-8 border-t" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        {/* Left column */}
        <div>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {country}
          </p>

          <h1 className="mt-2 text-4xl font-light sm:text-5xl">{name}</h1>

          {description && (
            <div className="mt-8">
              <h2 className="text-2xl font-light">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          )}

          {highlights && highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-light">Highlights</h2>
              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right column */}
        <aside>
          <BookingCard destination={destination} />
        </aside>
      </div>
    </section>
  );
}
