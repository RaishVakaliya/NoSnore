import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    url: v.string(),
    interval: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const serviceId = await ctx.db.insert("services", {
      name: args.name,
      url: args.url,
      interval: args.interval,
      isActive: args.isActive,
      createdAt: Date.now(),
    });
    return serviceId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("services").order("desc").collect();
  },
});

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("services"),
    status: v.string(),
    lastPingedAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      lastPingedAt: args.lastPingedAt,
    });
  },
});

export const updateService = mutation({
  args: {
    id: v.id("services"),
    name: v.optional(v.string()),
    url: v.optional(v.string()),
    interval: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deleteService = mutation({
  args: {
    id: v.id("services"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
