# Next.js App Router Course

## Starter Template

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Notes

### Chapter 1 - Getting Started

To create Next.js application, use command line tool: [create-next-app](https://nextjs.org/docs/app/api-reference/create-next-app):
```
npx create-next-app@latest
```
Small overview of codebase structure:
- `app` - contains all routes, components, and logic for the application,
- `app\lib` - contains functions used in the application, such as reusable utility functions and data fetching functions,
- `app\ui` - contains all UI components for the application, such as cards, tables, forms,
- `public` - contains all the static assets for the applications, such as images
- `scripts` - contains a seeding script that will be used to populate the database at later course stage,
- config files - for example `next.config.js` - most of such files are created and pre-configured when new project is started with `create-next-app`,

### Chapter 2 - CSS Styling

Tailwind is used in this project, together with CSS modules, to scope styles to particular components. We will be using also `clsx` utility function to combine conditionally CSS classes.

Other solutions to styling are:
- SASS - allowing  `.css` and `.scss` files,
- CSS-in-JS, such as `styled-jsx`, `styled-components` or `emotion`.

### Chapter 3 - Optimizing Fonts and Images

Next.js, when used with `next/font` module, will download all font files at build time and will host those font files with other static assets.

In order to serve optimized images we can use `Image` component from `next/image` library.

### Chapter 4 - Creating Layouts and Pages + Routing

Routing in Next.js is based on file-system: each route corresponds to some file, nested routes are achieved by creating nested directories.

For each route we define its appearance by defining `page.tsx` and `layout.tsx` files inside a directory, representing the route (so for example, route `/dashboard` will correspond to file `app/dashboard/page.tsx`).

Only `page.tsx` is publicly routable, so Next.js allows colocation - having other files (such as unit tests) alongside with `page.tsx` component - it will not be possible to access the unit tests file (only special files are accessible, such as `page.tsx` or `routes.tsx`).

`layout.tsx` file is also special file - it defines shared layout for a page, that can be reused over pages. It must accept special `children` prop in order to render the page. This layout becomes the default layout for other subroutes. For example 
root layout (`layout.tsx` file in `app` directory) applies to all pages within the application.

### Chapter 5 - Navigating Between Pages

When using `a` elements, it causes full page reload (as the page is server-side-rendered). In order to enhance that, we can use `Link` component instead, which uses client-side navigation.

Next.js automatically splits code and prefetches necessary components (when `Link` component appears in the viewport, then linked page is prefetched).

### Chapter 6 - Setting Up Your Database

One of ways of hosting Next.js web page and making it accessible through internet (making it public) is to deploy it to Vercel. Simply create an account, connect github repository and configure infrastructure (default is good enough for test purpose).

In Vercel, select `Connect Store → Create New → Postgres → Continue`, in order to create Postgres database. Connection string should be stored in `.env` file.

In order to easify connecting to database, install Vercel Postgres SDK `npm i @vercel/postgres`.

Finally use `scripts/seed.js` file to seed database: `node -r dotenv/config ./scripts/seed.js` (refer to `package.json` file, `scripts` section).

### Chapter 7 - Fetching Data

Popular ORM for `node` is `Prisma` library.

Server components run on the server, so database connection can be established (we have access to connection string).
As consequence, API layer could be skipped in such project.

In addition, server components support pormises (`async` and `await`), so we can perform database queries and await them.

The Vercel SDK provides protection against SQL injection.

### Chapter 8 - Static and Dynamic Rendering

With static rendering the page is built once during built process - then it can be cached and distributed over CDN.

On the opposite, there's dynamic rendering - it means that content is rendered on the server on each request.

In order to make components and actions dynamic in Next.js, we need to `import { unstable_noStore as noStore } from 'next/cache'`
and use `noStore()` to prevent the response from being cached.

### Chapter 9 - Streaming

There are two ways to implement streaming:
- at the page level, with the `loading.tsx` file,
- for specific components, with `Suspense` component.

`loading.tsx` file will be applied to all subdirectories (so subroutes). In order
to prevent that, we can use [Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups), which are directories wrapped in `()`, not accessible through URL (`/(group)` would not be reachable if we had `(group)` direcotry). In such route group `loading.tsx` file can be placed to limit it to page in its location and nout subroutes.

For specific components, we will perform async action in them (they will be server side components), and wrap them in `Suspense` with appropriate component in `fallback` property to show as loading state.

### Chapter 10 - Partial Prerendering (Optional)

Currently, if you call a [dynamic function](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#dynamic-functions) inside your route (e.g. `noStore()`, `cookies()`, etc.), your entire route becomes dynamic.

Next.js has Partial Prerendering in order to provide static loading shell, while keeping some parts dynamic:
- a static route shell is served, ensuring a fast initial load,
- the shell leaves holes where dynamic content will load in asynchronous,
- the async holes are streamed in parallel, reducing te overall load time of the page.

### Chapter 11 - Adding Search and Pagination

Good practice is to keep search params in URL due to following advantages:
- bookmarkable and shareable,
- server-side rendering and initial load,
- analytics and tracking -it's eaasier to track user behaviour without requiring additional client-side logic.

In order to use that technique, we need `useSearchParams` hook,
to get params from query string. And as utility class we will use `URLParams` class,
which allows for easy manipulation of query string params.

`usePathname` will give us current locaiton, with which we can combine our query strings from `URLParams` and uest Next.js `replace` routing function to navigate to desired page.

Generating HTTP request on every user's keystroke is inefficient - we need to introduce debouncing. In Next.js we can use `use-debounce` library: `npm i use-debounce` and hook defined there: `useDebouncedCallback`.

Pagination is also stored in URL params (current page) and updated accordingly. Number of pages is calcualted with database query.

### Chapter 12 - Mutating Data

In order to add global error handler in Next.js, we need to add `error.tsx` file.
It works similair to `layout.tsx`, it is applied to all sub-routes (so subdirectories).

#### Chapter 13 - Handling Errors (Not Found 404 and other)

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

### Chapter 16 - Metadata

Metada is included in `meta` elements. Most popular are:

- Title Metadata: Responsible for the title of a webpage that is displayed on the browser tab. It's crucial for SEO as it helps search engines understand what the webpage is about.
```
<title>Page Title</title>
```
- Description Metadata: This metadata provides a brief overview of the webpage content and is often displayed in search engine results.
```
<meta name="description" content="A brief description of the page content." />
```
- Keyword Metadata: This metadata includes the keywords related to the webpage content, helping search engines index the page.
```
<meta name="keywords" content="keyword1, keyword2, keyword3" />
```
- Open Graph Metadata: This metadata enhances the way a webpage is represented when shared on social media platforms, providing information such as the title, description, and preview image.
```
<meta property="og:title" content="Title Here" />
<meta property="og:description" content="Description Here" />
<meta property="og:image" content="image_url_here" />
```
- Favicon Metadata: This metadata links the favicon (a small icon) to the webpage, displayed in the browser's address bar or tab.
```
<link rel="icon" href="path/to/favicon.ico" />
```
In Next.js we can add meta-data in two ways:
- config-based - export a `static metadata` object or a dynamic `generateMetadata` function in `layout.js` or `page.js`
- file-based - special files like `favicon.ico` are automatically included in metadata.

#### file-based
Just move files like `favicon.ico` or `opengraph-image.png` tp `app` directory and all meta information will be autogenerated (`meta` elements for open graph, etc.).

#### config-based

Just declare something along these lines in `page.tsx` or `layout.tsx` (see `app\layout.tsx` or `app\dashboard\invoices\page.tsx` for reference):
```
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```
We can also use title template instead of just title to provide template for other pages, such as:
```
title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
},
```
Other pages then need to only define, for example `Invoices` to get title of `Invoices | Acme Dashboard`.

# Other notes

## Middleware

As mentioned in the Next.js course, when defining middleware, we need to keep in mind following:

Middleware will be invoked for every route in your project. The following is the execution order:
1. `headers` from `next.config.js`
2. `redirects` from `next.config.js`
3. Middleware (`rewrites`, `redirects`, etc.)
4. `beforeFiles` (`rewrites`) from `next.config.js`
5. Filesystem routes (`public/`, `_next/static/`, `pages/`, `app/`, etc.)
6. `afterFiles` (`rewrites`) from `next.config.js`
7. Dynamic Routes (`/blog/[slug]`)
8. `fallback` (`rewrites`) from `next.config.js`

For example of custom middleware, `middleware.ts` file can be inspected.

Also, in `next.config.js` file we defined custom `headers`, which add headers to HTTP responses.

At the end of the middleware we need to call `NextResponse.next()` method to invoke further middleware. Generally [`NextResponse`](https://nextjs.org/docs/app/building-your-application/routing/middleware#nextresponse) provides useful API for redirects, rewrites, etc.

## Edge and nodejs runtimes

Next.js application can run on either nodejs or Edge runtime. 

When hosting on Vercel (to check on different cloud providers), we can `export` `runtime` variable from either a page or layout, to decide on which platform code generating the page will be run. Example:
```
export const runtime = 'edge'
```
or 
```
export const runtime = 'nodejs'
```
The default value (when not specified) is `nodejs`.

When the variable is exported from layout file, it applies to all subroutes.