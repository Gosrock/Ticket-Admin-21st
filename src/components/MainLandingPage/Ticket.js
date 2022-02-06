import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ticket } from '../../state/actions-creators';
import axios from 'axios';
import { InformBox } from './InformBox';
const Ticket = props => {
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
    <div style={{ display: 'flex' }}>
      <ul>
        <p
          style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}
        >
          티켓 관련
        </p>

        {data ? (
          <div>
            <InformBox data={data.issuedTickets} title={'링크 발급된 티켓'}>
              {' '}
            </InformBox>

            <InformBox data={data.confirmedDeposit} title={'입금 확인된 티켓'}>
              {' '}
            </InformBox>

            <InformBox data={data.salesProceeds} title={'판매대금'}>
              {' '}
            </InformBox>
          </div>
        ) : (
          <div style={{ marginBottom: '30px' }}>로딩중입니다.</div>
        )}

        <p
          style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}
        >
          입금 관련
        </p>
        {data ? (
          <div>
            <InformBox data={data.confirmedDeposit} title={'입금 확인 완료'}>
              {' '}
            </InformBox>

            <InformBox data={data.pendingDeposit} title={'입금 확인 중'}>
              {' '}
            </InformBox>

            <InformBox data={data.nonDeposit} title={'미입금 처리'}>
              {' '}
            </InformBox>
          </div>
        ) : (
          <div style={{ marginBottom: '30px' }}>로딩중입니다.</div>
        )}

        <p
          style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '20px' }}
        >
          입장 확인 관련
        </p>
        {data ? (
          <div>
            <InformBox data={data.entered} title={'입장 확인된 티켓'}>
              {' '}
            </InformBox>

            <InformBox data={data.notEntered} title={'입장 확인 안 된 티켓'}>
              {' '}
            </InformBox>
          </div>
        ) : (
          <div style={{ marginBottom: '30px' }}>로딩중입니다.</div>
        )}
      </ul>
    </div>
  );
};

export default Ticket;
