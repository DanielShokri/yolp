const express = require("express");
const router = express.Router();
const db = require("../db");
const { cloudinary } = require("../utils/cloudinary");

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    // const results = await db.query("select * from restaurants");

    const restaurantRatingData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
    );

    res.json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get a restaurant by id
router.get("/:id", async (req, res) => {
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
      status: "success",
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
router.post("/search", async (req, res) => {
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
      status: "success",
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
router.post("/", async (req, res) => {
  const {
    name,
    location,
    price_range,
    restaurant_image,
    opening_time,
    closing_time,
  } = req.body;
  try {
    if (restaurant_image) {
      await cloudinary.uploader.upload(
        restaurant_image,
        {
          upload_preset: "yolp",
        },
        async (error, { url }) => {
          try {
            const results = await db.query(
              "INSERT INTO restaurants (name, location, price_range, restaurant_image, opening_time, closing_time) values ($1, $2, $3, $4, $5, $6) returning *",
              [
                name.toLowerCase(),
                location,
                price_range,
                url,
                opening_time,
                closing_time,
              ]
            );
            res.json({
              status: "sucsses",
              results: results.rows.length,
              data: {
                restaurants: results.rows,
              },
            });
          } catch (error) {
            res.json(error);
          }
        }
      );
    } else {
      try {
        const results = await db.query(
          "INSERT INTO restaurants (name, location, price_range, opening_time, closing_time) values ($1, $2, $3, $4, $5) returning *",
          [
            name.toLowerCase(),
            location,
            price_range,
            opening_time,
            closing_time,
          ]
        );
        res.json({
          status: "success",
          results: results.rows.length,
          data: {
            restaurants: results.rows,
          },
        });
      } catch (error) {
        res.json(error);
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Update Restaurant
router.put("/:id", async (req, res) => {
  const {
    name,
    location,
    price_range,
    restaurant_image,
    closing_time,
    opening_time,
  } = req.body;
  try {
    if (restaurant_image) {
      await cloudinary.uploader.upload(
        restaurant_image,
        {
          upload_preset: "yolp",
        },
        async (error, { url }) => {
          try {
            const results = await db.query(
              "UPDATE restaurants SET name=$1, location=$2, price_range=$3, restaurant_image=$4, closing_time=$5, opening_time=$6 WHERE id=$7 returning *",
              [
                name,
                location,
                price_range,
                url,
                closing_time,
                opening_time,
                req.params.id,
              ]
            );

            res.status(200).json({
              status: "success",
              results: results.rows.length,
              data: {
                restaurants: results.rows,
              },
            });
          } catch (error) {
            res.json(error);
          }
        }
      );
    } else {
      try {
        const results = await db.query(
          "UPDATE restaurants SET name=$1, location=$2, price_range=$3, closing_time=$4, opening_time=$5 WHERE id=$6 returning *",
          [
            name,
            location,
            price_range,
            closing_time,
            opening_time,
            req.params.id,
          ]
        );
        res.json({
          status: "success",
          results: results.rows.length,
          data: {
            restaurants: results.rows,
          },
        });
      } catch (error) {
        res.json(error);
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Delete a restaurant
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id]);
    res.json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

// Add Review to spesifc resaurant
router.post("/:id/addReview", async (req, res) => {
  const { name, review, rating } = req.body;
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) returning *;",
      [req.params.id, name, review, rating]
    );

    res.status(201).json({
      status: "success",
      review: newReview.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error,
    });
  }
});

module.exports = router;
