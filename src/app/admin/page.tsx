import type { Metadata } from "next";

import AddPackageForm from "@/components/ui/add-packages";

export const metadata: Metadata = {
  title: "Add New Travel Package | Admin",
};

export default function AdminPage() {
  return (
    // pt-28 clears the floating navbar
    <section className="px-4 pb-20 pt-28 sm:px-8 lg:px-14">
      <h1 className="text-4xl tracking-tight text-neutral-950 sm:text-5xl">
        Add New Travel Package
      </h1>

      <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
        <AddPackageForm />
      </div>
    </section>
  );
}
