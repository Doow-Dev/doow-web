'use client'
import WaitListForm from "@/components/common/waitListForm"


export const WaitListBannerSection = () => {
  return (
    <section className="container section-spacing ">
      <div className="flex flex-col justify-center items-center bg-doow_light_green w-full section-spacing rounded-3xl border">
        <div className="max-w-md md:max-w-xl text-center mb-8">
          <h3 className="text-sub-heading text-doow_zinc">Stop wasting money on unused SaaS. Start saving today.</h3>
        </div>
        <WaitListForm/>
      </div>
    </section>
  )
}
