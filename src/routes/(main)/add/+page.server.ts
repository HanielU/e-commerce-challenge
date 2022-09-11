import { prismaClient } from "$lib/db";
import { supabase } from "$lib/supaclient";
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const [name, price, qty, description, image] = [
      "p-name",
      "p-price",
      "p-qty",
      "p-info",
      "image"
    ].map(v => form.get(v)) as [string, string, string, string, File];

    console.log({ image, name });

    try {
      const { data, error: supaError } = await supabase.storage
        .from("products")
        .upload(`${crypto.randomUUID()}`, await image.arrayBuffer(), {
          cacheControl: "3600",
          upsert: false,
          contentType: image.type
        });

      if (supaError) throw supaError;
      if (!data) return;

      await prismaClient.product.create({
        data: {
          name,
          price: +price,
          quantity: +qty,
          description,
          imgPath: data.Key,
          createdBy: {
            connect: {
              email: form.get("email") as string
            }
          }
        }
      });
    } catch (e) {
      throw error(500, (<Error>e).message);
    }

    throw redirect(301, "/");
  }
};
