import Link from 'next/link'

export default function Page() {
    return (
        <>
            <p className="m-2">
                Below is the link to page, where client component tries to
                import server side component.
            </p>
            <Link
                href="testing-area/client-importing-server"
                className="w-96 flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
                Go to example of client component trying to import SSR component
            </Link>
        </>
    )
}
