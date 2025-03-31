import OverlappingApplications from "./OverlappingApplications"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { AppImages } from "@/lib/config/app-images"
import { ResponsiveImage } from "@/components/ui/responsive-image"
import { ProductTile } from "@/components/common/ProductTile"

export const SassIntelligenceSection = () => {
  return (
    <section className="bg-white">
      <MaxWidthWrapper className="section-spacing">
        {/* Section Title */}
        <div className="text-center mb-8 space-y-4 max-w-lg md:max-w-2xl mx-auto">
          {/* main text */}
          <h2 className="text-sub-heading text-pretty text-doow_zinc">Still tracking SaaS manually? That&apos;s a nightmare 🤮
          </h2>
        </div>
        {/* tiles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* tile 1 */}
             <ProductTile
                title="Consolidate your SaaS subscriptions from multiple sources"
                subtitle=" Uncover all the apps employees are signing up for and see how they’re wasting or utilizing your SaaS spend.
"
              >
                <div className="relative rounded-lg overflow-hidden h-[200px] sm:h-[300px] md:h-[250px] lg:h-[300px]">
                  <ResponsiveImage
                    sources={[
                      {
                        src: AppImages.demos.allapplications,
                        width: 1695,
                        height: 1330,
                        media: "(max-width: 640px)",
                      },
                      {
                        src: AppImages.demos.allapplications,
                        width: 1695,
                        height: 1330,
                        media: "(min-width: 641px) and (max-width: 1024px)",
                      },
                    ]}
                    fallbackSrc={AppImages.demos.allapplications}
                    fallbackWidth={1695}
                    fallbackHeight={1330}
                      alt="centralized SaaS spend"
                    className="w-full h-full object-cover object-top inset-0 transition-transform duration-300 hover:scale-105"
                  />
                </div>
            </ProductTile>
            {/* tile 2 */}
            <ProductTile
                title="All your SaaS licenses in one place"
                subtitle="Centralize your SaaS subscriptions and never get hit by an unexpected charge again. Get proactive alerts before renewals and cut wasteful subscriptions instantly."
              >
                <div className="relative rounded-lg overflow-hidden h-[200px] sm:h-[300px] md:h-[250px] lg:h-[300px]">
                  <ResponsiveImage
                    sources={[
                      {
                        src: AppImages.demos.contracthome,
                        width: 1695,
                        height: 1330,
                        media: "(max-width: 640px)",
                      },
                      {
                        src: AppImages.demos.contracthome,
                        width: 1695,
                        height: 1330,
                        media: "(min-width: 641px) and (max-width: 1024px)",
                      },
                    ]}
                    fallbackSrc={AppImages.demos.contracthome}
                    fallbackWidth={1695}
                    fallbackHeight={1330}
                      alt="centralized SaaS subscriptions"
                    className="w-full h-full object-cover object-top inset-0 transition-transform duration-300 hover:scale-105"
                  />
                </div>
            </ProductTile>
            {/* tile 3 */}
            <ProductTile
              title="Wasted subscriptions? Not anymore!"
              subtitle=" Spot duplicate and overlapping apps, unused seats, or even overpriced subscriptions, and take intelligent cut-costing actions with a single click."
              className="col-span-1 md:col-span-2"
            >
              <OverlappingApplications/>
            </ProductTile>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
