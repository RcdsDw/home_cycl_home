/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Select, message } from "antd";
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
            message.error("Impossible de récupérer les informations de l'utilisateur");
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
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <h1>Modifier l'utilisateur</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
            >
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
                    rules={[{ required: true, message: "Veuillez sélectionner un rôle" }]}
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
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Mettre à jour
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
