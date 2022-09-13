import { Buffer } from "buffer";
import { createRouter } from "$trpc/app-router";
import { prismaClient } from "$lib/db";
import { supabase } from "$lib/supaclient";
import { z } from "zod";

export default createRouter()
  .query("all", {
    async resolve() {
      return await prismaClient.product.findMany().catch(e => {
        console.log(e.message);
        return [];
      });
    }
  })
  .query("img", {
    input: z.object({
      imgPath: z.string()
    }),
    async resolve({ input }) {
      const [bucket, imgId] = input.imgPath.split("/");
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(imgId);

      if (error) throw error;

      const encoded = (await data?.arrayBuffer()) as ArrayBuffer;
      return [
        Buffer.from(encoded).toString("base64"),
        data?.type,
        imgId
      ];
    }
  })
  .query("category", {
    input: z.object({
      category: z.string()
    }),
    async resolve({ input }) {
      const productsInCategory = await prismaClient.product.findMany({
        where: {
          categories: {
            some: {
              name: input.category
            }
          }
        }
      });

      return productsInCategory;
    }
  });
