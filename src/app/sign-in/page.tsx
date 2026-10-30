"use client";
import { cn } from "cn";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { authClient } from "../../lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";

const labelClass = "mb-2 block text-sm font-medium text-gray-900";
const inputClass =
  "h-12 rounded-none border border-gray-200 bg-slate-50 pl-11 text-base shadow-none placeholder:text-gray-500 focus-visible:border-[#16a0c0] focus-visible:ring-1 focus-visible:ring-[#16a0c0]";
const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-gray-500";

export default function LoginForm() {
  const handleSignIn = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...userData,
    });
    if (data) {
      console.log(data);
      redirect("/");
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className={cn("mx-auto flex w-full max-w-[600px] flex-col gap-8")}>
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-950">
            Welcome Back
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Resume your adventure with Wanderlust
          </p>
        </div>

        <Card className="gap-0 rounded-sm border border-gray-200 bg-white py-0 shadow-md">
          <CardContent className="p-10">
            <form onSubmit={handleSignIn} className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={iconClass} />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <div className="relative">
                  <Lock className={iconClass} />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="-mt-1 flex items-center justify-between">
                <label
                  htmlFor="remember"
                  className="flex cursor-pointer items-center gap-2 text-base text-gray-600"
                >
                  <input
                    id="remember"
                    type="checkbox"
                    name="remember"
                    className="size-4 cursor-pointer rounded-sm border-gray-400 accent-[#16a0c0]"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-base font-medium text-[#16a0c0] underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="h-14 w-full rounded-none bg-[#16a0c0] text-base font-medium text-white hover:bg-[#128aa7]"
              >
                Sign In
              </Button>

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-base text-gray-500">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Button
                variant="outline"
                type="button"
                className="h-14 w-full rounded-none border-gray-200 bg-white text-base font-medium text-gray-900 shadow-none hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="size-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.4-4.7 7l7.3 5.7c4.3-4 6.8-9.9 6.8-17.2z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.6 10.8l7.9-6.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.6 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
                  />
                </svg>
                Sign Up With Google
              </Button>

              <p className="mt-1 text-center text-base text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold text-[#16a0c0] no-underline hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
