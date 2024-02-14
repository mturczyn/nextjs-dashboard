'use client'

// import SimpleServerSideComponent from '@/app/ui/custom-learning/SimpleServerSideComponent'
import { useState } from 'react'

export default function Page() {
    const [counter, setCounter] = useState(0)
    return (
        <>
            <button
                className="rounded-md border p-2 hover:bg-gray-100 bg-gray-300"
                onClick={() => setCounter(counter + 1)}
            >
                Increase counter {counter}
            </button>
            <p>
                This page should never display due to importing server side
                component marked with <code>import server-only</code> directive
                and trying to display it below:
            </p>
            {/* <SimpleServerSideComponent /> */}
            <p>
                It turns out, that it fails during build time, and so it is
                commented out, this is left out for learning puprposes.
            </p>
        </>
    )
}
