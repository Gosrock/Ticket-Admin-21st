import client from './client';

//로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

//register
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

//Check login
export const check = () => client.get('/api.auth/check');
