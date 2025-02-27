import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"

interface BankingTileProps{
    title: string
    subtitle?: string
    children: ReactNode
    className?: string
}

export const ProductTile = ({title, subtitle, children, className}: BankingTileProps) => {
  return (
    <Card className={cn("bg-doow_card hover:shadow-lg", className)}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            {subtitle && 
            <CardDescription>
                {subtitle}
            </CardDescription>
            }
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
  )
}
