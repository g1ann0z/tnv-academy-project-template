import { text } from "express";
import Review from "../models/review.js";

export const reviewExist = async (req, res) => {
	//console.log(req);
	//console.log(text);
	try {
		const { userId, movieId } = req.params;
        console.log(req.params);

		const searchedReview = await Review.findOne({
			where: {
				userId,
				movieId,
			},
		});
		
		res.json({
			message: "Review found",
			data: searchedReview,
		});
	} catch (err) {
		console.log(err);
		res.sendStatus(500);
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

export const deleteReview = async (req, res) => {
    //console.log("REMOVE-REVIEW-CONTROLLER.JS", userId, movieId);
    try {
        const { userId, movieId } = req.params;
        
        if(!userId || !movieId) {
            return res.status(400).json({
                message:"ID del film mancante per la rimozione dai preferiti!",
            });
        }

        const deletedReview = await Review.destroy({
            where: { userId,
                     movieId },
        });

        if(deletedReview) {
            res.json({
                message:"Review eliminata!",
            });
        } else {
        
            res.status(404).json({
                message:"Review non trovata",
            });
        }

    } catch (error) {
        console.error('Errore durante la rimozione della review', error);
        res.status(500).json({
            message: "Errore durante la rimozione della review",
        });
    }
};
