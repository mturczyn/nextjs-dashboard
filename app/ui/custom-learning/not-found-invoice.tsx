import Link from 'next/link'

export default function LinkToNotExistingInvoice() {
    // Some randomly generated GUID.
    const uuid = '96063a56-019c-4e12-a7c7-041b00d39b81'

    return (
        <Link
            href={`/dashboard/invoices/${uuid}/edit`}
            className="rounded-md border p-2 hover:bg-gray-100"
        >
            Go To Not Existing Invoice
        </Link>
    )
}
