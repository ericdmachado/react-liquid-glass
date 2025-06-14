import "dotenv/config";
import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname } from "path";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const publicPath = path.resolve(__dirname, "./public");

app.use(
  helmet({
    originAgentCluster: isProduction,
    contentSecurityPolicy: isProduction ? undefined : false,
    crossOriginEmbedderPolicy: isProduction,
    crossOriginOpenerPolicy: isProduction ? { policy: "same-origin" } : false,
    crossOriginResourcePolicy: isProduction ? { policy: "same-origin" } : false,
  })
);
app.use(morgan("common"));
app.use(compression());
app.disable("x-powered-by");

app.use(express.static(publicPath));

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
