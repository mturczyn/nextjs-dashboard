import { badDatabaseQuery } from '@/app/lib/actions'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export function GenerateServerSideError() {
    return (
        <form action={badDatabaseQuery}>
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span>Throw Error In Server Action</span>
                <ExclamationCircleIcon className="w-5" />
            </button>
        </form>
    )
}
