import {
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_ERROR,
  AUTH_INITIALIZEFORM
} from '../action-types/login';
import axios, { Axios } from 'axios';
import history from '../../config/history';

export const initializeForm = data => dispatch => {
  dispatch({ type: AUTH_INITIALIZEFORM, payload: data });
};

export const login =
  ({ userId, password }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: AUTH_LOGIN_PENDING });
      const response = await axios.post('/admin/login', {
        userId,
        password
      });
      console.log('액션', response);

      dispatch({ type: AUTH_LOGIN_USER, payload: response.data });

      localStorage.setItem('accessToken', response.data.data.adminAccessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.adminAccessToken}`;

      // 자동으로 피쳐로 넘어가게끔
      history.push('/statics');
    } catch (e) {
      //400 ~
      dispatch({ type: AUTH_LOGIN_ERROR, payload: '로그인 실패' });
    }
  };
