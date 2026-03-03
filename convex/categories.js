import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    categories.sort((a, b) => a.name.localeCompare(b.name));
    return categories;
  },
});

export const insert = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("categories", { name: args.name });
  },
});

export const update = mutation({
  args: { id: v.id("categories"), name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { name: args.name });
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
