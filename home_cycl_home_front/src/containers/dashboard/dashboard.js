import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, theme, Card, Divider, Button, message } from 'antd';
import { BarChartOutlined, FundOutlined, UserOutlined, UserDeleteOutlined, OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';

import { getUserById } from '../../actions/user';
import Map from '../../components/dashboard/Map.js';
import SearchBar from '../../components/dashboard/SearchBar.js';
import { authLogout } from '../../actions/auth.js';

const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard () {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [newZone, setNewZone] = useState({})
  const [user, setUser] = useState();
  const { token: { colorBgContainer } } = theme.useToken();

  const nav = useNavigate();
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
  
  useEffect(() => {
    console.log("DASHBOARD ZONE :", newZone)
  }, [newZone])

  const handleLogout = () => {
    authLogout()
    message.success("Déconnexion réussie")
    nav('/users')
  }

  const redirectToUsersList = () => {
    nav('/users')
  }
  
  const fetchMenuItems = async () => {
    return [
      { label: 'Carte', key: 'map', icon: <FundOutlined /> },
      { label: 'Planning', key: 'plan', icon: <BarChartOutlined /> },
      { 
        label: 'Listes', 
        key: "lists", 
        icon: <UnorderedListOutlined/>,
        children: [
          { label: (
            <Button style={{background: 'none', border: 'none', color: 'inherit'}} onClick={redirectToUsersList}>Liste des utilisateurs</Button>
          ), key: 'users' },
        ] 
      },
      { 
        label: 'Mes informations', 
        key: 'infos', 
        icon: <UserOutlined />, 
        children: [
          { label: 'Profil', key: 'profil' },
          { label: 'Mes rendez-vous', key: 'rdv' },
        ]
      },
      { label: (
        <Button style={{background: 'none', border: 'none', color: 'inherit'}} onClick={handleLogout}>Déconnexion</Button>
      ), key: 'logout', icon: <UserDeleteOutlined /> },
    ];
  };

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
          <Card>
            <SearchBar setNewZone={setNewZone}/>
            <Divider/>
            <Map newZone={newZone}/>
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Home Cycl'Home ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
