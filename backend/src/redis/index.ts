import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL!);

redis.on("connect", () => {
  console.log("✅ Connected to local Redis");
});

redis.on("ready", () => {
  console.log("🚀 Redis ready to accept commands");
});

redis.on("error", (err) => {
  console.error("❌ Redis error", err);
});
