import {
  TICKET_INFORMATION,
  TICKET_INFORMATION_ERROR,
  TICKET_INFORMATION_PENDING
} from '../action-types/ticket';
import axios from 'axios';

/*export const initializeForm = data => ({
    type: AUTH_INITIALIZEFORM,
    payload: data
  });

*/

/*
export const ticket =
  ({ issuedTickets, salesProceeds, ConfirmedDeposit }, callback) =>
  async dispatch => {
    try {
      dispatch({ type: TICKET_INFORMATION_PENDING });

      const response = await axios.get('/admin/tickets/info', {
        issuedTickets,
        salesProceeds,
        ConfirmedDeposit
      });
      console.log('액션', response);

      dispatch({ type: TICKET_INFORMATION, payload: response.data });
    } catch (e) {
      //400 ~
      dispatch({
        type: TICKET_INFORMATION_ERROR,
        payload: '티켓정보로드 실패'   
      });
    } 
  };
*/
