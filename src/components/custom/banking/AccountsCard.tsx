"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Send, FileText, CreditCard, Wallet, Settings } from "lucide-react"
import Image from "next/image"
import { AppImages } from "@/lib/config/app-images"

interface CompanyData {
  id: number
  name: string
  balance: string
  percentage: string
  avatars: string[]
  flag: string
}

const companies: CompanyData[] = [
  {
    id: 1,
    name: "Doow Holdings Inc.",
    balance: "N7,000,000.00",
    percentage: "-35%",
    avatars: [
      AppImages.profiles.lucas,
      AppImages.profiles.joseph,
      AppImages.profiles.lupita,
    ],
    flag: AppImages.flags.usa
  },
  {
    id: 2,
    name: "Doow LLC",
    balance: "N5,500,000.00",
    percentage: "-22%",
    avatars: [
        AppImages.profiles.lucas,
        AppImages.profiles.joseph,
        AppImages.profiles.lupita
    ],
    flag: AppImages.flags.nigeria
  },
  {
    id: 3,
    name: "Doow Holdings Inc.",
    balance: "N3,200,000.00",
    percentage: "-15%",
    avatars: [
        AppImages.profiles.lucas,
        AppImages.profiles.joseph,
    ],
    flag: AppImages.flags.china
  },
  {
    id: 4,
    name: "Doow Holdings Inc.",
    balance: "N9,800,000.00",
    percentage: "-42%",
    avatars: [
        AppImages.profiles.lucas,
      AppImages.profiles.joseph,
      AppImages.profiles.lupita
    ],
    flag: AppImages.flags.britain
  },
]

export function AccountsCard() {
  const [activeCompany, setActiveCompany] = useState<CompanyData>(companies[0])

  return (
    <Card className="w-full p-6 space-y-2">
        <div className="flex items-center ">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
            </div>
            <span className="text-muted-foreground">Choose Account</span>
        </div>
        <div className="flex justify-between gap-3">
             {/* left section */}
            <div className="flex-1 h-full w-[50%] py-3">
                {companies.map((company) => (
                <div
                    key={company.id}
                    className="flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-doow_card"
                    onMouseEnter={() => setActiveCompany(company)}
                >
                    <div className="w-8 h-6 mr-3">
                        <Image
                            src={company.flag}
                            alt="US Flag"
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <span className="text-body">{company.name}</span>
                </div>
                ))}
            </div>

            {/* center */}
            <div className="bg-doow_card w-[1.5px]"></div>

            {/* right section */}
            <div className="flex flex-col justify-between py-3 w-[50%]">
                {/* user avatars */}
                <div className="flex -space-x-2 w-fit ml-auto">
                    {activeCompany.avatars.map((avatar, index) => (
                        <div
                            key={index}
                            className="inline-block w-8 h-8 rounded-full border-2 border-white overflow-hidden duration-300 ease-in-out"
                        >
                            <Image
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* account details */}
                <div className="space-y-2">
                    <p className="text-sm text-doow_grey">BALANCE</p>
                    <div className="transition-all duration-300 ease-in-out transform">
                        <h2 className="text-2xl font-bold">{activeCompany.balance}</h2>
                        <p className="text-sm text-doow_grey"><span className="text-red-500">{activeCompany.percentage}</span> in the last 7 days</p>
                    </div>
                </div>

                {/* button group */}
                <div className="flex justify-between">
                    <div className="p-2 rounded-lg transition-colors duration-200">
                        <Send className="w-3 h-3" />
                    </div>
                    <div className="p-2 rounded-lg transition-colors duration-200">
                        <FileText className="w-3 h-3" />
                    </div>
                    <div className="p-2 rounded-lg transition-colors duration-200">
                        <CreditCard className="w-3 h-3" />
                    </div>
                    <div className="p-2 rounded-lg transition-colors duration-200">
                        <Wallet className="w-3 h-3" />
                    </div>
                    <div className="p-2 rounded-lg transition-colors duration-200">
                        <Settings className="w-3 h-3" />
                    </div>
                </div>
            </div>
        </div>
    </Card>
  )
}
