"use client";

import { useState } from "react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast"; // Use react-hot-toast

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.error("Book a demo to create an account");
    }, 2000); // Simulates a 2-second delay
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-doow_offwhite">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1.2px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <MaxWidthWrapper className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-center text-4xl font-bold text-doow_zinc mb-[20px]">
          Sign in
        </h2>
        <p className="text-center text-riding text-doow_grey">
          Manage your global spend in one place.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm text-doow_zinc mb-1">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-doow_zinc mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 py-6 w-full bg-doow_primary text-white hover:bg-doow_dark_green/90 disabled:bg-doow_grey"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </MaxWidthWrapper>
    </section>
  );
}
