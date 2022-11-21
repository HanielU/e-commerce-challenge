// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    getSession: import("@lucia-auth/sveltekit").GetSession;
    getSessionUser: import("@lucia-auth/sveltekit").GetSessionUser;
    setSession: import("@lucia-auth/sveltekit").SetSession;
    clearSession: import("@lucia-auth/sveltekit").ClearSession;
  }
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

/// <reference types="lucia-auth" />
declare namespace Lucia {
  type Auth = import("$lib/server/lucia").Auth;
  type UserAttributes = Omit<
    import("@prisma/client").User,
    "id" | "provider_id" | "hashed_password"
  >;
}
