import { action } from "./_generated/server";
import { api } from "./_generated/api";

export const runPinger = action({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.runQuery(api.services.listActive);

    if (!services || services.length === 0) return;

    const now = Date.now();

    for (const service of services) {
      const intervalMs = service.interval * 60 * 1000 - 10000;
      const lastPing = service.lastPingedAt || 0;

      if (now - lastPing >= intervalMs) {
        await ctx.runAction(api.pinger.pingService, {
          serviceId: service._id,
          url: service.url,
        });
      }
    }
  },
});
