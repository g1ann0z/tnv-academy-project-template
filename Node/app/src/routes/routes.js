import express from "express";

const API_ROOT = '/api';

import { getRating, createRating, updateRating, deleteRating } from "../controllers/ratings-controller.js";
import { addReview,reviewExist } from "../controllers/review-controller.js";
import { addFavourite, deleteFavourite, checkIfMovieInFavourites, getFavouritesByUserId } from "../controllers/favourites-controller.js";

const router = express.Router();

router.get(`${API_ROOT}/rating/:userId`, getRating);
router.post(`${API_ROOT}/rating`, createRating);
router.patch(`${API_ROOT}/rating/:movieId`, updateRating);
router.delete(`${API_ROOT}/rating/:userId/:movieId`, deleteRating);

router.post(`${API_ROOT}/review`, addReview);
router.get(`${API_ROOT}/review/:userId/:movieId`, reviewExist);//vado a cercare se su review c'è record per userId e movieId

router.get(`${API_ROOT}/favourites/:userId/:movieId`, checkIfMovieInFavourites);
router.post(`${API_ROOT}/favourites`, addFavourite);
router.delete(`${API_ROOT}/favourites/:userId/:movieId`, deleteFavourite);

router.get(`${API_ROOT}/favourites/:userId`, getFavouritesByUserId);

export default router;
