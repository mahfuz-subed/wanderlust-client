"use client";

import * as React from "react";
import { Save, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { GetTokenFromClient } from "@/lib/getTokenFromClient";

export type TravelPackageInput = {
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string; // yyyy-mm-dd
  imageUrl: string;
  description: string;
};

// Value and label are the same string on purpose, so the Select trigger shows "Beach", not "beach".
const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Luxury",
];

const fieldClass =
  "rounded-none border-neutral-200 bg-[#F7F8FA] text-sm text-neutral-900 shadow-none placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-[#17A2C4]/60 dark:bg-[#F7F8FA]";

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-neutral-900">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function AddPackageForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [category, setCategory] = React.useState("");
  const [categoryError, setCategoryError] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  function reset() {
    formRef.current?.reset();
    setCategory("");
    setCategoryError(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category) {
      setCategoryError(true);
      return;
    }

    // 1. Collect everything from the form
    const formData = new FormData(e.currentTarget);

    // 2. Turn it into a plain object: { destinationName: "...", country: "...", ... }
    const userData = Object.fromEntries(formData.entries());

    // 3. Form values always come out as text, so convert the price to a number
    const payload = { ...userData, price: Number(userData.price) };

    setSubmitting(true);
    try {
      // TODO: replace with your API call, e.g.
      // await fetch("/api/packages", { method: "POST", body: JSON.stringify(payload) });
      console.log(payload);
      reset();
    } finally {
      setSubmitting(false);
    }

    const token = GetTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] sm:p-6"
    >
      <Field label="Destination Name" htmlFor="destinationName">
        <Input
          id="destinationName"
          name="destinationName"
          placeholder="Bali Paradise"
          required
          className={cn("h-11", fieldClass)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Country" htmlFor="country">
          <Input
            id="country"
            name="country"
            placeholder="Indonesia"
            required
            className={cn("h-11", fieldClass)}
          />
        </Field>

        <Field label="Category" htmlFor="category">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value ?? "");
              setCategoryError(false);
            }}
          >
            <SelectTrigger
              id="category"
              aria-invalid={categoryError}
              className={cn("h-11 w-full justify-between", fieldClass)}
            >
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white text-gray-900 shadow-lg">
              {CATEGORIES.map((item) => (
                <SelectItem key={item} value={item} className="hover:shadow-md">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {categoryError && (
            <p className="text-xs text-red-500">Please choose a category.</p>
          )}
        </Field>

        <Field label="Price (USD)" htmlFor="price">
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="any"
            inputMode="decimal"
            placeholder="e.g., 1299"
            required
            className={cn("h-11", fieldClass)}
          />
        </Field>

        <Field label="Duration" htmlFor="duration">
          <Input
            id="duration"
            name="duration"
            placeholder="e.g., 7 Days/6 Nights"
            required
            className={cn("h-11", fieldClass)}
          />
        </Field>
      </div>

      <Field label="Departure Date" htmlFor="departureDate">
        <Input
          id="departureDate"
          name="departureDate"
          type="date"
          required
          className={cn("h-11", fieldClass)}
        />
      </Field>

      <Field label="Image URL" htmlFor="imageUrl">
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg"
          required
          className={cn("h-11", fieldClass)}
        />
      </Field>

      <Field label="Description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the travel experience..."
          required
          className={cn("min-h-32 resize-y", fieldClass)}
        />
      </Field>

      <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={reset}
          className="h-11 rounded-none border-red-400 bg-white px-6 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="size-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 rounded-none bg-[#17A2C4] px-6 text-sm text-white hover:bg-[#1390ae]"
        >
          <Save className="size-4" />
          Add Travel Package
        </Button>
      </div>
    </form>
  );
}
