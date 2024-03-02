var express = require("express");
const router = express.Router();
const pool = require("../queries");

pool.connect((err, res) => {
  console.info(err), console.info(res);
});

router.get("/actors", (req, res) => {
  pool.query("SELECT * FROM actor", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

router.get("/films", (req, res) => {
  pool.query("SELECT * FROM film", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

router.get("/sort-films/:id", (req, res) => {
  pool.query(
    `SELECT * FROM film WHERE film_id=${req.params.id}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
});

router.get("/categories/", (req, res) => {
  pool.query(`SELECT * FROM category`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result.rows);
  });
});

router.get("/sort-films-by-category/:name", (req, res) => {
  pool.query(
    `SELECT fc.film_id id, f.title, c.name category, f.release_year release, f.rating FROM film_category fc JOIN film f ON fc.film_id = f.film_id JOIN category c ON fc.category_id = c.category_id WHERE c.name='${req.params.name}'`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    }
  );
});

module.exports = router;
