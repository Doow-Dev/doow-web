import { ProductTile } from "@/components/common/ProductTile";
import { AccountsCard } from "./AccountsCard";
import { AppImages } from "@/lib/config/app-images";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { ResponsiveImage } from "@/components/ui/responsive-image";

export const BankingSection = () => {
  return (
    <section className="relative bg-white">
      <MaxWidthWrapper className="section-spacing">
        {/* Section Title */}
        <div className="text-center mb-8 max-w-xl md:max-w-2xl mx-auto">
          <h2 className="text-sub-heading text-balance text-doow_zinc">
            You can do even more with your money!
          </h2>
        </div>
        {/* tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="relative rounded-lg overflow-hidden h-[200px] sm:h-[400px] md:h-[300px]">
              <ResponsiveImage
                sources={[
                  {
                    src: AppImages.demos.sendmoney,
                    width: 1695,
                    height: 1330,
                    media: "(max-width: 640px)",
                  },
                  {
                    src: AppImages.demos.sendmoney,
                    width: 1695,
                    height: 1330,
                    media: "(min-width: 641px) and (max-width: 1024px)",
                  },
                ]}
                fallbackSrc={AppImages.demos.sendmoney}
                fallbackWidth={1695}
                fallbackHeight={1330}
                alt="Send money globally"
                className="w-full h-full object-cover object-center sm:object-top inset-0 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </ProductTile>
          {/* tile 3 */}
          <ProductTile
            title="Customizable corporate & employee debit cards"
            subtitle="Issue employee debit cards and tailor permissions to each team member. You can lock cards to specific merchants and set company-wide or department-specific spend policies in minutes."
          >
            <div className="relative rounded-lg overflow-hidden h-[200px] sm:h-[300px] md:h-[300px]" >
              <ResponsiveImage
                sources={[
                  {
                    src: AppImages.demos.bankingCardsMobile,
                    width: 1695,
                    height: 1330,
                    media: "(max-width: 640px)",
                  },
                  {
                    src: AppImages.demos.bankingcards,
                    width: 1695,
                    height: 1330,
                    media: "(min-width: 641px) and (max-width: 1024px)",
                  },
                ]}
                fallbackSrc={AppImages.demos.bankingcards}
                fallbackWidth={1695}
                fallbackHeight={1330}
                alt="corporate debit cards with built-in control"
                className="w-full h-full object-cover object-center sm:object-top inset-0 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </ProductTile>
          {/* tile 4 */}
          <ProductTile
            title="Centralized budgets & policies"
            subtitle="With Doow, every spend can be managed from a budget! You can create parent budgets for teams and vendors, and also create nested sub-budgets for one-time spendings like projects and trips."
          >
            <div className="relative rounded-lg overflow-hidden h-[200px] sm:h-[800px] md:h-[300px]" >
              <ResponsiveImage
                sources={[
                  {
                    src: AppImages.demos.budgeting,
                    width: 1695,
                    height: 1330,
                    media: "(max-width: 640px)",
                  },
                  {
                    src: AppImages.demos.budgeting,
                    width: 1695,
                    height: 1330,
                    media: "(min-width: 641px) and (max-width: 1024px)",
                  },
                ]}
                fallbackSrc={AppImages.demos.budgeting}
                fallbackWidth={1695}
                fallbackHeight={1330}
                alt="centralized budgets"
                className="w-full h-full object-cover object-center sm:object-top inset-0 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </ProductTile>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};