import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  photos: defineTable({
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    url: v.string(),
    storageId: v.optional(v.id("_storage")),
    nsfw: v.boolean(),
    views: v.number(),
    categoryId: v.optional(v.id("categories")),
    isFeatured: v.optional(v.boolean()),
  }).index("by_views", ["views"]),

  categories: defineTable({
    name: v.string(),
  }),

  bookingRequests: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    requestedDate: v.string(),
    serviceType: v.string(),
    message: v.optional(v.string()),
    status: v.string(),
  }),

  sessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
