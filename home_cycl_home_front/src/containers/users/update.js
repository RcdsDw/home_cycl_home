import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, Form, Input, Select, message } from "antd";

import { getUserById, updateUser } from "../../actions/user";

export default function EditUser() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await getUserById(id);
      form.setFieldsValue(res);
    } catch (error) {
      message.error(
        "Impossible de récupérer les informations de l'utilisateur",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    setLoading(true);
    values.roles = values.roles[0];
    try {
      await updateUser(values, id);
      message.success("Utilisateur mis à jour avec succès !");
      nav(`/users/show/${id}`);
    } catch (error) {
      message.error("Erreur lors de la mise à jour de l'utilisateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => nav(`/users/show/${id}`)}>
        Retour
      </Button>
      <Card style={styles.card}>
        <h2 style={styles.title}>Modifier l'utilisateur</h2>
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Prénom"
            name="firstname"
            rules={[{ required: true, message: "Veuillez entrer le prénom" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nom"
            name="lastname"
            rules={[{ required: true, message: "Veuillez entrer le nom" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Veuillez entrer l'email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rôle"
            name="roles"
            rules={[
              { required: true, message: "Veuillez sélectionner un rôle" },
            ]}
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

          <Form.Item>
            <Button
              style={styles.button}
              type="primary"
              htmlType="submit"
              loading={loading}
            >
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
