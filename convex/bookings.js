import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookingRequests").collect();
    // Sort by creation time desc
    bookings.sort((a, b) => b._creationTime - a._creationTime);
    return bookings;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    requestedDate: v.string(),
    serviceType: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookingRequests", {
      ...args,
      status: "pending",
    });
  },
});

export const updateStatus = mutation({
  args: { id: v.id("bookingRequests"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("bookingRequests") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
