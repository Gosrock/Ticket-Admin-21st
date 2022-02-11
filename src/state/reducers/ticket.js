import {
  TICKET_LOOKUP,
  TICKET_LOOKUP_ERROR,
  TICKET_LOOKUP_PENDING,
  STATE_CHANGE,
  STATE_CHANGE_ERROR
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

    case STATE_CHANGE:
      const newTicketList = state.ticketInfo.ticketList.map(element => {
        if (element._id === action.payload._id) {
          return action.payload;
        }
        return element;
      });

      return {
        ...state,
        ticketInfo: {
          totalResultCount: state.ticketInfo.totalResultCount,
          ticketList: newTicketList
        },
        errorMessage: null
      };

    case STATE_CHANGE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.message
      };

    default:
      return state;
  }
};
