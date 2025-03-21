const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leftoverSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Leftover', leftoverSchema);