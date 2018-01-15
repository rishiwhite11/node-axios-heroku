const {mongoose} = require("../db/mongoose");
const {gameURI} = require("../db/mongoose");

// mongoose.connect(gameURI, (err, success) => {
//     if(err){
//         console.log("Could not connect");
//     }else{
//         console.log("Connection successful Hello");
//     }
// })
const gameConnection = mongoose.createConnection(gameURI);

var Schema = mongoose.Schema;
var gameSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
})
module.exports = gameConnection.model("game", gameSchema);