import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = AntLayout;

const items: MenuProps['items'] = [
  { key: '/', label: <Link to="/">Home</Link> },
  { key: '/print', label: <Link to="/print">Print Photo</Link> },
];

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Header>
      <Content style={{ padding: '0 50px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#fff', padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Photo Print Service ©2024 Created by YourCompany</Footer>
    </AntLayout>
  );
};

export default Layout;