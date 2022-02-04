import {
  AUTH_REGISTER_PENDING,
  AUTH_REGISTER_USER,
  AUTH_REGISTER_ERROR
} from '../action-types/register';
import axios from 'axios';
import history from '../../config/history';
import { AUTH_INITIALIZEFORM } from '../action-types';

export const register =
  ({ userId, password, name, gosrockCode }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: AUTH_REGISTER_PENDING });

      const response = await axios.post('/admin/register', {
        userId,
        password,
        name,
        gosrockCode
      });
      console.log('액션', response);

      dispatch({ type: AUTH_REGISTER_USER, payload: response.data });

      //localStorage.setItem('accessToken', response.data.data.adminAccessToken);
      //axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.adminAccessToken}`;

      // 자동으로 피쳐로 넘어가게끔
      history.push('/login');
    } catch (e) {
      //400 ~
      dispatch({
        type: AUTH_REGISTER_ERROR,
        payload: e.response.data.message
      });
    }
  };
