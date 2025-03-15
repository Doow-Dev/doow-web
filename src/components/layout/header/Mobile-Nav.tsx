"use client"
import React from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {  Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  mainNavItems: {
    title: string
    href?: string
    items?: Array<{
      title: string
      href: string
      description?: string
      icon: React.ReactNode
    }>
  }[]
}

export function MobileNav({ mainNavItems }: MobileNavProps) {
  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </Button>
        </SheetTrigger>
      <SheetContent side="top"  className="overflow-y-auto" aria-describedby={undefined}>
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex flex-col gap-6 py-6">
            {/* Mobile Navigation  */}
            <nav className="flex flex-col space-y-1">
                <Accordion type="single" collapsible className="w-full">
                {mainNavItems.map((item) =>
                    item.items ? (
                    <AccordionItem
                        key={item.title}
                        value={item.title.toLowerCase().replace(/\s+/g, "-")}
                        className="border-b-0"
                    >
                        <AccordionTrigger className="py-3 text-base">{item.title}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2 pl-4">
                                {item.items.map((subItem) => (
                                    <Link
                                        key={subItem.title}
                                        href={subItem.href}
                                        className="flex flex-col py-2 text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        <div className="flex gap-3 items-start">
                                            <div className="border rounded-lg p-2">
                                                {subItem.icon}
                                            </div>
                                            <div className="border-red-400">
                                                <div className="text-sm font-bold leading-none">{subItem.title}</div>
                                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-2">{subItem.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    ) : (
                    <Link
                        key={item.title}
                        href={item.href || "#"}
                        className="flex items-center py-3 text-base font-medium"
                    >
                        {item.title}
                    </Link>
                    ),
                )}
                </Accordion>
            </nav>
            {/* button group */}
            <div className="flex flex-col gap-3">
                <Link
                    className={cn(
                        buttonVariants({ size: "lg", variant: "outline" }),
                        "rounded-full bg-transparent text-gray-500 hover:text-gray-900"
                    )}
                    href="/signin">
                    Sign In
                </Link>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 