import {
  ENTER_CHECK,
  ENTER_CHECK_ERROR,
  ENTER_CHECK_PENDING
} from '../action-types/enterCheck';

export const enterCheck =
  ({ data }) =>
  async dispatch => {
    try {
      dispatch({ type: ENTER_CHECK_PENDING });

      dispatch({ type: ENTER_CHECK, payload: data });

      //localStorage.setItem('accessToken', response.data.data.adminAccessToken);
      //axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.adminAccessToken}`;
    } catch (e) {
      //400 ~
      dispatch({
        type: ENTER_CHECK_ERROR,
        payload: '입장불가'
      });
    }
  };
