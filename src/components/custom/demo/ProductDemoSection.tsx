import { AppImages } from "@/lib/config/app-images"
// import { maxHeaderSize } from "http"
import Image from "next/image"


export const ProductDemoSection = () => {
  return (
      <section className="container flow-root section-spacing px-3 bg-[#003138]">
          <div className="text-center mb-8 max-w-xl md:max-w-3xl mx-auto text-pretty">
            <h2 className="text-sub-heading text-doow_offwhite capitalize">Eliminate wasted software spend, prevent surprise renewals, and streamline recurring vendor payments—all from a single dashboard.</h2>
          </div>
          <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
            <Image
              src={AppImages.demos.dashboard}
              alt="s"
              width={1364}
              height={866}
              quality={100}
              className="rounded-md bg-white  shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
      </section>
  )
}