import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mikire-checker.vercel.app/",
      lastModified: new Date("2026-06-06"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://mikire-checker.vercel.app/about",
      lastModified: new Date("2026-06-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mikire-checker.vercel.app/how-to-use",
      lastModified: new Date("2026-06-06"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://mikire-checker.vercel.app/privacy",
      lastModified: new Date("2026-06-06"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
