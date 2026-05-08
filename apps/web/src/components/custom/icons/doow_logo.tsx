import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface DoowLogoProps {
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const DoowLogo = ({ className, imageClassName, width = 100, height = 50, priority = true }: DoowLogoProps) => {
  return (
    <div className={cn("w-fit", className)}>
      <Link href="/" prefetch={false}>
        <Image
          className={cn("mr-auto cursor-pointer", imageClassName)}
          src="/logos/doowFull.svg"
          alt="Doow logo"
          width={width}
          height={height}
          priority={priority}
        />
        <span className="sr-only">Doow</span>
      </Link>
    </div>
  );
};
