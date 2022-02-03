import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ticket } from '../../state/actions-creators';
import axios from 'axios';
import { Yezin } from './Yezin';
export default function Ticket(props) {
  /*const dispatch = useDispatch();
  let body = {
    issuedTickets: '',
    salesProceeds: '',
    ConfirmedDeposit: ''
  };*/
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/admin/tickets/info');
        //const issuedTickets = request.data.issuedTickets;
        //const salesProceeds = request.data.salesProceeds;
        setData(response.data.data);
        //console.log(response.data.data.issuedTickets);
        //console.log(response.data.data.salesProceeds);
        //console.log();
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  console.log('data', data);
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      {data ? (
        <Yezin
          style={{
            marginRight: '100px'
          }}
          data={data.issuedTickets}
          title={'링크 발급된 티켓'}
        >
          {' '}
        </Yezin>
      ) : (
        <div>로딩중</div>
      )}

      <h2> 입금확인 </h2>
      <h2>판매대금 </h2>
    </div>
  );
}
