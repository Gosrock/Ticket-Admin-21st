import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
// import { userLookup } from '../../../../actions/userLookup';
import { UserOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Table, Input, Select, Button, Avatar, Image } from 'antd';
import moment from 'moment';
import { changeState, ticketLookUp } from '../../state/actions-creators';
import { StateIcon } from './StateIcon';
import { ticket } from '../../state/reducers/ticket';
const { Column } = Table;
const { Option } = Select;

function TicketListUpPage({ props }) {
  const dispatch = useDispatch();

  const { ticketInfo } = useSelector(state => state.ticket);
  const [searchString, setsearchString] = useState('');
  const [searchType, setsearchType] = useState('');
  const [page, setPage] = useState('1');

  const onSelectHandler = e => {
    console.log(e);
    setsearchType(e);
  };
  const onSelectStateHandler = (e, _id) => {
    console.log('셀렉트핸들러 e값 : ', e);

    dispatch(changeState({ _id, e }));
  };

  const onInputChangeHandler = useCallback(e => {
    // console.log(e.target.value);
    setsearchString(e.target.value);
  }, []);

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    setPage(e);
    dispatch(ticketLookUp({ page: e, searchType, searchString }));
  };

  const onSearchButtonClickHandler = e => {
    setPage(1);
    dispatch(ticketLookUp({ page: 1, searchType, searchString }));
  };

  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  useEffect(() => {
    dispatch(ticketLookUp({ page: page, searchType, searchString }));
  }, [dispatch, searchType, searchString, page]);

  return (
    <>
      <div style={{ justifyContent: 'space-between', margin: '20px' }}>
        <Select defaultValue="선택하세요" onSelect={onSelectHandler}>
          <Option value="accountName">입금자명</Option>
          <Option value="phoneNumber">전화번호</Option>
          <Option value="smallGroup">소모임여부</Option>
        </Select>
        <Input
          style={{ width: '20%' }}
          defaultValue=""
          onChange={onInputChangeHandler}
          value={searchString}
        />
        <Button onClick={onSearchButtonClickHandler}> 검색 </Button>

        <Button
          style={{ display: 'inline-block', float: 'right' }}
          type="primary"
        >
          <PlusOutlined></PlusOutlined>공짜 티켓 발급
        </Button>

        <div style={{ marginBottom: '16px' }} />

        <Table
          pagination={{
            pageSize: 15,
            total: ticketInfo ? ticketInfo.totalResultCount : 0,
            showSizeChanger: false,
            onChange: onPageChange
          }}
          pageSize={15}
          dataSource={ticketInfo ? ticketInfo.ticketList : []}
          rowKey={render => render._id}
        >
          <Column title="연번" dataIndex="ticketNumber" />
          <Column title="티켓 아이디" dataIndex="_id" key="_id" />
          <Column title="입금자명" dataIndex="accountName" />
          <Column title="휴대폰 번호" dataIndex="phoneNumber" />
          <Column title="학번" dataIndex="studentID" />
          <Column
            title="소모임"
            dataIndex="smallGroup"
            render={smallGroup => {
              return smallGroup ? 'O' : 'X';
            }}
          />
          <Column
            title="구매일시"
            dataIndex="createdAt"
            render={date => {
              console.log();
              return moment(date).format('YY.MM.DD hh:mm');
            }}
          />
          <Column
            title="티켓 상태"
            dataIndex="status"
            render={status => {
              if (status === 'pending-deposit')
                return (
                  <StateIcon label="입금확인중" background="blue" word="five" />
                );
              else if (status === 'confirm-deposit')
                return (
                  <StateIcon label="입금확인" background="green" word="four" />
                );
              else if (status === 'non-deposit')
                return (
                  <StateIcon label="미입금처리" background="red" word="five" />
                );
              else if (status === 'enter')
                return (
                  <StateIcon label="입장완료" background="yellow" word="four" />
                );
            }}
          />
          <Column
            title="관리"
            dataIndex="_id"
            render={_id => {
              return (
                <div
                  style={{ justifyContent: 'space-between', margin: '20px' }}
                >
                  <Select
                    defaultValue="선택하세요"
                    onSelect={e => onSelectStateHandler(e, _id)}
                  >
                    <Option value="confirm-deposit">입금확인 </Option>
                    <Option value="enter">입장완료</Option>
                    <Option value="non-deposit">미입금처리</Option>
                    <Option value="pending-deposit">입금확인중</Option>
                  </Select>
                </div>
              );
            }}
          />

          <Column
            title="관리자"
            dataIndex="manager"
            render={manager => {
              return manager ? manager.name : null;
            }}
          />
        </Table>
      </div>
    </>
  );
}

export default TicketListUpPage;
