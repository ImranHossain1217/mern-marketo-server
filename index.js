const express = require("express");
const connect = require("./config/db");
require("dotenv").config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");

// middleware
app.use(express.json());
app.use(cors());

// databse connection
connect();

app.get("/", (req, res) => {
  res.send("marketo server is running..!");
});

// user Routes
app.use(userRoutes);

app.listen(port, () => {
  console.log(`maketo server is running at ${port}`);
});
