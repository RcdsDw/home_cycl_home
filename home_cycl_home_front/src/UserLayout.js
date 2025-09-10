import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { QqOutlined, UserOutlined, FormOutlined } from "@ant-design/icons";
import Logo from "./assets/logo.png";
import { authLogout } from "./actions/auth";

const { Header, Footer, Sider, Content } = Layout;

export default function UserLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = [
    { label: "Mon profil", key: "me", icon: <UserOutlined /> },
    { label: "Commander", key: "newInter", icon: <QqOutlined /> },
    { label: "Mes Interventions", key: "inters", icon: <FormOutlined /> },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        authLogout().then(() => nav("/auth/login"));
        break;
      case "inters":
        nav("/interventions");
        break;
      case "newInter":
        nav("/interventions/new");
        break;
      case "me":
        nav(`/users/show/${user.id}`);
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={styles.layout}>
      <Header style={styles.header}>
        <div style={styles.headerLeft}>
          <img src={Logo} alt="logo" width={50} height={50} />
          <span style={styles.title}>Client</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.userName}>
            {user?.firstname} {user?.lastname}
          </span>
          <Button
            type="primary"
            danger
            onClick={() => authLogout().then(() => nav("/auth/login"))}
          >
            Déconnexion
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={200}
          collapsedWidth={80}
          style={styles.sider}
        >
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname.split("/")[2]]}
            items={menuItems}
            onClick={onClick}
            style={styles.menu}
          />
        </Sider>
        <Layout>
          <Content style={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer style={styles.footer}>
        Home Cycl'Home - Client ©2024-{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

const styles = {
  layout: { minHeight: "100vh" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2d2d2dff",
  },

  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  title: { color: "white", fontWeight: 600, fontSize: 18 },
  headerRight: { display: "flex", alignItems: "center", gap: 16 },
  userName: { color: "white" },

  sider: {
    backgroundColor: "#2d2d2dff",
    transition: "all 0.2s",
  },

  menu: {
    backgroundColor: "transparent",
    borderRight: "none",
    height: "100%",
  },

  content: {
    padding: 24,
    margin: 0,
    overflow: "auto",
    backgroundColor: "#f0f2f5",
  },

  footer: {
    textAlign: "center",
  },
};
