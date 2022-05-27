const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const { Schema } = mongoose;
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema({
    name: {type: String, },
    price: {type: Number, },
    description: {type: String, },
    image:{
        data: Buffer,
        contentType: String
    },
    authorID: { type: Schema.Types.ObjectId, ref: 'user' },
    slug: {type: String, slug: "name" },
    avgRating: {type: Number, default: 0},
    category: {type: Array, }

})

module.exports = mongoose.model("book",bookSchema);
