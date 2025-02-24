import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"
import { NestedApplications } from "./OverlappingApplications"

export const SassIntelligenceSection = () => {
  return (
    <div className="relative section-spacing">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-8 space-y-4 max-w-lg md:max-w-2xl mx-auto">
          {/* main text */}
          <h2 className="text-sub-heading text-pretty text-doow_zinc capitalize">Still tracking everything manually? That&apos;s a nightmare.
          </h2>
          {/* riding text */}
          {/* <p className="text-riding text-doow_grey  w-[90%] mx-auto">Commodi praesentium autem vel! Natus neque officiis enim assumenda perspiciatis assumenda perspiciatis</p> */}
        </div>
        {/* tiles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full overflow-auto">
            {/* tile 1 */}
            <div className="col-span-1 md:col-span-2 overflow-auto rounded-xl bg-gray-900/5 p-3 ring-1 ring-inset ring-gray-900/10 lg:rounded-3xl">
              <Card className="rounded-xl md:rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-caption text-doow_zinc text-pretty">No more chasing invoices.</CardTitle>
                  <CardDescription className="text-body">
                      Get a live dashboard of all software expenses, categorized by team, usage, and renewal dates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NestedApplications/>
                </CardContent>
              </Card>
            </div>

            {/* tile 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Never get hit by an unexpected charge again. Get proactive alerts before renewals and cut wasteful subscriptions instantly.
                </CardTitle>
                {/* <CardDescription>Lorem ipsum dolor sit amet psum dolor sit amet</CardDescription> */}
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

          {/* tile 3 */}
          <Card>
            <CardHeader>
              <CardTitle>Spot duplicate and overlapping apps, unused seats, and overpriced subscriptions—then cut costs with a single click.</CardTitle>
              {/* <CardDescription>Lorem ipsum dolor sit amet ipsum</CardDescription> */}
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
