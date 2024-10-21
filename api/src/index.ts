import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/products.route.js";
import orderRoutes from "./routes/orders.route.js";
import serverless from "serverless-http";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
