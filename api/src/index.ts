import express from "express";
import productRoutes from "./routes/products.route";
import errorHandler from "./middleware/errorHandler";
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

app.use("/products", productRoutes);

app.use(errorHandler);

const port = 8888;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
