'use client'
import * as React from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowRight, CreditCard, Landmark, ArrowDownUp, CircleDollarSign, UserCog, Unplug, Network, ShoppingBag, Users, UserPlus } from "lucide-react"
import { AppImages } from "@/lib/config/app-images"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { MobileNav } from "./Mobile-Nav"

const navigationItems = [
  {
    title: "Products",
    items: [
      {
        title: "Corporate Cards",
        href: "#",
        description:
          "Unlimited corporate & employee cards available everywhere.",
        icon: <CreditCard className="w-3 h-3" />
      },
      {
        title: "Foreign Business Accounts",
        href: "#",
        description: "Checking, HYSA, and other local and global business accounts without paperwork.",
        icon: <Landmark className="w-3 h-3" />
      },
      {
        title: "Fx & Conversions",
        href: "#",
        description: "Hold 40+ currencies and access 24/7 rates, convert between liquid and illiquid pairs, settle fast in your preferred currency.",
        icon: <ArrowDownUp className="w-3 h-3" />
      },
      {
        title: "Global Payments",
        href: "#",
        description: "ACH, Wires, SWIFT, SEPA, MoMo, Bacs, and other global payment methods.",
        icon: <CircleDollarSign className="w-3 h-3" />
      },
      {
        title: "Spend Management",
        href: "#",
        description: "Approve, automate and manage all company spend in one place.",
        icon: <UserCog className="w-3 h-3"/>
      },
      {
        title: "Connections",
        href: "#",
        description: "Integrate with your existing banks, card providers and finance tools.",
        icon: <Unplug className="w-3 h-3"/>
      },
    ],
  },
  {
    title: "Solutions",
    items: [
      {
        title: "For CEOs",
        href: "#",
        description: "Complete picture of your global finance lifecycle.",
        icon: <Network className="w-3 h-3"/>
      },
      {
        title: "For CFOs & Controllers",
        href: "#",
        description: "Boost financial growth with real-time data and automated approvals.",
        icon: <Unplug className="w-3 h-3" />
      },
      {
        title: "For Managers",
        href: "#",
        description:
          "Manage team-level spend, policies and permissions.",
        icon: <UserPlus className="w-3 h-3" />
      },
      {
        title: "For Employees",
        href: "#",
        description: "Spend within set company limits, policies and be accountable.",
        icon: <Users className="w-3 h-3"/>
      },
      {
        title: "For Ecommerce",
        href: "#",
        description: "Receive payments from your customers anywhere in the world, then settle and hold in any currency.",
        icon: <ShoppingBag className="w-3 h-3" />
      }
    ],
  },
  {
    title: "Blog",
    href: "https://medium.com/@Doow",
  },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/0 backdrop-blur-lg">
      {/* header */}
      <MaxWidthWrapper className="flex items-center justify-between h-20">
        {/* logo */}
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
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

        {/* new nav menu */}
        <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item) =>
              item.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="text-body text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-doow_offwhite">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.items.map((subItem) => (
                        <ListItem key={subItem.title} title={subItem.title} icon={subItem.icon} href={subItem.href}>
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href || "#"} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.title}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
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
                    "rounded-full bg-doow_primary"
                )}
                href="#">
                Join Beta
                <ArrowRight className=" h-4 w-4" />
            </Link>
          </div>

                {/* new mobile navigation menu */}
          <div className="md:hidden">
                  <MobileNav mainNavItems={navigationItems} />
          </div>
          
          {/*old mobile navigation */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="md:hidden">
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
                          "rounded-full bg-doow_primary"
                      )}
                      href="/signup">
                      Join Beta
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet> */}
        </div>
      </MaxWidthWrapper>
    </header>
  )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    title: string;
    icon: React.ReactNode;
  }
  
const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
    ({ className, title, icon, children, ...props }, ref) => {
      return (
        <li>
          <NavigationMenuLink asChild>
            <a
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-doow_card hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className,
              )}
              {...props}
            >
              <div className="flex gap-3 items-start">
                <div className="border rounded-lg p-2">
                  {icon}
                </div>
                <div className="border-red-400">
                  <div className="text-sm font-bold leading-none">{title}</div>
                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-2">{children}</p>
                </div>
              </div>
            </a>
          </NavigationMenuLink>
        </li>
      )
    },
  )
  ListItem.displayName = "ListItem"

// function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="25"
//       height="25"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   )
// }
