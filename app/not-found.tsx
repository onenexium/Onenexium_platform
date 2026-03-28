import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <h2 className="font-heading text-2xl font-bold">Not Found</h2>
            <p className="mt-2 text-muted-foreground">Could not find requested resource</p>
            <Link
                href="/"
                className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
            >
                Return Home
            </Link>
        </div>
    )
}
