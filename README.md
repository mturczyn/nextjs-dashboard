# Next.js App Router Course

## Starter Template

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Notes

### Chapter 13 - Error Handling

In order to add global error handler in Next.js, we need to add `error.tsx` file.
It works similair to `layout.tsx`, it is applied to all sub-routes (so subdirectories).

#### Not Found 404

In order to handle not found error, `page.tsx` component should use `notFound` method from `next/navigation`, which sets correct HTTP code. Then, create `not-found.tsx` file, which will display not found page.

This takes precednce over `error.tsx` page.

### Chapter 14 - Accessibility

Next.js has built-in accessibility check, which can be performed by `next lint` command. By adding to `package.json`, we can then use it in CI/CD pipeline or in local development, etc.

### Chapter 15 - Authentication

In order to introduce authentication, we need to install `next-auth@beta` package that will handle authentication logic.

Next, we need `openssl` tool to generate auth secret - the command is `openssl rand -base64 32` - then paste it in `.env` file `AUTH_SECRET=your-secret-key`.

Then, in root, we need to add following files:

-   `auth.config.ts` - contains onfiguration options for NextAuth.js package (in our case, contains only `pages` option - it redirects unauthenticated user to that page),

Then, add Next.js middleware to protect routes from being accessed by unauthenticated user.

This is done by defining `callbacks` in `auth.config.ts` file and adding middleware in `middleware.ts` file in root directory (at the same level as app or pages or src folder).

Then we create forms in order to handle log in and log out actions, and create server actions to handle those. Most of implementation is in the NextAuth.js package, which exposes `auth`, `signIn` and `signOut` methods.

For password hashing `bcrypt` package is used.
