import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"
import { OverlappingApplications } from "./OverlappingApplications"
import { ProductTile } from "@/components/common/ProductTile"

export const SassIntelligenceSection = () => {
  return (
    <div className="relative section-spacing">
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
              title="No more chasing invoices."
              subtitle="Get a live dashboard of all software expenses, categorized by team, usage, and renewal dates."
              className="col-span-1 md:col-span-2"
            >
              <OverlappingApplications/>
            </ProductTile>

            {/* tile 2 */}
            <ProductTile
              title="Never get hit by an unexpected charge again."
              subtitle="Get proactive alerts before renewals and cut wasteful subscriptions instantly."
            >
              <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Lorem</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Positive</span>
                          <span>0.7</span>
                        </div>
                        <Progress value={70} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Negative</span>
                          <span>0.8</span>
                        </div>
                        <Progress value={80} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Lorem</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Concerned</span>
                          <span>88%</span>
                        </div>
                        <Progress value={88} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Lorem</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Lorem Voces</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Sigh</span>
                        <span className="bg-secondary px-2 py-1 rounded">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pauses</span>
                        <span className="bg-secondary px-2 py-1 rounded">4</span>
                      </div>
                    </div>
                  </div>
                </div>
            </ProductTile>

          {/* tile 3 */}
          <ProductTile
             title="Spot duplicate and overlapping apps"
             subtitle="Unused seats, and overpriced subscriptions—then cut costs with a single click."
          >
              <div className="space-y-2">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Call Forwarded</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Disclaimer Read</span>
                </div>
              </div>
          </ProductTile>
        </div>
      </div>
    </div>
  )
}
