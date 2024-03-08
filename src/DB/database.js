const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://books:Longdy168!@books-db.tmkkfhw.mongodb.net/Book-DB?retryWrites=true&w=majority').then((res) => {
    console.log("Connect DB Success");
}).catch((e) => {
    console.log(e)
})

module.exports = mongoose;