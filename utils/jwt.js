const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(id) {
  const payload = {
    user: id,
  };

  return jwt.sign(
    payload,
    process.env.jwtSecret,
    {
      expiresIn: 36000,
    },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
}

module.exports = jwtGenerator;
