import { Buffer } from "buffer";
import { t } from "$trpc/app-router";
import { prismaClient } from "$lib/server/prisma";
import { supabase } from "$lib/server/supaclient";
import { z } from "zod";

export default t.router({
  all: t.procedure.query(async () => {
    return await prismaClient.product.findMany().catch(e => {
      console.log("line 10: ", e.message);
      return [];
    });
  }),

  img: t.procedure
    .input(
      z.object({
        imgPath: z.string()
      })
    )
    .query(async ({ input }) => {
      const [bucket, imgId] = input.imgPath.split("/");
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(imgId);

      if (error || !data) throw error; // if no data is returned, that means there's an error

      const encoded = (await data?.arrayBuffer()) as ArrayBuffer;
      return [
        Buffer.from(encoded).toString("base64"),
        data.type,
        imgId
      ];
    }),

  category: t.procedure
    .input(
      z.object({
        category: z.string()
      })
    )
    .query(async ({ input }) => {
      return await prismaClient.product
        .findMany({
          where: {
            categories: {
              some: {
                name: input.category
              }
            }
          }
        })
        .catch(e => {
          console.log("line 55:", e.message);
          return [];
        });
    })
});
