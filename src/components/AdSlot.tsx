"use client";

import { AdPlaceholder } from "@/components/AdPlaceholder";

type AdSlotProps = {
  slotId?: string;
  className?: string;
  label?: string;
};

const adsenseClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT ?? "";
const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

export function AdSlot({ slotId = "", className = "", label }: AdSlotProps) {
  const shouldShowAd =
    process.env.NODE_ENV === "production" &&
    adsenseEnabled &&
    adsenseClient !== "" &&
    slotId !== "";

  if (!shouldShowAd) {
    return <AdPlaceholder label={label} className={className} />;
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={adsenseClient}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
