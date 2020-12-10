import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
});

export const POST = (url, data, configParams = {}) => {
  return http.post(url, data, {
    configParams,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};