import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "./assets/logo.png";
import { Layout, Menu, message, Button } from "antd";
import {
  BarChartOutlined,
  FundOutlined,
  QqOutlined,
  UserOutlined,
  FormOutlined,
  TagOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { authLogout } from "./actions/auth";

const { Header, Footer, Sider, Content } = Layout;

const roleMap = {
  ROLE_ADMIN: "admin",
  ROLE_TECH: "tech",
  ROLE_USER: "user",
};

export default function DynamicLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentInterface, setCurrentInterface] = useState("user");

  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      nav("/auth/login");
      return;
    }

    setCurrentUser(user);

    const role = roleMap[user.roles?.[0]] || "user";
    setCurrentInterface(role);
    loadMenuItems(role);

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [nav]);

  useEffect(() => {
    loadMenuItems(currentInterface);
  }, [currentInterface]);

  const loadMenuItems = (role) => {
    const techMenu = [
      { label: "Mes Interventions", key: "inters", icon: <ToolOutlined /> },
      { label: "Planning", key: "plan", icon: <BarChartOutlined /> },
    ];

    const userMenu = [
      { label: "Mon profil", key: "me", icon: <UserOutlined /> },
      { label: "Commander", key: "newInter", icon: <QqOutlined /> },
      { label: "Mes Interventions", key: "inters", icon: <FormOutlined /> },
    ];

    const adminMenu = [
      { label: "Carte", key: "map", icon: <FundOutlined /> },
      { label: "Planning", key: "plan", icon: <BarChartOutlined /> },
      { label: "Commander", key: "newInter", icon: <QqOutlined /> },
      { label: "Utilisateurs", key: "users", icon: <UserOutlined /> },
      { label: "Interventions", key: "inters", icon: <FormOutlined /> },
      {
        label: "Types d'intervention",
        key: "typesInter",
        icon: <TagOutlined />,
      },
      { label: "Marques et Modèles", key: "brands", icon: <SettingOutlined /> },
    ];

    if (role === "admin") {
      setMenuItems(adminMenu);
    } else if (role === "tech") {
      setMenuItems(techMenu);
    } else {
      setMenuItems(userMenu);
    }
  };

  const handleLogout = async () => {
    await authLogout();
    message.success("Déconnexion réussie");
    nav("/auth/login");
  };

  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;
      case "users":
        nav("/users");
        break;
      case "map":
        nav("/dashboard");
        break;
      case "plan":
        nav("/planning");
        break;
      case "inters":
        nav("/interventions");
        break;
      case "newInter":
        nav("/interventions/new");
        break;
      case "typesInter":
        nav("/type_intervention");
        break;
      case "brands":
        nav("/brands");
        break;
      case "me":
        nav(`/users/show/${currentUser.id}`);
        break;
      default:
        break;
    }
  };

  const getInterfaceTitle = () =>
    ({
      admin: "Admin",
      tech: "Espace Technicien",
      user: "Espace Client",
    })[currentInterface] || "Admin";

  const getInterfaceColor = () =>
    ({
      admin: "#001529",
      tech: "#1b1000ff",
      user: "#2d2d2dff",
    })[currentInterface] || "#001529";

  return (
    <Layout style={styles.layout}>
      <Header
        style={{ ...styles.header, backgroundColor: getInterfaceColor() }}
      >
        <div style={styles.headerLeft}>
          <img width={50} height={50} src={Logo} alt="logo" />
          <span style={styles.interfaceTitle}>{getInterfaceTitle()}</span>
        </div>

        <div style={styles.headerRight}>
          <div style={styles.userName}>
            {currentUser?.firstname} {currentUser?.lastname}
          </div>
          <Button type="primary" danger onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </Header>

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            ...styles.sider,
            backgroundColor: getInterfaceColor(),
          }}
          width={200}
          collapsedWidth={80}
          trigger={null}
        >
          <Menu
            onClick={onClick}
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname.split("/")[1]]}
            items={menuItems}
            style={styles.menu}
          />
        </Sider>

        <Layout style={styles.contentLayout}>
          <Content style={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Footer style={styles.footer}>
        Home Cycl'Home - {getInterfaceTitle()} ©2024-{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

const styles = {
  layout: {
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  interfaceTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
    display: "inline-block",
    minWidth: 160,
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  userName: {
    color: "white",
    textAlign: "right",
  },

  sider: {
    transition: "all 0.2s",
  },

  menu: {
    backgroundColor: "transparent",
    borderRight: "none",
  },

  contentLayout: {
    height: "calc(100vh - 64px)",
    overflow: "auto",
  },

  content: {
    padding: 24,
    margin: 0,
    overflow: "auto",
  },

  footer: {
    textAlign: "center",
  },
};
