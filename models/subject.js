const {mongoose} = require("../db/mongoose");
const {uri} = require("../db/mongoose");

const subjectConnection = mongoose.createConnection(uri);

var Schema = mongoose.Schema;
var SubjectSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    difficulty:{
        type: Number,
        required: true
    }
})

module.exports = subjectConnection.model("Subject", SubjectSchema);