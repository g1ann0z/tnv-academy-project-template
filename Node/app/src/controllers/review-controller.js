import { text } from "express";
import Review from "../models/review.js";


export const addReview = async (req, res) => {
    console.log(req);
    console.log(text);
    try {
        const { userId, movieId, text} = req.body;

        const newReview = await Review.create({
            userId,
            movieId, 
            text,
        });
        console.log(req.body)
        res.json({
            "message": "Review Created",
            data: newReview
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
