import type { MetadataRoute } from "next";
import { getSnacks } from "@/lib/data";

const siteUrl = "https://snack-museum.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const snacks = getSnacks();
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/leaderboard`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/random`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/test`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const snackPages: MetadataRoute.Sitemap = snacks.map((s) => ({
    url: `${siteUrl}/snack/${s.id}`,
    lastModified: new Date(s.date),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticPages, ...snackPages];
}
