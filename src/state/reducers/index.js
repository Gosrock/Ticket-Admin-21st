import { combineReducers } from 'redux';

//import { ticket } from '../actions-creators';
import { auth } from './auth';
import { ticket } from './ticket';
import { enter } from './enter';
// 가져올때 확인하는 부분..! mapStateToProps
export default combineReducers({
  auth: auth,
  ticket: ticket,
  enter: enter
  //ticket
});
