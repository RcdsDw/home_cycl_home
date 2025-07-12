import React from "react";
import { Form, Input, Button, message } from "antd";
import { authRegister } from "../../actions/auth";
import AddressSearch from "../../utils/AdressSearch";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [form] = Form.useForm();
    const nav = useNavigate();

    const refactoAddress = (address) => {
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

    const onFinish = (values) => {
        if (values?.address) {
            values.address = refactoAddress(values.address);
        }

        authRegister(values)
            .then(() => {
                message.success(`Enregistré`);
                nav("/");
            })
            .catch(() => {
                message.error("Erreur ?");
            });
    };

    return (
        <Form
            form={form}
            name="register"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={() => message.error("Erreur lors de l'enregistrement")}
            autoComplete="off"
        >
            <Form.Item
                label="Prénom"
                name="firstname"
                rules={[{ required: true, message: "Entrez votre prénom." }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Nom"
                name="lastname"
                rules={[{ required: true, message: "Entrez votre nom." }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Numéro de téléphone"
                name="number"
                rules={[{ required: true, message: "Entrez votre numéro de téléphone." }]}
            >
                <Input type="tel" />
            </Form.Item>

            <Form.Item
                label="Adresse postale"
                name="address"
                rules={[{ required: true, message: "Entrez votre adresse postale." }]}
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

            <Form.Item
                label="Confirmer"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                    { required: true, message: "Confirmez votre mot de passe." },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error("Les mots de passe ne sont pas identiques."));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    S'enregistrer
                </Button>
            </Form.Item>
        </Form>
    );
}
