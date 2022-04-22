const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema({
    name: {type: String, },
    price: {type: Number, },
    description: {type: String, },
    image:{
        data: Buffer,
        contentType: String
    },
    rating:{type: Number},
    slug: {type: String, slug: "name" },
    avgRating: {type: Number, default: 0},
    category: {type: Array, }

})

module.exports = mongoose.model("book",bookSchema);
