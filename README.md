# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte). Bootstrapped with the following Technologies:

| Technology                   | Usage                         |
| ---------------------------- | ----------------------------- |
| [Supabase]                   | Database                      |
| [tRPC] with [tRPC-sveltekit] | Type-safe endpoints           |
| [Prisma]                     | Type-safe ORM                 |
| [Lucia]                      | Sveltekit Auth layer          |
| [DaisyUI]                    | Tailwindcss component Library |

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx degit adroyt/fullstack

# create a new project in my-app
npx degit adroyt/fullstack my-app
```

## Developing

Populate `.env.example` with Your [Supabase](https://supabse.com) URL and Secret token, as well as your database URL. Then rename `.env.example` to `.env`

Once you've created a project and installed dependencies with `yarn` (or `npm install` or `pnpm install`), start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

[supabase]: https://supabase.com
[prisma]: https://www.prisma.io
[trpc]: https://trpc.io
[trpc-sveltekit]: https://github.com/icflorescu/trpc-sveltekit
[lucia]: https://lucia-sveltekit.vercel.app
[daisyui]: https://daisyui.com/
