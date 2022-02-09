import {
  TICKET_LOOKUP,
  TICKET_LOOKUP_ERROR,
  TICKET_LOOKUP_PENDING
} from '../action-types/ticketLookUp';

const INITIAL_STATE = {
  ticketInfo: null,
  errorMessage: null,
  pending: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export const ticket = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TICKET_LOOKUP_PENDING:
      return { ...state, errorMessage: null, pending: true };
    case TICKET_LOOKUP:
      return {
        ...state,
        ticketInfo: action.payload,
        errorMessage: null,
        pending: false
      };
    case TICKET_LOOKUP_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        pending: false
      };

    default:
      return state;
  }
};
