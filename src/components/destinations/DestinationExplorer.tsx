"use client";

import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DestinationCard, { Destination } from "./DestinationCard";

const PRICE_RANGES = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "under-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-2000", label: "$1,000 – $2,000", min: 1000, max: 2000 },
  { value: "2000-3000", label: "$2,000 – $3,000", min: 2000, max: 3000 },
  { value: "above-3000", label: "Above $3,000", min: 3000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

const triggerClass =
  "h-12 w-full rounded-none border-0 px-4 text-sm uppercase text-muted-foreground shadow-none focus-visible:ring-0";

export default function DestinationsExplorer({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categoryItems = useMemo(() => {
    const unique = Array.from(
      new Set(destinations.map((d) => d.category).filter(Boolean)),
    );
    return [
      { value: "all", label: "All Categories" },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [destinations]);

  const filtered = useMemo(() => {
    const range =
      PRICE_RANGES.find((r) => r.value === priceRange) ?? PRICE_RANGES[0];

    const result = destinations.filter(
      (d) =>
        (category === "all" || d.category === category) &&
        d.price >= range.min &&
        d.price < range.max,
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <div>
      {/* Filters */}
      <div className="grid grid-cols-1 divide-y border border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Select
          items={categoryItems}
          value={category}
          onValueChange={(v) => setCategory(v ?? "all")}
        >
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={PRICE_RANGES}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v ?? "all")}
        >
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={SORT_OPTIONS}
          value={sortBy}
          onValueChange={(v) => setSortBy(v ?? "default")}
        >
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="mb-6 mt-5 text-sm text-muted-foreground">
        Showing {filtered.length}{" "}
        {filtered.length === 1 ? "destination" : "destinations"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No destinations match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      )}
    </div>
  );
}
