const express = require('express');
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");


var Game = require("../models/game");
const {restURI} = require("../db/mongoose");


router.get("/", (req, res) => {
    axios.get(restURI).then((response) => {
        res.send(response.data);
    })    
})


module.exports = router;