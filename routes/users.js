const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const jwtGenerator = require("../utils/jwt");
const db = require("../db");
const auth = require("../middleware/auth");
const { registerSchema, loginSchema } = require("../utils/validation");

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

    res.json({ token });
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

    if (user.rowCount === 0) {
      return res.status(401).send("Password or email is incorrect");
    }
    // 3.check if incoming password is the same as DB password

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).send("Password or email is incorrect");
    }
    // 4.give them jwt token
    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (error) {
    if (error.isJoi) {
      return res.status(422).json(error.details[0].message);
    } else {
      return res.status(500).json("Server error");
    }
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
