import React, { useState } from "react";
import { Tabs, Card } from "antd";
import LoginForm from "../../components/auth/loginForm";
import RegisterForm from "../../components/auth/registerForm";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Card style={{ maxWidth: 600, margin: "auto", marginTop: "200px" }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
        <Tabs.TabPane tab="Se connecter" key="login">
          <LoginForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="S'enregistrer" key="register">
          <RegisterForm />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  );
}
