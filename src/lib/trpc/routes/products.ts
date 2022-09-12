import { prismaClient } from "$lib/db";
import { supabase } from "$lib/supaclient";
import { createRouter } from "$trpc/utils";
import { z } from "zod";
import { Buffer } from "buffer";

export default createRouter()
  .query("getAll", {
    async resolve() {
      const allProducts = await prismaClient.product.findMany({});
      return allProducts;
    },
  })
  .query("getImg", {
    input: z.object({
      path: z.string(),
    }),
    async resolve({ input }) {
      const [bucket, imgId] = input.path.split("/");
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(imgId);

      if (error) throw error;

      const encoded = (await data?.arrayBuffer()) as ArrayBuffer;
      return [
        Buffer.from(encoded).toString("base64"),
        data?.type,
        imgId,
      ];
    },
  })
  .query("getCategory", {
    input: z.object({
      category: z.string(),
    }),
    async resolve({ input }) {
      const productsInCategory = await prismaClient.product.findMany({
        where: {
          categories: {
            some: {
              name: input.category,
            },
          },
        },
      });
      return productsInCategory;
    },
  });
