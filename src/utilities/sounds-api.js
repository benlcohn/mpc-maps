import sendRequest from './send-request';

const BASE_URL = '/api/sounds';

export function getAll() {
    return sendRequest(BASE_URL);
}

export function uploadSound(formData) {
    return sendRequest(`${BASE_URL}/upload`, 'POST', formData, true);
}

export function removeSound(soundId) {
    return sendRequest(`${BASE_URL}/${soundId}`, 'DELETE');
}
