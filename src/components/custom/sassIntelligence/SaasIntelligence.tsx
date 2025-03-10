import { ProductTile } from "@/components/common/ProductTile"
import OverlappingApplications from "./OverlappingApplications"
import { AppImages } from "@/lib/config/app-images";
import Image from "next/image";

export const SassIntelligenceSection = () => {
  return (
    <div className="relative section-spacing bg-white">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-8 space-y-4 max-w-lg md:max-w-2xl mx-auto">
          {/* main text */}
          <h2 className="text-sub-heading text-pretty text-doow_zinc capitalize">Still tracking everything manually? That&apos;s a nightmare.
          </h2>
        </div>
        {/* tiles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full overflow-auto">
            {/* tile 1 */}
            <ProductTile
              title="No more wasted SaaS subscriptions"
              subtitle="Spot duplicate and overlapping apps, unused seats, or even overpriced subscriptions, and cut costs with a single click."
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
      </div>
    </div>
  )
}
