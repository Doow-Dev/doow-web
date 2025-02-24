import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface BankingTileProps{
    title: string
    subtitle?: string
    children: ReactNode
}

export const BankingTile = ({title, subtitle, children}: BankingTileProps) => {
  return (
    <Card className="bg-doow_card hover:shadow-lg">
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
