const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolour: String,
    panelcolor: String,
    textcolor: String,
});

module.exports = mongoose.model("prodect", productSchema);