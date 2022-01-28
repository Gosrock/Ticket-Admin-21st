import {
  AUTH_LOGIN_PENDIG,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_ERROR
} from '../action-types/login';
import axios from 'axios';
import history from '../../config/history';

export const login =
  ({ userId, password }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: AUTH_LOGIN_PENDIG });

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
