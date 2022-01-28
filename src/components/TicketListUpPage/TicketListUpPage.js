import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
// import { userLookup } from '../../../../actions/userLookup';
import { UserOutlined } from '@ant-design/icons';
import { Table, Input, Select, Button, Avatar, Image } from 'antd';
import moment from 'moment';

const { Column } = Table;
const { Option } = Select;

function TicketListUpPage() {
  //   const dispatch = useDispatch();

  //   const { data } = useSelector(state => state.userLookup);
  const [searchString, setsearchString] = useState('');
  const [searchOption, setsearchOption] = useState('');
  const [page, setPage] = useState('0');

  const onSelectHandler = e => {
    console.log(e);
    setsearchOption(e);
  };

  const onInputChangeHandler = e => {
    // console.log(e.target.value);
    setsearchString(e.target.value);
  };

  const onPageChange = e => {
    // 페이지네이션 번호 바뀔때 뜸.
    console.log(e);
    setPage(e);
    // dispatch(userLookup({ searchOption, page: e - 1, searchString }));
  };

  const onSearchButtonClickHandler = e => {
    console.log(searchOption, page, searchString);
    setPage(0);
    // dispatch(userLookup({ searchOption, page: 0, searchString }));
  };
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);

  //   useEffect(() => {
  //     dispatch(userLookup({ searchOption, page, searchString }));
  //     console.log(data);
  //   }, []);

  return (
    <>
      <div style={{ justifyContent: 'space-between', margin: '20px' }}>
        <Select defaultValue="" onSelect={onSelectHandler}>
          <Option value="accountName">입금자명</Option>
          <Option value="phoneNumber">전화번호</Option>
        </Select>
        <Input
          style={{ width: '50%' }}
          defaultValue=""
          onChange={onInputChangeHandler}
          value={searchString}
        />
        <Button onClick={onSearchButtonClickHandler}> 검색 </Button>
        <div style={{ marginBottom: '16px' }} />
        <Table
          pagination={{
            pageSize: 15,
            total: 10,
            showSizeChanger: false,
            onChange: onPageChange
          }}
          pageSize={15}
          dataSource={exampleData}
        >
          <Column title="연번" dataIndex="ticketNumber" key="ticketNumber" />
          <Column title="티켓 아이디" dataIndex="_id" key="_id" />
          <Column title="입금자명" dataIndex="accountName" key="accountName" />
          <Column
            title="휴대폰 번호"
            dataIndex="phoneNumber"
            key="phoneNumber"
          />
          <Column
            title="구매일시"
            dataIndex="createdAt"
            key="createdAt"
            render={date => {
              console.log();
              return moment(date).format('YY.MM.DD');
            }}
          />
          <Column title="티켓 상태" dataIndex="status" key="status" />
          {/* <Column
            title="관리"
            dataIndex="status"
            key="status"
            render={status => {
              return status.state ? <a>Delete</a> : 'adsf';
            }}
          /> */}
        </Table>
      </div>
    </>
  );
}

export default TicketListUpPage;

const exampleData = [
  {
    _id: '61e0458ab063b6962b939ce2',
    status: 'pending-deposit',
    phoneNumber: '01094768640',
    ticketNumber: 4,
    adminTicket: false,
    accountName: '이찬진',
    createdAt: '2022-01-13T15:30:18.473Z',
    updatedAt: '2022-01-13T15:30:18.473Z',
    __v: 0
  },
  {
    _id: '61e0458ab063b6962b939ce3',
    status: 'pending-deposit',
    phoneNumber: '01094768640',
    ticketNumber: 5,
    adminTicket: false,
    accountName: '이찬진',
    createdAt: '2022-01-13T15:30:18.473Z',
    updatedAt: '2022-01-13T15:30:18.473Z',
    __v: 0
  },
  {
    _id: '61e04612a23178aaf5c2631d',
    status: 'pending-deposit',
    phoneNumber: '01094768640',
    ticketNumber: 6,
    adminTicket: false,
    accountName: '이찬진',
    createdAt: '2022-01-13T15:32:34.100Z',
    updatedAt: '2022-01-13T15:32:34.100Z',
    __v: 0
  }
];
