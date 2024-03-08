const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bookRouter = require('./Router/Book');
const userRouter = require('./Router/user');
const port = 5000;
require('./DB/database');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/users', userRouter);
app.use('/books', bookRouter);

/// This is the server port is listening to ///
app.listen(port, () => {
    console.log(`This DB is running on port: ${port}`)
})

module.exports = serverless(app);