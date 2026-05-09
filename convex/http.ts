import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

const handleGetServices = httpAction(async (ctx, request) => {
  const url = new URL(request.url);
  const activeOnly = url.searchParams.get("active") === "true";

  let services;
  if (activeOnly) {
    services = await ctx.runQuery(api.services.listActive);
  } else {
    services = await ctx.runQuery(api.services.list);
  }

  return new Response(JSON.stringify(services), {
    status: 200,
    headers: new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }),
  });
});

const handlePostServices = httpAction(async (ctx, request) => {
  try {
    const body = await request.json();

    if (!body.name || !body.url || typeof body.interval !== "number") {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: name, url, interval",
        }),
        {
          status: 400,
          headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }),
        },
      );
    }

    const serviceId = await ctx.runMutation(api.services.create, {
      name: body.name,
      url: body.url,
      interval: body.interval,
      isActive: body.isActive ?? true,
    });

    return new Response(JSON.stringify({ id: serviceId }), {
      status: 201,
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: new Headers({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      }),
    });
  }
});

const handleOptions = httpAction(async (ctx, request) => {
  return new Response(null, {
    status: 204,
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }),
  });
});

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const body = await request.text();
  const headerPayload = request.headers;

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not set", { status: 500 });
  }

  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as any;
  } catch (err) {
    return new Response("Error verifying webhook", { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created" || type === "user.updated") {
    const email = data.email_addresses[0]?.email_address;
    const name = `${data.first_name || ""} ${data.last_name || ""}`.trim();

    await ctx.runMutation(api.users.upsertUser, {
      clerkId: data.id,
      email: email,
      name: name || undefined,
      imageUrl: data.image_url || data.profile_image_url || undefined,
    });
  }

  return new Response("Success", { status: 200 });
});

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

["/services", "/api/services", "/services/", "/api/services/"].forEach(
  (path) => {
    http.route({ path, method: "GET", handler: handleGetServices });
    http.route({ path, method: "POST", handler: handlePostServices });
    http.route({ path, method: "OPTIONS", handler: handleOptions });
  },
);

export default http;
