import cart from "./routes/shoppingcart";
import products from "./routes/products";
import { t } from "./app-router";

export const appRouter = t.router({ cart, products });

export type AppRouter = typeof appRouter;
