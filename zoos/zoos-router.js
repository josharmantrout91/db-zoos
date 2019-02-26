const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
};

const db = knex(knexConfig);
// endpoints here

// GET our root

router.get("/", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET zoo by ID

router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// POST a new zoo

router.post("/", (req, res) => {
  db("zoos")
    .insert(req.body)
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to add new zoo" });
    });
});

module.exports = router;

// new pr
