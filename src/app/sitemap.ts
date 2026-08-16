import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://steward.co.uk";

  const routes = [
    "",
    "/advisors",
    "/how-it-works",
    "/features",
    "/pricing",
    "/about",
    "/signup",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/advisors" || route === "/features" ? 0.9 : 0.7,
  }));
}
