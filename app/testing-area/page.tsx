'use client'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { serverAction } from './serverAction'
import { useState } from 'react'

const fetchServerData = async () => {
    const response = await fetch('/api')
    return await response.json()
}

const queryClient = new QueryClient()

export default function Page() {
    return (
        <QueryClientProvider client={queryClient}>
            <TestAreaPage />
        </QueryClientProvider>
    )
}

function TestAreaPage() {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['data-route-handler'],
        queryFn: fetchServerData,
    })

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

            <h1 className="text-2xl font-bold m-2">Server actions</h1>
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

            <h1 className="text-2xl font-bold m-2">
                Server actions - defining endpoint
            </h1>
            <p className="m-2">
                By pressing the button we load data from endpoint, which is
                defined in this application. We can define endpoint by creating
                appropriate `route.ts` file with `GET` method (or similair for
                other HTTP methods).
            </p>
            <p className="m-2">
                Anyway, the same can be achieved with server actions presented
                in this example app in other places.
            </p>
            <div className="m-2">
                <Button onClick={() => refetch()}>Get data from server</Button>
            </div>
            {isLoading ? (
                <p className="m-2">Loading server data</p>
            ) : (
                <>
                    <div className="m-2 font-bold">Data from server:</div>
                    <div className="m-2 font-bold">
                        time at server is {data.currentServerTime}
                    </div>
                    <ol className="m-2">
                        {data.data.map((x: any) => (
                            <li key={x.id}>
                                {x.id} - {x.name}
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </>
    )
}
