import {
  TICKET_INFORMATION,
  TICKET_INFORMATION_ERROR,
  TICKET_INFORMATION_PENDING
} from '../action-types/ticket';

const INITIAL_STATE = {
  ticketInfo: null,
  errorMessage: null,
  pending: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_INFORMATION_PENDING:
      console.log(action.type, action.payload);
      return { ...state, errorMessage: null, pending: true };
    case TICKET_INFORMATION:
      return {
        ...state,
        ticketInfo: action.payload.data,
        errorMessage: null,
        pending: false
      };
    case TICKET_INFORMATION_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        pending: false
      };

    default:
      return state;
  }
};
