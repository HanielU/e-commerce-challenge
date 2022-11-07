// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    getSession: import("lucia-sveltekit/types").GetSession;
    setSession: import("lucia-sveltekit/types").SetSession;
    clearSession: import("lucia-sveltekit/types").ClearSession;
  }
  // interface PageData {}
  // interface Platform {}
}

/// <reference types="lucia-sveltekit" />
declare namespace Lucia {
  type UserData = Omit<
    import("@prisma/client").User,
    "id" | "identifier_token" | "hashed_password"
  >;
  type Auth = import("$lib/lucia.server").Auth;
  type UserAttributes = {};
}
