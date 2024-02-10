'use client'

import { useCallback, useEffect, useState } from 'react'

export function ErrorButton() {
    const [throwErr, setThrowErr] = useState(false)

    useEffect(() => {
        if (throwErr) {
            throw new Error('User Generated Error')
        }
    }, [throwErr])

    return (
        <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={() => setThrowErr(true)}
        >
            Throw Error (in render)
        </button>
    )
}

export function ErrorButtonWithErrorInCallback() {
    const throwError = useCallback(() => {
        throw new Error('User Generated Error')
    }, [])

    return (
        <button
            className="rounded-md border p-2 hover:bg-gray-100"
            onClick={throwError}
        >
            Throw Error (in callback)
        </button>
    )
}
