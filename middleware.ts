import { authConfig } from '@/auth.config'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { Session } from 'next-auth'
import { NextResponse } from 'next/server'

const authMiddleware: (
    req: NextApiRequest,
    res: NextApiResponse
) => Promise<Session | null> = NextAuth(authConfig).auth

const customMiddleware: (
    req: NextApiRequest,
    res: NextApiResponse
) => NextResponse = (req, res) => {
    console.log('>>>', 'Custom middleware, request URL:', req.url)
    return NextResponse.next()
}

// Middleware should have one default export or member called "middleware" exported normally.
const middleware: (
    req: NextApiRequest,
    res: NextApiResponse
) => Promise<Session | null> = (req, res) => {
    customMiddleware(req, res)
    return authMiddleware(req, res)
}

export default middleware

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
