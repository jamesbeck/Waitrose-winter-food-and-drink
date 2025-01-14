"use server";

import type { Event } from "knex/types/tables";
import { db } from "../knex";
import type { ProductList, ProductWithWishlisted } from "./products";
import { getCurrentUser } from "./user";

export type EventWithScheduled = Event & {
  is_scheduled: boolean;
};

type EventList = {
  count: number;
  items: EventWithScheduled[];
};

export type FilterDay = "Friday" | "Saturday" | "Sunday" | "Always on";

export const isFilterDay = (value: string): value is FilterDay =>
  ["Friday", "Saturday", "Sunday"].includes(value);

type Params = {
  offset?: number;
  days?: FilterDay[];
};

export const getStandardEvents = async ({
  offset = 0,
  days,
}: Params): Promise<EventList> => {
  const user = await getCurrentUser();

  const baseQuery = db.from("events").where("is_masterclass", false);

  if (days && days.length > 0) {
    //always bring back "Always on" events
    days = days.concat("Always on");
    baseQuery.whereIn("day", days);
  }

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>("*").first(),
    baseQuery
      .clone()
      .select<EventWithScheduled[]>([
        "events.*",
        db.raw('schedule.event_id IS NOT NULL as "is_scheduled"'),
      ])
      .leftJoin("schedule", function () {
        this.on("events.id", "=", "schedule.event_id");

        if (user) {
          this.andOnVal("schedule.user_id", user.id);
        } else {
          this.andOnNull("schedule.user_id");
        }
      })
      .orderBy("id", "asc")
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};

export const getMasterclasses = async ({
  offset = 0,
  days,
}: Params): Promise<EventList> => {
  const user = await getCurrentUser();

  const baseQuery = db.from("events").where("is_masterclass", true);

  if (days && days.length > 0) {
    baseQuery.whereIn("day", days);
  }

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>("*").first(),
    baseQuery
      .clone()
      .select<EventWithScheduled[]>([
        "events.*",
        db.raw('schedule.event_id IS NOT NULL as "is_scheduled"'),
      ])
      .leftJoin("schedule", function () {
        this.on("events.id", "=", "schedule.event_id");

        if (user) {
          this.andOnVal("schedule.user_id", user.id);
        } else {
          this.andOnNull("schedule.user_id");
        }
      })
      .orderBy("id", "asc")
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};

export const getEvent = async (
  id: string
): Promise<EventWithScheduled | undefined> => {
  const user = await getCurrentUser();

  return db
    .select<EventWithScheduled[]>([
      "events.*",
      db.raw('schedule.event_id IS NOT NULL as "is_scheduled"'),
    ])
    .from("events")
    .leftJoin("schedule", function () {
      this.on("events.id", "=", "schedule.event_id");

      if (user) {
        this.andOnVal("schedule.user_id", user.id);
      } else {
        this.andOnNull("schedule.user_id");
      }
    })
    .where("events.id", id)
    .first();
};

export const getEventProducts = async (
  id: string,
  offset = 0
): Promise<ProductList> => {
  const user = await getCurrentUser();

  const baseQuery = db
    .from("products")
    .leftJoin(
      "event_products",
      "products.line_number",
      "event_products.product_line_number"
    )
    .where("event_products.event_id", id);

  const [count, items] = await Promise.all([
    baseQuery.clone().count<{ count: string }[]>("*").first(),
    baseQuery
      .clone()
      .select<ProductWithWishlisted[]>([
        "products.*",
        db.raw('wishlist.product_line_number IS NOT NULL as "is_wishlisted"'),
      ])
      .leftJoin("wishlist", function () {
        this.on("products.line_number", "=", "wishlist.product_line_number");

        if (user) {
          this.andOnVal("wishlist.user_id", user.id);
        } else {
          this.andOnNull("wishlist.user_id");
        }
      })
      .offset(offset)
      .limit(10),
  ]);

  return { count: count?.count ? parseInt(count.count) : 0, items };
};
