import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, theme } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import { getUserById } from '../../actions/user';

const { Header, Content, Footer, Sider } = Layout;

const fetchMenuItems = async () => {
  return [
    { label: 'Dashboard', key: '1', icon: <PieChartOutlined /> },
    { label: 'Workstation', key: '2', icon: <DesktopOutlined /> },
    { 
      label: 'Menu dépliable', 
      key: 'sub1', 
      icon: <UserOutlined />, 
      children: [
        { label: 'Sous menu 1', key: '3' },
        { label: 'Sous menu 2', key: '4' },
        { label: 'Sous menu 3', key: '5' }
      ]
    },
    { 
      label: 'Team', 
      key: 'sub2', 
      icon: <TeamOutlined />, 
      children: [
        { label: 'Team 1', key: '6' },
        { label: 'Team 2', key: '7' }
      ]
    },
    { label: 'Files', key: '8', icon: <FileOutlined /> },
  ];
};

export default function Dashboard () {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [user, setUser] = useState();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const location = useLocation();
  const { userId } = location.state

  useEffect(() => {
    getUserById(userId).then((res) => setUser(res.user))
    const loadMenuItems = async () => {
      const items = await fetchMenuItems();
      setMenuItems(items);
    };
    loadMenuItems();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
      </Sider>
      
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{user && user.firstname}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, borderRadius: borderRadiusLG }}>
            Mon email : {user && user.email}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Home Cycl'Home ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
