import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null, payloadIsFormData = false) {
  console.log('Sending request to:', url);
  console.log('Method:', method);
  console.log('Payload:', payload);
  console.log('Is Payload FormData?', payloadIsFormData);

  const options = { method };
  if (payload) {
    options.headers = payloadIsFormData ? {} : { 'Content-Type': 'application/json' };
    options.body = payloadIsFormData ? payload : JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Request Options:', options);

  try {
    const res = await fetch(url, options);
    console.log('Response:', res);
    
    if (res.ok) return res.json();
    throw new Error('Bad Request');
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
