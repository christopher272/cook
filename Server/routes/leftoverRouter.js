const express = require('express');
const leftoverRouter = express.Router();
const Leftover = require('../model/leftover');

// POST request to create a new leftover (CREATE)
leftoverRouter.post('/', async (req, res, next) => {
    try {
        req.body.userId = req.auth._id; // Keep only userId
        const newLeftover = new Leftover(req.body);
        const savedLeftover = await newLeftover.save();
        return res.status(201).send(savedLeftover);
    } catch (err) {
        res.status(500);
        next(err);
    }
});


// GET request to fetch all leftovers for the logged-in user (READ)
leftoverRouter.get('/', async (req, res, next) => {
    try {
        const leftovers = await Leftover.find({ userId: req.auth._id });
        return res.status(200).send(leftovers);
    } catch (err) {
        res.status(500);
        next(err);
    }
});

// PUT request to update an existing leftover for the logged-in user (UPDATE)
leftoverRouter.put('/:leftoverId', async (req, res, next) => {
    try {
        const updatedLeftover = await Leftover.findByIdAndUpdate(
            { _id:req.params.leftoverId, userId: req.auth._id },
            req.body,
            { new: true }
        )
        return res.status(200).send(updatedLeftover);
    } catch (err) {
        res.status(500);
        next(err);
    }
});

// DELETE request to delete an existing leftover for the logged-in user (DELETE)
leftoverRouter.delete('/:leftoverId', async (req, res, next) => {
    try {
        const deletedLeftover = await Leftover.findOneAndDelete({ _id: req.params.leftoverId, userId: req.auth._id });
        return res.status(200).send({deletedLeftover ,message: 'Leftover deleted successfully' });
    } catch (err) {
        res.status(500);
        return next(err);
    }
});

module.exports = leftoverRouter;
