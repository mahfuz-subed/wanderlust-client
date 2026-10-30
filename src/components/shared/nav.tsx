"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { Menu, User, ChevronDown, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

type NavItem = { label: string; href: string };

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const BRAND = {
  name: "Wanderlast",
  color: "text-[#17A2C4]",
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handelSignOut = () => {
    authClient.signOut();
  };

  return (
    // Absolute so it floats over the hero image. Other pages need top padding (see notes).
    <header className="absolute inset-x-0 top-0 z-50 px-2 pt-2 sm:px-3">
      <nav
        aria-label="Main"
        className="grid h-14 grid-cols-[1fr_auto_1fr] items-center bg-white px-4 shadow-sm lg:px-5"
      >
        {/* Left: page links (desktop) / hamburger (mobile + tablet) */}
        <div className="flex items-center">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm text-neutral-900 transition-colors hover:text-[#17A2C4]",
                      active && "text-[#17A2C4] underline underline-offset-4",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle
                  className={cn("text-2xl font-semibold", BRAND.color)}
                >
                  {BRAND.name}
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li key={link.href}>
                      <SheetClose
                        nativeButton={false}
                        render={
                          <Link
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "block rounded-md px-3 py-2.5 text-base text-neutral-900 hover:bg-neutral-100",
                              active && "bg-neutral-100 text-[#17A2C4]",
                            )}
                          />
                        }
                      >
                        {link.label}
                      </SheetClose>
                    </li>
                  );
                })}
                <li className="mt-3 border-t pt-3">
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-md px-3 py-2.5 text-base hover:bg-neutral-100"
                      />
                    }
                  >
                    <User className="size-4" />
                    Profile
                  </SheetClose>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: logo */}
        <Link
          href="/"
          className={cn(
            "text-2xl font-semibold tracking-tight sm:text-[28px]",
            BRAND.color,
          )}
        >
          {BRAND.name}
        </Link>

        {/* Right: profile + auth */}
        {user ? (
          <div className="flex items-center justify-end gap-4 text-sm text-neutral-900 sm:gap-6">
            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    variant="ghost"
                    className="group h-auto cursor-pointer gap-1 rounded-full border-0 p-1 pr-2 shadow-none transition-colors hover:bg-slate-100 data-[popup-open]:bg-slate-100 data-[state=open]:bg-slate-100"
                  />
                }
              >
                <Avatar className="ring-2 ring-transparent transition group-hover:ring-[#17A2C4]/40">
                  <AvatarImage
                    src={user?.image as string}
                    alt={user?.name ?? "User"}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                </Avatar>
                <ChevronDown className="size-4 text-gray-500 transition-transform group-data-[popup-open]:rotate-180 group-data-[state=open]:rotate-180" />
              </PopoverTrigger>

              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-60 rounded-xl border border-gray-100 bg-white p-2 text-gray-900 shadow-xl ring-0"
              >
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold">{user?.name}</p>
                  <p className="truncate text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <div className="my-1 h-px bg-gray-100" />

                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-slate-100 hover:text-[#17A2C4]"
                >
                  <User className="size-4" />
                  Profile
                </Link>

                <Link
                  onClick={handelSignOut}
                  href="/sign-in"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4 text-sm text-neutral-900 sm:gap-6">
            <Link href="/sign-in" className="hover:text-[#17A2C4]">
              Login
            </Link>
            <Link href="/sign-up" className="hover:text-[#17A2C4]">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
