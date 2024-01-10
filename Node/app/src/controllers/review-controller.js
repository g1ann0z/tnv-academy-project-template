import { text } from "express";
import Review from "../models/review.js";

export const checkIfReviewExist = async (req, res) => {
	try {
		const userId = req.params.userId;
		const movieId = req.params.movieId;
        //console.log(movieId);
		const reviews = await Review.findAll({
			where: { userId, movieId },
		});
		res.json(reviews.id);
       
	} catch (error) {
		console.error("Errore node controller - getReviewsByUserId", error);
	
	}
};

export const addReview = async (req, res) => {
    //console.log(req);
    //console.log(text);
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
