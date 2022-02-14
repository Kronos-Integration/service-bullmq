import test from "ava";
import { StandaloneServiceProvider } from "@kronos-integration/service";
import { ServiceBullMQ } from "@kronos-integration/service-bullmq";

const config = {
  name: "bullmq",
  type: ServiceBullMQ,
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  endpoints: {
    "queues.q1": {}
  }
};

test("service-bullmq livecycle", async t => {
  const sp = new StandaloneServiceProvider();
  const bull = await sp.declareService(config);
  await bull.start();

  t.is(bull.state, "running");
  t.true(bull.url.startsWith("redis://"));

  const q1 = bull.endpoints["queues.q1"];
  t.is(q1.name, "queues.q1");

  q1.send("hello");

  //t.is(q1.s, "queues.q1");

  //t.is(response, true);
});
