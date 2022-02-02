import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import TicketListUpPage from '../TicketListUpPage/TicketListUpPage';
import history from '../../config/history';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  AreaChartOutlined,
  LogoutOutlined,
  TableOutlined,
  FormOutlined
} from '@ant-design/icons';
import LogoutPage from '../LogoutPage/LogoutPage';

const { Content, Footer, Sider } = Layout;

const keyToInfo = {
  '/statics': { text: '통계', link: '/statics' },
  '/enter': { text: '입장확인', link: '/enter' },
  '/tickets': { text: '티켓현황', link: '/tickets' },
  '/logout': { text: '로그아웃', link: '/logout' }
};

const MainLandingPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [clickedkeyPath, setClickedkeyPath] = useState(
    keyToInfo[window.location.pathname]
      ? keyToInfo[window.location.pathname].text
      : '통계'
  );

  // 접혔을때 펼쳤을때 ( 사이드바 )
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  // 메뉴를 클릭했을때 라우팅 넘어가기
  const menuClick = ({ item, key, keyPath, domEvent }) => {
    history.push(keyToInfo[key].link);
    setClickedkeyPath(keyToInfo[key].text);
  };
  useEffect(() => {
    const path = window.location.pathname;
    console.log(path);
    setClickedkeyPath(path);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        // theme={"light"}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className="logo"> Gosrock </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[window.location.pathname]}
          mode="inline"
          style={{
            // display: "flex",
            // flexDirection: "column",
            marginTop: 'auto 0',
            height: '%100'
          }}
          onClick={menuClick}
        >
          <Menu.Item key="/statics" icon={<AreaChartOutlined />}>
            통계
          </Menu.Item>
          <Menu.Item key="/enter" icon={<FormOutlined />}>
            입장 확인
          </Menu.Item>
          <Menu.Item key="/tickets" icon={<TableOutlined />}>
            티켓 현황
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />}>
            로그아웃
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{clickedkeyPath}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Routes>
              <Route exact path="/tickets" element={<TicketListUpPage />} />
              <Route exact path="/logout" element={<LogoutPage />} />
              <Route exact path="/enter" element={<div>입장확인</div>} />
              <Route exact path="/statics" element={<div>통계임다</div>} />
              <Route path="*" element={<Navigate to="/statics" />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Gosrock ©2021 Created by Gosrock Github organization
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLandingPage;
