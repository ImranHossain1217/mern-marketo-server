const express = require("express");
const connect = require("./config/db");
require("dotenv").config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require('./routes/categoryRoutes');

// middleware
app.use(express.json());
app.use(cors());

// databse connection
connect();

app.get("/", (req, res) => {
  res.send("marketo server is running..!");
});

// Routes
app.use(userRoutes);
app.use(categoryRoutes);

app.listen(port, () => {
  console.log(`maketo server is running at ${port}`);
});
