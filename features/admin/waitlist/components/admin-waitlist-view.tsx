import { getWaitlistEntries } from "@/shared/lib/waitlist-store"

export async function AdminWaitlistView() {
  const entries = await getWaitlistEntries()

  return (
    <div className="flex w-full max-w-5xl flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-premium-text">Waitlist</h1>
        <p className="text-sm text-premium-text-2">
          Responses collected from the marketing site waitlist API.
        </p>
      </header>

      <section className="rounded-2xl border border-premium-border bg-premium-surface p-4 shadow-premium-card">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-premium-text-3">
            Entries
          </h2>
          <span className="text-xs text-premium-text-3">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-premium-text-2">
            No responses yet. Once visitors join the waitlist, their details will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-premium-border bg-premium-surface-2">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-premium-border bg-premium-surface-2">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-premium-text-3">
                    Name
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-premium-text-3">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-premium-text-3">
                    Message
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wide text-premium-text-3">
                    Joined at
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries
                  .slice()
                  .reverse()
                  .map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-premium-border last:border-b-0 odd:bg-premium-surface-2/40"
                    >
                      <td className="px-4 py-3 text-sm text-premium-text">{entry.name}</td>
                      <td className="px-4 py-3 text-sm text-premium-text-2">{entry.email}</td>
                      <td className="max-w-xs px-4 py-3 text-sm text-premium-text-2">
                        {entry.message ? (
                          entry.message
                        ) : (
                          <span className="text-premium-text-3">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-premium-text-3">
                        {new Date(entry.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs text-premium-text-3">
        Access is limited to signed-in users. Use{" "}
        <code className="rounded bg-premium-surface-2 px-1 py-0.5 text-[11px]">
          AUTH_ADMIN_EMAILS
        </code>{" "}
        in production to restrict this view to specific Google accounts.
      </p>
    </div>
  )
}
