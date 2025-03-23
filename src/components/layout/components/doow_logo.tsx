import { AppImages } from "@/lib/config/app-images"
import Image from "next/image"
import Link from "next/link"

export const DoowLogo = () => {
  return (
    <div className="w-fit-content">
        {/* logo */}
        <Link href="/" className="" prefetch={false}>
        <Image
            className="cursor-pointer mr-auto"
            src={AppImages.logos.fullDoowLogo}
            alt="Doow logo"
            width={100}
            height={50}
            priority
        />
        <span className="sr-only">Doow</span>
        </Link>
    </div>
  )
}

