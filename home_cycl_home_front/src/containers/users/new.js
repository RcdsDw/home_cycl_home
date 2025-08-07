import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Card, message, Select } from "antd";

import AddressSearch from "../../utils/AddressSearch";
import { useState } from "react";
import { createUser } from "../../actions/user";
import { parseID } from "../../utils/ParseID";

export default function NewUser() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const nav = useNavigate();

  const onFinishRegister = async (values) => {
    setLoading(true);

    values.address = form.getFieldValue("address");

    try {
      await createUser(values).then((res) => {
        message.success(`Nouvel utilisateur créé`);
        nav(`/users/show/${parseID(res)}`);
      });
    } catch (err) {
      if (err.status === 409) {
        message.error("Cette adresse email est déjà utilisée.");
      } else {
        message.error("Erreur lors de la création.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        style={styles.button}
        onClick={() => nav("/users")}
      >
        Retour à la liste
      </Button>
      <Card style={styles.card}>
        <h2 style={styles.title}>Nouvel utilisateur</h2>
        <Form form={form} onFinish={onFinishRegister} layout="vertical">
          <Form.Item
            label="Prénom"
            name="firstname"
            rules={[{ required: true, message: "Entrez le prénom." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nom"
            name="lastname"
            rules={[{ required: true, message: "Entrez le nom." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rôle"
            name="roles"
            rules={[{ required: true, message: "Entrez le rôle." }]}
          >
            <Select
              options={[
                {
                  value: "ROLE_ADMIN",
                  label: "Admin",
                },
                {
                  value: "ROLE_TECH",
                  label: "Technicien",
                },
                {
                  value: "ROLE_USER",
                  label: "Utilisateur",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Numéro de téléphone"
            name="number"
            rules={[
              {
                required: true,
                min: 10,
                max: 10,
                message: "Entrez le numéro de téléphone.",
              },
            ]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            label="Adresse postale"
            name="address"
            rules={[
              { required: true, message: "Entrez l'adresse postale complète." },
            ]}
          >
            <AddressSearch
              onAddressSelect={(address) => {
                form.setFieldValue("address", address);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Entrez le adresse email." },
              { type: "email", message: "Entrez une adresse email valide." },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Entrez le mot de passe." }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Valider
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

const styles = {
  card: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "30px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#000000ff",
  },
};
