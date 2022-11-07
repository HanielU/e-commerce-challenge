import { auth } from "$lib/lucia.server";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = auth.handleServerSession();
