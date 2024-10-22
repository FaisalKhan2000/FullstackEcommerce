import cors from "cors";
import express from "express";
import helmet from "helmet";
import ip from "ip";
import os from "os";
import serverless from "serverless-http";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/orders.route.js";
import productRoutes from "./routes/products.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// home route
app.get("/", (req, res) => {
  const userData = {
    system: {
      platform: os.platform(),
      architecture: os.arch(),
      cpuCores: os.cpus().length,
      totalMemory: `${(os.totalmem() / 1024 ** 3).toFixed(2)} GB`,
      freeMemory: `${(os.freemem() / 1024 ** 3).toFixed(2)} GB`,
      hostname: os.hostname(),
      uptime: `${(os.uptime() / 60).toFixed(2)} minutes`,
    },
    network: {
      ipAddress: ip.address(),
      networkInterfaces: os.networkInterfaces(),
    },
    user: {
      username: os.userInfo().username,
      homeDir: os.userInfo().homedir,
      shell: os.userInfo().shell,
    },
    node: {
      version: process.version,
      memoryUsage: process.memoryUsage(),
      uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
      env: process.env,
    },
    request: {
      method: req.method,
      headers: req.headers,
      userAgent: req.headers["user-agent"],
    },
  };

  res.json(userData);
});

app.get("/health-check", (req, res) => {
  const uptime = process.uptime();

  res.status(200).json({
    status: "OK",
    uptime,
    timeStamp: new Date(),
  });
});

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use(errorHandler);

const port = 8968;

if (process.env.NODE_ENV === "development") {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

export const handler = serverless(app);
