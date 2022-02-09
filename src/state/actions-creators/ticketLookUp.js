import {
  TICKET_LOOKUP,
  TICKET_LOOKUP_ERROR,
  TICKET_LOOKUP_PENDING
} from '../action-types/ticketLookUp';
import axios from 'axios';

export const ticketLookUp =
  ({ page, searchType, searchString }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: TICKET_LOOKUP_PENDING });

      const params = {
        page: page,
        searchType: searchType,
        searchString: searchString
      };
      const response = await axios.get('/admin/tickets', {
        params
      });

      dispatch({ type: TICKET_LOOKUP, payload: response.data.data });
    } catch (e) {
      //400 ~

      dispatch({
        type: TICKET_LOOKUP_ERROR,
        payload: e.response.data.message
      });
      console.log(e.response.data);
    }
  };
