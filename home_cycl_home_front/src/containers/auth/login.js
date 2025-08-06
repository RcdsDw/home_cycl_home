import { Card } from "antd";
import LoginForm from "../../components/auth/loginForm";

export default function Login() {
  return (
    <Card style={styles.card}>
      <LoginForm />
    </Card>
  );
}

const styles = {
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: "200px",
  },
};
