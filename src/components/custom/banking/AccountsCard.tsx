"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Send, FileText, CreditCard, Wallet, Settings, ChevronUp } from "lucide-react"
import Image from "next/image"
import { AppImages } from "@/lib/config/app-images"

interface CompanyData {
  id: number
  name: string
  alias: string
  balance: string
  percentage: string
  avatars: string[]
  flag: string
}

const companies: CompanyData[] = [
  {
    id: 1,
    name: "Doow Holdings Inc.",
    alias: "Q2 Budget",
    balance: "$7,000,000.00",
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
    alias: "Travel Budget",
    balance: "R$5,500,000.00",
    percentage: "-22%",
    avatars: [
        AppImages.profiles.lucas,
        AppImages.profiles.joseph,
        AppImages.profiles.lupita
    ],
    flag: AppImages.flags.brazil
  },
  {
    id: 3,
    name: "Doow Holdings Inc.",
    alias: "Finance Budget",
    balance: "¥3,200,000.00",
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
    alias: "Q4 Budget",
    balance: "£9,800,000.00",
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
    <Card className="w-full p-5 space-y-2">
        <div className="flex items-center ">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground border rounded-lg p-2 text-[12px]">
                Choose Account
                <ChevronUp className=" h-3 w-3" />
            </div>
        </div>
        <div className="flex justify-between gap-3">
             {/* left section */}
            <div className="flex-1 h-full w-[50%] py-3 px-2 ring-1 ring-gray-300 shadow-[0px_4px_10px_rgba(0,0,0,0.15)] rounded-2xl">
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
           

            {/* right section */}
            <div className="flex flex-col justify-between p-3 w-[50%] ring-1 ring-gray-300 shadow-[0px_4px_10px_rgba(0,0,0,0.15)] rounded-2xl">
                <div className="flex justify-between items-center">
                    {/* account alias */}
                    <p className="text-sm">{activeCompany.alias}</p>
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
                    <div className=" p-2 rounded-lg bg-gray-300 transition-colors duration-200">
                        <Send className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-gray-300 rounded-lg transition-colors duration-200">
                        <FileText className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-gray-300 rounded-lg transition-colors duration-200">
                        <CreditCard className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-gray-300 rounded-lg transition-colors duration-200">
                        <Wallet className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-gray-300 rounded-lg transition-colors duration-200">
                        <Settings className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    </Card>
  )
}
