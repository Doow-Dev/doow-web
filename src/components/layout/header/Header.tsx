"use client";

import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowRight, ChevronDown } from "lucide-react"
import { AppImages } from "@/lib/config/app-images"
import { useState, useEffect, useRef } from "react"
import { BiCreditCard } from "react-icons/bi";
import { RiBankLine } from "react-icons/ri";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { VscDebugDisconnect } from "react-icons/vsc";

interface HeaderItem {
  title: string;
  link: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{ title: string; href: string; subtitle: string; icon: JSX.Element }>;
}

export const HeaderItems: Array<HeaderItem> = [
  {
    title: "Products",
    link: "/#",
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Corporate Cards",
        href: "#",
        subtitle: "Unlimited corporate & employee cards available everywhere",
        icon: <BiCreditCard />,
      },
      {
        title: "Foreign Business Accounts",
        href: "#",
        subtitle: "Checking, HYSA, and other local and global business accounts without paperwork",
        icon: <RiBankLine />,
      },
      {
        title: "Fx & Conversions",
        href: "#",
        subtitle: "Hold 40+ currencies and access 24/7 competitive rates, convert easily",
        icon: <IoSwapVerticalOutline />,
      },
      {
        title: "Global Payments",
        href: "#",
        subtitle: "ACH, Wires, SWIFT, SEPA, MoMo, Bacs, and other global payment methods",
        icon: <HiOutlineCurrencyDollar />,
      },
      {
        title: "Spend Management",
        href: "#",
        subtitle: "Approve, automate and manage all company spend in one place",
        icon: <MdOutlineManageAccounts />,
      },
      {
        title: "Connections",
        href: "#",
        subtitle: "Integrate with your existing banks, card providers and finance tools",
        icon: <VscDebugDisconnect />,
      },
    ],
  },
  {
    title: "Built For",
    link: "/#",
    hasDropdown: true,
    dropdownItems: [
      {
        title: "Startups",
        href: "#",
        subtitle: "Financial solutions for growing businesses",
        icon: <MdOutlineManageAccounts />,
      },
      {
        title: "Enterprises",
        href: "#",
        subtitle: "Comprehensive financial management for large organizations",
        icon: <HiOutlineCurrencyDollar />,
      },
    ],
  },
  {
    title: "Blog",
    link: "https://medium.com/@Doow",
  },
];

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/0 backdrop-blur-lg">
      <div className="container flex h-20 items-center justify-between gap-2 ">
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

        <div className="hidden items-center gap-8 justify-between md:flex ">
          {HeaderItems.map((item, index) => (
            <NavItem 
              key={index} 
              item={item} 
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
          ))}
        </div>
        
        <div className="flex items-center gap-4">
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

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <MenuIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="md:hidden">
              <div className="grid gap-8 p-6">
                <div className="flex flex-col items-center gap-4 text-body font-medium">
                  {HeaderItems.map((item, index) => (
                    <NavItem key={index} item={item} mobile />
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
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function NavItem({ 
  item, 
  mobile, 
  openDropdown, 
  setOpenDropdown 
}: { 
  item: HeaderItem; 
  mobile?: boolean; 
  openDropdown?: string | null; 
  setOpenDropdown?: (title: string | null) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Handle clicks outside of dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (setOpenDropdown) setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenDropdown]);

  // If not a dropdown item or on mobile, render a simple link
  if (!item.hasDropdown || mobile) {
    return (
      <Link
        href={item.link}
        className="text-body text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
        prefetch={false}
        target={item.title === "Blog" ? "_blank" : "_self"}
        rel={item.title === "Blog" ? "noopener noreferrer" : ""}
      >
        {item.title}
      </Link>
    );
  }

  if (!isMounted) {
    return (
      <div className="flex items-center gap-1 text-body text-gray-500">
        {item.title}
      </div>
    );
  }

  const isOpen = openDropdown === item.title;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setOpenDropdown && setOpenDropdown(item.title)}
    >
      <div 
        className="flex items-center gap-1 text-body text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 cursor-pointer"
      >
        {item.title}
        <ChevronDown 
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} 
        />
      </div>
      
      {isOpen && item.dropdownItems && (
        <div 
          ref={dropdownRef}
          onMouseLeave={() => setOpenDropdown && setOpenDropdown(null)}
          className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg z-50 overflow-hidden"
        >
          <div className="py-2">
            {item.dropdownItems.map((dropdownItem, index) => (
              <Link 
                key={index}
                href={dropdownItem.href} 
                className="block"
              >
                <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors">
                  <span className="text-xl text-gray-600">{dropdownItem.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{dropdownItem.title}</div>
                    <div className="text-xs text-gray-500">{dropdownItem.subtitle}</div>
                  </div>
                </div>
                {index < item.dropdownItems.length - 1 && (
                  <div className="border-t border-gray-200 w-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
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