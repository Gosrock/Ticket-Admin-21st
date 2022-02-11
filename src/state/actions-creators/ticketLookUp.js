import {
  TICKET_LOOKUP,
  TICKET_LOOKUP_ERROR,
  TICKET_LOOKUP_PENDING,
  STATE_CHANGE,
  STATE_CHANGE_ERROR
} from '../action-types/ticketLookUp';
import axios from 'axios';

export const ticketLookUp =
  ({ page, searchType, searchString }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: TICKET_LOOKUP_PENDING });
      if (searchString === 'O') searchString = '신청';
      else if (searchString === 'X') searchString = '미신청';

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
    }
  };

export const changeState =
  ({ _id, e }) =>
  async dispatch => {
    try {
      console.log('status:', e);
      console.log('_id:', _id);
      /* const params = {
        status: e,
        _id: _id
      }; */

      const response = await axios.patch(`/admin/tickets/${_id}`, {
        status: e,
        _id: _id
      });
      console.log(response.data);
      dispatch({ type: STATE_CHANGE, payload: response.data.data });
    } catch (e) {
      console.log(e);
      dispatch({
        type: STATE_CHANGE_ERROR,
        payload: e.response.data
      });
    }
  };
