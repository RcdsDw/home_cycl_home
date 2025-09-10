import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToolOutlined, BarChartOutlined } from "@ant-design/icons";
import Logo from "./assets/logo.png";
import { authLogout } from "./actions/auth";

const { Header, Footer, Sider, Content } = Layout;

export default function TechLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = [
    { label: "Mes Interventions", key: "interventions", icon: <ToolOutlined /> },
    { label: "Planning", key: "planning", icon: <BarChartOutlined /> },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        authLogout().then(() => nav("/auth/login"));
        break;
      case "planning":
        nav("/planning");
        break;
      case "interventions":
        nav("/interventions");
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
          <span style={styles.title}>Technicien</span>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.userName}>{user?.firstname} {user?.lastname}</span>
          <Button type="primary" danger onClick={() => authLogout().then(() => nav("/auth/login"))}>
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
            selectedKeys={[location.pathname.split("/")[1]]}
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

      <Footer style={styles.footer}>Home Cycl'Home - Technicien ©2024-{new Date().getFullYear()}</Footer>
    </Layout>
  );
}

const styles = {
  layout: { minHeight: "100vh" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1b1000ff",
  },

  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  title: { color: "white", fontWeight: 600, fontSize: 18 },
  headerRight: { display: "flex", alignItems: "center", gap: 16 },
  userName: { color: "white" },

  sider: {
    backgroundColor: "#1b1000ff",
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
