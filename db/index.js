const { Pool } = require("pg");
require("dotenv").config();

// const decConfig = {
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   posrt: process.env.PGPORT,
// };

const devConfig = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const prodConfig = process.env.DATABASE_URL;

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === "production" ? prodConfig : devConfig,
// });

const pool =
  process.env.NODE_ENV === "production"
    ? new Pool({
        connectionString: prodConfig,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        connectionString: devConfig,
      });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
