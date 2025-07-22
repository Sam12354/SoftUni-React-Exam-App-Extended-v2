import requester from "./requester.js";

const BASE_URL = "http://localhost:7777/review";

export const getReviews = async (itemId) => {
	return requester.get(`${BASE_URL}/item/${itemId}`);
};

export const getAverageRating = async (itemId) => {
	// console.log('getAverageRating called with itemId:', itemId);

	return requester.get(`${BASE_URL}/item/${itemId}/average`);
};

export const createReview = async (itemId, stars) => {
	return requester.post(`${BASE_URL}/item/${itemId}/create`, { stars });
};

export const getUserReview = async (itemId) => {
	return requester.get(`${BASE_URL}/item/${itemId}/user`);
};