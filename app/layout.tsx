import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: "%s | Michal Turczyn's Next.js tutorial",
        default: "Michal Turczyn's Next.js tutorial",
    },
    description:
        'The official Next.js Course Dashboard, built with App Router. And some custom text :)',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    )
}
