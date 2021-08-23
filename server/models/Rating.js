const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    rating: { type: Number, required: [true, "Rating is required."] },
    comment: { type: String, required: [true, "Comment is required."] },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Rating = mongoose.model("rating", ratingSchema);

module.exports = Rating;