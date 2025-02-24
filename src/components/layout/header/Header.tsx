import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { AppImages } from "@/lib/config/app-images"

interface HeaderItem {
  title: string;
  link: string;
}

export const HeaderItems: Array<HeaderItem> = [
  {
    title: "Solutions",
    link: "/solutions",
  },
  {
    title: "Faqs",
    link: "/faqs",
  },
  {
      title: "Blog",
      link: "/blog",
    },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/0 backdrop-blur-lg">
      {/* header */}
      <div className="container flex h-20 items-center justify-between gap-2 ">
        {/* logo */}
          <Link href="#" className="flex items-center gap-2 " prefetch={false}>
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

        {/* navigation menu */}
        <div className="hidden items-center gap-8 justify-between md:flex ">
          {HeaderItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-body text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                prefetch={false}
              >
                {item.title}
              </Link>
          ))}
        </div>
          
        {/* button groups */}
        <div className="flex items-center gap-4">
          {/* desktop */}
          <div className="hidden md:flex items-center gap-3 text-button">
            <Link
                className={cn(
                    buttonVariants({ size: "sm", variant: "outline" }),
                    "rounded-full bg-transparent text-gray-500 hover:text-gray-900"
                )}
                href="#">
                Sign In
            </Link>
            <Link
                className={cn(
                    buttonVariants({ size: "sm" }),
                    "rounded-full"
                )}
                href="#">
                Join Beta
                <ArrowRight className=" h-4 w-4" />
            </Link>
          </div>


          {/* mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="md:hidden">
              {/* navigation menu */}
              <div className="grid gap-8 p-6">
                <div className="flex flex-col items-center gap-4 text-body font-medium">
                  {HeaderItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.link}
                        className="text-body text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                        prefetch={false}
                      >
                        {item.title}
                      </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <Link
                      className={cn(
                          buttonVariants({ size: "lg", variant: "outline" }),
                          "rounded-full bg-transparent text-gray-500 hover:text-gray-900"
                      )}
                      href="#">
                      Sign In
                  </Link>
                  <Link
                      className={cn(
                          buttonVariants({ size: "lg" }),
                          "rounded-full"
                      )}
                      href="/signup">
                      Book a demo
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

