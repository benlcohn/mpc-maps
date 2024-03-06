import sendRequest from './send-request';
//REFACTOR SENDREQUEST

const BASE_URL = '/api/categories';

export function getAll() {
    return sendRequest(BASE_URL);
};

export function create(layoutData) {
    return sendRequest(`${BASE_URL}`, 'POST', layoutData);
};