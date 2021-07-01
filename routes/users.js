const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const jwtGenerator = require("../utils/jwt");
const db = require("../db");
const auth = require("../middleware/auth");
const { registerSchema, loginSchema } = require("../utils/validation");
const { isDuplicateFavorite } = require("../utils/functions");

// Register
router.post("/register", async (req, res) => {
  try {
    // 1. getting all the user posted data (username,email,password)
    const { name, email, password } = req.body;
    await registerSchema.validateAsync(req.body);
    // 2. check if the user exist (if he does throw error)
    const user = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exist!");
    }
    // 3. bcrypt use password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);
    // 4. enter the user to the DB

    const newUser = await db.query(
      "INSERT INTO users (name, email, password) values ($1, $2, $3) returning *",
      [name, email, bcryptPassword]
    );

    // 5. generate the JWT token
    const token = jwtGenerator(newUser.rows[0].id);
    const { id } = newUser.rows[0];

    res.json({ token, id, name, email });
  } catch (error) {
    if (error.isJoi) {
      return res.status(422).json(error.details[0].message);
    } else {
      return res.status(500).json("Server error");
    }
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    // 1.getting the req body
    const { email, password } = req.body;
    await loginSchema.validateAsync(req.body);
    // 2.check if user exist (if not throw error)
    const user = await db.query("SELECT * FROM users WHERE email=$1", [email]);
    const favorites = await db.query(
      "SELECT * FROM favorites WHERE user_id=$1",
      [user.rows[0].id]
    );

    if (user.rowCount === 0) {
      return res.status(401).json("Password or email is incorrect");
    }
    // 3.check if incoming password is the same as DB password

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send("Password or email is incorrect");
    }
    // 4.give them jwt token
    const token = jwtGenerator(user.rows[0].id);

    // return to client
    const { id, name } = user.rows[0];

    res.json({ token, id, name, email, favorites: favorites.rows });
  } catch (error) {
    if (error.isJoi) {
      return res.status(422).json(error.details[0].message);
    } else {
      return res.status(500).json("Server error");
    }
  }
});

// User

router.get("/user/:id", auth, async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await db.query(
      "SELECT id, name, email FROM users WHERE id=$1",
      [userID]
    );

    const favorites = await db.query(
      "SELECT * FROM favorites WHERE user_id=$1",
      [req.params.id]
    );

    res.json({
      user: user.rows[0],
      favorites: favorites.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// Favorites

router.post("/add-favorite", auth, async (req, res) => {
  const { restaurant, user_id } = req.body;
  const { name, location, id, restaurant_image } = restaurant;
  try {
    const favArray = await db.query(
      "SELECT restaurant_id FROM favorites WHERE user_id=$1",
      [user_id]
    );

    const favoritesList = favArray.rows;

    if (!isDuplicateFavorite(favoritesList, restaurant.id)) {
      await db.query(
        `INSERT INTO favorites (name, location, restaurant_id, restaurant_image, user_id) VALUES ($1, $2, $3, $4, $5)`,
        [name, location, id, restaurant_image, user_id]
      );
      res.status(200).json("Added successfully to favorites!");
    } else {
      res.status(400).json("Already in favorites!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/remove-favorite", auth, async (req, res) => {
  const { restaurant_id, user_id } = req.body;
  try {
    const favArray = await db.query(
      "SELECT restaurant_id FROM favorites WHERE user_id=$1",
      [user_id]
    );
    const favoritesList = favArray.rows;

    if (isDuplicateFavorite(favoritesList, restaurant_id)) {
      const results = await db.query(
        "DELETE FROM favorites WHERE restaurant_id=$1 AND user_id=$2",
        [restaurant_id, user_id]
      );
      res.json(results);
    } else {
      res.status(400).json("Not in favorites!");
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
