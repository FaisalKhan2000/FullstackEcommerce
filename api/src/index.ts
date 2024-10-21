import express from "express";
const app = express();

app.get("/health-check", (req, res) => {
  const uptime = process.uptime();

  res.status(200).json({
    status: "OK",
    uptime,
    timeStamp: new Date(),
  });
});

const port = 8888;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
