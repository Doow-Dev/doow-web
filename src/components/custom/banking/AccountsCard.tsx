"use client"
import { useState } from "react"
import { Send, FileText, CreditCard, Wallet, Settings } from "lucide-react"
import Image from "next/image"
import { AppImages } from "@/lib/config/app-images"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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
    balance: "R$5.500.000,00",
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
  {
    id: 5,
    name: "Doow LLC.",
    alias: "Q2 Budget",
    balance: "AUD 6,800,000.00",
    percentage: "-22%",
    avatars: [
        AppImages.profiles.mathias,
      AppImages.profiles.ayo,
      AppImages.profiles.lupita
    ],
    flag: AppImages.flags.australia
  }
]


export function AccountsCard() {
    const [activeCompany, setActiveCompany] = useState<CompanyData>(companies[0])
  
    return (
      <Card className="w-full h-full p-3 md:px-5 flex bg-white/80 rounded-lg">
        {/* Left section */}
        <div className="flex flex-col justify-center w-1/2 min-w-[90px]  py-2 px-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className={cn(
                "flex items-center p-2 sm:p-3 rounded-lg transition-colors duration-200 hover:bg-doow_card",
                activeCompany.id === company.id ? "bg-doow_card" : ""
              )}
              onMouseEnter={() => setActiveCompany(company)}
            >
              <div className="min-w-fit">
                <Image
                  src={company.flag}
                  alt="Flag"
                  width={48}
                  height={48}
                  className="w-6 h-4 sm:w-8 sm:h-6 lg:h-6 lg:w-9  object-cover rounded"
                />
              </div>
              <span className="text-[7px] sm:text-body md:text-xs lg:text-body ml-2 sm:ml-3">{company.name}</span>
            </div>
          ))}
        </div>
  
        {/* Divider */}
        <div className="flex-1 min-h-full w-[2px] border-l-2 bg-doow_card mx-2"></div>
  
        {/* Right section */}
        <div className="flex flex-col justify-between w-1/2 space-y-1 py-3 px-3 sm:py-3">
          <div className="flex justify-between items-center text-[8px] md:text-sm lg:text-sm ">
            <p>{activeCompany.alias}</p>
            <div className="flex -space-x-2">
              {activeCompany.avatars.map((avatar, index) => (
                <div
                key={index}
                className="min-w-fit rounded-full border-2 border-white overflow-hidden duration-300 ease-in-out"
                >
                  <Image
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    width={500}
                    height={500}
                    layout="intrisic"
                    quality={80}
                    className="w-5 h-5 sm:w-7 sm:h-7 rounded-full object-cover border border-white"
                  />
            </div>
              ))}
            </div>
          </div>
  
          {/* Balance */}
          <div >
            <p className="text-[9px] sm:text-[12px] md:text-sm text-doow_grey">BALANCE</p>
            <div className="transition-all duration-300 ease-in-out transform">
              <h2 className="text-sm sm:text-sm lg:text-2xl font-bold mt-2">{activeCompany.balance}</h2>
              <p className="text-[6px] md:text-[9px] lg:text-sm text-doow_grey">
                <span className="text-red-500">{activeCompany.percentage}</span> in the last 7 days
              </p>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex justify-between gap-1 w-full">
            {[Send, FileText, CreditCard, Wallet, Settings].map((Icon, index) => (
              <div key={index} className="p-1 sm:p-2 bg-muted rounded-sm sm:rounded-lg">
                <Icon className="w-2 h-2 sm:w-4 sm:h-4" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }
