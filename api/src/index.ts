import express from "express";
import errorHandler from "./middleware/errorHandler";
import productRoutes from "./routes/products.route";
import authRoutes from "./routes/auth.route";
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
app.use(errorHandler);

const port = 8968;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
