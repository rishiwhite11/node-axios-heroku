const express = require('express');
const router = express.Router();
const _ = require("lodash");
var Subject = require("../models/subject");

/* GET home page. */

router.post("/", (req, res) => {
  var newSubject = new Subject({
    name: req.body.name,
    difficulty: req.body.difficulty
  }).save().then((subject) => {
    res.status(201).send({subject})
  }).catch((e) => res.status(400).send({text:"Wrong data"}))
})

router.get("/", (req, res) => {
    Subject.find({}).then((subject) => {
    res.status(200).send(subject);
  }).catch((e) => res.send(400).send())
})

router.get("/query", (req, res) => {
  var query = req.query.name;
  Subject.find({"name":query}).then((subject) => {
    if(!subject.length){
      return res.status(404).send(subject);
    }
    res.status(200).send(subject);
  }).catch((e) => res.status(500).send())
})

router.get("/:id", (req, res) => {
  Subject.findById(req.params.id).then((results) => {
    if(!results){
      return res.status(404).send();
    }
    res.status(200).send({results});
  }).catch((e) => res.status(400).send());
})



router.patch("/:id", (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["name", "difficulty"]);
  Subject.findByIdAndUpdate(id, {
    $set:body
  },{
    new:true
  }).then((subject) => {
    if(!subject){
      return res.status(404).send();
    }
    res.status(200).send({subject});
  }).catch((e) => res.status(400).send())
});





module.exports = router;
