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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found in database");

    const serviceId = await ctx.db.insert("services", {
      userId: user._id,
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
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    return await ctx.db
      .query("services")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const listActive = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

export const getRecentLogs = query({
  args: { serviceId: v.id("services") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pingLogs")
      .filter((q) => q.eq(q.field("serviceId"), args.serviceId))
      .order("desc")
      .take(5);
  },
});

export const getMyStats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return null;

    const services = await ctx.db
      .query("services")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    return {
      totalServices: services.length,
      activeServices: services.filter((s) => s.isActive).length,
    };
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

export const addLog = mutation({
  args: {
    serviceId: v.id("services"),
    status: v.number(),
    responseTime: v.number(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("pingLogs", {
      serviceId: args.serviceId,
      status: args.status,
      responseTime: args.responseTime,
      timestamp: args.timestamp,
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const service = await ctx.db.get(args.id);
    if (!service || service.userId !== user._id) {
      throw new Error("Unauthorized or service not found");
    }

    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const deleteService = mutation({
  args: {
    id: v.id("services"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const service = await ctx.db.get(args.id);
    if (!service || service.userId !== user._id) {
      throw new Error("Unauthorized or service not found");
    }

    await ctx.db.delete(args.id);
  },
});
