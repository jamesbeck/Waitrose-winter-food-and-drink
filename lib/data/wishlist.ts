"use server";

import type { Product } from "knex/types/tables";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "../knex";
import type { ProductWithWishlisted } from "./products";
import { getCurrentUser } from "./user";

type Params = {
  offset?: number;
  search?: string;
};

export const getWishlist = async ({
  offset = 0,
  search,
}: Params): Promise<{ count: number; items: ProductWithWishlisted[] }> => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/log-in");
  }

  const baseQuery = db
    .from("wishlist")
    .where("wishlist.user_id", user.id)
    .leftJoin(
      "products",
      "products.line_number",
      "=",
      "wishlist.product_line_number"
    );

  if (search) {
    baseQuery.andWhere((builder) => {
      builder
        .whereILike("products.supplier", `%${search}%`)
        .orWhereILike("products.name", `%${search}%`);
    });
  }

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>("*").first(),
    baseQuery
      .clone()
      .select<ProductWithWishlisted[]>([
        "products.*",
        db.raw('true as "is_wishlisted"'),
      ])
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};

export const addProductToWishlist = async (
  line_number: Product["line_number"]
) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/log-in");
  }

  await db
    .table("wishlist")
    .insert({ user_id: user.id, product_line_number: line_number });

  revalidatePath("/wishlist");

  return true;
};

export const removeProductFromWishlist = async (
  line_number: Product["line_number"]
) => {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/log-in");
  }

  await db
    .table("wishlist")
    .where({ user_id: user.id, product_line_number: line_number })
    .delete();

  revalidatePath("/wishlist");

  return true;
};
