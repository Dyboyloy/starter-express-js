const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    poster_path: {
        type: String,
        require: true,
    },
    story: {
        type: String,
        require: true,
    },
    keyword: [String]
});

module.exports = mongoose.model('book', BookSchema);
