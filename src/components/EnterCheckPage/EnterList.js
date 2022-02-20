import React, { useState, useEffect } from 'react';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import { ReactComponent as GosrockLogo } from './GosrockLogo.svg';
const ContainerHeight = 550;

export const EnterList = ({ data }) => {
  //setData(data.concat(body.results));
  //message.success(`${body.results.length} more items loaded!`);
  const appendData = () => {};

  /* useEffect(() => {
    appendData();
  }, []);
*/

  const onScroll = e => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
    }
  };

  const testData = [
    {
      enterState: false,
      ticketInfo: {
        _id: '6205365ba7a02cb6c69dbfe7',
        status: 'enter',
        phoneNumber: '01044442323',
        ticketNumber: 18,
        adminTicket: false,
        accountName: '노재탁',
        studentID: 'C235142',
        smallGroup: false,
        createdAt: '2022-02-10T15:59:23.454Z',
        updatedAt: '2022-02-11T12:33:10.981Z',
        __v: 0,
        manager: '62037bc22736fe7ca0a99074'
      }
    },
    {
      enterState: true,
      ticketInfo: {
        _id: '6205365ba7a02cb2269dbfe7',
        status: 'enter',
        phoneNumber: '01042142323',
        ticketNumber: 15,
        adminTicket: false,
        accountName: '김주안',
        studentID: 'C232223',
        smallGroup: false,
        createdAt: '2022-02-10T15:59:23.454Z',
        updatedAt: '2022-02-11T12:33:10.981Z',
        __v: 0,
        manager: '62037bc22736fe7ca0a99074'
      }
    },
    {
      enterState: false,
      ticketInfo: {
        _id: '6205365ba7a02cbdd69dbfe7',
        status: 'enter',
        phoneNumber: '01046542323',
        ticketNumber: 12,
        adminTicket: false,
        accountName: '이찬진',
        studentID: 'C236623',
        smallGroup: false,
        createdAt: '2022-02-10T15:59:23.454Z',
        updatedAt: '2022-02-11T12:33:10.981Z',
        __v: 0,
        manager: '62037bc22736fe7ca0a99074'
      }
    }
  ];

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="_id"
        onScroll={onScroll}
      >
        {item => (
          <List.Item key={item.ticketInfo._id}>
            <List.Item.Meta
              avatar={<GosrockLogo />}
              title={
                <a href={`https://gosrock.link/tickets/${item.ticketInfo._id}`}>
                  {item.ticketInfo.accountName}
                </a>
              }
              description={item.ticketInfo.phoneNumber}
            />
            {item.enterState === true ? (
              <div>입장성공</div>
            ) : (
              <div>입장실패</div>
            )}
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
