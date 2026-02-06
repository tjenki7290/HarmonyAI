import { Router } from "express";
import { pool } from "../db";
import { redis } from "../redis";

const router = Router();

router.get("/db", async (_req, res) => {
  const result = await pool.query("select 1");
  res.json({ ok: true, db: result.rowCount === 1 });
});

router.get("/health", async (req, res) => {
  const cacheKey = "health:cached-response";

  // 1️⃣ Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json({
      source: "cache",
      data: JSON.parse(cached),
    });
  }

  // 2️⃣ Simulate expensive work
  const data = {
    status: "ok",
    time: new Date().toISOString(),
  };

  // 3️⃣ Store in cache (10 seconds)
  await redis.set(cacheKey, JSON.stringify(data), "EX", 10);

  return res.json({
    source: "fresh",
    data,
  });
});

export default router;
