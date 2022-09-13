import { prismaClient } from "$lib/db";
import { createRouter } from "$trpc/app-router";
import { z } from "zod";

export default createRouter().query("count", {
  input: z.object({
    email: z.string().email()
  }),
  async resolve({ input }) {
    const user = await prismaClient.user.findUnique({
      where: { email: input.email }
    });

    // count the number of products where the s
    const itemsInCart = await prismaClient.product.count({
      where: {
        inCartOf: {
          every: {
            id: user?.id
          }
        }
      }
    });
    return itemsInCart;
  }
});
