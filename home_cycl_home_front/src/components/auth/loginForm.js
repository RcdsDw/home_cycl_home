import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { authLogin } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [loading, setLoading] = useState();
    const [form] = Form.useForm();
    const nav = useNavigate();

    const onFinish = async (values) => {
        setLoading(true)
        try {
            await authLogin(values)
                .then(() => {
                    message.success(`Connecté`);
                    nav("/dashboard");
                })
        } catch (err) {
            message.error("Identifiants invalides");
            console.error(err)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Form
            form={form}
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={() => message.error("Erreur lors de la connexion")}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: "Entrez votre adresse email." },
                    { type: "email", message: "Entrez une adresse email valide." },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mot de passe"
                name="password"
                rules={[{ required: true, message: "Entrez votre mot de passe." }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Se connecter
                </Button>
            </Form.Item>
        </Form>
    );
}
