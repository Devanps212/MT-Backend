import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const reviewModel = mongoose.model("review", reviewSchema)

export default reviewModel
export type reviewModel = typeof reviewModel