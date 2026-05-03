import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "run-all-active-pings",
  { minutes: 1 },
  api.scheduler.runPinger,
  {},
);

export default crons;
