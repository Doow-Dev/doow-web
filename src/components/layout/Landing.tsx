import { ProductDemoSection } from "../custom/demo/ProductDemoSection";
import { HeroSection } from "../custom/hero/HeroSection";
import { IntegrationsSection } from "../custom/integrations/IntegrationsSection";
import { SassIntelligenceSection } from "../custom/sassIntelligence/SaasIntelligence";

export const Landing: React.FC = () => {
    return (
        <>
            <HeroSection/>
            <ProductDemoSection/>
            <SassIntelligenceSection/>
            <IntegrationsSection/>
        </>
    )
};