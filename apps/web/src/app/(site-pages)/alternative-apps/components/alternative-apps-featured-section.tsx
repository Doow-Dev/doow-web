import { createElement, type CSSProperties } from "react";
import Image from "next/image";

import { alternativeAppsPageContent } from "@/app/(site-pages)/alternative-apps/content";
import {
  getIntegrationAppGraphic,
  type IntegrationAppGraphicSource,
} from "@/components/custom/icons/integration-app-icon-registry";
import { CatalogProviderCard, QueryErrorMessage } from "@/components/layout/shared";
import { Container } from "@/components/system";
import { getAlternativeAppsCatalogResponse } from "@/lib/server/alternative-apps-service";
import type {
  AlternativeAppsCatalogItem,
  AlternativeAppsCatalogLogoPreview,
} from "@/lib/site/alternative-apps-catalog";

const featuredApplicationsTake = 20;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0]?.[0] ?? ""}${words[1]?.[0] ?? ""}`.toUpperCase();
}

function getPrimaryCategoryLabel(categoryLabel: string) {
  return categoryLabel.split(",")[0]?.trim() || categoryLabel;
}

function AppGraphic({
  className,
  graphic,
  imageClassName,
  logoUrl,
  name,
}: {
  className?: string;
  graphic: IntegrationAppGraphicSource | null;
  imageClassName?: string;
  logoUrl?: string;
  name: string;
}) {
  if (logoUrl) {
    // Endpoint logos are arbitrary remote URLs; this keeps the server-rendered card independent of image allowlists.
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" aria-hidden="true" className={imageClassName ?? className} height={24} src={logoUrl} width={24} />;
  }

  if (graphic?.kind === "component") {
    return createElement(graphic.component, {
      "aria-hidden": true,
      className,
      focusable: "false",
    });
  }

  if (graphic?.kind === "asset") {
    return <Image alt="" aria-hidden="true" className={imageClassName ?? className} height={24} src={graphic.src} width={24} />;
  }

  return (
    <span aria-hidden="true" className="alternative-apps-featured-card__logo-fallback">
      {getInitials(name)}
    </span>
  );
}

function AlternativePreviewLogo({ index, preview }: { index: number; preview: AlternativeAppsCatalogLogoPreview }) {
  const graphic = getIntegrationAppGraphic(...preview.logoHints, preview.name);

  return (
    <span
      aria-hidden="true"
      className="alternative-apps-featured-card__preview-logo"
      style={{ "--alternative-apps-featured-preview-index": index } as CSSProperties}
      title={preview.name}
    >
      <AppGraphic
        className="alternative-apps-featured-card__preview-logo-svg"
        graphic={graphic}
        imageClassName="alternative-apps-featured-card__preview-logo-image"
        logoUrl={preview.logoUrl}
        name={preview.name}
      />
    </span>
  );
}

function FeaturedApplicationCard({ item }: { item: AlternativeAppsCatalogItem }) {
  const categoryLabel = getPrimaryCategoryLabel(item.categoryLabel);
  const graphic = getIntegrationAppGraphic(...item.logoHints, item.name);
  const previews = (item.alternativePreviewLogos ?? []).slice(0, 3);

  return (
    <CatalogProviderCard
      ariaLabel={`${item.name}, ${categoryLabel}, ${item.alternativeCount}+ alternatives`}
      footer={
        <span className="alternative-apps-featured-card__alternatives">
          {previews.length ? (
            <span
              aria-hidden="true"
              className="alternative-apps-featured-card__preview-stack"
              style={{ "--alternative-apps-featured-preview-count": previews.length } as CSSProperties}
            >
              {previews.map((preview, index) => (
                <AlternativePreviewLogo index={index} key={`${item.id}-${preview.id}-${index}`} preview={preview} />
              ))}
            </span>
          ) : null}
          {item.alternativeCount > 0 ? (
            <span className="alternative-apps-featured-card__alternative-count">+{item.alternativeCount}</span>
          ) : null}
        </span>
      }
      footerDivider
      footerLabel="Alternatives:"
      href={item.href}
      logo={
        <span aria-label={`${item.name} logo`} className="alternative-apps-featured-card__logo" role="img">
          <AppGraphic
            className="alternative-apps-featured-card__logo-svg"
            graphic={graphic}
            imageClassName="alternative-apps-featured-card__logo-image"
            logoUrl={item.logoUrl}
            name={item.name}
          />
        </span>
      }
      meta={<span className="alternative-apps-featured-card__category">{categoryLabel}</span>}
      namespace="alternative-apps-featured"
      title={item.name}
      titleAs="span"
    />
  );
}

export async function AlternativeAppsFeaturedSection() {
  const { featured } = alternativeAppsPageContent;
  let featuredData = null;

  try {
    featuredData = await getAlternativeAppsCatalogResponse({
      featured: true,
      take: featuredApplicationsTake,
    });
  } catch (error) {
    console.error("Alternative apps featured catalog failed to load initial data.", error);
  }

  if (featuredData && !featuredData.items.length) {
    return null;
  }

  return (
    <section aria-labelledby={`${featured.id}-heading`} className="alternative-apps-featured" id={featured.id}>
      <Container className="alternative-apps-featured__shell" variant="siteFooterPromo">
        <div className="alternative-apps-featured__content">
          <h2 className="alternative-apps-featured__title" id={`${featured.id}-heading`}>
            {featured.title}
          </h2>

          {featuredData ? (
            <div className="alternative-apps-featured__grid">
              {featuredData.items.map((item) => (
                <FeaturedApplicationCard item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <QueryErrorMessage
              message="We could not load featured applications right now. Please try again later."
              title="Featured applications unavailable"
            />
          )}
        </div>
      </Container>
    </section>
  );
}
