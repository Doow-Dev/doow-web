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
import { ArrowRight, CircleDollarSign, UserCog, Unplug, Network, Users, UserPlus } from "lucide-react"
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper"
import { MobileNav } from "./Mobile-Nav"
import { isDarkBg } from "@/lib/helpers/isDarkBg"
import { useWaitListContext } from "@/lib/contexts/WaitlistContext"
import { DoowLogo } from "../components/doow_logo"
import { cn } from "@/lib/utils"

export interface HeaderItem {
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
        title: "Spend Management",
        href: "#",
        subtitle: "Consolidate and manage all non-payroll spend from one place, including AP/AR and employee spendings",
        icon: <UserCog className="w-3 h-3"/>
      },
      {
        title: "Finance Connections",
        href: "#",
        subtitle: "Integrate with your existing banks, card providers, accounting software, and other finance tools",
        icon: <Unplug className="w-3 h-3"/>
      },
    ],
  },
  {
    title: "Built For",
    link: "/#",
    dropdownItems: [
      {
        title: "For CEOs",
        href: "#",
        subtitle: "Complete picture of your global finance lifecycle",
        icon: <Network className="w-3 h-3"/>
      },
      {
        title: "For CFOs & Controllers",
        href: "#",
        subtitle: "Boost financial growth with real-time data and decisioning insights",
        icon: <Unplug className="w-3 h-3" />
      },
      {
        title: "For Managers",
        href: "#",
        subtitle:
          "Manage team-level spend, policies and permissions",
        icon: <UserPlus className="w-3 h-3" />
      },
      {
        title: "For Employees",
        href: "#",
        subtitle: "Spend within set company limits, policies and be accountable",
        icon: <Users className="w-3 h-3"/>
      },
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
    ],
  },
  {
    title: "Blog",
    link: "https://medium.com/@Doow",
  },
]

export function Header() {
  const {setIsWaitListOpen} = useWaitListContext();
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
        
        <DoowLogo/>

        {/* new nav menu */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {HeaderItems.map((item) =>
                item.dropdownItems ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className={cn("text-base", textColor, textColor === 'text-white' ? 'hover:text-white/80 data-[state=open]:text-white/80' : '')} >{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-doow_offwhite">
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]" >
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
                href="/signin">
                Sign In
            </Link>
            <Button size={"sm"} onClick={() => setIsWaitListOpen((prev) => !prev)} className="rounded-full bg-doow_primary">
              Join Beta
              <ArrowRight className=" h-4 w-4" />
            </Button>
          </div>

                {/* mobile navigation menu */}
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
                "block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-doow_card hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
            </a>
          </NavigationMenuLink>
        </li>
      )
    },
  )
  ListItem.displayName = "ListItem"
