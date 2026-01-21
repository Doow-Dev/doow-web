import type { Metadata } from "next";
import { Inter, Manrope, Lato, Montserrat, Playfair_Display, Raleway, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { WaitListProvider } from "./provider";
import { siteDetails } from "@/data/siteDetails";
import { PostHogProvider } from "@/lib/providers/PostHogProvider";

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

const montserrat = Montserrat({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  variable: "--font-montserrat",
})

const playfair = Playfair_Display({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const raleway = Raleway({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
})

const poppins = Poppins({
  weight: ["500", "600"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  variable: "--font-poppins",
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
      lato.variable,
      montserrat.variable,
      playfair.variable,
      raleway.variable,
      poppins.variable
    )}
    suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${manrope.variable} ${montserrat.variable} ${playfair.variable} ${poppins.variable} ${raleway.variable}  antialiased`}
      >
        <PostHogProvider>
          <WaitListProvider>
            {children}
            <Toaster containerClassName="mt-4" position="top-center" />
          </WaitListProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
