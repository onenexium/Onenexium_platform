import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

/**
 * PWA manifest — `display: standalone`, dark-first theme_color per concept doc.
 * Regenerate icons: `npm run icons` (writes `public/icons/*.png`).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "OneNexium",
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#080C14",
    theme_color: "#080C14",
    categories: ["business", "productivity", "developer tools"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
