import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = AntLayout;

const items: MenuProps['items'] = [
  { key: '/', label: <Link to="/">Home</Link> },
  { key: '/print', label: <Link to="/print">Print Photo</Link> },
  { key: '/payment', label: <Link to="/payment">Payment</Link> },
  { key: '/status', label: <Link to="/status">Status</Link> },
];

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();

  return (
    <AntLayout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', top: 0 }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Header>
      <Content style={{ marginTop: 64, marginBottom: 70, flex: 1, overflow: 'auto' }}>
        <div style={{ padding: '24px 50px', minHeight: '100%' }}>
          {children}
        </div>
      </Content>
      <Footer style={{ 
        textAlign: 'center', 
        background: '#f0f2f5', 
        padding: '12px 50px',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1
      }}>
        Photo Print Service ©2024 Created by YourCompany
      </Footer>
    </AntLayout>
  );
};

export default Layout;