"use client";

import { useEffect, useRef } from "react";
import { AdPlaceholder } from "@/components/AdPlaceholder";

type AdSlotProps = {
  slotId?: string;
  className?: string;
  label?: string;
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
const adsenseEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";

export function AdSlot({ slotId, className = "", label }: AdSlotProps) {
  const initializedRef = useRef(false);
  const resolvedSlotId = slotId ?? "";
  const shouldShowAd =
    process.env.NODE_ENV === "production" &&
    adsenseEnabled &&
    adsenseClient !== "" &&
    resolvedSlotId !== "";

  useEffect(() => {
    if (!shouldShowAd || initializedRef.current) {
      return;
    }

    initializedRef.current = true;

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch (error) {
      initializedRef.current = false;

      if (process.env.NODE_ENV !== "production") {
        console.warn("AdSense slot initialization failed.", error);
      }
    }
  }, [shouldShowAd, resolvedSlotId]);

  if (!shouldShowAd) {
    return <AdPlaceholder label={label} className={className} />;
  }

  return (
    <div
      className={`flex flex-col rounded border border-zinc-800 bg-zinc-950/40 p-2 ${className}`}
      aria-label={"\u5e83\u544a"}
    >
      <p className="mb-2 text-center text-[10px] leading-none text-zinc-600">
        {"\u30b9\u30dd\u30f3\u30b5\u30fc\u30ea\u30f3\u30af"}
      </p>
      <ins
        className="adsbygoogle block min-h-0 flex-1"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={resolvedSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
