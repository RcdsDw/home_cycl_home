import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Card, message, Select } from "antd";
import { createUser } from "../../actions/user";
import AddressSearch from "../../utils/AdressSearch";

export default function NewUser() {
  const [form] = Form.useForm();
  const nav = useNavigate()

  const onFinishRegister = (values) => {
    createUser(values)
      .then(() => {
        message.success(`Nouvel utilisateur créé`);
        nav('/users');
      })
      .catch((err) => {
        if (err.status === 406) {
          message.error(err.data.message);
        } else {
          message.error("Erreur lors de la création.");
        }
      });
  };

  const onFinishFailed = (info) => {
    message.error(`Erreur lors de ${info}`)
  };

  return (
    <Card style={{ maxWidth: 600, margin: "auto" }}>
      <Form
        form={form}
        name="newUser"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinishRegister}
        onFinishFailed={() => onFinishFailed("la création")}
        autoComplete="off"
      >
        <Form.Item
          label="Prénom"
          name="firstname"
          rules={[{ required: true, message: 'Entrez le prénom.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nom"
          name="lastname"
          rules={[{ required: true, message: 'Entrez le nom.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Rôle"
          name="role"
          rules={[{ required: true, message: 'Entrez le rôle.' }]}
        >
          <Select
            options={[
              {
                value: "admin",
                label: "Admin"
              },
              {
                value: "tech",
                label: "Technicien"
              },
              {
                value: "user",
                label: "Utilisateur"
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Numéro de téléphone"
          name="number"
          rules={[{ required: true, min: 10, max: 10, message: 'Entrez le numéro de téléphone.' }]}
        >
          <Input type="tel" />
        </Form.Item>

        <Form.Item
          label="Adresse postale"
          name="address"
          rules={[{ required: true, message: "Entrez l'adresse postale complète." }]}
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
            { required: true, message: 'Entrez le adresse email.' },
            { type: "email", message: 'Entrez une adresse email valide.' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: 'Entrez le mot de passe.' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Valider
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}