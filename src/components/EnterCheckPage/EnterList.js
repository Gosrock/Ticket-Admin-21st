import React, { useState, useEffect } from 'react';
import { List, message, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import { ReactComponent as GosrockLogo2 } from './GosrockLogo2.svg';
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
              avatar={<GosrockLogo2 />}
              title={
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://gosrock.link/tickets/${item.ticketInfo._id}`}
                >
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
