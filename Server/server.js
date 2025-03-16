const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { expressjwt } = require('express-jwt');
require('dotenv').config();
const path = require('path');

const __dirname = __dirname || path.resolve();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, "../CooksPantry/dist")));

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to DataBase');
    } catch (err) {
        console.error(`failed to connect`, err);
    }
}

connectToDb();

app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/api/main/dishes', require('./routes/dishRouter'));
app.use('/api/main/ingredients', require('./routes/ingredientRouter'));

app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../CooksPantry/dist", "index.html"));
});

app.listen(9000, () => {
    console.log('server is running on port 9000');
})