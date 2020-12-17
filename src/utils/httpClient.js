import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: 'json',
});

const getHeaders = (isSecured) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (!isSecured) return headers;
  headers['authorization'] = localStorage.getItem('token');
  return headers;
};

export const POST = (url, data, configParams = {}, isSecured = false) => {
  return http.post(url, data, {
    configParams,
    headers: getHeaders(isSecured),
  });
};

export const GET = (url, configParams = {}, isSecured = true) => {
  return http.get(url, {
    configParams,
    headers: getHeaders(isSecured),
  });
};
