import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search'
import Table from '@/app/ui/invoices/table'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import { lusitana } from '@/app/ui/fonts'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'
import {
    ErrorButton,
    ErrorButtonWithErrorInCallback,
} from '@/app/ui/custom-learning/error-button'
import LinkToNotExistingInvoice from '@/app/ui/custom-learning/not-found-invoice'
import { GenerateServerSideError } from '@/app/ui/custom-learning/server-side-error'
import { Metadata } from 'next'
import { fetchInvoicesPages } from '@/app/lib/data'

export const metadata: Metadata = {
    title: 'Invoices',
}

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1
    const totalPages = await fetchInvoicesPages(query)

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="border-2 border-red-700 p-2 bg-red-100">
                <h2 className={`${lusitana.className} text-xl mt-4`}>
                    Danger Zone - Error Handling
                </h2>
                <p className={`${lusitana.className} mt-4`}>
                    Below are buttons for generating various errors to test
                    error handling in Next.js.
                </p>
                <div className="mt-2 flex items-center gap-2 md:mt-4">
                    <ErrorButton />
                    <ErrorButtonWithErrorInCallback />
                    <LinkToNotExistingInvoice />
                    <GenerateServerSideError />
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense
                key={query + currentPage}
                fallback={<InvoicesTableSkeleton />}
            >
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    )
}
