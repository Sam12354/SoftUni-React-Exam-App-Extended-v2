import requester from './requester.js';
const BASE_URL = 'http://localhost:7777';

export async function changePassword(oldPassword, newPassword) {
    return requester.put(`${BASE_URL}/changePassword`, { oldPassword, newPassword });
}