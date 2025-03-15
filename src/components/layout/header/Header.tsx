
'use client'
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { ArrowRight, CreditCard, Landmark, ArrowDownUp, CircleDollarSign, UserCog, Unplug, Network, Users, UserPlus } from "lucide-react"
import { AppImages } from "@/lib/config/app-images"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { MobileNav } from "./Mobile-Nav"
import { useWaitListRefs } from "@/app/provider"
import { isDarkBg } from "@/lib/helpers/isDarkBg"

interface HeaderItem {
  title: string;
  link: string;
  dropdownItems?: Array<{ title: string; href: string; subtitle: string; icon: React.JSX.Element }>;
}

const HeaderItems: Array<HeaderItem> = [
  {
    title: "Products",
    link: "/#",
    dropdownItems: [
      {
        title: "Corporate Cards",
        href: "#",
        subtitle:
          "Unlimited corporate & employee cards available everywhere",
        icon: <CreditCard className="w-3 h-3" />
      },
      {
        title: "Foreign Business Accounts",
        href: "#",
        subtitle: "Checking, HYSA, and other local and global business accounts without paperwork",
        icon: <Landmark className="w-3 h-3" />
      },
      {
        title: "Fx & Conversions",
        href: "#",
        subtitle: "Hold 40+ currencies and access 24/7 rates, convert easily",
        icon: <ArrowDownUp className="w-3 h-3" />
      },
      {
        title: "Global Payments",
        href: "#",
        subtitle: "ACH, Wires, SWIFT, SEPA, MoMo, Bacs, and other global payment methods",
        icon: <CircleDollarSign className="w-3 h-3" />
      },
      {
        title: "Spend Management",
        href: "#",
        subtitle: "Approve, automate and manage all company spend in one place",
        icon: <UserCog className="w-3 h-3"/>
      },
      {
        title: "Connections",
        href: "#",
        subtitle: "Integrate with your existing banks, card providers and finance tools",
        icon: <Unplug className="w-3 h-3"/>
      },
    ],
  },
  {
    title: "Built For",
    link: "/#",
    dropdownItems: [
      {
        title: "Startups",
        href: "#",
        subtitle: "Financial solutions for growing businesses",
        icon: <UserCog className="w-3 h-3"/>,
      },
      {
        title: "Enterprises",
        href: "#",
        subtitle: "Comprehensive financial management for large organizations",
        icon: <CircleDollarSign className="w-3 h-3" />,
      },
      {
        title: "For CEOs",
        href: "#",
        subtitle: "Complete picture of your global finance lifecycle.",
        icon: <Network className="w-3 h-3"/>
      },
      {
        title: "For CFOs & Controllers",
        href: "#",
        subtitle: "Boost financial growth with real-time data and automated approvals.",
        icon: <Unplug className="w-3 h-3" />
      },
      {
        title: "For Managers",
        href: "#",
        subtitle:
          "Manage team-level spend, policies and permissions.",
        icon: <UserPlus className="w-3 h-3" />
      },
      {
        title: "For Employees",
        href: "#",
        subtitle: "Spend within set company limits, policies and be accountable.",
        icon: <Users className="w-3 h-3"/>
      },
    ],
  },
  {
    title: "Blog",
    link: "https://medium.com/@Doow",
  },
]

export function Header() {
  const {highlightForm} = useWaitListRefs();
  const [textColor, setTextColor] = useState("text-gray-500");

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const headerHeight = header?.offsetHeight || 80; 
      const sections = document.querySelectorAll("section");
      let activeColor = "text-gray-500";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;

        // When the section is exactly under the header
        if (sectionTop <= headerHeight && sectionTop + rect.height >= headerHeight) {
          const bgColor = window.getComputedStyle(section).backgroundColor;
          activeColor = isDarkBg(bgColor) ? "text-white" : "text-gray-500";
        }
      })
      setTextColor(activeColor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    

  return (
    <header className="sticky top-0 z-50 w-full bg-white/0 backdrop-blur-xl">
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
            {HeaderItems.map((item) =>
              item.dropdownItems ? (
                <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className={cn("text-base", textColor, textColor === 'text-white' ? 'hover:text-white/80 data-[state=open]:text-white/80' : '')} >{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-doow_offwhite">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.dropdownItems.map((subItem) => (
                        <ListItem key={subItem.title} title={subItem.title} icon={subItem.icon} href={subItem.href}>
                          {subItem.subtitle}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.link || "#"} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), textColor, textColor === 'text-white' ? 'hover:text-white/80' : '')} >{item.title}</NavigationMenuLink>
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
                    "rounded-full bg-transparent text-gray-500 hover:text-doow_zinc",
                    textColor, textColor === 'text-white' ? 'hover:text-white/80 hover:bg-white/15' : ''
                )}
                style={{ color: textColor }}
                href="#">
                Sign In
            </Link>
            <Button size={"sm"} onClick={highlightForm} className="rounded-full bg-doow_primary">
              Join Beta
              <ArrowRight className=" h-4 w-4" />
            </Button>
          </div>

                {/* new mobile navigation menu */}
          <div className="md:hidden">
            <MobileNav mainNavItems={HeaderItems} />
          </div>
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
                <div>
                  <div className="text-sm font-semibold leading-none text-doow_zinc">{title}</div>
                  <div className="text-xs leading-snug text-muted-foreground mt-1">{children}</div>
                </div>
              </div>
              {/* <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors border border-gray-200">
                <span className="text-xl text-gray-600">{icon}</span>
                <div>
                  <div className="font-semibold text-gray-800">{title}</div>
                  <div className="text-xs text-gray-500">{children}</div>
                </div>
              </div> */}
              {/* <div className="border-t border-gray-200 w-full"></div> */}
            </a>
          </NavigationMenuLink>
        </li>
      )
    },
  )
  ListItem.displayName = "ListItem"
