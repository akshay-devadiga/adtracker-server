const db = require("../models");
const Campaign = db.campaigns;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    console.log(req);
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const campaign = new Campaign({
    name: req.body.name,
    destinationLink: req.body.destinationLink,
    imageLink: req.body.imageLink
  });

  // Save campaign in the database
  campaign
    .save(campaign)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Campaign."
      });
    });
};

// Retrieve all campaigns from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = {};

  Campaign.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};