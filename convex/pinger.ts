import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const pingService = action({
  args: {
    serviceId: v.id("services"),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("PING HIT AT:", new Date().toISOString(), "URL:", args.url);
    const start = Date.now();
    let status = 0;

    try {
      const response = await fetch(args.url, {
        method: "GET",
        headers: {
          "User-Agent": "NoSnore-Pinger/1.0",
        },
      });
      status = response.status;
    } catch (error) {
      status = 500;
    }

    const end = Date.now();
    const responseTime = end - start;

    await ctx.runMutation(api.services.updateStatus, {
      id: args.serviceId,
      status: status >= 200 && status < 300 ? "online" : "offline",
      lastPingedAt: end,
    });

    await ctx.runMutation(api.services.addLog, {
      serviceId: args.serviceId,
      status: status,
      responseTime: responseTime,
      timestamp: end,
    });
  },
});
