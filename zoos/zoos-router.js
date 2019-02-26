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

// GET zoos root

router.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET bears root

router.get("/bears", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET zoo by ID

router.get("/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET bear by ID

router.get("/bears/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// POST a new zoo

router.post("/zoos", (req, res) => {
  const newZoo = req.body;
  db("zoos")
    .insert(newZoo)
    .then(ids => {
      const id = [ids];

      db("zoos")
        .where({ id })
        .first()
        .then(zoo => {
          res.status(201).json(zoo);
        });
    })
    .catch(error => {
      res.status(500).json({ message: "unable to add new zoo" });
    });
});

// POST a new bear

router.post("/bears", (req, res) => {
  const newBear = req.body;
  db("bears")
    .insert(newBear)
    .then(ids => {
      const id = [ids];

      db("bears")
        .where({ id })
        .first()
        .then(bear => {
          res.status(201).json(bear);
        });
    })
    .catch(error => {
      res.status(500).json({ message: "unable to add new bear" });
    });
});

// UPDATE the name of an existing zoo

router.put("/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos")
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("zoos")
          .where({ id })
          .then(zoo => {
            res.status(200).json(zoo);
          });
      } else {
        res.status(404).json({ message: "could not locate intended zoo" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE the name of an existing zoo

router.put("/bears/:id", (req, res) => {
  const id = req.params.id;
  db("bears")
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        db("bears")
          .where({ id })
          .then(bear => {
            res.status(200).json(bear);
          });
      } else {
        res
          .status(404)
          .json({ message: "could not locate intended bear. try honey." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DELETE a zoo

router.delete("/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "zoo successfully deleted" });
      } else {
        res.status(404).json({ message: "unable to locate desired zoo" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
