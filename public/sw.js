/* OneNexium — caches hashed Next.js static chunks for faster repeat loads; APIs stay network-only. */
const CACHE = "onenexium-static-v1"

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (url.pathname.startsWith("/api/")) return

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(request)
        const networkRes = await fetch(request).catch(() => undefined)
        if (networkRes?.ok) {
          await cache.put(request, networkRes.clone())
          return networkRes
        }
        if (cached) return cached
        if (networkRes) return networkRes
        return Response.error()
      }),
    )
  }
})
