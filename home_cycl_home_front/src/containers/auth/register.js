import { Card } from "antd";
import RegisterForm from "../../components/auth/registerForm";

export default function Register() {
  return (
    <Card style={styles.card}>
      <RegisterForm />
    </Card>
  );
}


const styles = {
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: "200px"
  }
}