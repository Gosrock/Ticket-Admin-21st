import { combineReducers } from 'redux';
//import { ticket } from '../actions-creators';
import { auth } from './auth';
// 가져올때 확인하는 부분..! mapStateToProps
export default combineReducers({
  auth: auth
  //ticket
});