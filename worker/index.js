import { ConvexClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" });

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  console.error("NEXT_PUBLIC_CONVEX_URL is not set in environment variables!");
  process.exit(1);
}

console.log(`Connecting to Convex at: ${CONVEX_URL}`);
const client = new ConvexClient(CONVEX_URL);

async function pingService(service) {
  const startTime = Date.now();
  console.log(`Pinging [${service.name}] -> ${service.url}...`);

  let status = 0;
  let responseTime = 0;
  let statusText = "down";

  try {
    const res = await fetch(service.url, {
      method: "GET",
      headers: { "User-Agent": "PulsePing/1.0" },
    });

    status = res.status;
    responseTime = Date.now() - startTime;
    statusText = res.ok ? "up" : "down";
    console.log(
      `[${service.name}] responded with ${status} in ${responseTime}ms`,
    );
  } catch (err) {
    responseTime = Date.now() - startTime;
    statusText = "down";
    console.error(`[${service.name}] failed to respond: ${err.message}`);
  }

  try {
    await client.mutation(api.pings.createLog, {
      serviceId: service._id,
      status: status,
      responseTime: responseTime,
    });

    await client.mutation(api.services.updateStatus, {
      id: service._id,
      status: statusText,
      lastPingedAt: Date.now(),
    });
    console.log(`Updated Convex state for [${service.name}]`);
  } catch (err) {
    console.error(`Failed to update log in Convex: ${err.message}`);
  }
}

async function scanAndPingServices() {
  try {
    console.log("\n Scanning active services...");
    const activeServices = await client.query(api.services.listActive);

    if (!activeServices || activeServices.length === 0) {
      console.log("No active services found to ping.");
      return;
    }

    const now = Date.now();

    for (const service of activeServices) {
      const intervalMs = service.interval * 60 * 1000;
      const lastPinged = service.lastPingedAt || 0;

      if (lastPinged === 0 || now - lastPinged >= intervalMs) {
        await pingService(service);
      } else {
        const timeRemaining = Math.ceil(
          (intervalMs - (now - lastPinged)) / 1000,
        );
        console.log(
          `[${service.name}] not due for ping yet. Time remaining: ${timeRemaining} seconds.`,
        );
      }
    }
  } catch (err) {
    console.error(`Error scanning services: ${err.message}`);
  }
}

const SCAN_INTERVAL_MS = 10 * 1000;
console.log(`Starting pulse-ping worker daemon with check interval: 10s\n`);

scanAndPingServices();
setInterval(scanAndPingServices, SCAN_INTERVAL_MS);
