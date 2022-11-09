import { prismaClient } from "$lib/server/prisma";
import { t } from "$trpc/app-router";
import { z } from "zod";

export default t.router({
  count: t.procedure
    .input(
      z.object({
        email: z.string().email()
      })
    )
    .query(async ({ input }) => {
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
    })
});
