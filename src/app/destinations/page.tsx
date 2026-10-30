import DestinationsExplorer from "@/components/destinations/DestinationExplorer";
import { Destination } from "@/components/destinations/DestinationCard";

async function getDestinations(): Promise<Destination[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);
    if (!res.ok) throw new Error("Failed to fetch destinations");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20 mt-7">
      <div className="mb-8 space-y-3">
        <h1 className="text-4xl font-light sm:text-5xl">
          Explore All Destinations
        </h1>
        <p className="text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>
      </div>

      <DestinationsExplorer destinations={destinations} />
    </section>
  );
}
