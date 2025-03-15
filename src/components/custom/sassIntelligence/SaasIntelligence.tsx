import { ProductTile } from "@/components/common/ProductTile"
import OverlappingApplications from "./OverlappingApplications"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import Image from "next/image"
import { AppImages } from "@/lib/config/app-images"

export const SassIntelligenceSection = () => {
  return (
    <section className="bg-white">
      <MaxWidthWrapper className="section-spacing">
        {/* Section Title */}
        <div className="text-center mb-8 space-y-4 max-w-lg md:max-w-2xl mx-auto">
          {/* main text */}
          <h2 className="text-sub-heading text-pretty text-doow_zinc capitalize">Still tracking everything manually? That&apos;s a nightmare.
          </h2>
        </div>
        {/* tiles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* tile 1 */}
            <ProductTile
              title="No more chasing invoices."
              subtitle="Get a live dashboard of all software expenses, categorized by team, usage, and renewal dates."
              className="col-span-1 md:col-span-2"
            >
              <OverlappingApplications/>
            </ProductTile>

             {/* tile 2 */}
            <ProductTile
              title="All your SaaS licenses in one place"
              subtitle="Centralize your SaaS subscriptions and never get hit by an unexpected charge again. Get proactive alerts before renewals and cut wasteful subscriptions instantly."
            >
              <div className="flex-1 relative w-full overflow-hidden rounded-lg" style={{ minHeight: "300px" }}>
                <Image
                  src={AppImages.demos.contracthome}
                  alt="centralized SaaS subscriptions"
                  width={500}
                  height={192}
                  className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </ProductTile>

            {/* tile 3 */}
            <ProductTile
              title="All your SaaS licenses in one place"
              subtitle="Centralize your SaaS subscriptions and never get hit by an unexpected charge again. Get proactive alerts before renewals and cut wasteful subscriptions instantly."
            >
              <div className="flex-1 relative w-full overflow-hidden rounded-lg" style={{ minHeight: "300px" }}>
                <Image
                  src={AppImages.demos.allapplications}
                  alt="centralized SaaS subscriptions"
                  width={500}
                  height={192}
                  className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </ProductTile>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
