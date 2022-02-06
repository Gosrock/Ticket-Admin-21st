import React, { useState, useEffect, useCallback } from 'react';
//import {Statelcon} from 'gosrock-storybook';
import { useSelector, useDispatch } from 'react-redux';
// import { userLookup } from '../../../../actions/userLookup';
import { UserOutlined } from '@ant-design/icons';
import { Table, Input, Select, Button, Avatar, Image } from 'antd';
import moment from 'moment';
import { ticketLookUp } from '../../state/actions-creators';

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
        </Select>
        <Input
          style={{ width: '25%' }}
          defaultValue=""
          onChange={onInputChangeHandler}
          value={searchString}
        />
        <Button onClick={onSearchButtonClickHandler}> 검색 </Button>
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
          <Column title="티켓 연번" dataIndex="ticketNumber" />
          <Column title="티켓 아이디" dataIndex="_id" key="_id" />
          <Column title="입금자명" dataIndex="accountName" />
          <Column title="휴대폰 번호" dataIndex="phoneNumber" />
          <Column
            title="티켓 구매 일시"
            dataIndex="createdAt"
            render={date => {
              console.log();
              return moment(date).format('YY년 MM월 DD일 hh:mm');
            }}
          />
          <Column title="티켓 상태" dataIndex="status" />
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
