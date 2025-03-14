import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { AppImages } from "@/lib/config/app-images";
import Image from "next/image";

export const ProductDemoSection = () => {
  return (
    <section className="w-full section-spacing px-3 ">
      <MaxWidthWrapper className="section-spacing flow-root">
        <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
          <Image
            src={AppImages.demos.dashboard}
            alt="s"
            width={1364}
            height={866}
            quality={100}
            className="object-cover object-top h-[100vh] rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
