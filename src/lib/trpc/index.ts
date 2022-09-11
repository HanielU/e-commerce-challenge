import cart from "./routes/shoppingcart";
import products from "./routes/products";
import { createRouter } from "./utils";

export const appRouter = createRouter()
  .merge("cart.", cart)
  .merge("products.", products);

export type AppRouter = typeof appRouter;
