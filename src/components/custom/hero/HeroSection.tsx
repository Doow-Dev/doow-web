'use client'
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import WaitListForm from "../../common/waitListForm"


export  const HeroSection = () => {
  return (
        <section className="relative isolation h-full w-full flex items-center justify-center text-center bg-doow_offwhite">
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1.2px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <MaxWidthWrapper className="relative section-spacing">
            {/* hero text */}
            <div className="text-center space-y-8 max-w-2xl md:max-w-3xl mx-auto">
              <h1 className="text-heading text-doow_zinc">You&apos;re overpaying for SaaS You just can&apos;t see it!<br className="hidden sm:flex"/> </h1>
              <p className="text-riding text-doow_grey  w-[90%] mx-auto">See every SaaS subscription, who owns it, and how much you&apos;re paying—so teams can cut waste, prevent surpises, and stay ahead of renewals.</p>
            </div>
            <WaitListForm/>
          </MaxWidthWrapper>
    </section>
  )
}
