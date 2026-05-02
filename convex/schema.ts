import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    name: v.string(),
    url: v.string(),
    interval: v.number(),
    isActive: v.boolean(),
    lastPingedAt: v.optional(v.number()),
    status: v.optional(v.string()),
    createdAt: v.number(),
  }),
  pingLogs: defineTable({
    serviceId: v.id("services"),
    status: v.number(),
    responseTime: v.number(),
    timestamp: v.number(),
  }),
});
