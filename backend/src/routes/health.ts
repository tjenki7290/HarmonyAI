import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.get("/db", async (_req, res) => {
  const result = await pool.query("select 1");
  res.json({ ok: true, db: result.rowCount === 1 });
});

export default router;
