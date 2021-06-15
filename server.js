require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
// Routes
const restaurants = require("./routes/restaurants");
const users = require("./routes/users");

// Middlewares
app.use(express.json());
app.use(cors());

// ROUTES //
app.use("/api/restaurants", restaurants);
app.use("/auth", users);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build/index.html"));
// });

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Serever is up and listening on port ${port}`)
);
