// Requiring our models and passport as we've configured it
const db = require("../models");
// === passport for future use ===
// const passport = require("../config/passport");
let currentShip = "";

module.exports = function(app) {
  app.post("/api/characters", (req, res) => {
    console.log(req.body, "To find ships somewhere on this body");
    currentShip = req.body.ship;
    db.Character.create({
      char_name: req.body.name,
      score: req.body.score,
      RaceId: req.body.race,
      AgeId: req.body.age,
      ProfessionId: req.body.profession
    })
      .then(result => {
        console.log("api route: ");
        console.log(result)
        // res.json(result);
        res.json({ id: result.id });
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for getting all races and their corresponding planetId
  app.get("/api/races", (req, res) => {
    db.Race.findAll({
      include: [{ all: true, nested: true }]
    }).then(result => {
      return res.json(result);
    });
  });

  // ==== Route for getting planet data ====
  app.get("/api/planets", (req, res) => {
    db.Planet.findAll({
      include: [{ all: true, nested: true }]
    }).then(result => {
      return res.json(result);
    });
  });

  // ===== route for character data =====
  app.get("/api/characters", (req, res) => {
    db.Character.findAll({
      include: [{ all: true, nested: true }]
    }).then(result => {
      return res.json(result);
    });
  });

  // ===== route for age data =====
  app.get("/api/ages", (req, res) => {
    db.Age.findAll({
      include: [{ all: true, nested: true }]
    }).then(result => {
      return res.json(result);
    });
  });

  // ===== route for profession data =====
  app.get("/api/professions", (req, res) => {
    db.Profession.findAll({
      include: [{ all: true, nested: true }]
    }).then(result => {
      return res.json(result);
    });
  });

  app.get("/api/ships", (req, res) => {
    console.log(currentShip);
    return res.json({ ship: currentShip });
  });
  // ==== get character by ID ==
  // app.get("/api/characters/:id", (req, res) => {
  //   db.Character.
  // });

  app.post("/api/newPage", (req, res) => {
    console.log(req.body);
    res.json(req);
  });

  app.get("/api/newPage", (req, res) => {
    console.log(req.body);
    res.end();
  });
};
