import requester from "./requester.js";

const BASE_URL = "http://localhost:7777/comment";

export const getComments = async (itemId) => {
    return requester.get(`${BASE_URL}/item/${itemId}`);
};

export const createComment = async (itemId, text) => {
    return requester.post(`${BASE_URL}/item/${itemId}/create`, { text });
};