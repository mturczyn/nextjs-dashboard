## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Notes

### Chapter 13

In order to add global error handler in Next.js, we need to add `error.tsx` file.
It works similair to `layout.tsx`, it is applied to all sub-routes (so subdirectories).

#### Not Found 404

In order to handle not found error, `page.tsx` component should use `notFound` method from `next/navigation`, which sets correct HTTP code. Then, create `not-found.tsx` file, which will display not found page.

This takes precednce over `error.tsx` page.
