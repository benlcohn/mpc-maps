import sendRequest from './send-request';
//REFACTOR SENDREQUEST

const BASE_URL = '/api/sounds';

export function getAll() {
    return sendRequest(BASE_URL);
  }

export function upload(formData) {
    return sendRequest(`${BASE_URL}/upload`, 'POST', formData, true);
}