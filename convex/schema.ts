import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    plan: v.string(),
    isActive: v.boolean(),
    stripeCustomerId: v.optional(v.string()),
    subscriptionId: v.optional(v.string()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_stripeCustomerId", ["stripeCustomerId"]),

  services: defineTable({
    userId: v.id("users"),
    name: v.string(),
    url: v.string(),
    interval: v.number(),
    isActive: v.boolean(),
    lastPingedAt: v.optional(v.number()),
    status: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  pingLogs: defineTable({
    serviceId: v.id("services"),
    status: v.number(),
    responseTime: v.number(),
    timestamp: v.number(),
  }),
});
