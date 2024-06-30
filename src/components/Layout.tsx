import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <AntLayout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/print">Print Photo</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Photo Print Service ©2024 Created by YourCompany</Footer>
    </AntLayout>
  );
};

export default Layout;