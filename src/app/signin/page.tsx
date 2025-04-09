"use client";
import { useState } from "react";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast"; // Use react-hot-toast
import { DoorOpen, Eye, EyeOff } from "lucide-react"
import { DoowLogo } from "@/components/layout/components/doow_logo";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  variable: "--font-poppins",
})

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.error("Book a demo to create an account");
    }, 2000);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== ""

  return (
    <section className="relative isolation h-full min-h-screen  bg-doow_offwhite">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1.2px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <MaxWidthWrapper className=" flex items-center h-16 sticky top-0 z-50 w-full bg-white/0 backdrop-blur-xl ">
        <DoowLogo/>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="relative h-full section-spacing">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="items-start top-0">
            <h2 className="relative text-sub-heading text-center text-gray-600 whitespace-nowrap">
              Welcome back 👋
            </h2>
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg mx-auto items-center mt-6">
            <div className="text-center">
              {/* <p className={`${poppins.className} text-center font-semibold font-inter text-xl text-black`}>
                  Sign in with your registered email <br/> and password
              </p> */}
              <div className="opacity-70 bg-doow_card text-doow_primary p-2 rounded-full w-fit mx-auto ">
                <DoorOpen className="h-8 w-8"/>
              </div>
              <p className={`${poppins.className} text-sm text-muted-foreground mt-3`}>
                Sign in with your registered email <br/> and password
              </p>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm text-doow_zinc mb-1">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-doow_zinc mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full pr-10"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !isFormValid}
                size={"lg"}
                className="mt-4 py-6 w-full bg-doow_primary text-white hover:bg-doow_dark_green/90"
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
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
