/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, Input, Select, message } from "antd";
import { getUserById, updateUser } from "../../actions/user";
import { useEffect, useState } from "react";
import AddressSearch from "../../utils/AddressSearch";

export default function EditUser() {
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getUserById(id);
      form.setFieldsValue(res.data);
    } catch (error) {
      message.error(
        "Impossible de récupérer les informations de l'utilisateur",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await updateUser(id, values);
      message.success("Utilisateur mis à jour avec succès !");
      nav(`/user/show/${id}`);
    } catch (error) {
      message.error("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  const handleAddressSelect = (option) => {
    form.setFieldsValue({ address: option });
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
            name="role"
            rules={[
              { required: true, message: "Veuillez sélectionner un rôle" },
            ]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="tech">Tech</Select.Option>
              <Select.Option value="user">Utilisateur</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Adresse"
            name="address"
            rules={[{ required: true, message: "Veuillez entrer l'adresse" }]}
          >
            <AddressSearch onAddressSelect={handleAddressSelect} />
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
