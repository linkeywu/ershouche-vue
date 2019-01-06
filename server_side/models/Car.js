var mongoose = require("mongoose");
module.exports = mongoose.model("Car", {
    "id": Number,
    "brand": String,
    "series": String,
    "color": String,
    "type": String,
    "price": Number,
    "km": Number,
    "gearbox": String,
    "displacement": String,
    "fuel": String,
    "buydate": Number,
    "licence": Boolean,
    "locality": Boolean,
    "environmental":String,
    "images":Object
})