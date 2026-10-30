"use client";

import { useState } from "react";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Destination } from "./DestinationCard";
import EditDestinationDialog from "./EditDestinationDialog";
import DeleteDestinationDialog from "./DeleteDestinationDialog";
import Link from "next/link";
export type EditableDestination = Destination & {
  description?: string;
  duration?: string;
  departureDate?: string;
};

export default function DestinationActions({
  destination,
}: {
  destination: EditableDestination;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Destinations
        </Link>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-none text-black hover:bg-gray-100 "
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            className="rounded-none border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>

      <EditDestinationDialog
        destination={destination}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteDestinationDialog
        id={destination._id}
        name={destination.name}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
