import sendRequest from './send-request';

const BASE_URL = '/api/layouts';

export function getAll() {
    return sendRequest(BASE_URL);
};

export function create(layoutData) {
    return sendRequest(`${BASE_URL}`, 'POST', layoutData);
};