import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from './assets/logo.png'

import { Layout, Menu, theme, message, Breadcrumb, Image } from 'antd';
import { BarChartOutlined, FundOutlined, UserOutlined, UserDeleteOutlined, UnorderedListOutlined, QqOutlined } from '@ant-design/icons';

import { authLogout } from './actions/auth';
import { Content } from 'antd/es/layout/layout';

const { Header, Footer, Sider } = Layout;

export default function Dashboard () {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  const nav = useNavigate();

  useEffect(() => {
    const loadMenuItems = async () => {
      const menuItems = await fetchMenuItems();
      setMenuItems(menuItems);

      const navItems = await fetchNavItems();
      setNavItems(navItems);
    };
    loadMenuItems();
  }, []);

  const handleLogout = () => {
    authLogout()
    message.success("Déconnexion réussie")
    nav('/')
  }

  const onClick = (e) => {
    console.log("🚀 ~ onClick ~ e.key:", e.key)
    switch(e.key) {
        case 'logout':
            handleLogout()
            break;
        case 'users':
            nav('/users')
            break;
        case 'map':
            nav('/dashboard')
            break;
        case 'plan':
            nav('/planning')
            break;
        default:
            break;
    }
  }

  const fetchNavItems = async () => {
    return [
      { 
        label: 'Profil', 
        key: 'profil',
        icon: <UserOutlined />
      },
      { 
        label: 'Déconnexion', 
        key: 'logout', 
        icon: <UserDeleteOutlined /> 
      },
    ];
  };
  
  const fetchMenuItems = async () => {
    return [
        { label: 'Carte', key: 'map', icon: <FundOutlined /> },
        { label: 'Planning', key: 'plan', icon: <BarChartOutlined /> },
        { label: 'Test', key: 'test', icon: <QqOutlined /> },
        { 
          label: 'Listes', 
          key: "lists", 
          icon: <UnorderedListOutlined/>,
          children: [
            { label: 'Liste des utilisateurs', key: 'users' },
          ] 
        },
    ];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div style={{ flex: 7 }}>
                <Image width={50} height={50} src={Logo} />
            </div>
            <Menu
                onClick={onClick}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={navItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
        </Header>
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
            </Sider>
            <Layout
                style={{
                    padding: '0 24px 24px',
                }}
            >
                <Breadcrumb
                    items={[
                    {
                        title: 'Home',
                    },
                    {
                        title: 'List',
                    },
                    {
                        title: 'App',
                    },
                    ]}
                      style={{
                      margin: '16px 0',
                    }}
                />
                <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
            Home Cycl'Home ©{new Date().getFullYear()}
        </Footer>
    </Layout>
  );
};
