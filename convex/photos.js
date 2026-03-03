import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const photos = await ctx.db.query("photos").collect();
    // Resolve storageId → URL for each photo
    const photosWithUrls = await Promise.all(
      photos.map(async (photo) => {
        let url = photo.url;
        if (photo.storageId) {
          const storageUrl = await ctx.storage.getUrl(photo.storageId);
          if (storageUrl) url = storageUrl;
        }
        return { ...photo, url };
      })
    );
    // Sort by views desc, then by _creationTime desc
    photosWithUrls.sort((a, b) => {
      if (b.views !== a.views) return b.views - a.views;
      return b._creationTime - a._creationTime;
    });
    return photosWithUrls;
  },
});

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const photos = await ctx.db.query("photos").collect();
    const photosWithUrls = await Promise.all(
      photos.map(async (photo) => {
        let url = photo.url;
        if (photo.storageId) {
          const storageUrl = await ctx.storage.getUrl(photo.storageId);
          if (storageUrl) url = storageUrl;
        }
        return { ...photo, url };
      })
    );
    photosWithUrls.sort((a, b) => {
      if (b.views !== a.views) return b.views - a.views;
      return b._creationTime - a._creationTime;
    });
    return photosWithUrls.slice(0, 6);
  },
});

export const incrementViews = mutation({
  args: { id: v.id("photos") },
  handler: async (ctx, args) => {
    const photo = await ctx.db.get(args.id);
    if (!photo) throw new Error("Photo not found");
    await ctx.db.patch(args.id, { views: (photo.views || 0) + 1 });
  },
});

export const insert = mutation({
  args: {
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    url: v.string(),
    storageId: v.optional(v.id("_storage")),
    nsfw: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("photos", {
      ...args,
      views: 0,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("photos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    nsfw: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("photos") },
  handler: async (ctx, args) => {
    const photo = await ctx.db.get(args.id);
    if (photo?.storageId) {
      await ctx.storage.delete(photo.storageId);
    }
    await ctx.db.delete(args.id);
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
