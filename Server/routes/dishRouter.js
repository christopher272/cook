const express = require('express');
const dishRouter = express.Router();
const Dish = require('../model/dish');

// POST request to create a new dish (CREATE)
dishRouter.post('/', async (req, res, next) => {
    try {
        req.body.username = req.auth.username;
        req.body.userId = req.auth._id;
        const newDish = new Dish(req.body);
        const savedDish = await newDish.save();
        return res.status(201).send(savedDish);
    } catch (err) {
        res.status(500);
        next(err);
    }
});

// GET request to fetch all dishes for the logged-in user (READ)
dishRouter.get('/', async (req, res, next) => {
    try {
        const dishes = await Dish.find({ userId: req.auth._id });
        return res.status(200).send(dishes);
    } catch (err) {
        res.status(500);
        next(err);
    }
});

// PUT request to update an existing dish for the logged-in user (UPDATE)
dishRouter.put('/:dishId', async (req, res, next) => {
    try {
        const updatedDish = await Dish.findByIdAndUpdate(
            { _id:req.params.dishId, userId: req.auth._id },
            req.body,
            { new: true }
        )
        return res.status(200).send(updatedDish);
    } catch (err) {
        res.status(500);
        next(err);
    }
});

// DELETE request to delete an existing dish for the logged-in user (DELETE)
dishRouter.delete('/:dishId', async (req, res, next) => {
    try {
        const deletedDish = await Dish.findByIdAndDelete({ _id: req.params.dishId, userId: req.auth._id });
        return res.status(200).send({deletedDish ,message: 'Dish deleted successfully' });
    } catch (err) {
        res.status(500);
        return next(err);
    }
});

module.exports = dishRouter;
