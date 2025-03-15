import type { Metadata } from "next";
import { Inter, Manrope, Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

// utils
import { cn } from "@/lib/utils";
import { Providers, WaitListProvider } from "./provider";
import { siteDetails } from "@/data/siteDetails";

const inter = Inter({
  weight: ["100", "200", "300", "400", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});
const manrope = Manrope({
  weight: ["500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
    className={cn(
      "font-sans antialiased bg-background",
      inter.variable,
      manrope.variable,
      lato.variable
    )}
    suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${manrope.variable} antialiased`}
      >
        <Providers>
          <WaitListProvider>
            {children}
            <Toaster containerClassName="mt-4" position="top-center" />
          </WaitListProvider>  
        </Providers>
      </body>
    </html>
  );
}
