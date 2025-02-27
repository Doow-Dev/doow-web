import { BankingSection } from "../custom/banking/BankingSection";
import { ProductDemoSection } from "../custom/demo/ProductDemoSection";
import { FAQSection } from "../custom/faq/FAQSection";
import { HeroSection } from "../custom/hero/HeroSection";
import { IntegrationsSection } from "../custom/integrations/IntegrationsSection";
import { SassIntelligenceSection } from "../custom/sassIntelligence/SaasIntelligence";

export const Landing: React.FC = () => {
    return (
        <>
            <HeroSection/>
            <ProductDemoSection/>
            <IntegrationsSection/>
            <SassIntelligenceSection/>
            <BankingSection/>
            <FAQSection/>
        </>
    )
};