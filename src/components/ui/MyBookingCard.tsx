"use client";

import Image from "next/image";

import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  Trash2,
  XCircle,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export interface Booking {
  _id: string;
  destinationId?: string;
  destinationName?: string;
  imageUrl?: string;
  departureDate?: string;
  price?: number;
  status?: string;
}

const STATUS_STYLES: Record<
  string,
  { label: string; className: string; Icon: typeof Clock }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-50 text-green-600",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "bg-orange-50 text-orange-500",
    Icon: Clock,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-500",
    Icon: XCircle,
  },
};

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MyBookingCard({ booking }: { booking: Booking }) {
  const {
    _id,
    destinationId,
    destinationName,
    imageUrl,
    departureDate,
    price,
    status,
  } = booking;

  const statusStyle = STATUS_STYLES[(status ?? "").toLowerCase()] ?? {
    label: status ?? "Unknown",
    className: "bg-muted text-muted-foreground",
    Icon: Clock,
  };
  const StatusIcon = statusStyle.Icon;

  const handleCancelBooking = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/booking/${booking._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    console.log("cancelled", data);
    if (data.deletedCount > 0) {
      redirect("/my-bookings");
    }
  };

  return (
    <article className="flex flex-col gap-5 border bg-white p-3 shadow-sm sm:flex-row sm:p-4">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:h-[135px] sm:w-[236px]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={destinationName ?? "Booking image"}
            fill
            sizes="(min-width: 640px) 236px, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
              statusStyle.className,
            )}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {statusStyle.label}
          </span>

          <h2 className="text-2xl font-light sm:text-3xl">
            {destinationName ?? "Travel Package"}
          </h2>

          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            Departure: {formatDate(departureDate)}
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Booking ID: {_id}
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-2xl font-medium text-[#0A9CC4]">
            {typeof price === "number" ? `$${price}` : "—"}
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleCancelBooking}
              variant="outline"
              className="rounded-none border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              Cancel
            </Button>
            <Link
              href={destinationId ? `/destinations/${destinationId}` : "#"}
              className={cn(
                buttonVariants(),
                "rounded-none bg-[#17A2C4] text-white hover:bg-[#1490ad]",
              )}
            >
              <Eye className="h-4 w-4" />
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
