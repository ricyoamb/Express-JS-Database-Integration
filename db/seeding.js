const pool = require("../queries");
const fs = require("fs");

const seedQuery = fs.readFileSync("./db/seeding.sql", "utf-8");
pool.query(seedQuery, (err, res) => {
  if (err) {
    console.info(err);
    return;
  }
  console.info("Seeding Completed");
  pool.end();
});
