import { lusitana } from '../ui/fonts'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="bg-blue-300 p-2 mb-2">
                <h1
                    className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
                >
                    Testing Area
                </h1>
                <p className={`${lusitana.className} `}>
                    This is tesging area, meant to showcase some things :)
                </p>
            </div>
            {children}
        </>
    )
}
