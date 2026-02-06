import { app } from "./app";
import { env } from "./config/env";
import "./redis/index"; // 👈 side-effect import

app.listen(Number(env.PORT), () => {
  console.log(`✅ Server running on http://localhost:${env.PORT}`);
});
