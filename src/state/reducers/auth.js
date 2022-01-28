import {
  AUTH_LOGIN_PENDIG,
  AUTH_LOGIN_USER,
  AUTH_LOGIN_ERROR,
  LOGOUT_USER
} from '../action-types';

const INITIAL_STATE = {
  authenticated: null,
  userInfo: null,
  errorMessage: null,
  pending: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOGIN_PENDIG:
      console.log(action.type, action.payload);
      return { ...state, errorMessage: null, pending: true };
    case AUTH_LOGIN_USER:
      return {
        ...state,
        authenticated: action.payload.data.adminAccessToken,
        userInfo: action.payload.data,
        errorMessage: null,
        pending: false
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        authenticated: null,
        errorMessage: action.payload,
        pending: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        userInfo: null,
        authenticated: null,
        errorMessage: null,
        pending: false
      };
    default:
      return state;
  }
};
