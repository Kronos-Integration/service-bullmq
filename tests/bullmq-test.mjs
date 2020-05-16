import test from "ava";
import { StandaloneServiceProvider } from "@kronos-integration/service";
import { ServiceBullMQ } from "@kronos-integration/service-bullmq";

const config = {
  name: "bullmq",
  type: ServiceBullMQ,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
};

test("service-bullmq queue entpoint", async t => {
  const sp = new StandaloneServiceProvider();
  const admin = await sp.declareService(config);
  await admin.start();

  t.is(admin.state, "running");

  let response = await admin.endpoints["queues.q1"].receive();

  t.is(response, true);
});
