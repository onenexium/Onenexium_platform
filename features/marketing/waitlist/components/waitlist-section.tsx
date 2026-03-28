"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"

const waitlistFormSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().max(1000).optional(),
})

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>

export const WaitlistSection = () => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (values: WaitlistFormValues) => {
    try {
      setStatus("submitting")
      setErrorMessage(null)

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        const message =
          data?.message ??
          "We couldn't add you to the waitlist. Please try again."
        throw new Error(message)
      }

      setStatus("success")
      form.reset()
    } catch (error) {
      console.error(error)
      setStatus("error")
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      )
    } finally {
      setStatus((prev) => (prev === "success" ? "success" : "idle"))
    }
  }

  return (
    <section id="waitlist" className="relative w-full py-[var(--section-py)]">
      <div className="section-container flex justify-center">
        <div className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-8 shadow-md">
          <div className="mb-8 space-y-2 text-center">
            <p className="section-kicker">Early access</p>
            <h2 className="text-h3 font-bold tracking-tight text-text-primary">
              Join the waitlist
            </h2>
            <p className="text-[length:var(--font-size-lead)] text-text-secondary leading-[var(--leading-relaxed)]">
              Be the first to know when we launch new AI features and get early access invites.
            </p>
          </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,2fr)] md:items-end"
        >
          <div className="grid gap-3 md:col-span-2 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex Doe" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-1 md:col-start-1 md:row-start-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you building?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Briefly describe your use case (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2 md:col-span-1 md:row-span-2 md:row-start-1 md:justify-self-end">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Joining..." : "Join waitlist"}
            </Button>

            {status === "success" && (
              <p className="text-xs text-success">
                You&apos;re on the list! We&apos;ll be in touch soon.
              </p>
            )}

            {status === "error" && errorMessage && (
              <p className="text-xs text-destructive">{errorMessage}</p>
            )}
          </div>
        </form>
      </Form>
        </div>
      </div>
    </section>
  )
}

