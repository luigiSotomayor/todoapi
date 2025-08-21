require('dotenv').config();
console.log(process.env.DB_URL)
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/connectDB");
const taskRouter = require("./src/api/routes/tasks");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRouter);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
