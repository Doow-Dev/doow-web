"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button, FormField, Input } from "@/components/system";
import { ContentPanel, PageHeading } from "@/app/_components/utility-page-shell";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.error("Book a demo to create an account");
    }, 2000);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <>
      <PageHeading
        eyebrow="Access"
        title="Sign in"
        description="This retained route stays available during the landing-page rebuild."
      />
      <ContentPanel className="mt-10 max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormField id="signin-email" label="Email">
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>

          <FormField id="signin-password" label="Password">
            <div className="relative">
              <Input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-12"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </button>
            </div>
          </FormField>

          <Button
            type="submit"
            disabled={loading || !isFormValid}
            size="lg"
            className="w-full"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </ContentPanel>
    </>
  );
}
