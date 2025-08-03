import { useNavigate } from "react-router-dom";

import { Button, Form, Input, Card, message, Select } from "antd";
import { createUser } from "../../actions/user";
import AddressSearch from "../../utils/AddressSearch";
import { parseID } from "../../utils/ParseID";
import { useState } from "react";

export default function NewUser() {
  const [loading, setLoading] = useState()

  const [form] = Form.useForm();
  const nav = useNavigate()

  const refactoAddress = (address) => {
    console.log("🚀 ~ refactoAddress ~ address:", address)
    return {
      street: address.data?.name,
      city: address.data?.city,
      code: address.data?.citycode,
      coords: {
        lat: address.geo?.coordinates[1],
        lng: address.geo?.coordinates[0],
      },
    };
  };

  const onFinishRegister = async (values) => {
    console.log("🚀 ~ onFinishRegister ~ values:", values)
    setLoading(true)

    if (values?.address) {
      values.address = refactoAddress(values.address);
    }

    // try {
    //   await createUser(values).then((res) => {
    //     message.success(`Nouvel utilisateur créé`);
    //     nav(`/users/show/${parseID(res)}`);
    //   })
    // } catch (err) {
    //   if (err.status === 409) {
    //     message.error("Cette adresse email est déjà utilisée.");
    //   } else {
    //     message.error("Erreur lors de la création.");
    //   }
    // } finally {
    //   setLoading(false)
    // }
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
          name="roles"
          rules={[{ required: true, message: 'Entrez le rôle.' }]}
        >
          <Select
            options={[
              {
                value: "ROLE_ADMIN",
                label: "Admin"
              },
              {
                value: "ROLE_TECH",
                label: "Technicien"
              },
              {
                value: "ROLE_USER",
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Valider
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}