require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./db");

// Middlewares
// app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES //

// Get all restaurants
app.get("/api/restaurants", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");

    const restaurantRatingData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.json({
      status: "sucsses",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get a restuarnt by id
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurants = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id=$1;",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id=$1",
      [req.params.id]
    );

    res.json({
      status: "sucsses",
      data: {
        restaurant: restaurants.rows,
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Search for a restaurant by name
app.post("/api/restaurants/search", async (req, res) => {
  const { query } = req.body;
  try {
    const results = await db.query(
      "select * FROM restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE to_tsvector(name) @@ to_tsquery($1)",
      [query.toLowerCase() + ":*"]
    );

    // const analyze = await db.query(
    //   "explain analyze select * FROM restaurants WHERE to_tsvector(name) @@ to_tsquery($1)",
    //   [query.toLowerCase() + ":*"]
    // );

    res.json({
      status: "sucsses",
      data: {
        restaurants: results.rows,
        results: results.rows.length,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Create a restaurant
app.post("/api/restaurants", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [name.toLowerCase(), location, price_range]
    );

    res.json({
      status: "sucsses",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Update Restaurant
app.put("/api/restaurants/:id", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      "UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *",
      [name, location, price_range, req.params.id]
    );

    res.status(200).json({
      status: "sucsses",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Delete a restaurant
app.delete("/api/restaurants/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
    res.json({
      status: "sucsses",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Add Review to spesifc resaurant
app.post("/api/restaurants/:id/addReview", async (req, res) => {
  const { name, review, rating } = req.body;
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *;",
      [req.params.id, name, review, rating]
    );

    res.status(201).json({
      status: "sucsses",
      review: newReview.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Serever is up and listening on port ${port}`)
);
