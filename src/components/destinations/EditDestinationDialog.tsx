"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditableDestination } from "./DestinationActions";
import { GetTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = ["Beach", "Mountain", "City", "Adventure", "Cultural"].map(
  (c) => ({
    value: c,
    label: c,
  }),
);

interface Props {
  destination: EditableDestination;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fieldClass = "rounded-none bg-muted/40";

export default function EditDestinationDialog({
  destination,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();

  const getInitial = () => ({
    name: destination.name ?? "",
    country: destination.country ?? "",
    category: destination.category ?? "",
    price: destination.price?.toString() ?? "",
    duration: destination.duration ?? "",
    departureDate: destination.departureDate?.slice(0, 10) ?? "",
    image: destination.imageUrl ?? "",
    description: destination.description ?? "",
  });

  const [form, setForm] = useState(getInitial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    field: keyof ReturnType<typeof getInitial>,
    value: string,
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setForm(getInitial()); // discard unsaved edits
      setError("");
    }
    onOpenChange(next);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    console.log("form", form);

    const token = GetTokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...form, price: Number(form.price) }),
        },
      );
      if (!res.ok) throw new Error("Failed to update");
      onOpenChange(false);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white/50 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">
            Update Travel Package
          </DialogTitle>
          <DialogDescription>
            Make changes to the travel package details below
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          <Input
            className={fieldClass}
            placeholder="Package name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                className={fieldClass}
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                items={CATEGORIES}
                value={form.category}
                onValueChange={(v) => handleChange("category", v ?? "")}
              >
                <SelectTrigger className={`${fieldClass} w-full`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                className={fieldClass}
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                className={fieldClass}
                placeholder="e.g., 7 Days/6 Nights"
                value={form.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              className={fieldClass}
              value={form.departureDate}
              onChange={(e) => handleChange("departureDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              className={fieldClass}
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              className={fieldClass}
              placeholder="Describe the travel experience..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              className="rounded-none border-red-400 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              <Trash2 className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              className="rounded-none bg-[#17A2C4] text-white hover:bg-[#1490ad]"
              onClick={handleSubmit}
              disabled={loading}
            >
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
