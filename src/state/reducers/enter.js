import {
  ENTER_CHECK,
  ENTER_CHECK_ERROR,
  ENTER_CHECK_PENDING,
  APPEND_LIST_DATA
} from '../action-types/enterCheck';

const INITIAL_STATE = {
  ticketInfo: null,
  ListData: [],
  pending: false,
  errorMessage: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export const enter = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ENTER_CHECK_PENDING:
      return { ...state, errorMessage: null, pending: true };
    case ENTER_CHECK:
      // const NewListData = state.ListData.concat(action.payload);
      return {
        ...state,
        ticketInfo: action.payload,
        // ListData: NewListData,
        errorMessage: null,
        pending: false
      };
    case ENTER_CHECK_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        pending: false
      };
    case APPEND_LIST_DATA:
      const NewList = state.ListData.concat(action.payload);
      return {
        ...state,
        ListData: NewList
      };
    default:
      return state;
  }
};
