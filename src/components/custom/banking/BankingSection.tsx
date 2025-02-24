import { BankingTile } from "@/components/common/bankingTile"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"
import { AccountsCard } from "./AccountsCard"

export const BankingSection = () => {
    return (
      <section className="relative section-spacing bg-white">
        <div className="container">
          {/* Section Title */}
          <div className="text-center mb-8 max-w-xl md:max-w-2xl mx-auto">
            {/* main text */}
            <h2 className="text-sub-heading text-balance text-doow_zinc capitalize">With Doow, you can do even more with your money!
            </h2>
          </div>
          {/* tiles */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* tile 1 */}
            <BankingTile title="No more chasing invoices." subtitle="Get a live dashboard of all software expenses, categorized by team, usage, and renewal dates.">
              <AccountsCard/>
            </BankingTile>

            {/* tile 2 */}
            <BankingTile title="Never get hit by an unexpected charge again." subtitle="Get proactive alerts before renewals and cut wasteful subscriptions instantly.">
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
            </BankingTile>
  
            {/* tile 3 */}
            <BankingTile title="Spot duplicate and overlapping apps" subtitle="Spot duplicate and overlapping apps, unused seats, and overpriced subscriptions—then cut costs with a single click.">
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
            </BankingTile>
  
            {/* tile 4 */}
            <BankingTile title="Prevent shadow IT." subtitle="Set approval policies and require manager sign-off before teams buy new software.">
              <>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-500">• Goals Completed</span>
                    <span>2/3</span>
                  </div>
                  <Progress value={66} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Lorem Ipsum</span>
                    <span className="text-green-500">Pass</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lorem Ipsum</span>
                    <span className="text-green-500">Pass</span>
                  </div>
                </div>
              </>
            </BankingTile>
          </div>
        </div>
      </section>
    )
  }
  