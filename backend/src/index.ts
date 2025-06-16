import dotenv from "dotenv";
import app from "./app";
import { initDB } from "./db";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function start() {
  await initDB();
  app.listen(PORT, () =>
    console.log(`🚀 API ready at http://localhost:${PORT}/api`)
  );
}
start();
