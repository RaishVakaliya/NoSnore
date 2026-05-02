import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

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

["/services", "/api/services", "/services/", "/api/services/"].forEach(
  (path) => {
    http.route({ path, method: "GET", handler: handleGetServices });
    http.route({ path, method: "POST", handler: handlePostServices });
    http.route({ path, method: "OPTIONS", handler: handleOptions });
  },
);

export default http;
