const express = require('express');
const authRouter = express.Router();
const User = require('../model/user'); // Your User model
const jwt = require('jsonwebtoken');

// Register a new user
authRouter.post('/signup', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(user) {
            res.status(403)
            return next(new Error('Username is already in use'));
        } 
            const newUser = new User(req.body);
            const savedUser = await newUser.save();
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            
            res.status(201).send({user: savedUser.withoutPassword(), token});
    } catch(error) {
        res.status(500)
        return next(error)
    }
});

// Login a user
authRouter.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user) {
            res.status(403)
            return next(new Error('Username or password is incorrect'));
        }

        const passwordCheck = await user.checkPassword(req.body.password);
            if(!passwordCheck) {
                res.status(403)
                return next(new Error('Username or password is incorrect'));
            } 
                const token = jwt.sign({_id: user._id}, process.env.SECRET)
                return res.status(201).send({user: user.withoutPassword(), token});
            
        }catch (error) {
        res.status(500)
        return next(error)
    }
})

module.exports = authRouter;
