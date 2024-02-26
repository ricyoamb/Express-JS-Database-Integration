var express = require("express");
const router = express.Router();
const pool = require("./queries");


pool.connect((err, res) => {
    console.info(err), console.info(res);
  });

router.get("/actor", (req, res) => {
    pool.query("SELECT * FROM actor LIMIT 10", (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    });
  });
  
  router.get("/film", (req, res) => {
    pool.query("SELECT * FROM film", (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    });
  });
  
  router.get("/sortfilm", (req, res) => {
    pool.query(
      "SELECT * FROM film WHERE film_id BETWEEN 1 AND 15",
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result.rows);
      }
    );
  });
  
  router.get("/category", (req, res) => {
    pool.query("SELECT * FROM category LIMIT 5", (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    });
  });
  
  router.get("/sortcategory", (req, res) => {
    pool.query("SELECT fc.film_id, f.title, fc.category_id, c.name, f.release_year, f.rating FROM film_category fc JOIN film f ON fc.film_id = f.film_id JOIN category c ON fc.category_id = c.category_id ORDER BY c.name", (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.rows);
    });
  });

  module.exports = router;