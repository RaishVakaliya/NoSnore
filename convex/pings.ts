import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createLog = mutation({
  args: {
    serviceId: v.id("services"),
    status: v.number(),
    responseTime: v.number(),
  },
  handler: async (ctx, args) => {
    const logId = await ctx.db.insert("pingLogs", {
      serviceId: args.serviceId,
      status: args.status,
      responseTime: args.responseTime,
      timestamp: Date.now(),
    });
    return logId;
  },
});

export const getLogs = query({
  args: {
    serviceId: v.id("services"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pingLogs")
      .filter((q) => q.eq(q.field("serviceId"), args.serviceId))
      .order("desc")
      .take(100);
  },
});
