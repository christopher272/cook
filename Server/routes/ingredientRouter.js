const express = require('express');
const ingredientRouter = express.Router();
const Ingredient = require('../model/ingredient');



ingredientRouter.post('/', async (req, res, next) => {
    try {
        req.body.username = req.auth.username;
        req.body.userId = req.auth._id; 
        const newIngredient = new Ingredient(req.body); 
        const savedIngredient = await newIngredient.save(); 
        return res.status(201).send(savedIngredient); 
    } catch (err) {
        res.status(500);
        return next(err); 
    }
});


ingredientRouter.get('/', async (req, res, next) => {
    try {
        
        const foundIngredients = await Ingredient.find({ userId: req.auth._id }); 
        return res.status(200).send(foundIngredients); 
    } catch (err) {
        res.status(500);
        return next(err); 
    }
});

ingredientRouter.put('/:ingredientId', async (req, res, next) => {
    try {
        const updatedIngredient = await Ingredient.findOneAndUpdate(
            { _id: req.params.ingredientId, userId: req.auth._id }, 
            req.body, 
            { new: true } 
        );
        return res.status(200).send(updatedIngredient); 
    } catch (err) {
        res.status(500);
        return next(err); 
    }
});


ingredientRouter.delete('/:ingredientId', async (req, res, next) => {
    try {
        const deletedIngredient = await Ingredient.findByIdAndDelete({ _id: req.params.ingredientId, userId: req.auth._id });
        return res.status(200).send({deletedIngredient, message: 'Ingredient deleted successfully' });
    } catch (err) {
        res.status(500);
        return next(err); 
    }
});

module.exports = ingredientRouter;



