import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingCard, { Booking } from "@/components/ui/MyBookingCard";
import { GetTokenFromServer } from "@/lib/getTokenFromServer";

const myBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const token = GetTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/${user?.email}`,
    {
      headers: { authorization: `Bearer ${token}` },
    },
  );
  const data = await res.json();
  console.log("data", data);

  const bookings: Booking[] = Array.isArray(data) ? data : [];

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-light sm:text-5xl">My Bookings</h1>
        <p className="text-sm text-muted-foreground">
          Manage and view your upcoming travel plans
        </p>
      </div>

      {bookings.length === 0 ? (
        <p className="border py-16 text-center text-muted-foreground">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
};

export default myBookingsPage;
