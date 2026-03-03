import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const login = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (args.email !== adminEmail || args.password !== adminPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate a random token
    const token =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36);

    // Session expires in 24 hours
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await ctx.runMutation(api.auth.createSession, { token, expiresAt });

    return { token };
  },
});

export const createSession = mutation({
  args: { token: v.string(), expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("sessions", {
      token: args.token,
      expiresAt: args.expiresAt,
    });
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    if (!args.token) return null;
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session) return null;
    if (session.expiresAt < Date.now()) return null;
    return { valid: true };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});
