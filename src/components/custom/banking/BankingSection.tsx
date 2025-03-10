import { ProductTile } from "@/components/common/ProductTile";
import { AccountsCard } from "./AccountsCard";
import { AppImages } from "@/lib/config/app-images";
import Image from "next/image";

export const BankingSection = () => {
  return (
    <section className="relative section-spacing bg-white">
      <div className="container">
        {/* Section Title */}
        <div className="text-center mb-8 max-w-xl md:max-w-2xl mx-auto">
          <h2 className="text-sub-heading text-balance text-doow_zinc">
            You can do even more with your money!
          </h2>
        </div>
        {/* tiles */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* tile 1 */}
          <ProductTile
            title="Multi-currency corporate accounts in USD, EUR, & GBP"
            subtitle="Own local and foreign bank accounts in the US, UK, Europe, Kenya, and Nigeria without having to visit a bank in these countries. You can create unlimited sub-accounts and assign the right permissions to your team."
          >
            <AccountsCard />
          </ProductTile>
          {/* tile 2 */}
          <ProductTile
            title="Pay any vendor or business, globally"
            subtitle="Settle all your vendor contracts and payments (same-day) with zero manual work. You can send money to local accounts and wallets in USD, NGN, EUR, KES, GBP, and 140 more currencies to come."
          >
            <div className="flex-1 relative w-full overflow-hidden rounded-lg" style={{ minHeight: "300px" }}>
              <Image
                src={AppImages.demos.sendmoney}
                alt="Tile 2"
                width={500}
                height={192}
                className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </ProductTile>
          {/* tile 3 */}
          <ProductTile
            title="Customizable corporate & employee debit cards"
            subtitle="Issue employee debit cards and tailor permissions to each team member. You can lock cards to specific merchants and set company-wide or department-specific spend policies in minutes."
          >
            <div className="flex-1 relative w-full overflow-hidden rounded-lg" style={{ minHeight: "300px" }}>
              <Image
                src={AppImages.demos.bankingcards}
                alt="corporate debit cards with built-in control"
                width={500}
                height={192}
                className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </ProductTile>
          {/* tile 4 */}
          <ProductTile
            title="Centralized budgets & policies"
            subtitle="With Doow, every spend can be managed from a budget! You can create parent budgets for teams and vendors, and also create nested sub-budgets for one-time spendings like projects and trips."
          >
            <div className="flex-1 relative w-full overflow-hidden rounded-lg" style={{ minHeight: "300px" }}>
              <Image
                src={AppImages.demos.budgeting}
                alt="centralized budgets"
                width={500}
                height={192}
                className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          </ProductTile>
        </div>
      </div>
    </section>
  );
};