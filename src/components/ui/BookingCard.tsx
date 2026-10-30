"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Destination } from "@/components/destinations/DestinationCard";
import { authClient } from "@/lib/auth-client";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

export default function BookingCard({
  destination,
}: {
  destination: Destination;
}) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookingData = Object.fromEntries(formData.entries()) as {
      date: string;
    };
    console.log("date", bookingData);

    const data = {
      ...user,
      ...destination,
      bookingData: bookingData,
      dateOfBooking: new Date(),
    };
    console.log("data", data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const userBookingData = await res.json();
    console.log("userDAta", userBookingData);
  };

  return (
    <div className="space-y-5 border bg-white p-5 shadow-sm lg:sticky lg:top-6">
      <div>
        <p className="text-xs text-muted-foreground">Starting from</p>
        <p className="mt-1 text-3xl font-medium text-[#0A9CC4]">
          ${destination.price}
        </p>
        <p className="text-xs text-muted-foreground">per person</p>
      </div>
      <label
        htmlFor="travel-date"
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        Choose a date to book
      </label>
      <form onSubmit={handleBooking}>
        <Input
          name="date"
          type="date"
          className="h-11 rounded-none bg-muted/40"
        />

        <Button
          type="submit"
          className="h-12 w-full rounded-none bg-[#17A2C4] text-white hover:bg-[#1490ad]"
        >
          Book Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <ul className="space-y-2">
        {PERKS.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="h-3.5 w-3.5 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
