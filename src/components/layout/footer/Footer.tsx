"use client"
import Image from "next/image"
import { AppImages } from "@/lib/config/app-images"
import WaitListForm from "@/components/common/waitListForm"
import Link from "next/link"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"

const productLinks = [
  "Foreign Business Accounts",
  "Corporate Cards",
  "Global Payments",
  "Fx & Conversions",
  "Multi-currency Reimbursements",
  "Spend Management",
  "Connections"
]

const companyLinks = [
  { name: "About Us", href: '#' },
  { name: "Contact Us", href: '#' },
  { name: "Privacy Policy", href: '#' },
  { name: "Terms of Use", href: '#' }
]

export function Footer() {

  return (
    <footer className="w-full bg-[#003138] ">
      <MaxWidthWrapper className="lg:flex lg:flex-row-reverse gap-6 justify-between py-6">
        {/* waitlist banner */}
        <div className="relative bg-[#024651] w-full rounded-3xl p-8 lg:p-10">
          <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#024651] bg-[linear-gradient(to_right,#003138_1px,transparent_1px),linear-gradient(to_bottom,#003138_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
          <div className="relative flex flex-col h-full justify-center items-center section-spacing">
            <div className="max-w-sm md:max-w-lg text-center">
              <h3 className="text-sub-heading text-white text-balance">Stop wasting money on unused SaaS. Start saving today.</h3>
            </div>
            <WaitListForm/>
          </div>
        </div>
        {/* foot nav */}
        <nav className="flex w-full flex-col items-center mt-6 lg:mt-0">
          {/* Main Grid Section */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {/* logo */}
            <Link href="#" className="" prefetch={false}>
              <Image
                  className="cursor-pointer mr-auto"
                  src={AppImages.logos.fullDoowLogo}
                  alt="Doow logo"
                  width={100}
                  height={50}
                  priority
              />
              <span className="sr-only">Doow</span>
            </Link>

            {/* Products */}
            <div className="">
              <h3 className="mb-4 font-bold text-white">Products</h3>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link}>
                    <Link href='#' className="text-body text-white transition-colors hover:text-gray-300">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 font-bold text-white">Company</h3>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href='#' className="text-body text-white transition-colors hover:text-gray-300">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div className="text-sm text-white">
              <h3 className="mb-4 font-bold">Location</h3>
              <p className="mb-2">1007 N Orange St. 4th Floor,</p>
              <p className="mb-2">Wilmington, DE,</p>
              <p>United States</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 w-full">
            <p className="text-xs text-gray-400">
              © 2025 Doow Inc. All rights reserved
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 w-full space-y-4">
            <p className="text-xs text-gray-400">
              Doow Inc. is a financial technology company duly incorporated under the
              laws of Delaware, United States of America. Doow is not a bank. Doow
              offers all of its services in partnership with licensed banking and
              financial partners in their respective jurisdictions worldwide.
            </p>
            <p className="text-xs text-gray-400">
              All logos, trademarks and brand names belong to their respective
              owners. Using these brand items does not imply endorsement with Doow.
            </p>
          </div>
        </nav>
      </MaxWidthWrapper>
    </footer>
  )
}


