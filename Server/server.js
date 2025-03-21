const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const { expressjwt } = require('express-jwt');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, "../CooksPantry/dist")));

// Connect to MongoDB
async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectToDb();

// Authentication Routes
app.use('/api/auth', require('./routes/authRouter'));

// Protected Routes (Require Authentication)
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/api/main/leftovers', require('./routes/leftoverRouter'));
app.use('/api/main/ingredients', require('./routes/ingredientRouter'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).send({ errMsg: err.message });
});

// Serve Frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../CooksPantry/dist", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
