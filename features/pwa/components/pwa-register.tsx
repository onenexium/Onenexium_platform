"use client"

import * as React from "react"

export function PwaRegister() {
  React.useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch(() => {
        /* Non-fatal if SW fails (e.g. HTTP on local dev without HTTPS in some setups) */
      })
  }, [])

  return null
}
