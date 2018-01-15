const mongoose = require("mongoose");

module.exports = {
    mongoose: mongoose,
    uri:"mongodb://user:user@ds251727.mlab.com:51727/subjects",
    gameURI:"mongodb://user:user@ds251727.mlab.com:51727/games",
    restURI: "https://stormy-dawn-78668.herokuapp.com/products/getProducts"
}
