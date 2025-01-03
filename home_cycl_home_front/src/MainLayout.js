import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from './assets/logo.png'
import { Layout, Menu, message } from 'antd';
import { BarChartOutlined, FundOutlined, UserDeleteOutlined, UnorderedListOutlined, QqOutlined, UserOutlined } from '@ant-design/icons';
import { authLogout } from './actions/auth';
import { Content } from 'antd/es/layout/layout';

const { Header, Footer, Sider } = Layout;

export default function Dashboard () {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [navItems, setNavItems] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    const loadMenuItems = async () => {
      const menuItems = await fetchMenuItems();
      setMenuItems(menuItems);

      const navItems = await fetchNavItems();
      setNavItems(navItems);
    };
    loadMenuItems();

    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLogout = () => {
    authLogout()
    message.success("Déconnexion réussie")
    nav('/')
  }

  const onClick = (e) => {
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
        case 'inter':
            nav('/interventions/new')
            break;
        default:
            break;
    }
  }

  const fetchNavItems = async () => {
    return [
      { 
        label: '', 
        key: 'logout', 
        icon: <UserDeleteOutlined title='Déconnexion' /> 
      },
      // { 
      //   label: 'Profil', 
      //   key: 'profil',
      //   icon: <UserOutlined />
      // },
    ];
  };
  
  const fetchMenuItems = async () => {
    return [
        { label: 'Carte', key: 'map', icon: <FundOutlined /> },
        { label: 'Planning', key: 'plan', icon: <BarChartOutlined /> },
        { label: 'Commander', key: 'inter', icon: <QqOutlined /> },
        { 
          label: 'Listes', 
          key: "lists", 
          icon: <UnorderedListOutlined/>,
          children: [
            { label: 'Utilisateurs', key: 'users', icon: <UserOutlined/>,},
          ] 
        },
    ];
  };

  return (
    <Layout style={styles.layout}>
        <Header style={styles.header}>
            <img width={50} height={50} src={Logo}  />
            <Menu
                onClick={onClick}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={navItems}
                style={styles.headerMenu}
            />
        </Header>
        <Layout>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu onClick={onClick} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
            </Sider>
            <Layout style={styles.contentLayout}>
                {/* <Breadcrumb items={breadcrumbItems} style={styles.breadcrumb} /> */}
                <Content style={styles.content}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
        <Footer style={styles.footer}>
            Home Cycl'Home ©2024-{new Date().getFullYear()}
        </Footer>
    </Layout>
  );
};

// Styles définis à la fin du fichier
const styles = {
    layout: {
        minHeight: '100vh',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerMenu: {
        minWidth: 0,
    },
    contentLayout: {
        height: 'calc(100vh - 64px)',
        overflow: 'auto',
    },
    breadcrumb: {
        margin: '16px 0',
    },
    content: {
        padding: 24,
        margin: 0,
        overflow: 'auto',
        flex: 1,
    },
    footer: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: '10px 0',
    }
};
