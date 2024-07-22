import Link from 'next/link'
import { Button } from '../ui/button'

export default function Page() {
    const serverAction = async () => {
        'use server'
        console.log(
            'This log should be visible on server side. During local debugging, should be visible in Visual Studio Code, or other tool used to run the applicaitn.'
        )
    }

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
            <p className="m-2">
                Below is small test how to invoke server actoin through
                submitting form, as form accepts now server action in{' '}
                <code>action</code> attribute.
            </p>
            <p className="m-2">
                Clicking button will log message to console. By using server
                action log will be visible on server side, not in browser.
            </p>
            <form action={serverAction}>
                <Button type="submit" className="m-2">
                    Call server action
                </Button>
            </form>
        </>
    )
}
