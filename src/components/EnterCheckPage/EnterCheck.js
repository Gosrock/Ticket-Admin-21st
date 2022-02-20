import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { useState, useEffect, useMemo } from 'react';
import { ShowTicket } from './ShowTicket';
import { EnterList } from './EnterList';
import { enterCheck } from '../../state/actions-creators';
import {
  APPEND_LIST_DATA,
  ENTER_CHECK,
  ENTER_CHECK_ERROR
} from '../../state/action-types';

export const EnterCheck = () => {
  const { ticketInfo, ListData } = useSelector(state => state.enter);
  const [ticketData, setTicketData] = useState(ticketInfo);
  const [listData, setListData] = useState([]);

  const { authenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const socket = io('https://api.gosrock.link/socket/admin', {
    auth: {
      adminAccessToken: authenticated
    }
  });

  useEffect(() => {
    if (authenticated) {
      socket.on('connect', () => {
        console.log('socket Open. \n socket Id :', socket.id);
      });
    }
  }, [authenticated]);

  useMemo(() => {
    socket.on('enter', data => {
      console.log('data receive, data : ', data);
      dispatch({ type: ENTER_CHECK, payload: data });
      dispatch({ type: APPEND_LIST_DATA, payload: data });
    });
  }, [dispatch]);
  socket.on('connect_error', err => {
    dispatch({ type: ENTER_CHECK_ERROR, payload: err.message });
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });
  useEffect(() => {
    console.log('ListData : ', ListData);
  }, [ListData]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '30px',
            marginBottom: '20px'
          }}
        >
          실시간 입장확인
        </p>

        {ticketInfo ? (
          <div
            style={{
              width: '340px',
              height: '470px',
              marginRight: '30px',
              float: 'left'
            }}
          >
            <ShowTicket
              studentId={ticketInfo.ticketInfo.studentID}
              accountName={ticketInfo.ticketInfo.accountName}
              enterState={ticketInfo.enterState}
            />
          </div>
        ) : (
          <div
            style={{
              width: '340px',
              height: '470px',
              marginRight: '30px',
              marginBottom: '30px',
              fontSize: '25px',
              float: 'left'
            }}
          >
            대기중...
          </div>
        )}
        {ListData ? <EnterList data={ListData} /> : <div>리스트 대기중</div>}
      </div>
    </div>
  );
};
