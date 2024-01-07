import express from "express";

const API_ROOT = '/api';

import { getRating, createRating, updateRating, deleteRating, getAllRating } from "../controllers/ratings-controller.js";
import { createReview } from "../controllers/review-controller.js";

const router = express.Router();

router.get(`${API_ROOT}/rating/:userId/:movieId`, getRating);
router.get(`${API_ROOT}/rating/:userId`, getAllRating);
router.post(`${API_ROOT}/rating`, createRating);
router.patch(`${API_ROOT}/rating/:movieId`, updateRating);
router.delete(`${API_ROOT}/rating/:id`, deleteRating);

router.post(`${API_ROOT}/review`, createReview);


export default router;
