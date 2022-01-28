import { LOGOUT_USER } from '../action-types/logout';
import axios from 'axios';
import history from '../../config/history';

export const logout = () => async dispatch => {
  dispatch({ type: LOGOUT_USER });

  localStorage.setItem('accessToken', null);
  axios.defaults.headers.common.Authorization = `Bearer `;

  // 자동으로 피쳐로 넘어가게끔
  history.push('/login');
};
