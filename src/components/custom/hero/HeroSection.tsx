'use client'
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import WaitListForm from "../../common/waitListForm"


export  const HeroSection = () => {
  return (
        <section className="relative isolation h-full w-full flex items-center justify-center text-center bg-doow_offwhite">
          {/* <div className="h-full absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_90%_at_50%_0%,#000_50%,transparent_110%)]"></div> */}
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1.2px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          {/* <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}
          <MaxWidthWrapper className="relative section-spacing">
            {/* hero text */}
            <div className="text-center space-y-4 max-w-2xl md:max-w-3xl mx-auto">
              {/* main text */}
              <h1 className="text-heading text-doow_zinc capitalize">Manage your global spend from one place</h1>
              {/* riding text */}
              <p className="text-riding text-doow_grey w-[90%] mx-auto">See where all your non-payroll spend goes, from SaaS subscriptions to AP/AR to employee spending—without the annoying spreadsheets!</p>
            </div>
            {/* cta - waitlist form (modal) */}
            <WaitListForm/>
          </MaxWidthWrapper>
        </section>
  )
};

